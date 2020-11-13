/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 16:13:18 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import DefaultButton from '../Buttons/DefaultButton';
import Spacer from '../Utility/Spacer';
import ProgressChart from '../Infographics/ProgressChart';

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
      backgroundColor: colors.white100,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      top: getHeight(45),
    },
    title: {
      ...textStyles.bold22_black100,
    },
    iconContainer: {
      position: 'absolute',
      right: getWidth(20),
      alignItems: 'center',
    },
    icon: {
      size: fontSize(24),
      color: colors.black100,
    },
    descriptionContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    description: {
      marginTop: getHeight(96),
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
      backgroundColor: colors.veryLightPink100,
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
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{TitleText_ChallengeComplete}</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={onPressClose}>
          <TDIcon input={'times'} inputStyle={styles.icon} />
        </TouchableOpacity>
      </View>
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
