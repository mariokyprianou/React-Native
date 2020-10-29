/*
 * Jira Ticket:
 * Created Date: Thu, 29th Oct 2020, 15:53:18 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';

export default function HelpMeChooseButton() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    box: {
      width: getWidth(163),
      height: getWidth(163),
      justifyContent: 'flex-end',
      backgroundColor: 'pink',
      paddingHorizontal: getWidth(10),
      paddingBottom: getHeight(30),
    },
    letterText: {
      ...textStyles.bold14_white100,
    },
    bodyText: {
      ...textStyles.bold16_white100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.box}>
      <Text style={styles.letterText}>A</Text>
      <Text style={styles.bodyText}>Lorem ipsum dolor sit amet</Text>
    </View>
  );
}
