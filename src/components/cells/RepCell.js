/*
 * Created Date: Tue, 10th Nov 2020, 10:39:33 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import LinearGradient from 'react-native-linear-gradient';

const completedIcon = require('../../../assets/icons/completedSet.png');
export default function ({onPress = () => {}, value = '8', state = 'active'}) {
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
      resizeMode: 'contain',
    },
  };

  const content = () => <Text style={styles.textStyle}>{value}</Text>;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.containerStyle}>
      {state === 'completed' ? (
        <Image source={completedIcon} style={styles.imageStyle} />
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
