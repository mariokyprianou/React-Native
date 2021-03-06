/*
 * Created Date: Mon, 9th Nov 2020, 17:24:04 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import LinearGradient from 'react-native-linear-gradient';
import Slider from 'react-native-slider';

const thumbIcon = require('../../../assets/icons/slider.png');
export default function SliderProgressView({
  min = 0,
  progress = 50,
  max = 100,
  slider = false,
  height,
  rounded = false,
  setProgress,
  containerStyle,
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
      alignItems: 'stretch',
      justifyContent: 'center',
      alignContent: 'center',
      height: containerStyle ? containerStyle.height : height || getHeight(4),
    },
    thumbStyle: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      width: getWidth(40),
      height: getHeight(42),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={containerStyle}>
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
          minimumValue={min}
          maximumValue={max}
          value={currentProgress}
          onValueChange={(value) => {
            setCurrentProgress(value);
            if (setProgress) {
              setProgress(value);
            }
          }}
          thumbStyle={styles.thumbStyle}
          thumbTouchSize={{width: getWidth(62), height: getHeight(42)}}
          trackStyle={{backgroundColor: 'transparent'}}
          minimumTrackTintColor={'transparent'}
          maximumTrackTintColor={'transparent'}
          thumbImage={thumbIcon}
        />
      )}
    </View>
  );
}
