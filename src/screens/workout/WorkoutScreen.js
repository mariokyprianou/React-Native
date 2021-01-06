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
import useDictionary from '../../hooks/localisation/useDictionary';
import WorkoutHeader from '../../components/Headers/WorkoutHeader';
import ExerciseView from '../../components/Views/ExerciseView';
import useWorkoutData from '../../hooks/data/useWorkoutData';

export default function WorkoutScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {workout} = useWorkoutData();
  const {getHeight} = ScaleHook();

  navigation.setOptions({
    header: () => <WorkoutHeader currentExercise={4} totalExercises={12} />,
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
        style={styles.scrollViewContainer}>
        {workout.exercises.map((screen, index) => (
          <ExerciseView />
        ))}
      </ScrollView>
    </View>
  );
}
