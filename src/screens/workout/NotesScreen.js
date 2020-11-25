/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 08:12:16 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import useChallenge from '../../hooks/data/useChallenge';
import Header from '../../components/Headers/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import Spacer from '../../components/Utility/Spacer';

export default function NotesScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles, cellFormConfig, cellFormStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();
  const {
    challengeData: {description, notes},
  } = useChallenge();

  navigation.setOptions({
    header: () => <Header title={WorkoutDict.Notes} showModalCross />,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    contentContainer: {
      width: '90%',
      alignSelf: 'center',
      paddingTop: getHeight(20),
    },
    description: {
      ...textStyles.regular15_brownishGrey100,
      textAlign: 'left',
    },
    subtitle: {
      ...textStyles.medium14_black100,
      marginTop: getHeight(30),
      marginBottom: getHeight(13),
      textAlign: 'left',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: getHeight(40),
      width: '100%',
      alignItems: 'center',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  const cells = [
    {
      name: 'notes',
      type: 'text',
      placeholder: '',
      ...cellFormStyles,
    },
  ];

  const config = {
    ...cellFormConfig,
  };

  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.subtitle}>{WorkoutDict.YourNotes}</Text>
        <Text style={styles.description}>{notes}</Text>
        <Spacer height={70} />
        <Form cells={cells} config={config} />
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton type="done" variant="white" icon="chevron" />
      </View>
    </View>
  );
}
