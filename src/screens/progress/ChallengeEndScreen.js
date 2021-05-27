/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 15:44:55 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Platform, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import DefaultButton from '../../components/Buttons/DefaultButton';
import ProgressChart from '../../components/Infographics/ProgressChart';
import Header from '../../components/Headers/Header';
import {useRoute} from '@react-navigation/core';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {useMutation} from '@apollo/client';
import CompleteChallenge from '../../apollo/mutations/CompleteChallenge';
import UseData from '../../hooks/data/UseData';
import useLoading from '../../hooks/loading/useLoading';
import useDictionary from '../../hooks/localisation/useDictionary';
import useProgressData from '../../hooks/data/useProgressData';
import {useNetInfo} from '@react-native-community/netinfo';
import displayAlert from '../../utils/DisplayAlert';
import crashlytics from '@react-native-firebase/crashlytics';

const zeroStateImage = require('../../../assets/images/graphZeroState.png');

export default function ChallengeEndScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles, cellFormConfig, cellFormStyles} = useTheme();
  const {isConnected, isInternetReachable} = useNetInfo();

  const {dictionary} = useDictionary();
  const {ProgressDict, OfflineMessage} = dictionary;
  const {updateValue, getValueByName, cleanValues} = FormHook();
  const {setLoading} = useLoading();
  const navigation = useNavigation();

  const {programme} = UseData();
  const {getHistory} = useProgressData();

  const {
    params: {
      name,
      id,
      type,
      description,
      fieldTitle,
      processedHistory,
      elapsed,
      elapsedMS,
      unitType,
      weightPreference,
      chartLabel,
      chartDataPoints,
      chartInterval,
      chartTicks,
      duration,
    },
  } = useRoute();

  const [formHeight, setFormHeight] = useState(150);

  const [sendResult] = useMutation(CompleteChallenge);

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={name} goBack leftAction={handleGoBack} />,
    });
  }, []);

  useEffect(() => {
    if (type === 'STOPWATCH') {
      updateValue({name: 'result', value: elapsed});
    }
  }, [elapsed]);

  // Update value without any symbols/letters/space
  useEffect(() => {
    const value = getValueByName('result');

    if (value) {
      if (type === 'STOPWATCH') {
        const regex = /\d*:\d*/g;
        const found = value.match(regex);

        // Reset value
        if (!found || value.length > 8) {
          updateValue({name: 'result', value: elapsed});
        } else {
          // Remove any symbols other than the regex we want
          const updatedValue = value.replace(/[^\d{2}:\d{2}]/g, '');
          updateValue({name: 'result', value: updatedValue});
        }
      } else {
        const updatedValue = value.replace(/[^0-9]/g, '');
        updateValue({name: 'result', value: updatedValue});
      }
    }
  }, [getValueByName('result'), updateValue]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.backgroundWhite100,
    },
    scroll: {
      alignItems: 'center',
      height: '100%',
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
  async function handleAddResult() {
    if (!isConnected) {
      displayAlert({text: OfflineMessage});
      return;
    }

    setLoading(true);
    let challengeResult = '';
    if (type === 'STOPWATCH') {
      // Extract value from Input
      const value = getValueByName('result');
      const array = value.split(':');
      if (array.length === 2) {
        const minsSecs = parseInt(array[0]) * 60;
        const secs = parseInt(array[1]) + minsSecs;
        const ms = secs * 1000;

        challengeResult = ms.toString();
      }
    } else {
      challengeResult = getValueByName('result');
    }

    await sendResult({
      variables: {
        input: {
          challengeId: id,
          result: challengeResult,
        },
      },
    })
      .then(async () => {
        await getHistory();
      })
      .then(() => {
        setLoading(false);

        if (type === 'STOPWATCH') {
          challengeResult = Math.round(
            Number(challengeResult) / 1000,
          ).toString();
        }

        navigation.navigate('ChallengeComplete', {
          name,
          type,
          unitType,
          id,
          weightPreference,
          result: challengeResult,
          trainer: programme.trainer.name,
          ellapsedTime: getValueByName('result'),
          description: description,
          duration: duration,
        });

        cleanValues();
      })
      .catch((err) => {
        console.log(
          `Error on CompleteChallenge: ${name} of trainer ${programme.trainer.name}, ${err}`,
          '<---sendResult err',
        );
        crashlytics().log(
          `Error on CompleteChallenge: ${name} of trainer ${programme.trainer.name}, ${err}`,
        );
        setLoading(false);
        displayAlert({
          text: ProgressDict.CompleteChallengeFailedMessage,
        });
      });
  }

  function handleGoBack() {
    navigation.goBack();
    cleanValues();
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  const cells = [
    {
      name: 'result',
      type: 'text',
      placeholder: '',
      ...cellFormStyles,
      keyboardType: 'number-pad',
      onContentSizeChange: (e) =>
        setFormHeight(e.nativeEvent.contentSize.height),
      borderBottomWidth: 1,
      borderBottomColor: colors.black30,
      marginTop: getHeight(-60),
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingTop: 10,
        height: formHeight,
      },
      style: {
        ...textStyles.regular16_black100,
        lineHeight: fontSize(25),
        width: '100%',
        paddingBottom: getHeight(13),
      },
    },
  ];

  const config = {
    ...cellFormConfig,
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        enableOnAndroid={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.card}>
          {processedHistory.length > 0 ? (
            <ProgressChart
              data={processedHistory}
              chartLabel={chartLabel}
              chartDataPoints={chartDataPoints}
              interval={chartInterval}
              ticks={chartTicks}
            />
          ) : (
            processedHistory.length === 0 && (
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
        <View style={styles.answerBoxContainer}>
          <Text style={styles.answerLabel}>{fieldTitle}</Text>
          <Form cells={cells} config={config} />
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="addResult"
            icon="chevron"
            variant="white"
            onPress={handleAddResult}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
