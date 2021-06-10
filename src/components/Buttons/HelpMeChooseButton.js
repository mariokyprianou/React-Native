/*
 * Jira Ticket:
 * Created Date: Thu, 29th Oct 2020, 15:53:18 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import LinearGradient from 'react-native-linear-gradient';

// possible type - selected or null

export default function HelpMeChooseButton({letter, text, onPress}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {
    getHeight,
    getWidth,
    fontSize,
    getScaledHeight,
    getScaledWidth,
  } = ScaleHook();
  const {colors, textStyles} = useTheme();

  const [selected, setSelected] = useState(false);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: getScaledWidth(163),
      height: getScaledWidth(163),
      marginBottom: getScaledHeight(10),
    },
    box: {
      justifyContent: 'flex-end',
      paddingHorizontal: getScaledWidth(10),
      paddingBottom: getScaledHeight(20),
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
      lineHeight: fontSize(22),
      height: getHeight(50),
      textAlign: 'left',
    },
    unselectedLetterText: {
      ...textStyles.semiBold14_black100,
      textAlign: 'left',
    },
    unselectedBodyText: {
      ...textStyles.medium15_black100,
      lineHeight: fontSize(20),
      textAlign: 'left',
      height: getHeight(50),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **
  if (selected) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          onPressOut={() => setSelected(false)}
          style={styles.touch}>
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
        activeOpacity={1}
        onPressIn={() => setSelected(true)}
        style={{
          ...styles.touch,
          paddingHorizontal: getScaledWidth(10),
          paddingBottom: getScaledHeight(20),
        }}>
        <Text style={styles.unselectedLetterText}>{letter}</Text>
        <Text style={styles.unselectedBodyText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
