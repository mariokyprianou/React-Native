/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 08:12:16 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import Spacer from '../../components/Utility/Spacer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useRoute} from '@react-navigation/core';
import {useMutation} from '@apollo/client';
import UpdateExerciseNote from '../../apollo/mutations/UpdateExerciseNote';
import useData from '../../hooks/data/UseData';
import {useBackHandler} from '@react-native-community/hooks';

export default function NotesScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles, cellFormConfig, cellFormStyles} = useTheme();
  const {cleanValues, getValues, cleanValueByName} = FormHook();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const [addNote] = useMutation(UpdateExerciseNote);
  const [formHeight, setFormHeight] = useState(100);
  let newStyle = {formHeight};
  const navigation = useNavigation();
  const {
    params: {id, description},
  } = useRoute();
  const {
    selectedWorkout,
    currentExerciseIndex,
    setSelectedWorkout,
    setIsSelectedWorkoutOnDemand,
    isSelectedWorkoutOnDemand,
    onDemandWorkouts,
    setOnDemandWorkouts,
    programme,
    processProgramme,
  } = useData();
  const [savedNotes, setSavedNotes] = useState('');

  useEffect(() => {
    setSavedNotes(selectedWorkout.exercises[currentExerciseIndex].notes);
  }, [selectedWorkout, currentExerciseIndex]);

  useBackHandler(() => {
    navigation.goBack();
    return true;
  });

  navigation.setOptions({
    header: () => (
      <Header
        title={WorkoutDict.Notes}
        right="crossIcon"
        rightAction={handleGoBack}
      />
    ),
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgroundWhite100,
      flexDirection: 'column',
    },
    contentContainer: {
      width: '90%',
      height: '100%',
      alignSelf: 'center',
      paddingTop: getHeight(20),
    },
    description: {
      ...textStyles.regular15_brownishGrey100,
      textAlign: 'left',
    },
    notes: {
      ...textStyles.regular15_brownishGrey100,
      textAlign: 'left',
      marginBottom: getHeight(10),
    },
    subtitle: {
      ...textStyles.medium14_black100,
      marginTop: getHeight(30),
      textAlign: 'left',
    },
    buttonContainer: {
      height: getHeight(90),
      width: '100%',
      alignItems: 'center',
      justifySelf: 'flex-end',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleGoBack() {
    cleanValueByName('notes');
    navigation.goBack();
  }

  async function handleAddNote() {
    navigation.goBack();

    const newNote = getValues('notes').notes;

    // Escape if notes weren't edited
    if (!newNote) {
      return;
    }

    let workout = {...selectedWorkout};
    workout.exercises[currentExerciseIndex] = {
      ...workout.exercises[currentExerciseIndex],
      notes: newNote,
    };

    setSelectedWorkout(workout);

    // cleanValueByName('notes');

    await addNote({
      variables: {
        input: {
          note: newNote,
          exercise: id,
        },
      },
    })
      .then((res) => {
        console.log('Notes updated', res);
      })
      .catch((err) => {
        console.log(err, '<---error on adding note');
      });
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  const cells = [
    {
      name: 'notes',
      type: 'text',
      maxHeight: getHeight(120),
      multiline: true,
      onContentSizeChange: (e) =>
        setFormHeight(e.nativeEvent.contentSize.height),
      defaultValue: savedNotes,
      ...cellFormStyles,
      inputContainerStyle: {
        height: [newStyle][formHeight],
        paddingBottom: getHeight(5),
      },
      returnKeyType: 'default',
    },
  ];

  const config = {
    ...cellFormConfig,
  };

  return (
    <View style={styles.card}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.contentContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.subtitle}>{WorkoutDict.YourNotes}</Text>
          <Form cells={cells} config={config} />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="done"
          variant="white"
          icon="chevron"
          onPress={handleAddNote}
        />
      </View>
    </View>
  );
}
