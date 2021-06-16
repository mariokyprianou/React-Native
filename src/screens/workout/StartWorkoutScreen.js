/*
 * Created Date: Mon, 9th Nov 2020, 10:02:36 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import Header from '../../components/Headers/Header';
import WorkoutImageView from '../../components/Views/WorkoutImageView';
import ExerciseCell from '../../components/cells/ExerciseCell';
import DefaultButton from '../../components/Buttons/DefaultButton';
import FadingBottomView from '../../components/Views/FadingBottomView';
import useData from '../../hooks/data/UseData';
import useUserData from '../../hooks/data/useUserData';
import useWorkoutTimer from '../../hooks/timer/useWorkoutTimer';
import displayAlert from '../../utils/DisplayAlert';

export default function StartWorkoutScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {
    selectedWorkout,
    getDownloadEnabled,
    setCurrentExerciseIndex,
    setCompletedExercises,
    isSelectedWorkoutOnDemand,
  } = useData();

  const {dictionary} = useDictionary();
  const {WorkoutDict, ProfileDict} = dictionary;

  const {firebaseLogEvent, analyticsEvents} = useUserData();
  const {
    setWorkoutTime,
    setIsWorkoutTimerRunning,
    setActiveWorkout,
  } = useWorkoutTimer();

  const [topViewProps, setTopViewProps] = useState({});

  useEffect(() => {
    getDownloadEnabled();

    const {overviewImage, duration, intensity} = selectedWorkout;

    let workoutTopViewProps = {
      duration: duration,
      intensity: intensity,
      reps: null,
      sets: null,
    };

    if (overviewImage) {
      workoutTopViewProps = {
        ...workoutTopViewProps,
        image: overviewImage,
      };
    }

    setTopViewProps(workoutTopViewProps);
  }, []);

  navigation.setOptions({
    header: () => <Header title={selectedWorkout.name} goBack />,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    headerBorder: {
      width: '100%',
      height: getHeight(2),
      backgroundColor: colors.offWhite100,
    },
    scrollViewContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: colors.white100,
    },
    fadeContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **

  const ExerciseList = React.memo(({exercises}) => {
    return (
      <View style={{paddingBottom: getHeight(20)}}>
        {exercises.map((item, index) => (
          <ExerciseCell {...item} index={index + 1} total={exercises.length} />
        ))}
      </View>
    );
  });

  async function startWorkout() {
    if (isSelectedWorkoutOnDemand === true) {
      const response = await NetInfo.fetch();
      if (!response.isConnected) {
        displayAlert({
          title: null,
          text: WorkoutDict.OnDemandInternet,
          buttons: [
            {
              text: ProfileDict.Ok,
              style: 'cancel',
            },
          ],
        });

        return;
      }
    }

    setCurrentExerciseIndex(0);
    setWorkoutTime(0);
    setIsWorkoutTimerRunning(true);
    setCompletedExercises([]);

    firebaseLogEvent(analyticsEvents.startedWorkout, {
      workoutId: selectedWorkout.id,
      workoutName: selectedWorkout.name,
    });

    setActiveWorkout(true);
    navigation.navigate('Workout');
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setActiveWorkout(false);
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.headerBorder} />
      <View style={{flex: 1}}>
        <View style={{flex: 0.85}}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.scrollViewContainer}>
            <WorkoutImageView {...topViewProps} />
            <ExerciseList exercises={selectedWorkout.exercises} />
          </ScrollView>
          <View style={styles.fadeContainer} pointerEvents="none">
            <FadingBottomView height={80} />
          </View>
        </View>
        <View style={{flex: 0.15, ...styles.buttonContainer}}>
          <DefaultButton
            type="startWorkout"
            variant="gradient"
            icon="chevron"
            onPress={() => startWorkout()}
          />
        </View>
      </View>
    </>
  );
}
