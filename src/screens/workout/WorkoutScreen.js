/*
 * Created Date: Mon, 9th Nov 2020, 15:34:35 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import Header from '../../components/Headers/Header';
import ExerciseVideoView from '../../components/Views/ExerciseVideoView';
import ExerciseCell from '../../components/cells/ExerciseCell';
import RepCell from '../../components/cells/RepCell';
import DefaultButton from '../../components/Buttons/DefaultButton';
import FadingBottomView from '../../components/Views/FadingBottomView';
import useWorkoutData from '../../hooks/data/useWorkoutData';

export default function Screen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const {workout} = useWorkoutData();

  navigation.setOptions({
    header: () => <Header title={'Workout Name'} goBack />,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    scrollViewContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.white100,
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

  const RepsList = React.memo(({reps}) => {
    return (
      <View style={{flexDirection: 'row', flex: 1, width: '70%'}}>
        {reps.map((index) => (
          <View style={{flex: 1 / reps.length}}>
            <RepCell key={index} />
          </View>
        ))}
      </View>
    );
  });

  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewContainer}>
        {/* <ExerciseVideoView /> */}
        <RepsList reps={[{}, {}, {}, {}]} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <DefaultButton type="startWorkout" variant="gradient" icon="chevron" />
      </View>
      <View style={styles.fadeContainer}>
        <FadingBottomView />
      </View>
    </View>
  );
}
