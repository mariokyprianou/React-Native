/*
 * Created Date: Mon, 9th Nov 2020, 10:02:36 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import WorkoutImageView from '../../components/Views/WorkoutImageView';
import ExerciseCell from '../../components/cells/ExerciseCell';
import DefaultButton from '../../components/Buttons/DefaultButton';
import FadingBottomView from '../../components/Views/FadingBottomView';
import useWorkoutData from '../../hooks/data/useWorkoutData';

export default function StartWorkoutScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {workout} = useWorkoutData();
  const navigation = useNavigation();
  const {colors} = useTheme();

  navigation.setOptions({
    header: () => <Header title={'Workout Name'} goBack />,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    scrollViewContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      marginBottom: getHeight(40),
      alignItems: 'center',
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
      <View style={{paddingBottom: getHeight(150)}}>
        {exercises.map((departure, index) => (
          <ExerciseCell key={index} item={departure} />
        ))}
      </View>
    );
  });

  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewContainer}>
        <WorkoutImageView />
        <ExerciseList exercises={[{}, {}, {}, {}]} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="startWorkout"
          variant="gradient"
          icon="chevron"
          onPress={() => navigation.navigate('Workout')}
        />
      </View>
      <View style={styles.fadeContainer}>
        <FadingBottomView />
      </View>
    </View>
  );
}
