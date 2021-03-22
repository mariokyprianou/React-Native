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
import DefaultButton from '../../components/Buttons/DefaultButton';
import Spacer from '../../components/Utility/Spacer';
import ProgressChart from '../../components/Infographics/ProgressChart';
import Header from '../../components/Headers/Header';
import {msToHMSFull} from '../../utils/dateTimeUtils';
import {useRoute} from '@react-navigation/core';
import generateChartInfo from '../../utils/generateChartInfo';
import handleTimer from '../../utils/handleTimer';
import handleStopwatch from '../../utils/handleStopwatch';
import UseData from '../../hooks/data/UseData';

export default function ChallengeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {history, getHistory} = UseData();
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

  const [chartInfo, setChartInfo] = useState(null);

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    if (history) {
      async function getInfo() {
        const info = await generateChartInfo(
          history,
          id,
          weightPreference,
          unitType,
          type,
        );
        setChartInfo(info);
      }
      getInfo();
    }
  }, [history]);

  const formattedSeconds = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8);
  const timerData = handleTimer(formattedSeconds);
  const stopwatchData = handleStopwatch();

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
    if (type === 'COUNTDOWN') timerData.toggle();
    if (type === 'STOPWATCH') stopwatchData.toggle();
  }

  function handlePressDone() {
    const {elapsedMS} = stopwatchData;
    const elapsed = msToHMSFull(elapsedMS);

    navigation.navigate('ChallengeEnd', {
      name,
      id,
      type,
      description,
      fieldTitle,
      processedHistory: chartInfo ? chartInfo.processedHistory : [],
      elapsed,
      elapsedMS,
      unitType,
      weightPreference,
      chartLabel: chartInfo ? chartInfo.chartLabel : '',
      chartDataPoints: chartInfo ? chartInfo.dataPoints : [],
      chartInterval: chartInfo ? chartInfo.interval : 0,
      chartTicks: chartInfo ? chartInfo.ticks : 0,
    });

    if (type === 'COUNTDOWN') {
      timerData.reset();
    } else if (type === 'STOPWATCH') {
      stopwatchData.reset();
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {chartInfo && (
          <ProgressChart
            data={chartInfo.processedHistory}
            chartLabel={chartInfo.chartLabel}
            chartDataPoints={chartInfo.dataPoints}
            interval={chartInfo.interval}
            ticks={chartInfo.ticks}
          />
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      {type !== 'OTHER' && (
        <Text style={styles.timerText}>
          {type === 'COUNTDOWN'
            ? msToHMSFull(timerData.remainingMS)
            : msToHMSFull(stopwatchData.elapsedMS)}
        </Text>
      )}
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
