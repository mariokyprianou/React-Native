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

export default function IconTextView({
  type,
  duration,
  intensity,
  reps,
  sets,
  color = 'grey',
  alignLeft,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const {WorkoutDict} = dictionary;

  const timeIcon = require('../../../assets/icons/reminder.png');
  const lightningIcon = require('../../../assets/icons/lightningOriginal.png');
  const repsIcon = require('../../../assets/icons/weight.png');

  const intensityRef = {
    LOW: WorkoutDict.Low,
    MOD: WorkoutDict.Medium,
    HIGH: WorkoutDict.High,
  };

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginStart: alignLeft ? 0 : getWidth(25),
      marginEnd: getWidth(25),
    },
    completeContainer: {
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'space-evenly',
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
    icon: {
      tintColor:
        color === 'grey'
          ? colors.brownishGreyTwo100
          : colors.white100,
            
      resizeMode: 'contain',
      height: getHeight(15),
      width: getWidth(15),
    },
    iconColor:
      color === 'grey'
        ? {tintColor: colors.brownishGreyTwo100}
        : {
            tintColor: colors.white100,
          },
    repsIcon: {
      height: getHeight(20),
      width: getWidth(20),
    },
    greyText: {
      ...textStyles.medium15_brownishGreyTwo100,
    },
    whiteText: {
      ...textStyles.medium15_white100,
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
            <TDIcon
              input={timeIcon}
              inputStyle={{style: {...styles.icon, ...styles.iconColor}}}
            />
          </View>
          <Text
            style={
              color === 'grey' ? styles.greyText : styles.whiteText
            }>{`${duration}`}</Text>
          <Text
            style={
              color === 'grey' ? styles.greyText : styles.whiteText
            }
            >{` ${WorkoutDict.Mins}`}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <View style={styles.iconContainer}>
            <TDIcon
              input={lightningIcon}
               inputStyle={{style: {...styles.icon, ...styles.iconColor}}}
            />
          </View>
          <Text
            style={
              color === 'grey' ? styles.greyText : styles.whiteText
            }>{`${intensityRef[intensity]} ${WorkoutDict.Intensity}`}</Text>
        </View>
      </View>
    );
  }

  if (type === 'workoutComplete') {
    return (
      <View style={{...styles.container, ...styles.completeContainer}}>
        <View style={styles.iconTextContainer}>
          <View style={styles.iconContainer}>
            <TDIcon
              input={timeIcon}
              inputStyle={{style: {...styles.icon, ...styles.iconColor}}}
            />
          </View>
          <Text
            style={
              color === 'grey' ? styles.greyText : styles.whiteText
            }>{`${duration}`}</Text>
          <Text
            style={
              color === 'grey' ? styles.greyText : styles.whiteText
            }>{` ${WorkoutDict.Mins}`}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <View style={styles.iconContainer}>
            <TDIcon
              input={repsIcon}
              inputStyle={{
                style: {
                  ...styles.icon,
                  ...styles.iconColor,
                  ...styles.repsIcon,
                },
              }}
            />
          </View>
          <Text
            style={
              color === 'grey' ? styles.greyText : styles.whiteText
            }>{`${reps} ${WorkoutDict.Reps}`}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <View style={styles.iconContainer}>
            <TDIcon
              input={lightningIcon}
              inputStyle={{style: styles.icon, ...styles.iconColor}}
            />
          </View>
          <Text
            style={
              color === 'grey' ? styles.greyText : styles.whiteText
            }>{`${sets} ${WorkoutDict.Sets}`}</Text>
        </View>
      </View>
    );
  }
}
