/*
 * Created Date: Mon, 9th Nov 2020, 10:02:36 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import Header from '../../components/Headers/Header';
import WorkoutImageView from '../../components/Views/WorkoutImageView';
import ExerciseCell from '../../components/cells/ExerciseCell';
import DefaultButton from '../../components/Buttons/DefaultButton';
import FadingBottomView from '../../components/Views/FadingBottomView';
import useWorkoutData from '../../hooks/data/useWorkoutData';
import ModalCard from '../../components/Modals/ModalCard';
import WeightCaptureModal from '../../components/Modals/WeightCaptureModal';
import NotesModal from '../../components/Modals/NotesModal';
import WeekCompleteModal from '../../components/Modals/WeekComplete';

export default function Screen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {workout} = useWorkoutData();
  const [showWeightCaptureModal, setShowWeightCaptureModal] = useState(false);
  const [showWeekCompleteModal, setShowWeekCompleteModal] = useState(true);
  const [showNotesModal, setShowNotesModal] = useState(false);

  navigation.setOptions({
    header: () => <Header title={'Workout Name'} goBack />,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    scrollViewContainer: {
      height: '100%',
      width: '100%',
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
  function handleCloseWeightCaptureModal() {
    setShowWeightCaptureModal(false);
  }

  function handleCloseNotesModal() {
    setShowNotesModal(false);
  }

  function handleCloseWeekCompleteModal() {
    setShowWeekCompleteModal(false);
  }

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
        <DefaultButton type="startWorkout" variant="gradient" icon="chevron" />
      </View>
      <View style={styles.fadeContainer}>
        <FadingBottomView />
      </View>
      <ModalCard isVisible={showWeightCaptureModal}>
        <WeightCaptureModal
          onPressClose={handleCloseWeightCaptureModal}
          navigation={navigation}
        />
      </ModalCard>
      <ModalCard isVisible={showNotesModal}>
        <NotesModal onPressClose={handleCloseNotesModal} />
      </ModalCard>
      <ModalCard isVisible={showWeekCompleteModal}>
        <WeekCompleteModal
          onPressClose={handleCloseWeekCompleteModal}
          totalDuration={30}
          totalReps={100}
          totalSets={50}
        />
      </ModalCard>
    </View>
  );
}
