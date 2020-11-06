/*
 * Created Date: Fri, 6th Nov 2020, 16:59:27 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import IconTextView from '../Infographics/IconTextView';

const fakeImage = require('../../../assets/images/fake.png');

export default function ({
  image = fakeImage,
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
      backgroundColor: 'red',
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
      <Image source={fakeImage} style={styles.imageStyle} />
      <View style={styles.contentStyle}>
        <IconTextView
          type={complete ? 'workoutComplete' : 'intensity'}
          reps={reps}
          sets={sets}
          duration={duration}
          color={colors.white100}
        />
      </View>
    </View>
  );
}
