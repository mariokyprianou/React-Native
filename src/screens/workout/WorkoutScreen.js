/*
 * Created Date: Mon, 9th Nov 2020, 15:34:35 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import {useBackHandler} from '@react-native-community/hooks';
import {useTimer} from 'the-core-ui-module-tdcountdown';
import {useMutation} from '@apollo/client';

import useTheme from '../../hooks/theme/UseTheme';
import WorkoutHeader from '../../components/Headers/WorkoutHeader';
import ExerciseView from '../../components/Views/ExerciseView';
import useData from '../../hooks/data/UseData';
import useDictionary from '../../hooks/localisation/useDictionary';
import useUserData from '../../hooks/data/useUserData';
import displayAlert from '../../utils/DisplayAlert';
import StartOnDemandWorkout from '../../apollo/mutations/StartOnDemandWorkout';

export default function WorkoutScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {colors, Constants} = useTheme();
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
  } = useData();
  const {
    firebaseLogEvent,
    analyticsEvents,
    suspendedAccount,
    isSubscriptionActive,
  } = useUserData();

  const {getPreferences, preferences} = useUserData();

  const [enableScroll, setEnableScroll] = useState(true);

  const [weightLabel, setWeightLabel] = useState('kg');

  const {remainingMS, toggle, reset, restart} = useTimer({
    timer: '03:00',
  });

  const scrollRef = useRef();

  const [startOnDemandWorkout] = useMutation(StartOnDemandWorkout);

  useEffect(() => {
    getPreferences();
    reset();
    toggle();
  }, []);

  useEffect(() => {
    if (!isSelectedWorkoutOnDemand) {
      reset();
      return;
    }

    if (isSubscriptionActive) {
      reset();
      return;
    }

    if (remainingMS === 0) {
      startOnDemandWorkout({
        variables: {
          input: {
            workoutId: selectedWorkout.id,
          },
        },
      })
        .then(async (res) => {
          console.log('RES', res);
        })
        .catch((err) => {
          console.log(err, '<---change device permissions error');
        });
    }
  }, [remainingMS]);

  // Set weight preference
  useEffect(() => {
    if (preferences && preferences.weightPreference) {
      const weightPreference = preferences.weightPreference.toLowerCase();
      setWeightLabel(weightPreference);
    }
  }, [preferences]);

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
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleIndex(newOffset) {
    const newIndex = Math.round(newOffset / Constants.EXERCISE_VIEW_HEIGHT);

    if (newIndex > currentExerciseIndex) {
      const exerciseCompleted = selectedWorkout.exercises[currentExerciseIndex];
      const exerciseStarted = selectedWorkout.exercises[newIndex];

      firebaseLogEvent(analyticsEvents.completedExercise, {
        workoutId: selectedWorkout.id,
        workoutName: selectedWorkout.name,
        exerciseId: exerciseCompleted.id,
        exerciseName: exerciseCompleted.name,
      });
      firebaseLogEvent(analyticsEvents.startedExercise, {
        workoutId: selectedWorkout.id,
        workoutName: selectedWorkout.name,
        exerciseId: exerciseStarted.id,
        exerciseName: exerciseStarted.name,
      });
    }

    setCurrentExerciseIndex(newIndex);
  }

  function workoutFinished() {
    //etIsWorkoutTimerRunning(false);
    navigation.navigate('WorkoutComplete');
  }

  useEffect(() => {
    console.log('completedExercises changed', completedExercises);
    if (completedExercises.length === selectedWorkout.exercises.length) {
      workoutFinished();
    }
  }, [completedExercises]);

  function exerciseFinished() {
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
  }

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
        {selectedWorkout.exercises.map((screen, index) => (
          <ExerciseView
            {...screen}
            index={index}
            exerciseFinished={exerciseFinished}
            setEnableScroll={setEnableScroll}
            weightLabel={weightLabel}
            isContinuous={selectedWorkout.isContinuous}
            isLastExercise={index === selectedWorkout.exercises.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
}
