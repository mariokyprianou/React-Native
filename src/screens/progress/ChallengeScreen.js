/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 10:17:26 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {useNavigation} from '@react-navigation/native';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Spacer from '../../components/Utility/Spacer';
import ProgressChart from '../../components/Infographics/ProgressChart';
import Header from '../../components/Headers/Header';
import {msToHMSOptional} from '../../utils/dateTimeUtils';
import {useRoute} from '@react-navigation/core';
import generateChartInfo from '../../utils/generateChartInfo';
import handleTimer from '../../utils/handleTimer';
import handleStopwatch from '../../utils/handleStopwatch';
import useProgressData from '../../hooks/data/useProgressData';
import useDictionary from '../../hooks/localisation/useDictionary';

const zeroStateImage = require('../../../assets/images/graphZeroState.png');

export default function ChallengeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
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

  const {history, getHistory} = useProgressData();

  const [chartInfo, setChartInfo] = useState(null);
  const [isTimerRunning, setTimerRunning] = useState(false);

  // Time based
  const formattedSeconds = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8);
  const timerData = handleTimer(formattedSeconds);
  const stopwatchData = handleStopwatch();

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={name} goBack />,
    });

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

  useEffect(() => {
    if (type === 'COUNTDOWN' && timerData.remainingMS === 0) {
      handlePressDone();
    }
  }, [timerData.remainingMS]);

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
      shadowRadius: 4,
      shadowOpacity: 1,
      elevation: 4,
      marginBottom: getHeight(20),
      marginTop: getHeight(1),
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
    zeroChart: {
      ...textStyles.semiBold10_brownGrey100,
      lineHeight: fontSize(12),
      marginTop: getHeight(18),
      marginLeft: getWidth(15),
      marginBottom: getHeight(20),
    },
    image: {
      height: getHeight(120),
      width: getWidth(250),
      alignSelf: 'center',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePressStart() {
    setTimerRunning(!isTimerRunning);
    if (type === 'COUNTDOWN') timerData.toggle();
    if (type === 'STOPWATCH') stopwatchData.toggle();
  }

  function handlePressDone() {
    const {elapsedMS} = stopwatchData;
    const elapsed = msToHMSOptional(elapsedMS);

    if (isTimerRunning) {
      setTimerRunning(!isTimerRunning);
    }

    if (type === 'COUNTDOWN') {
      timerData.reset();
    } else if (type === 'STOPWATCH') {
      stopwatchData.reset();
    }

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
      duration,
    });
  }

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {chartInfo && chartInfo.processedHistory.length > 0 ? (
          <ProgressChart
            data={chartInfo.processedHistory}
            chartLabel={chartInfo.chartLabel}
            chartDataPoints={chartInfo.dataPoints}
            interval={chartInfo.interval}
            ticks={chartInfo.ticks}
            background={false}
          />
        ) : (
          chartInfo &&
          chartInfo.processedHistory.length === 0 && (
            <>
              <Text style={styles.zeroChart}>
                {ProgressDict.ChallengeZeroChart}
              </Text>
              <Image source={zeroStateImage} style={styles.image} />
            </>
          )
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      {type !== 'OTHER' && (
        <Text style={styles.timerText}>
          {type === 'COUNTDOWN'
            ? msToHMSOptional(timerData.remainingMS)
            : msToHMSOptional(stopwatchData.elapsedMS)}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        {type !== 'OTHER' && (
          <>
            <DefaultButton
              type={isTimerRunning ? 'pause' : 'start'}
              icon={isTimerRunning ? 'pause' : 'play'}
              variant="gradient"
              onPress={handlePressStart}
            />
            <Spacer height={20} />
          </>
        )}
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
