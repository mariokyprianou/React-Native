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
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import DefaultButton from '../../components/Buttons/DefaultButton';
import ProgressChart from '../../components/Infographics/ProgressChart';
import Header from '../../components/Headers/Header';
import {useRoute} from '@react-navigation/core';

export default function ChallengeEndScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {
    params: {
      challenge: {name, description, answerBoxLabel},
      historyData,
    },
  } = useRoute(); // result should come from here also
  const result = 30;

  const navigation = useNavigation();

  navigation.setOptions({
    header: () => <Header title={name} goBack />,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: colors.backgroundWhite100,
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
      textAlign: 'left',
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
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleAddResult() {
    navigation.navigate('ChallengeComplete', {historyData, name});
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ProgressChart data={historyData} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.answerBoxContainer}>
        <Text style={styles.answerLabel}>{answerBoxLabel}</Text>
        <Text style={styles.result}>{result}</Text>
        <View style={styles.line} />
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
