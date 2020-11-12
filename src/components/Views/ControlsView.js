/*
 * Created Date: Thu, 12th Nov 2020, 11:59:43 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

/*
 * Created Date: Mon, 9th Nov 2020, 15:35:47 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';

const playIcon = require('../../../assets/icons/play.png');
const easierIcon = require('../../../assets/icons/easierVideo.png');
const harderIcon = require('../../../assets/icons/videoHarder.png');

let ScreenHeight = Dimensions.get('window').height;

export default function ({easierOnPress, harderOnPress, pauseOnPress, pause}) {
  const {getWidth, fontSize, getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const styles = {
    container: {
      width: '100%',
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
    controlsContainerStyle: {
      alignSelf: 'center',
      position: 'absolute',
      top: getHeight(ScreenHeight / 6),
      flexDirection: 'row',
    },
    controlTextStyle: {
      ...textStyles.bold16_white100,
    },
    easierTouchableStyle: {
      flexDirection: 'row',
      marginRight: getWidth(25),
      alignItems: 'center',
    },
    harderTouchableStyle: {
      flexDirection: 'row',
      marginLeft: getWidth(25),
      alignItems: 'center',
    },
    intensityIconStyle: {
      margin: getWidth(10),
    },
  };

  return (
    <View style={styles.controlsContainerStyle}>
      <TouchableOpacity
        onPress={easierOnPress}
        style={styles.easierTouchableStyle}>
        <Image style={styles.intensityIconStyle} source={easierIcon} />
        <Text style={styles.controlTextStyle}>EASIER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          pauseOnPress();
        }}>
        <Image source={playIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={harderOnPress}
        style={styles.harderTouchableStyle}>
        <Text style={styles.controlTextStyle}>HARDER</Text>
        <Image style={styles.intensityIconStyle} source={harderIcon} />
      </TouchableOpacity>
    </View>
  );
}
