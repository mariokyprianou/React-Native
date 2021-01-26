/*
 * Created Date: Mon, 9th Nov 2020, 15:34:35 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import WorkoutHeader from '../../components/Headers/WorkoutHeader';
import ExerciseView from '../../components/Views/ExerciseView';
import useData from '../../hooks/data/UseData';

export default function WorkoutScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {getHeight} = ScaleHook();

  const {
    selectedWorkout,
    currentExerciseIndex,
    setCurrentExerciseIndex,
    setIsWorkoutTimerRunning,
  } = useData();

  const [offset, setOffset] = useState(0);

  navigation.setOptions({
    header: () => (
      <WorkoutHeader
        currentExercise={currentExerciseIndex + 1}
        totalExercises={selectedWorkout.exercises.length}
      />
    ),
  });
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
    if (newOffset > offset) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      if (currentExerciseIndex > 0) {
        setCurrentExerciseIndex(currentExerciseIndex - 1);
      }
    }

    setOffset(newOffset);
  }

  function workoutFinished() {
    setIsWorkoutTimerRunning(false);
    navigation.navigate('WorkoutComplete');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.headerBorder} />
      <ScrollView
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
            workoutFinished={workoutFinished}
          />
        ))}
      </ScrollView>
    </View>
  );
}
