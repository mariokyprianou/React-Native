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
import ModalCard from '../../components/Modals/ModalCard';
import WeightCaptureModal from '../../components/Modals/WeightCaptureModal';
import NotesModal from '../../components/Modals/NotesModal';
import WeekCompleteModal from '../../components/Modals/WeekComplete';
import {TransitionPresets} from '@react-navigation/stack';

export default function WorkoutScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const [showWeightCaptureModal, setShowWeightCaptureModal] = useState(false);
  const [showWeekCompleteModal, setShowWeekCompleteModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(true);
  const navigation = useNavigation();

  const {workout} = useWorkoutData();

  navigation.setOptions({
    header: () => <WorkoutHeader currentExercise={4} totalExercises={12} />,
    ...TransitionPresets.ModalSlideFromBottomIOS,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    scrollViewContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={20} //how often we update the position of the indicator bar
        pagingEnabled
        bounces={false}
        overScrollMode={'never'}
        style={styles.scrollViewContainer}>
        {workout.exercises.map((screen, index) => (
          <ExerciseView
            onPressWeights={() => setShowWeightCaptureModal(true)}
            onPressNotes={() => setShowNotesModal(true)}
          />
        ))}
      </ScrollView>
      <ModalCard isVisible={showWeightCaptureModal}>
        <WeightCaptureModal
          onPressClose={() => setShowWeightCaptureModal(false)}
          navigation={navigation}
        />
      </ModalCard>
      <ModalCard isVisible={showNotesModal}>
        <NotesModal onPressClose={() => setShowNotesModal(false)} />
      </ModalCard>
      <ModalCard isVisible={showWeekCompleteModal}>
        <WeekCompleteModal
          onPressClose={() => setShowWeekCompleteModal(false)}
          totalDuration={30}
          totalReps={100}
          totalSets={50}
        />
      </ModalCard>
    </View>
  );
}
