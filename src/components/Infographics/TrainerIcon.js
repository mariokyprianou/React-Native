/*
 * Jira Ticket:
 * Created Date: Tue, 27th Apr 2021, 08:06:26 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {Text, View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {GradientCircularProgress} from 'react-native-circular-gradient-progress';
import TDIcon from 'the-core-ui-component-tdicon';

export default function TrainerIcon({text, percentage}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const fatIcon = require('../../../assets/icons/lightning.png');
  const fitnessIcon = require('../../../assets/icons/heartRate.png');
  const muscleIcon = require('../../../assets/icons/weight.png');
  const wellnessIcon = require('../../../assets/icons/wellness.png');

  const iconSelector = {
    'FAT LOSS': fatIcon,
    FITNESS: fitnessIcon,
    MUSCLE: muscleIcon,
    WELLNESS: wellnessIcon,
  };

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    topContainer: {
      justifyContent: 'center',
    },
    iconContainer: {
      position: 'absolute',
      alignSelf: 'center',
    },
    icon: {
      tintColor: colors.black100,
      height: getHeight(21),
      width: getWidth(21),
      resizeMode: 'contain',
    },
    text: {
      ...textStyles.medium12_black100,
      marginTop: getHeight(10),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <GradientCircularProgress
          size={46}
          progress={percentage}
          startColor={colors.tealish100}
          middleColor={colors.aquamarine100}
          endColor={colors.brightBlue100}
          strokeWidth={3}
        />
        <View style={styles.iconContainer}>
          <TDIcon
            input={iconSelector[text]}
            inputStyle={{style: {...styles.icon}}}
          />
        </View>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
