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
import useChallenge from '../../hooks/data/useChallenge';
import Header from '../Headers/Header';
import DefaultButton from '../Buttons/DefaultButton';

export default function NotesModal({onPressClose}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const {
    challengeData: {description, notes},
  } = useChallenge();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.veryLightPink100,
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
    line: {
      backgroundColor: colors.black30,
      height: getHeight(1),
      width: '100%',
      marginTop: getHeight(100),
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
  return (
    <View style={styles.card}>
      <Header
        title={WorkoutDict.Notes}
        right="times"
        rightAction={onPressClose}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.subtitle}>{WorkoutDict.YourNotes}</Text>
        <Text style={styles.description}>{notes}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton type="done" variant="white" icon="chevron" />
      </View>
    </View>
  );
}
