/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 14:59:40 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, ScrollView, Alert} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import EmojiSelection from '../../components/Infographics/EmojiSelection';
import DefaultButton from '../../components/Buttons/DefaultButton';
import SliderProgressView from '../../components/Views/SliderProgressView';
import IconTextView from '../../components/Infographics/IconTextView';
import FadingBottomView from '../../components/Views/FadingBottomView';
import Spacer from '../../components/Utility/Spacer';
import UseData from '../../hooks/data/UseData';
import CompleteWorkout from '../../apollo/mutations/CompleteWorkout';
import CompleteOnDemandWorkout from '../../apollo/mutations/CompleteOnDemandWorkout';
import StartOnDemandWorkout from '../../apollo/mutations/StartOnDemandWorkout';
import AddExerciseWeight from '../../apollo/mutations/AddExerciseWeight';
import {useMutation} from '@apollo/client';
import * as R from 'ramda';
import useUserData from '../../hooks/data/useUserData';
import useWorkoutTimer from '../../hooks/timer/useWorkoutTimer';
import useLoading from '../../hooks/loading/useLoading';
import {useBackHandler} from '@react-native-community/hooks';
import displayAlert from '../../utils/DisplayAlert';

import {useNetInfo} from '@react-native-community/netinfo';
import OfflineUtils from '../../hooks/data/OfflineUtils';
import FastImage from 'react-native-fast-image';

export default function WorkoutCompleteScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict, ProfileDict} = dictionary;
  const navigation = useNavigation();
  const {isConnected, isInternetReachable} = useNetInfo();

  const {firebaseLogEvent, analyticsEvents, getProfile} = useUserData();
  const {
    getProgramme,
    selectedWorkout,
    weightsToUpload,
    setWeightsToUpload,
    setIsSelectedWorkoutOnDemand,
    isSelectedWorkoutOnDemand,
    shouldIncrementOnDemandWorkoutCount,
    setShouldIncrementOnDemandWorkoutCount,
  } = UseData();

  const {setLoading} = useLoading();
  const {setIsWorkoutTimerRunning, workoutTime} = useWorkoutTimer();

  const [completeOnDemandWorkout] = useMutation(CompleteOnDemandWorkout);
  const [completeWorkout] = useMutation(CompleteWorkout);
  const [startOnDemandWorkout] = useMutation(StartOnDemandWorkout);
  const [addWeight] = useMutation(AddExerciseWeight);

  const [selectedIntensity, setSelectedIntensity] = useState(10);
  const [selectedEmoji, setSelectedEmoji] = useState();

  const [stats, setStats] = useState({});

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={WorkoutDict.WorkoutComplete} />,
    });

    setIsWorkoutTimerRunning(false);
  }, []);

  useBackHandler(() => {
    return true;
  });

  useEffect(() => {
    const duration = workoutTime ? Math.ceil(workoutTime / 1000 / 60) : 0;

    let reps = 0;
    let sets = 0;
    let seconds = 0;

    selectedWorkout.exercises.map((exercise) => {
      sets += exercise.sets.length;
      exercise.sets.map((set) => {
        switch (exercise.setType) {
          case 'REPS': {
            reps += set.quantity;
            break;
          }
          case ('TIME', 'SECS'): {
            seconds += set.quantity;
            break;
          }
        }
      });
    });

    const {overviewImage} = selectedWorkout;

    setStats({
      duration,
      reps,
      sets,
      overviewImage,
      seconds,
    });
  }, [selectedWorkout]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    scroll: {
      flex: 1,
    },
    imageContainer: {
      height: getHeight(337),
      width: '100%',
      position: 'absolute',
      top: 0,
    },
    image: {
      height: getHeight(337),
      position: 'absolute',
      width: '100%',
      resizeMode: 'cover',
    },
    fadeContainer: {
      height: getHeight(337),
      position: 'absolute',
      width: '100%',
    },
    iconContainer: {
      position: 'absolute',
      top: getHeight(300),
    },
    contentContainer: {
      width: '90%',
      alignSelf: 'center',
      marginTop: getHeight(345),
    },
    question: {
      ...textStyles.regular15_brownishGrey100,
      marginTop: getHeight(20),
      textAlign: 'left',
    },
    sliderContainer: {
      marginTop: getHeight(4),
      marginBottom: getHeight(18),
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: getHeight(30),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function submitWorkout() {
    if (!selectedEmoji) {
      return;
    }
    setLoading(true);

    let intensity = Math.ceil(selectedIntensity);
    if (intensity === 0) intensity = 1;

    const workoutComplete = {
      workoutId: selectedWorkout.id,
      date: new Date().toISOString(),
      intensity: intensity,
      emoji: selectedEmoji,
      timeTaken: stats.duration,
      weightsUsed: weightsToUpload,
    };

    let firebaseEventPayload = {
      workoutId: selectedWorkout.id,
      workoutName: selectedWorkout.name,
    };

    if (isSelectedWorkoutOnDemand) {
      firebaseEventPayload = {
        ...firebaseEventPayload,
        onDemand: true,
      };
    }

    // Handle offline programme workout
    if (!isConnected && !isInternetReachable && !isSelectedWorkoutOnDemand) {
      handleOffline(workoutComplete, firebaseEventPayload);
      return;
    }

    if (isSelectedWorkoutOnDemand && shouldIncrementOnDemandWorkoutCount) {
      startOnDemandWorkout({
        variables: {
          input: {
            workoutId: selectedWorkout.id,
          },
        },
      })
        .then(async (res) => {
          console.log('startOnDemandWorkout: ', res);
        })
        .catch((err) => {
          console.log(err, '<---start on demand workout error');
        });
    } else {
      setShouldIncrementOnDemandWorkoutCount(true);
    }

    const completeMutation = isSelectedWorkoutOnDemand
      ? completeOnDemandWorkout
      : completeWorkout;

    completeMutation({
      variables: {
        input: {
          ...workoutComplete,
        },
      },
    })
      .then(async (res) => {
        const success = R.path(
          [
            'data',
            isSelectedWorkoutOnDemand
              ? 'completeOnDemandWorkout'
              : 'completeWorkout',
          ],
          res,
        );

        if (success) {
          firebaseLogEvent(
            analyticsEvents.completedWorkout,
            firebaseEventPayload,
          );

          if (isSelectedWorkoutOnDemand) {
            setIsSelectedWorkoutOnDemand(false);
          }

          completeWorkoutDone();
        } else {
          console.log(res, '<---workout complete error');
          handleOffline(workoutComplete, firebaseEventPayload);
        }
      })
      .catch((err) => {
        console.log(err, '<---workout complete error');
        handleOffline(workoutComplete, firebaseEventPayload);
      });
  }

  async function handleOffline(workoutComplete, firebaseEventPayload) {
    await OfflineUtils.completeWorkout(workoutComplete, firebaseEventPayload);
    completeWorkoutDone();
  }

  async function completeWorkoutDone() {
    setWeightsToUpload([]);
    await getProgramme();
    await getProfile();

    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'TabContainer'}],
    });
  }

  function checkGoBack() {
    displayAlert({
      title: null,
      text: WorkoutDict.WorkoutGoBackWarning,
      buttons: [
        {
          text: ProfileDict.Cancel,
          style: 'cancel',
        },
        {
          text: ProfileDict.Ok,
          onPress: async () => {
            setWeightsToUpload([]);
            navigation.navigate('WorkoutHome');
          },
        },
      ],
    });
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.imageContainer}>
          <FastImage
            source={
              stats.overviewImage === undefined
                ? require('../../../assets/fakeWorkout.png')
                : {uri: stats.overviewImage}
            }
            fallback={true}
            style={styles.image}
          />
          <View style={styles.fadeContainer}>
            <FadingBottomView height={337} color="black" />
          </View>
          <View style={styles.iconContainer}>
            <IconTextView
              type="workoutComplete"
              duration={stats.duration}
              reps={stats.reps}
              sets={stats.sets}
              color="white"
              alignLeft={true}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.question}>{WorkoutDict.HowIntense}</Text>
          <View
            style={{
              ...styles.sliderContainer,
            }}>
            <SliderProgressView
              slider={true}
              min={0}
              max={20}
              progress={selectedIntensity}
              setProgress={setSelectedIntensity}
              height={getHeight(4)}
              containerStyle={{
                height: getHeight(42),
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              rounded={true}
            />
          </View>
          <EmojiSelection
            selectedEmoji={selectedEmoji}
            setSelectedEmoji={setSelectedEmoji}
          />
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="done"
            variant="white"
            icon="chevron"
            onPress={submitWorkout}
            disabled={selectedEmoji ? false : true}
          />
        </View>
        <Spacer height={50} />
      </ScrollView>
    </View>
  );
}
