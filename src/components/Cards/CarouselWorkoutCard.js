/*
 * Jira Ticket:
 * Created Date: Tue, 27th Apr 2021, 11:28:49 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import IconTextView from '../Infographics/IconTextView';
import isRTL from '../../utils/isRTL';
import LinearGradient from 'react-native-linear-gradient';

export default function CarouselWorkoutCard({title, day, duration, intensity}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: title === WorkoutDict.RestDay ? getHeight(48) : getHeight(90),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white100,
      paddingLeft: '5%',
    },
    dotContainer: {
      marginRight: getHeight(10),
      height: getHeight(38),
    },
    dot: {
      height: getHeight(10),
      width: getHeight(10),
      borderRadius: radius(20),
    },
    gradient: {
      flex: 1,
      borderRadius: radius(20),
    },
    textContainer: {
      flexDirection: 'column',
    },
    title: {
      ...textStyles.semiBold16_black100,
    },
    dayContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: title === 'REST DAY' ? getHeight(0) : getHeight(10),
    },
    completeIconContainer: {
      marginRight: getWidth(7),
    },
    completeIcon: {
      color: colors.brownGrey100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      {title !== WorkoutDict.RestDay ? (
        <View style={styles.dotContainer}>
          <View style={styles.dot}>
            <LinearGradient
              style={{...styles.gradient}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[colors.tealish100, colors.tiffanyBlue100]}
            />
          </View>
        </View>
      ) : (
        <View style={{width: getHeight(20)}} />
      )}
      <View style={styles.textContainer}>
        <View style={styles.dayContainer}>
          <Text style={styles.title}>
            {isRTL()
              ? `:${WorkoutDict.Day} ${day} ${title}`
              : `${WorkoutDict.Day} ${day}: ${title}`}
          </Text>
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
  );
}
