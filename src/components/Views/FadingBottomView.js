/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 10:43:33 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import LinearGradient from 'react-native-linear-gradient';

export default function FadingBottomView({color = 'white', height}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    fadeContainer: {
      height: height ? getHeight(height) : '100%',
      width: '100%',
    },
    fade: {
      flex: 1,
    },
  });

  const fadeStyles = {
    white: [colors.white0, colors.white100],
    blue: [colors.paleTurquoise0, colors.paleTurquoise100],
    black: [colors.black0, colors.black0point5],
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.fadeContainer}>
      <LinearGradient style={styles.fade} colors={fadeStyles[color]} />
    </View>
  );
}
