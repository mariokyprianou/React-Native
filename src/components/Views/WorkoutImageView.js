/*
 * Created Date: Fri, 6th Nov 2020, 16:59:27 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import FastImage from 'react-native-fast-image';
import useTheme from '../../hooks/theme/UseTheme';
import IconTextView from '../Infographics/IconTextView';
import FadingBottomView from './FadingBottomView';

const fakeImage = require('../../../assets/images/fake.png');

export default function ({
  image,
  duration = 40,
  intensity = 'medium',
  reps = '12',
  sets = '5',
  complete = false,
}) {
  const {getWidth, fontSize, getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const styles = {
    container: {
      width: '100%',
      height: getHeight(300),
    },
    imageStyle: {
      width: '100%',
      height: '100%',
    },
    contentStyle: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      marginBottom: getHeight(15),
    },
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={image === undefined ? fakeImage : {uri: image}}
        style={styles.imageStyle}
      />
      <View style={{position: 'absolute', width: '100%'}}>
        <FadingBottomView color={'black'} height={300} />
      </View>
      <View style={styles.contentStyle}>
        <IconTextView
          type={complete ? 'workoutComplete' : 'intensity'}
          reps={reps}
          sets={sets}
          duration={duration}
          intensity={intensity}
          color={colors.white100}
        />
      </View>
    </View>
  );
}
