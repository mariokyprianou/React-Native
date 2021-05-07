/*
 * Jira Ticket:
 * Created Date: Mon, 2nd Nov 2020, 08:10:13 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import {format} from 'date-fns';
import IconTextView from '../Infographics/IconTextView';
import isRTL from '../../utils/isRTL';

// possible status' - currentDay, complete, todo

export default function WorkoutCard({
  workout,
  title,
  day,
  date,
  duration,
  intensity,
  image,
  drag,
  status,
  onPressCard,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const {WorkoutDict} = dictionary;

  const today = new Date();
  const formattedToday = format(today, 'iiii, do LLL');

  const datePart1 = date.slice(0, -6);
  const dateSuperscript = date.slice(-6, -4);
  const datePart2 = date.slice(-4);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: title === WorkoutDict.RestDay ? getHeight(66) : getHeight(100),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white100,
      marginBottom: getHeight(15),
    },
    touch: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    completeOverlay: {
      backgroundColor: colors.white75,
      width: getWidth(335),
      height: title === WorkoutDict.RestDay ? getHeight(66) : getHeight(100),
      position: 'absolute',
      top: 0,
      left: 0,
    },
    image: {
      width: '100%',
      height: '100%',
      opacity: 0.2,
      position: 'absolute',
    },
    iconContainer: {
      marginLeft: getWidth(10),
    },
    icon: {
      solid: true,
      color: status === 'complete' ? colors.white100 : colors.black100,
      size: fontSize(12),
    },
    completeIconContainer: {
      marginRight: getWidth(7),
    },
    completeIcon: {
      color: colors.brownGrey100,
    },
    textContainer: {
      flexDirection: 'column',
    },
    title: {
      ...textStyles.semiBold14_black100,
      textAlign: 'left',
    },
    dayContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: title === 'REST DAY' ? getHeight(0) : getHeight(17),
    },
    workoutDay: {
      ...textStyles.medium14_aquamarine100,
      marginRight: getWidth(2),
      textAlign: 'left',
    },
    dateContainer: {
      flexDirection: 'row',
    },
    date: {
      ...textStyles.medium14_brownishGrey100,
      textAlign: 'left',
    },
    dateSuperscript: {
      ...textStyles.medium10_brownishGrey100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={drag ? 0.2 : 1}
        style={styles.touch}
        onLongPress={drag || null}
        onPress={
          title === WorkoutDict.RestDay ? null : () => onPressCard(workout)
        }>
        {date === formattedToday && (
          <Image source={image} style={styles.image} />
        )}

        {drag && (
          <View style={styles.iconContainer}>
            <TDIcon input={'grip-lines'} inputStyle={styles.icon} />
          </View>
        )}
        <View style={{padding: getWidth(20)}}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.dayContainer}>
              {status === 'complete' && (
                <View style={styles.completeIconContainer}>
                  <TDIcon
                    input={'check-circle'}
                    inputStyle={styles.completeIcon}
                  />
                </View>
              )}
              {title !== WorkoutDict.RestDay && (
                <Text style={styles.workoutDay}>
                  {isRTL()
                    ? `:${WorkoutDict.Day} ${day} `
                    : `${WorkoutDict.Day} ${day}: `}
                </Text>
              )}
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{datePart1}</Text>
                <Text style={styles.dateSuperscript}>{dateSuperscript}</Text>
                <Text style={styles.date}>{datePart2}</Text>
              </View>
            </View>
            {title !== WorkoutDict.RestDay && (
              <IconTextView
                type="intensity"
                duration={duration}
                intensity={intensity}
                alignLeft
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
      {status === 'complete' && <View style={styles.completeOverlay} />}
    </View>
  );
}
