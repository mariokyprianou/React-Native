/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 08:12:16 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {View, Text} from 'react-native';
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

export default function NotesScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles, cellFormConfig, cellFormStyles} = useTheme();
  const {cleanValues, getValues} = FormHook();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const [addNote] = useMutation(UpdateExerciseNote);
  const [formHeight, setFormHeight] = useState(100);
  let newStyle = {formHeight};
  const navigation = useNavigation();
  const {
    params: {notes, id},
  } = useRoute();

  const description =
    'Start the timer and see how many 4kg squats you can do in 60 seconds!'; // replace once backend fixed

  navigation.setOptions({
    header: () => <Header title={WorkoutDict.Notes} showModalCross />,
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
      marginBottom: getHeight(13),
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
  async function handleAddNote() {
    const newNote = getValues('notes').notes;

    await addNote({
      variables: {
        input: {
          note: newNote,
          exercise: id,
        },
      },
    })
      .then((res) => {
        console.log(res, '<---notes res');
        cleanValues();
        navigation.goBack();
      })
      .catch((err) => console.log(err, '<---error on adding note'));
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  const cells = [
    {
      name: 'notes',
      type: 'text',
      multiline: true,
      onContentSizeChange: (e) =>
        setFormHeight(e.nativeEvent.contentSize.height),
      placeholder: '',
      ...cellFormStyles,
      inputContainerStyle: {
        height: [newStyle][formHeight],
        paddingBottom: getHeight(5),
      },
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
          {notes &&
            notes.map((note) => <Text style={styles.notes}>{note}</Text>)}
          <Spacer height={30} />
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
