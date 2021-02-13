/*
 * Jira Ticket:
 * Created Date: Thu, 29th Oct 2020, 15:53:18 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import LinearGradient from 'react-native-linear-gradient';

// possible type - selected or null

export default function HelpMeChooseButton({
  type = 'unselected',
  letter,
  text,
  onPress,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: getWidth(163),
      height: getWidth(163),
      marginBottom: getHeight(10),
    },
    box: {
      justifyContent: 'flex-end',
      paddingHorizontal: getWidth(10),
      paddingBottom: getHeight(30),
    },
    touch: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    unselectedBox: {
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 3,
      paddingHorizontal: 0,
      paddingBottom: 0,
    },
    linearGradientStyle: {
      flex: 1,
    },
    selectedLetterText: {
      ...textStyles.bold14_white100,
      textAlign: 'left',
    },
    selectedBodyText: {
      ...textStyles.bold16_white100,
      textAlign: 'left',
    },
    unselectedLetterText: {
      ...textStyles.semiBold14_black100,
      textAlign: 'left',
    },
    unselectedBodyText: {
      ...textStyles.medium15_black100,
      textAlign: 'left',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **
  if (type === 'selected') {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.touch}>
          <LinearGradient
            style={{...styles.linearGradientStyle, ...styles.box}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.tealish100, colors.tiffanyBlue100]}>
            <Text style={styles.selectedLetterText}>{letter}</Text>
            <Text style={styles.selectedBodyText}>{text}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{...styles.container, ...styles.box, ...styles.unselectedBox}}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.touch,
          paddingHorizontal: getWidth(10),
          paddingBottom: getHeight(30),
        }}>
        <Text style={styles.unselectedLetterText}>{letter}</Text>
        <Text style={styles.unselectedBodyText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
