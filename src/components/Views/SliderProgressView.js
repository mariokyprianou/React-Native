/*
 * Created Date: Mon, 9th Nov 2020, 17:24:04 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import LinearGradient from 'react-native-linear-gradient';
import Slider from 'react-native-slider';

const thumbIcon = require('../../../assets/icons/slider.png');
export default function SliderProgressView({
  progress = 50,
  max = 100,
  slider = false,
  height,
  rounded = false,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const [currentProgress, setCurrentProgress] = useState(progress);

  useEffect(() => {
    if (!slider) {
      setCurrentProgress(progress);
    }
  });

  const activeWidth = (currentProgress / max) * 100;
  const inactiveWidth = 100 - activeWidth;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    title: {
      ...textStyles.semiBold14_black100,
      marginBottom: getHeight(5),
    },
    barContainer: {
      flexDirection: 'row',
      width: '100%',
      position: 'absolute',
      height: height || getHeight(4),
      borderRadius: rounded ? radius(10) : radius(0),
      overflow: 'hidden',
    },
    activeBar: {
      width: `${activeWidth}%`,
    },
    inactiveBar: {
      width: `${inactiveWidth}%`,
      backgroundColor: colors.paleTurquoise100,
    },
    text: {
      ...textStyles.light15_black100,
      marginTop: getHeight(14),
    },
    sliderContainer: {
      width: '100%',
      height: height || getHeight(4),
      alignItems: 'stretch',
      justifyContent: 'center',
      alignContent: 'center',
    },
    thumbStyle: {
      width: getWidth(42),
      height: getHeight(22),
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.barContainer}>
        <LinearGradient
          style={styles.activeBar}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.tealish100, colors.tiffanyBlue100]}
        />
        <View style={styles.inactiveBar} />
      </View>

      {slider && (
        <Slider
          style={styles.sliderContainer}
          minimumValue={0}
          maximumValue={max}
          value={currentProgress}
          onValueChange={(value) => setCurrentProgress(value)}
          thumbStyle={styles.thumbStyle}
          thumbTouchSize={{width: getWidth(42), height: getHeight(22)}}
          trackStyle={{backgroundColor: 'transparent'}}
          minimumTrackTintColor={'transparent'}
          maximumTrackTintColor={'transparent'}
          thumbImage={thumbIcon}
        />
      )}
    </View>
  );
}
