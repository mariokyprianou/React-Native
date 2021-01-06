/*
 * Created Date: Fri, 13th Nov 2020, 16:07:38 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import WorkoutProgressBar from '../Infographics/WorkoutProgressBar';
import Header from './Header';
import {useStopwatch} from 'the-core-ui-module-tdcountdown';
import {msToHMSFull} from '../../utils/dateTimeUtils';

const playIcon = require('../../../assets/icons/play.png');
const pauseIcon = require('../../../assets/icons/pauseIcon.png');

export default function ({currentExercise, totalExercises}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {elapsedMS, toggle} = useStopwatch();

  const [isPaused, setIsPaused] = useState(false);

  const screenWidth = Dimensions.get('screen').width;

  const styles = {
    leftContainerStyle: {
      width: getWidth(54),
      height: getHeight(22),
      borderRadius: radius(18),
      overflow: 'hidden',
      marginStart: getWidth(20),
      alignItems: 'center',
    },
    leftTestStyle: {
      ...textStyles.bold14_white100,
      position: 'absolute',
      top: getHeight(1),
    },
    titleTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: getWidth(155),
      marginStart: getWidth(20),
    },
    titleTextStyle: {
      ...textStyles.bold22_black100,
    },
    timerTouchStyle: {
      width: getWidth(44),
      height: getWidth(34),
      padding: getWidth(12),
      justifyContent: 'center',
    },
    iconStyle: {
      width: getWidth(15),
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
    <View style={{alignItems: 'center'}}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleTextStyle}>
          {elapsedMS ? msToHMSFull(elapsedMS) : '00:00:00'}
        </Text>
        <TouchableOpacity
          style={styles.timerTouchStyle}
          onPress={() => {
            toggle();
            setIsPaused(!isPaused);
          }}>
          <Image
            style={styles.iconStyle}
            source={!isPaused ? playIcon : pauseIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const WorkoutHeader = () => {
    return (
      <Header
        customLeft={headerLeft}
        customTitle={headerTitle}
        showModalCross
      />
    );
  };

  return <WorkoutHeader />;
}
