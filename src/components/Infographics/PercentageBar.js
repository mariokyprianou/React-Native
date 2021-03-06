/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 08:34:49 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import TDIcon from 'the-core-ui-component-tdicon';
import {color} from 'react-native-reanimated';

// possible icons - lightning, heartRate, weight

export default function PercentageBar({icon, text, percentage}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const lightningIcon = require('../../../assets/icons/lightning.png');
  const heartRateIcon = require('../../../assets/icons/heartRate.png');
  const weightIcon = require('../../../assets/icons/weight.png');

  const iconSelector = {
    lightning: lightningIcon,
    heartRate: heartRateIcon,
    weight: weightIcon,
  };

  const activePercentage = 296 * (percentage / 100);
  const inactivePercentage = 296 - activePercentage;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      width: getWidth(22),
    },
    icon: {
      color: colors.white100,
      tintColor: colors.white100,
      tint: colors.white100,
      size: fontSize(22),
      solid: true,
      style: {
        tintColor: colors.white100,
      },
    },
    textContainer: {
      flexDirection: 'column',
      marginLeft: getWidth(16.5),
      justifyContent: 'center',
    },
    text: {
      ...textStyles.bold12_white100,
      textAlign: 'left',
    },
    barContainer: {
      flexDirection: 'row',
    },
    bar: {
      height: getHeight(4),
      marginBottom: getHeight(4),
    },
    activeBar: {
      backgroundColor: colors.white100,
      width: getWidth(activePercentage),
      borderBottomLeftRadius: radius(2),
      borderTopLeftRadius: radius(2),
    },
    inactiveBar: {
      backgroundColor: colors.paleBlue100,
      width: getWidth(inactivePercentage),
      borderBottomRightRadius: radius(2),
      borderTopRightRadius: radius(2),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TDIcon input={iconSelector[icon]} inputStyle={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.barContainer}>
          <View style={{...styles.bar, ...styles.activeBar}} />
          <View style={{...styles.bar, ...styles.inactiveBar}} />
        </View>
      </View>
    </View>
  );
}
