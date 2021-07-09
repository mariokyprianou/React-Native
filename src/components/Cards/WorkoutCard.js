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
const completeDayIcon = require('../../../assets/icons/completeDayIcon.png');

export default function WorkoutCard({
  workout,
  title,
  day,
  duration,
  drag,
  status,
  onPressCard,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const {WorkoutDict} = dictionary;

  const isRestDay = !day;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    cardContainer: {
      width: '100%',
      height: isRestDay ? getHeight(38) : getHeight(67),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white100,
      marginBottom: getHeight(15),
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    touchContainer: {
      flex: 1,
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },

    iconContainer: {
      marginLeft: getWidth(7),
    },
    icon: {
      solid: true,
      width: 40,
      color: colors.dividerGrey40,
      size: fontSize(12),
    },
    completeIcon: {
      marginTop: getHeight(6),
    },

    contentContainer: {
      flex: 1,
      height: '100%',
      flexDirection: 'row',
    },
    space: {
      width: getWidth(43),
      height: '100%',
      justifyContent: 'center',
      paddingLeft: getWidth(4),
    },
    content: {
      height: '100%',
      flex: 1,
      justifyContent: 'center',
    },
    restDayTitleStyle: {
      ...textStyles.semiBold12_black100,
      color: colors.brownishGrey100,
    },

    workoutContent: {
      flex: 1,
      height: '100%',
      marginTop: getHeight(15),
      marginBottom: getHeight(14),
      flexDirection: 'row',
    },
    dayText: {
      ...textStyles.semiBold15_aquamarine100,
    },
    divider: {
      height: '90%',
      width: getWidth(1),
      alignSelf: 'center',
      marginLeft: getWidth(8),
      marginRight: getWidth(11),
      backgroundColor: colors.dividerGrey10,
    },

    workoutTitleStyle: {
      ...textStyles.semiBold15_aquamarine100,
      color: colors.black100,
    },
    durationStyle: {
      ...textStyles.medium12_brownishGrey100,
      color: colors.durationGrey100,
      transform: [{translateY: -4}],
    },
    completeOverlay: {
      backgroundColor: colors.white75,
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **
  const Icon = () => (
    <>
      {status === 'complete' ? (
        <Image style={styles.completeIcon} source={completeDayIcon} />
      ) : (
        drag && (
          <View style={styles.iconContainer}>
            <TDIcon input={'grip-lines'} inputStyle={styles.icon} />
          </View>
        )
      )}
    </>
  );

  const WorkoutContent = () => (
    <View style={styles.workoutContent}>
      <Text style={styles.dayText}>{`${WorkoutDict.Day} ${day}`}</Text>
      <View style={styles.divider} />
      <View>
        <Text style={styles.workoutTitleStyle}>{title}</Text>
        <Text
          style={
            styles.durationStyle
          }>{`${duration} ${WorkoutDict.Mins}`}</Text>
      </View>
    </View>
  );

  const Content = () => (
    <View style={styles.contentContainer}>
      <View style={styles.space} />
      <View style={styles.content}>
        {isRestDay ? (
          <Text style={styles.restDayTitleStyle}>{WorkoutDict.RestDay}</Text>
        ) : (
          <WorkoutContent />
        )}
        {status === 'complete' && <View style={styles.completeOverlay} />}
      </View>
      <View style={styles.space}>
        <Icon />
      </View>
    </View>
  );

  const canMove = status !== 'complete' && drag;
  const canClickOn = !isRestDay && status !== 'complete';

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={canMove ? 0.2 : 1}
        style={styles.touchContainer}
        onLongPress={canMove ? drag : null}
        onPress={canClickOn ? () => onPressCard(workout) : null}>
        {React.useMemo(() => {
          return <Content />;
        }, [workout, title, day, status, isRestDay])}
      </TouchableOpacity>
    </View>
  );
}
