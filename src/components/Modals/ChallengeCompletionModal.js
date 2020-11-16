/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 16:13:18 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../Buttons/DefaultButton';
import Spacer from '../Utility/Spacer';
import ProgressChart from '../Infographics/ProgressChart';
import Header from '../Headers/Header';

export default function ChallengeCompletionModal({
  onPressClose,
  result,
  challengeName,
  trainerName,
  data,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {
    TitleText_ChallengeComplete,
    InfoText_ChallengeComplete,
    TitleText_Today,
  } = dictionary;

  const screenWidth = Dimensions.get('screen').width;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.veryLightPink100,
    },
    descriptionContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    description: {
      marginTop: getHeight(20),
      ...textStyles.semiBold16_brownishGrey100,
    },
    buttonContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      bottom: getHeight(40),
    },
    card: {
      height: getHeight(220),
      width: screenWidth * 0.95 - getWidth(170),
      position: 'absolute',
      top: getHeight(200),
    },
    resultContainer: {
      backgroundColor: colors.paleBlue100,
      borderRadius: radius(15),
      width: getWidth(170),
      height: getHeight(110),
      padding: getHeight(10),
      position: 'absolute',
      right: getWidth(20),
      top: getHeight(200),
    },
    resultTitle: {
      ...textStyles.medium14_brownishGrey100,
    },
    resultText: {
      ...textStyles.bold34_black100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleShare() {}

  function handleDone() {}

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Header
        title={TitleText_ChallengeComplete}
        right="times"
        rightAction={onPressClose}
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {InfoText_ChallengeComplete(challengeName, trainerName)}
        </Text>
      </View>
      <View style={styles.card}>
        <ProgressChart data={data} />
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>{TitleText_Today}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="share"
          icon="share"
          variant="gradient"
          onPress={handleShare}
        />
        <Spacer height={20} />
        <DefaultButton
          type="done"
          icon="chevron"
          variant="white"
          onPress={handleDone}
        />
      </View>
    </View>
  );
}
