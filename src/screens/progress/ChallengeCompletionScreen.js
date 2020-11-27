/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 16:13:18 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Spacer from '../../components/Utility/Spacer';
import ProgressChart from '../../components/Infographics/ProgressChart';
import Header from '../../components/Headers/Header';
import {useRoute} from '@react-navigation/core';
import {FormHook} from 'the-core-ui-module-tdforms';

export default function ChallengeCompletionScreen({trainerName = 'Katrina'}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const [challengeResult, setChallengeResult] = useState();
  const {getValues, cleanValues} = FormHook();
  const {WorkoutDict} = dictionary;
  const {
    params: {historyData, name, elapsed},
  } = useRoute();
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => (
      <Header
        title={WorkoutDict.ChallengeCompleteTitle}
        right="crossIcon"
        rightAction={() => navigation.navigate('Progress')}
      />
    ),
  });

  const screenWidth = Dimensions.get('screen').width;

  useEffect(() => {
    if (elapsed) {
      setChallengeResult(elapsed);
    } else {
      const result = getValues('result').result;
      setChallengeResult(result);
    }
    cleanValues();
  }, []);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    descriptionContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    description: {
      marginTop: getHeight(20),
      ...textStyles.semiBold16_brownishGrey100,
      textAlign: 'left',
    },
    buttonContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      bottom: getHeight(40),
    },
    card: {
      height: getHeight(220),
      width: screenWidth * 0.95 - getWidth(175),
      position: 'absolute',
      top: getHeight(120),
    },
    resultContainer: {
      backgroundColor: colors.paleBlue100,
      borderRadius: radius(15),
      borderTopLeftRadius: 0,
      width: getWidth(170),
      height: getHeight(110),
      padding: getHeight(10),
      position: 'absolute',
      right: getWidth(20),
      top: getHeight(120),
    },
    resultTitle: {
      ...textStyles.medium14_brownishGrey100,
      textAlign: 'left',
    },
    timeResult: {
      ...textStyles.bold30_black100,
      textAlign: 'left',
    },
    resultText: {
      ...textStyles.bold34_black100,
      textAlign: 'left',
    },
    line: {
      height: getHeight(1),
      width: '100%',
      backgroundColor: colors.veryLightPink100,
      marginTop: getHeight(280),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleShare() {}

  function handleDone() {
    navigation.navigate('Progress');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {WorkoutDict.ChallengeComplete(name, trainerName)}
        </Text>
      </View>
      <View style={styles.card}>
        <ProgressChart data={historyData} axis={false} />
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>{WorkoutDict.Today}</Text>
        <Text style={elapsed ? styles.timeResult : styles.resultText}>
          {challengeResult}
        </Text>
      </View>
      <View style={styles.line} />
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
