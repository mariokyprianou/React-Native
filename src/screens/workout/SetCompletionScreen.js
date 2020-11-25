/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 14:26:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import WeightSelection from '../../components/Infographics/WeightSelection';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {useTimer} from 'the-core-ui-module-tdcountdown';
import {useNavigation} from '@react-navigation/native';

const restTime = 10;

export default function SetCompletionScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => null,
  });

  const formattedSeconds = new Date(restTime * 1000)
    .toISOString()
    .substr(11, 8);
  const {remaining, remainingMS, toggle, active, reset} = useTimer({
    timer: formattedSeconds,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      justifyContent: 'flex-end',
    },
    card: {
      height: getHeight(349),
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
      borderTopLeftRadius: radius(15),
      borderTopRightRadius: radius(15),
      paddingTop: getHeight(23),
    },
    contentContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    title: {
      ...textStyles.bold22_black100,
      textAlign: 'center',
      marginBottom: getHeight(20),
    },
    timerText: {
      textAlign: 'center',
      ...textStyles.bold34_black100,
    },
    text: {
      ...textStyles.regular15_brownishGrey100,
      marginTop: getHeight(22),
    },
    weightSelectionContainer: {
      marginTop: getHeight(10),
      height: getHeight(69),
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: getHeight(40),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{WorkoutDict.GreatJob}</Text>
          <Text style={styles.timerText}>{remaining}</Text>
          <Text style={styles.text}>{WorkoutDict.WhichWeight}</Text>
          <View style={styles.weightSelectionContainer}>
            <WeightSelection />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton type="addWeight" variant="gradient" icon="chevron" />
        </View>
      </View>
    </View>
  );
}