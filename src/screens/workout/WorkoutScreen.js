/*
 * Created Date: Mon, 9th Nov 2020, 15:34:35 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState, useRef, useCallback} from 'react';
import {StyleSheet, View, ScrollView, Text, Platform} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import {useBackHandler} from '@react-native-community/hooks';
import {useTimer} from 'the-core-ui-module-tdcountdown';
import {useMutation} from '@apollo/client';

import useTheme from '../../hooks/theme/UseTheme';
import WorkoutHeader from '../../components/Headers/WorkoutHeader';
import ExerciseView from '../../components/Views/ExerciseView';
import ExerciseVideoView from '../../components/Views/ExerciseVideoView';
import FadingBottomView from '../../components/Views/FadingBottomView';
import useData from '../../hooks/data/UseData';
import useDictionary from '../../hooks/localisation/useDictionary';
import useUserData from '../../hooks/data/useUserData';
import displayAlert from '../../utils/DisplayAlert';
import StartOnDemandWorkout from '../../apollo/mutations/StartOnDemandWorkout';

export default function WorkoutScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {colors, exerciseViewStyle, Constants} = useTheme();
  const navigation = useNavigation();
  const {getHeight} = ScaleHook();
  const {dictionary} = useDictionary();
  const {WorkoutDict, ProfileDict} = dictionary;

  const {
    selectedWorkout,
    currentExerciseIndex,
    setCurrentExerciseIndex,
    completedExercises,
    setCompletedExercises,
    setWeightsToUpload,
    isSelectedWorkoutOnDemand,
    completedFreeWorkouts,
    setShouldIncrementOnDemandWorkoutCount,
    getProgramme,
    refetchOnDemandWorkouts,
  } = useData();
  const {
    firebaseLogEvent,
    analyticsEvents,
    suspendedAccount,
    isSubscriptionActive,
    getProfile,
  } = useUserData();

  const {getPreferences, preferences} = useUserData();

  const [enableScroll, setEnableScroll] = useState(true);

  const [showPreviewOfNextVideo, setShowPreviewOfNextVideo] = useState(false);
  const [exerciseToPreview, setExerciseToPreview] = useState(null);

  const [weightLabel, setWeightLabel] = useState('kg');

  const scrollRef = useRef();

  /*  NOT NEEDED ANYMORE

  const [startOnDemandWorkout] = useMutation(StartOnDemandWorkout);

  const [timerCount, setTimer] = useState(120);

  const checkStartTimer = useCallback(() => {
    if (isSelectedWorkoutOnDemand && !isSubscriptionActive) {
      let interval = setInterval(() => {
        setTimer((lastTimerCount) => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSelectedWorkoutOnDemand, isSubscriptionActive]);

  useEffect(() => {
    if (timerCount === 0) {
      startOnDemandWorkout({
        variables: {
          input: {
            workoutId: selectedWorkout.id,
          },
        },
      })
        .then(async (res) => {
          console.log('startOnDemandWorkout: ', res);
          setShouldIncrementOnDemandWorkoutCount(false);
          await getProfile();
        })
        .catch((err) => {
          console.log(err, '<---change device permissions error');
        });
    }
  }, [getProfile, selectedWorkout?.id, setShouldIncrementOnDemandWorkoutCount]);
   
  NOT NEEDED ANYMORE */

  useEffect(() => {
    getPreferences();
    //checkStartTimer();
  }, [getPreferences]);

  // Set weight preference
  useEffect(() => {
    if (preferences && preferences.weightPreference) {
      const weightPreference = preferences.weightPreference.toLowerCase();
      setWeightLabel(weightPreference);
    }
  }, [preferences]);

  useEffect(() => {
    if (
      showPreviewOfNextVideo === true &&
      currentExerciseIndex < selectedWorkout.exercises.length - 1
    ) {
      setExerciseToPreview(
        selectedWorkout.exercises[currentExerciseIndex + 1].exercise,
      );
    } else {
      setExerciseToPreview(null);
    }
  }, [
    currentExerciseIndex,
    selectedWorkout?.exercises,
    showPreviewOfNextVideo,
  ]);

  navigation.setOptions({
    header: () => (
      <WorkoutHeader
        currentExercise={currentExerciseIndex + 1}
        totalExercises={selectedWorkout.exercises.length}
        rightAction={checkGoBack}
      />
    ),
  });

  useBackHandler(() => {
    checkGoBack();
    return true;
  });

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
          onPress: () => {
            getProgramme();
            refetchOnDemandWorkouts();

            setWeightsToUpload([]);
            navigation.pop();
          },
        },
      ],
    });
  }

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    scrollViewContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    headerBorder: {
      width: '100%',
      height: getHeight(2),
      backgroundColor: colors.offWhite100,
    },
    previewContainer: {
      position: 'absolute',
      width: '100%',
    },
    upNextOverlay: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const handleIndex = useCallback(
    (newOffset) => {
      const newIndex = Math.round(newOffset / Constants.EXERCISE_VIEW_HEIGHT);

      if (newIndex > currentExerciseIndex) {
        const exerciseCompleted =
          selectedWorkout.exercises[currentExerciseIndex];
        const exerciseStarted = selectedWorkout.exercises[newIndex];

        if (selectedWorkout && exerciseCompleted) {
          firebaseLogEvent(analyticsEvents.completedExercise, {
            workoutId: selectedWorkout.id,
            workoutName: selectedWorkout.name,
            exerciseId: exerciseCompleted.id,
            exerciseName: exerciseCompleted.name,
          });
        }

        if (selectedWorkout && exerciseStarted) {
          firebaseLogEvent(analyticsEvents.startedExercise, {
            workoutId: selectedWorkout.id,
            workoutName: selectedWorkout.name,
            exerciseId: exerciseStarted.id,
            exerciseName: exerciseStarted.name,
          });
        }
      }

      setCurrentExerciseIndex(newIndex);
    },
    [
      Constants.EXERCISE_VIEW_HEIGHT,
      analyticsEvents.completedExercise,
      analyticsEvents.startedExercise,
      currentExerciseIndex,
      firebaseLogEvent,
      selectedWorkout,
      setCurrentExerciseIndex,
    ],
  );

  const workoutFinished = useCallback(() => {
    //etIsWorkoutTimerRunning(false);

    navigation.navigate('WorkoutComplete');
  }, [navigation]);

  useEffect(() => {
    console.log('completedExercises changed', completedExercises);
    if (completedExercises.length === selectedWorkout.exercises.length) {
      workoutFinished();
    }
  }, [completedExercises, selectedWorkout?.exercises?.length, workoutFinished]);

  const exerciseFinished = useCallback(() => {
    console.log('WorkoutScreen - exerciseFinished');
    // check if specific exercise was already completed
    let index = completedExercises.indexOf(currentExerciseIndex);

    // if not add it
    if (index === -1) {
      setCompletedExercises((prev) => [...prev, currentExerciseIndex]);
    }

    if (selectedWorkout.isContinuous) {
      const newOffset =
        (currentExerciseIndex + 1) * Constants.EXERCISE_VIEW_HEIGHT;
      scrollRef.current?.scrollTo({y: newOffset, animated: true});

      if (Platform.OS === 'android') {
        handleIndex(newOffset);
      }
    }

    setShowPreviewOfNextVideo(false);
  }, [
    Constants.EXERCISE_VIEW_HEIGHT,
    completedExercises,
    currentExerciseIndex,
    handleIndex,
    selectedWorkout?.isContinuous,
    setCompletedExercises,
  ]);

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.headerBorder} />
      <ScrollView
        scrollEnabled={enableScroll}
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={20} //how often we update the position of the indicator bar
        pagingEnabled
        bounces={false}
        overScrollMode={'never'}
        style={styles.scrollViewContainer}
        onMomentumScrollEnd={(event) => {
          handleIndex(event.nativeEvent.contentOffset.y);
        }}>
        {React.useMemo(() => {
          return (
            <>
              {selectedWorkout.exercises.map((screen, index) => (
                <ExerciseView
                  {...screen}
                  index={index}
                  exerciseFinished={exerciseFinished}
                  setEnableScroll={setEnableScroll}
                  setShowPreviewOfNextVideo={setShowPreviewOfNextVideo}
                  weightLabel={weightLabel}
                  isContinuous={selectedWorkout.isContinuous}
                  isLastExercise={
                    index === selectedWorkout.exercises.length - 1
                  }
                />
              ))}
            </>
          );
        }, [
          exerciseFinished,
          selectedWorkout.exercises,
          selectedWorkout.isContinuous,
          weightLabel,
        ])}
      </ScrollView>

      {exerciseToPreview &&
        showPreviewOfNextVideo === true &&
        selectedWorkout.isContinuous === true && (
          <View style={styles.previewContainer}>
            <View style={styles.headerBorder} />
            <ExerciseVideoView
              {...exerciseToPreview}
              index={currentExerciseIndex + 1}
              setType={exerciseToPreview.setType}
              isContinuous={selectedWorkout.isContinuous}
              isPreview={true}
              showUpNext={
                <>
                  <View style={styles.upNextOverlay}>
                    <FadingBottomView color="black" height={180} />
                  </View>
                  <Text style={exerciseViewStyle.timerUpNextTextStyle}>
                    {WorkoutDict.UpNext}
                  </Text>
                </>
              }
            />
          </View>
        )}
    </View>
  );
}
