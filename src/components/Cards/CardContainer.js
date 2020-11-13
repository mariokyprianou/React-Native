/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 08:37:20 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';

export default function CardContainer({onLayout, containerStyle, children}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      ...containerStyle,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View onLayout={onLayout} style={styles.container}>
      {children}
    </View>
  );
}
