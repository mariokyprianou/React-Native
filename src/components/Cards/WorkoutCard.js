/*
 * Jira Ticket:
 * Created Date: Mon, 2nd Nov 2020, 08:10:13 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import IconTextView from '../Infographics/IconTextView';

export default function WorkoutCard() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: getWidth(335),
      height: getHeight(100),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    iconContainer: {
      marginLeft: getWidth(10),
      marginRight: getWidth(20),
    },
    icon: {
      solid: true,
      size: fontSize(14),
    },
    textContainer: {
      flexDirection: 'column',
    },
    title: {
      ...textStyles.semiBold14_black100,
    },
    dayContainer: {
      flexDirection: 'row',
      marginBottom: getHeight(17),
    },
    workoutDay: {
      ...textStyles.medium14_aquamarine100,
    },
    date: {
      ...textStyles.medium14_brownishGrey100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <TDIcon input={'grip-lines'} inputStyle={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>REST DAY</Text>
        <View style={styles.dayContainer}>
          <Text style={styles.workoutDay}>Day 1: </Text>
          <Text style={styles.date}>Wednesday 1st June</Text>
        </View>
        <IconTextView type="intensity" duration="25" intensity="low" />
      </View>
    </View>
  );
}
