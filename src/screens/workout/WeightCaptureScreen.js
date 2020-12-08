/*
 * Jira Ticket:
 * Created Date: Fri, 13th Nov 2020, 09:48:32 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import ProgressChart from '../../components/Infographics/ProgressChart';
import Spacer from '../../components/Utility/Spacer';
import DefaultButton from '../../components/Buttons/DefaultButton';
import SetsTable from '../../components/Infographics/SetsTable';
import format from 'date-fns/format';
import fakeProgressData from '../../hooks/data/FakeProgressData'; // to delete
import processChallengeHistory from '../../utils/processChallengeHistory';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import TDIcon from 'the-core-ui-component-tdicon';

export default function WeightCaptureScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {
    colors,
    textStyles,
    cellFormStyles,
    cellFormConfig,
    dropdownStyle,
  } = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();

  const today = new Date();
  const date = format(today, 'do LLL yyyy');

  navigation.setOptions({
    header: () => <Header title={WorkoutDict.WeightsTitle} showModalCross />,
  });

  const {fakeChallengeHistory} = fakeProgressData();
  const historyData = processChallengeHistory(fakeChallengeHistory[0].history);

  const dropdownData = historyData.map((event) => {
    return `${event.value}`;
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      backgroundColor: colors.veryLightPink100,
      height: '100%',
      width: '100%',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: getHeight(50),
      width: '90%',
      alignSelf: 'center',
      zIndex: 9,
    },
    title: {
      ...textStyles.bold20_black100,
      textAlign: 'left',
    },
    subtitleContainer: {
      width: '90%',
      alignSelf: 'center',
      marginBottom: getHeight(15),
    },
    subtitle: {
      ...textStyles.regular15_brownishGrey100,
    },
    chartCard: {
      height: getHeight(200),
      width: '90%',
      backgroundColor: colors.backgroundWhite100,
      alignSelf: 'center',
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
      paddingHorizontal: getWidth(5),
    },
    scrollCard: {
      height: getHeight(220),
      marginBottom: getHeight(-10),
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
    },
    iconStyle: {
      size: fontSize(12),
      solid: true,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **

  const cells = [
    {
      name: 'repsHistory',
      type: 'dropdown',
      placeholder: 'Reps',
      data: dropdownData,
      underline: false,
      rightAccessory: () => (
        <View>
          <TDIcon input="chevron-down" inputStyle={styles.iconStyle} />
        </View>
      ),
      iconTintColor: colors.black100,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingLeft: getWidth(7),
        width: getWidth(80),
        height: getHeight(50),
        position: 'absolute',
        top: getHeight(-41),
      },
      inputStyle: {
        ...textStyles.bold20_black100,
      },
    },
  ];
  const config = {
    ...cellFormConfig,
  };

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Squats -</Text>
          <Form {...{cells, config}} />
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{WorkoutDict.PickAWeight}</Text>
        </View>
        <View style={styles.chartCard}>
          <ProgressChart data={historyData} />
        </View>
        <Spacer height={30} />
        <View style={{...styles.chartCard, ...styles.scrollCard}}>
          <SetsTable date={date} />
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton type="done" variant="white" icon="chevron" />
        </View>
      </View>
    </View>
  );
}
