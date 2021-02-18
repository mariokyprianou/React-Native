/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 15:44:55 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
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

export default function ChallengeEndScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles, cellFormConfig, cellFormStyles} = useTheme();
  const {getProgramme, programme} = UseData();
  const [formHeight, setFormHeight] = useState(150);
  let newStyle = {formHeight};
  const {updateValue, getValueByName, cleanValues} = FormHook();
  const {
    params: {
      name,
      id,
      type,
      description,
      fieldTitle,
      history,
      elapsed,
      chartLabel,
      chartDataPoints,
      chartInterval,
      chartTicks,
    },
  } = useRoute();
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => <Header title={name} goBack />,
  });

  const [sendResult] = useMutation(CompleteChallenge);

  useEffect(() => {
    getProgramme();
  }, []);

  useEffect(() => {
    if (type === 'STOPWATCH') {
      updateValue({name: 'result', value: elapsed});
    }
  }, [elapsed]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.backgroundWhite100,
    },
    scroll: {
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
      height: getHeight(90),
      width: '100%',
      alignItems: 'center',
      marginTop: getHeight(120),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handleAddResult() {
    const challengeResult = getValueByName('result');

    await sendResult({
      variables: {
        input: {
          challengeId: id,
          result: challengeResult,
        },
      },
    })
      .then((res) => console.log(res, '<---sendResult res'))
      .catch((err) => console.log(err, '<---sendResult err'));

    navigation.navigate('ChallengeComplete', {
      history,
      name,
      type,
      chartLabel,
      chartDataPoints,
      chartInterval,
      chartTicks,
      result: challengeResult,
      trainer: programme.trainer.name,
    });

    cleanValues();
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  const cells = [
    {
      name: 'result',
      type: 'text',
      placeholder: '',
      ...cellFormStyles,
      multiline: true,
      onContentSizeChange: (e) =>
        setFormHeight(e.nativeEvent.contentSize.height),
      borderBottomWidth: 1,
      borderBottomColor: colors.black30,
      marginTop: getHeight(-60),
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingTop: 10,
        height: [newStyle][formHeight],
      },
      style: {
        ...textStyles.regular16_black100,
        width: '100%',
        paddingBottom: getHeight(13),
      },
    },
  ];

  const config = {
    ...cellFormConfig,
  };

  return (
    <View style={{height: '100%', width: '100%'}}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        enableOnAndroid={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.card}>
          <ProgressChart
            data={history}
            chartLabel={chartLabel}
            chartDataPoints={chartDataPoints}
            interval={chartInterval}
            ticks={chartTicks}
          />
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
