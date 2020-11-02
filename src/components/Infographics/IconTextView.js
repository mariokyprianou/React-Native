/*
 * Jira Ticket:
 * Created Date: Mon, 2nd Nov 2020, 08:39:17 am
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

// possible type - intensity, workoutComplete

export default function IconTextView({type, duration, intensity, reps, sets}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const {
    CardText_Low,
    CardText_Medium,
    CardText_High,
    CardText_Intensity,
    CardText_Mins,
    CardText_Reps,
    CardText_Sets,
  } = dictionary;

  const timeIcon = require('../../../assets/icons/reminder.png');
  const lightningIcon = require('../../../assets/icons/lightning.png');
  const repsIcon = require('../../../assets/icons/weight.png');

  const intensityRef = {
    low: CardText_Low,
    medium: CardText_Medium,
    high: CardText_High,
  };

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flexDirection: 'row',
      width: '100%',
    },
    completeContainer: {
      justifyContent: 'center',
    },
    iconTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: getWidth(10.5),
    },
    leftIconContainer: {
      marginRight: getWidth(33),
    },
    leftCompleteContainer: {
      marginRight: getWidth(42),
    },
    icon: {
      tintColor: colors.brownishGreyTwo100,
      resizeMode: 'contain',
      height: getHeight(15),
      width: getWidth(15),
    },
    repsIcon: {
      height: getHeight(20),
      width: getWidth(20),
    },
    text: {
      ...textStyles.medium14_brownishGreyTwo100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  if (type === 'intensity') {
    return (
      <View style={styles.container}>
        <View
          style={{...styles.iconTextContainer, ...styles.leftIconContainer}}>
          <View style={styles.iconContainer}>
            <TDIcon input={timeIcon} inputStyle={{style: styles.icon}} />
          </View>
          <Text style={styles.text}>{`${duration} ${CardText_Mins}`}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <View style={styles.iconContainer}>
            <TDIcon input={lightningIcon} inputStyle={{style: styles.icon}} />
          </View>
          <Text
            style={
              styles.text
            }>{`${intensityRef[intensity]} ${CardText_Intensity}`}</Text>
        </View>
      </View>
    );
  }

  if (type === 'workoutComplete') {
    return (
      <View style={{...styles.container, ...styles.completeContainer}}>
        <View
          style={{
            ...styles.iconTextContainer,
            ...styles.leftCompleteContainer,
          }}>
          <View style={styles.iconContainer}>
            <TDIcon input={timeIcon} inputStyle={{style: styles.icon}} />
          </View>
          <Text style={styles.text}>{`${duration} ${CardText_Mins}`}</Text>
        </View>
        <View
          style={{
            ...styles.iconTextContainer,
            ...styles.leftCompleteContainer,
          }}>
          <View style={styles.iconContainer}>
            <TDIcon
              input={repsIcon}
              inputStyle={{style: {...styles.icon, ...styles.repsIcon}}}
            />
          </View>
          <Text style={styles.text}>{`${reps} ${CardText_Reps}`}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <View style={styles.iconContainer}>
            <TDIcon input={lightningIcon} inputStyle={{style: styles.icon}} />
          </View>
          <Text style={styles.text}>{`${sets} ${CardText_Sets}`}</Text>
        </View>
      </View>
    );
  }
}
