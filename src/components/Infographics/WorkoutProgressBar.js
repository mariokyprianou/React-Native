/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 09:50:35 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import LinearGradient from 'react-native-linear-gradient';

export default function HelpMeChooseBar({index, max, questionText}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_Question, TitleText_Of} = dictionary;

  const activeWidth = (index / max) * 100;
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
      height: getHeight(22),
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
      <Text style={styles.text}>{questionText}</Text>
    </View>
  );
}
