/*
 * Jira Ticket: 
 * Created Date: Tue, 10th Nov 2020, 15:44:55 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useChallenge from '../hooks/data/useChallenge';
import DefaultButton from '../components/Buttons/DefaultButton';

export default function ChallengeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const { challengeData } = useChallenge();
  const { name, description, answerBoxLabel, result } = challengeData;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    card: {
      backgroundColor: colors.white100,
      height: getHeight(200),
      width: getWidth(335),
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
      marginBottom: getHeight(20),
    },
    descriptionContainer: {
      width: '90%',
      marginBottom: getHeight(40),
    },
    description: {
      ...textStyles.regular15_brownishGrey100,
    },
    timerText: {
      ...textStyles.bold34_black100,
    },
    answerBoxContainer: {
      width: '90%',
      alignItems: 'flex-start',
    },
    answerLabel: {
      ...textStyles.medium14_brownishGrey100,
      marginBottom: getHeight(6),
    },
    result: {
      ...textStyles.regular16_black100,
      marginBottom: getHeight(10),
    },
    line: {
      width: '100%',
      height: getHeight(1),
      backgroundColor: colors.black30,
    },
    buttonContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      bottom: getHeight(40),
    }
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleAddResult() { }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={ styles.container }>
      <View style={styles.card}>
        <Text>Component here</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{ description}</Text>
      </View>
      <View style={styles.answerBoxContainer}>
        <Text style={ styles.answerLabel }>{ answerBoxLabel }</Text>
        <Text style={ styles.result }>{ result }</Text>
        <View style={ styles.line}/>
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="addResult"
          icon="chevron"
          variant="white"
          onPress={handleAddResult}
        />
      </View>
      
    </View>
  );
}
