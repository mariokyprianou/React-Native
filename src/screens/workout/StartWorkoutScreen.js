/*
 * Created Date: Mon, 9th Nov 2020, 10:02:36 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import WorkoutImageView from '../../components/Views/WorkoutImageView';
import ExerciseCell from '../../components/cells/ExerciseCell';
import DefaultButton from '../../components/Buttons/DefaultButton';
import FadingBottomView from '../../components/Views/FadingBottomView';
import useData from '../../hooks/data/UseData';

export default function StartWorkoutScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {selectedWorkout, getDownloadEnabled} = useData();

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
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingBottom: getHeight(40),
      alignItems: 'center',
      backgroundColor: colors.white100,
    },
    fadeContainer: {
      position: 'absolute',
      bottom: getHeight(70),
      left: 0,
      right: 0,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **

  const ExerciseList = React.memo(({exercises}) => {
    return (
      <View style={{paddingBottom: getHeight(150)}}>
        {exercises.map((item, index) => (
          <ExerciseCell {...item} index={index + 1} total={exercises.length} />
        ))}
      </View>
    );
  });

  return (
    <View>
      <View style={styles.headerBorder} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewContainer}>
        <WorkoutImageView {...topViewProps} />
        <ExerciseList exercises={selectedWorkout.exercises} />
      </ScrollView>
      <View style={styles.fadeContainer}>
        <FadingBottomView height={80} />
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="startWorkout"
          variant="gradient"
          icon="chevron"
          onPress={() => navigation.navigate('Workout')}
        />
      </View>
    </View>
  );
}
