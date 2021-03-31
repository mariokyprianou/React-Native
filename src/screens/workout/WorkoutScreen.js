/*
 * Created Date: Mon, 9th Nov 2020, 15:34:35 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Alert} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import WorkoutHeader from '../../components/Headers/WorkoutHeader';
import ExerciseView from '../../components/Views/ExerciseView';
import useData from '../../hooks/data/UseData';
import useDictionary from '../../hooks/localisation/useDictionary';

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
    setIsWorkoutTimerRunning,
    completedExercises,
    setCompletedExercises,
  } = useData();

  const [enableScroll, setEnableScroll] = useState(true);

  navigation.setOptions({
    header: () => (
      <WorkoutHeader
        currentExercise={currentExerciseIndex + 1}
        totalExercises={selectedWorkout.exercises.length}
        rightAction={checkGoBack}
      />
    ),
  });

  function checkGoBack() {
    Alert.alert(WorkoutDict.WorkoutGoBackWarning, '', [
      {
        text: ProfileDict.Cancel,
        style: 'cancel',
      },
      {
        text: ProfileDict.Ok,
        onPress: () => {
          navigation.pop();
        },
      },
    ]);
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
    setCurrentExerciseIndex(Math.round(newOffset / Constants.EXERCISE_VIEW_HEIGHT));
  }

  function workoutFinished() {
    setIsWorkoutTimerRunning(false);
    navigation.navigate('WorkoutComplete');
  }

  useEffect(() => {
    console.log('completedExercises changed', completedExercises);
    if (completedExercises.length === selectedWorkout.exercises.length) {
      workoutFinished();
    }
  }, [completedExercises]);

  function exerciseFinished() {
    // check if specific exercise was already completed
    let index = completedExercises.indexOf(currentExerciseIndex);

    // if not add it
    if (index === -1) {
      setCompletedExercises((prev) => [...prev, currentExerciseIndex]);
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.headerBorder} />
      <ScrollView
        scrollEnabled={enableScroll}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={20} //how often we update the position of the indicator bar
        pagingEnabled
        bounces={false}
        overScrollMode={'never'}
        style={styles.scrollViewContainer}
        onMomentumScrollEnd={(event) =>
          handleIndex(event.nativeEvent.contentOffset.y)
        }>
        {selectedWorkout.exercises.map((screen, index) => (
          <ExerciseView
            {...screen}
            index={index}
            exerciseFinished={exerciseFinished}
            setEnableScroll={setEnableScroll}
          />
        ))}
      </ScrollView>
    </View>
  );
}
