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

export default function HelpMeChooseBar({
  currentQuestion,
  totalQuestions,
  questionText,
  showText = true,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {HelpMeChooseDict} = dictionary;

  const activeWidth = ((currentQuestion - 1)  / totalQuestions) * 100;
  
  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    title: {
      ...textStyles.semiBold14_black100,
      marginBottom: getHeight(5),
      textAlign: 'left',
    },
    barContainer: {
      flexDirection: 'row',
      width: '100%',
      height: getHeight(4),
    },
    gradient: {
      flex: 1,
      borderRadius: radius(2),
    },
    activeBar: {
      width: `${activeWidth}%`,
      height: '100%',
      borderRadius: radius(2),
      position: 'absolute',
    },
    inactiveBar: {
      width: `100%`,
      backgroundColor: colors.paleTurquoise40,
      borderRadius: radius(2),
    },
    text: {
      ...textStyles.light15_black100,
      marginTop: getHeight(14),
      textAlign: 'left',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      {showText && (
        <Text
          style={
            styles.title
          }>{`${HelpMeChooseDict.Question} ${currentQuestion} ${HelpMeChooseDict.Of} ${totalQuestions}`}</Text>
      )}
      <View style={styles.barContainer}>
        <View style={styles.inactiveBar} />
        <View style={styles.activeBar}>
          <LinearGradient
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.tealish100, colors.tiffanyBlue100]}
          />
        </View>
      </View>
      <Text style={styles.text}>{questionText}</Text>
    </View>
  );
}
