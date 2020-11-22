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
  const [workoutDay, setWorkoutDay] = useState(day);

  const {WorkoutDict} = dictionary;

  const today = new Date();
  const formattedToday = format(today, 'iiii, do LLL');

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: getWidth(335),
      height: title === WorkoutDict.RestDay ? getHeight(66) : getHeight(100),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
      marginTop: getHeight(27),
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
      height: '100%',
      opacity: 0.2,
      position: 'absolute',
      right: 0,
    },
    iconContainer: {
      marginLeft: getWidth(10),
      marginRight: getWidth(20),
    },
    icon: {
      solid: true,
      size: fontSize(14),
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
    date: {
      ...textStyles.medium14_brownishGrey100,
      textAlign: 'left',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.touch}
        onLongPress={drag}
        onPress={title === WorkoutDict.RestDay ? null : onPressCard}>
        {date === formattedToday && (
          <Image source={image} style={styles.image} />
        )}
        <View style={styles.iconContainer}>
          <TDIcon input={'grip-lines'} inputStyle={styles.icon} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.dayContainer}>
            {status === 'complete' && (
              <View style={styles.completeIconContainer}>
                <TDIcon
                  input={'check-circle'}
                  inputStyle={{...styles.icon, ...styles.completeIcon}}
                />
              </View>
            )}
            {title !== WorkoutDict.RestDay && (
              <Text style={styles.workoutDay}>
                {isRTL()
                  ? `:${WorkoutDict.Day} ${workoutDay} `
                  : `${WorkoutDict.Day} ${workoutDay}: `}
              </Text>
            )}
            <Text style={styles.date}>{date}</Text>
          </View>
          {title !== WorkoutDict.RestDay && (
            <IconTextView
              type="intensity"
              duration={duration}
              intensity={intensity}
            />
          )}
        </View>
        {status === 'complete' && <View style={styles.completeOverlay} />}
      </TouchableOpacity>
    </View>
  );
}
