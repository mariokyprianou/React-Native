/*
 * Created Date: Fri, 13th Nov 2020, 16:07:38 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import WorkoutProgressBar from '../Infographics/WorkoutProgressBar';
import Header from './Header';
import {useStopwatch} from 'the-core-ui-module-tdcountdown';
import {msToHMSFull} from '../../utils/dateTimeUtils';
import UseData from '../../hooks/data/UseData';
import FastImage from 'react-native-fast-image';
import useWorkoutTimer from '../../hooks/timer/useWorkoutTimer';

const playIcon = require('../../../assets/icons/playDark.png');
const pauseIcon = require('../../../assets/icons/pauseDark.png');

export default function ({currentExercise, totalExercises, rightAction}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const styles = {
    leftContainerStyle: {
      width: getWidth(54),
      height: getHeight(22),
      borderRadius: radius(18),
      overflow: 'hidden',
      marginStart: getWidth(35),
      alignItems: 'center',
    },
    leftTestStyle: {
      ...textStyles.bold14_white100,
      position: 'absolute',
      top: getHeight(1),
    },
    titleTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: getWidth(190),
    },
    titleTextStyle: {
      ...textStyles.bold22_black100,
    },
    timerTouchStyle: {
      position: 'absolute',
      right: 0,
      width: getWidth(44),
      height: getWidth(34),
      paddingLeft: getWidth(15),
      justifyContent: 'center',
    },
    iconStyle: {
      width: getWidth(12),
      height: getWidth(15),
      resizeMode: 'contain',
      marginLeft: getWidth(8),
      tintColor: colors.black100,
    },
  };

  const headerLeft = () => (
    <View style={styles.leftContainerStyle}>
      <WorkoutProgressBar index={currentExercise} max={totalExercises} />
      <Text
        style={
          styles.leftTestStyle
        }>{`${currentExercise}/${totalExercises}`}</Text>
    </View>
  );

  const headerTitle = () => (
    <View
      style={{
        alignItems: 'flex-end',
        width: getWidth(190),
      }}>
      <View style={styles.titleTextContainer}>
        <Timer styles={styles} />
      </View>
    </View>
  );

  const WorkoutHeader = () => {
    return (
      <Header
        customLeft={headerLeft}
        customTitle={headerTitle}
        showModalCross
        rightAction={rightAction}
      />
    );
  };

  return <WorkoutHeader />;
}

const Timer = React.memo(
  ({styles}) => <TimerView styles={styles} />,
  () => true,
);

function TimerView(props) {
  const {
    workoutTime,
    isWorkoutTimerRunning,
    setIsWorkoutTimerRunning,
  } = useWorkoutTimer();

  function toggle() {
    setIsWorkoutTimerRunning(!isWorkoutTimerRunning);
  }

  return (
    <>
      <Text style={props.styles.titleTextStyle}>
        {workoutTime ? msToHMSFull(workoutTime) : '00:00:00'}
      </Text>
      <TouchableOpacity
        style={props.styles.timerTouchStyle}
        onPress={() => {
          toggle();
        }}>
        <FastImage
          style={props.styles.iconStyle}
          source={!isWorkoutTimerRunning ? playIcon : pauseIcon}
        />
      </TouchableOpacity>
    </>
  );
}
