/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 15:42:18 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

export default function DefaultScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ButtonText_CantChoose, ButtonText_QuestionMark} = dictionary;
  const [buttonState, setButtonState] = useState();

  useEffect(() => {
    setInterval(() => {
      setButtonState('ready');
    }, 10000);
  }, []);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    button: {
      width: getWidth(20),
      height: getWidth(20),
      backgroundColor: colors.white80,
      borderRadius: radius(14),
      alignItems: 'center',
      justifyContent: 'center',
    },
    largerButton: {
      width: getWidth(175),
      height: getHeight(28),
      backgroundColor: colors.white80,
      borderRadius: radius(18),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: getWidth(12),
      paddingRight: getWidth(8),
    },
    darkerButton: {
      backgroundColor: colors.brownishGrey100,
    },
    largerText: {
      ...textStyles.bold15_brownishGrey100,
    },
    questionMark: {
      color: colors.brownishGrey100,
      fontWeight: 'bold',
      fontSize: fontSize(16),
    },
    readyQuestionMark: {
      color: colors.white80,
      fontWeight: 'bold',
      fontSize: fontSize(16),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  if (buttonState === 'ready') {
    return (
      <FadeInView style={styles.largerButton}>
        <Text style={styles.largerText}>{ButtonText_CantChoose}</Text>
        <View style={{...styles.button, ...styles.darkerButton}}>
          <Text style={styles.readyQuestionMark}>
            {ButtonText_QuestionMark}
          </Text>
        </View>
      </FadeInView>
    );
  }
  return (
    <View style={styles.button}>
      <Text style={styles.questionMark}>{ButtonText_QuestionMark}</Text>
    </View>
  );
}
