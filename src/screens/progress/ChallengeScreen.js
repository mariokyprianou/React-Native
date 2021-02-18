/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 10:17:26 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {useNavigation} from '@react-navigation/native';
import {useTimer, useStopwatch} from 'the-core-ui-module-tdcountdown';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Spacer from '../../components/Utility/Spacer';
import ProgressChart from '../../components/Infographics/ProgressChart';
import Header from '../../components/Headers/Header';
import {msToHMSFull} from '../../utils/dateTimeUtils';
import {useRoute} from '@react-navigation/core';
import processChallengeHistory from '../../utils/processChallengeHistory';
import handleTimer from '../../utils/handleTimer';
import handleStopwatch from '../../utils/handleStopwatch';
import {useQuery} from '@apollo/client';
import ChallengeHistory from '../../apollo/queries/ChallengeHistory';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';

export default function ChallengeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {isConnected, isInternetReachable} = useNetInfo();
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const {
    params: {
      id,
      name,
      description,
      type,
      duration,
      fieldTitle,
      unitType,
      weightPreference,
    },
  } = useRoute();

  const navigation = useNavigation();
  navigation.setOptions({
    header: () => <Header title={name} goBack />,
  });

  const [history, setHistory] = useState();

  useQuery(ChallengeHistory, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      const thisChallengeHistory = res.challengeHistory.filter(
        (obj) => obj.challenge.id === id,
      );
      const processedChallengeHistory = processChallengeHistory(
        thisChallengeHistory[0].history,
        weightPreference,
        unitType,
      );
      setHistory(processedChallengeHistory);
    },
    onError: (err) => console.log(err, '<---progress images err'),
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
      marginBottom: getHeight(43),
    },
    description: {
      ...textStyles.regular15_brownishGrey100,
      textAlign: 'left',
    },
    timerText: {
      ...textStyles.bold34_black100,
      position: 'absolute',
      bottom: getHeight(209),
    },
    buttonContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      bottom: getHeight(40),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePressStart() {
    if (timerType === 'COUNTDOWN') timerData.toggle();
    if (timerType === 'STOPWATCH') stopwatchData.toggle();
  }

  function handlePressDone() {
    const {elapsedMS} = stopwatchData;
    const elapsed = msToHMSFull(elapsedMS);
    if (timerType === 'COUNTDOWN') {
      navigation.navigate('ChallengeEnd', {challenge});
      timerData.reset();
    } else if (timerType === 'STOPWATCH') {
      navigation.navigate('ChallengeEnd', {
        challenge,
        history,
        elapsed,
        elapsedMS,
      });
      stopwatchData.reset();
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ProgressChart
          data={history}
          weightPreference={weightPreference}
          unitType={unitType}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TimerView duration={duration} style={styles.timerText} />
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="start"
          icon="chevron"
          variant="gradient"
          onPress={handlePressStart}
        />
        <Spacer height={20} />
        <DefaultButton
          type="done"
          icon="chevron"
          variant="white"
          onPress={handlePressDone}
        />
      </View>
    </View>
  );
}

function TimerView(props) {
  const formattedSeconds = new Date(props.duration * 1000)
    .toISOString()
    .substr(11, 8);
  const timerData = handleTimer(formattedSeconds);
  const stopwatchData = handleStopwatch();

  return (
    <Text style={props.style}>
      {type === 'COUNTDOWN'
        ? msToHMSFull(timerData.remainingMS)
        : msToHMSFull(stopwatchData.elapsedMS)}
    </Text>
  );
}
