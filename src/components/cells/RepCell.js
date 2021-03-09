/*
 * Created Date: Tue, 10th Nov 2020, 10:39:33 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';


const completedIcon = require('../../../assets/icons/completedSet.png');
export default function (props) {
  const {onPress = () => {}, quantity = '8', state = 'inactive'} = props;

  const {getWidth, fontSize, getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const styles = {
    containerStyle: {
      width: getWidth(46),
      height: getWidth(46),
      borderRadius: getWidth(46 / 1),
      justifyContent: 'center',
      alignItems: 'center',

      borderWidth: state === 'inactive' ? getWidth(1) : 0,
      borderColor:
        state === 'inactive' ? colors.brownishGrey100 : colors.white100,
    },
    textStyle: {
      ...textStyles.bold18_white100,
      alignSelf: 'center',
      color: state === 'inactive' ? colors.brownishGrey100 : colors.white100,
    },
    imageStyle: {
      width: getWidth(46),
      height: getWidth(46),
    },
  };

  const content = () => <Text style={styles.textStyle}>{quantity}</Text>;

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
      {state === 'completed' ? (
        <FastImage source={completedIcon} resizeMode={FastImage.resizeMode.contain} style={styles.imageStyle} />
      ) : state === 'active' ? (
        <LinearGradient
          style={styles.containerStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.tiffanyBlue100, colors.tealish100]}>
          {content()}
        </LinearGradient>
      ) : (
        <View style={styles.containerStyle}>{content()}</View>
      )}
    </TouchableOpacity>
  );
}
