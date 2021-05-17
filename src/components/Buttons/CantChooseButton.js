/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 15:42:18 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import * as Animatable from 'react-native-animatable';
import isRTL from '../../utils/isRTL';

const questionMark = require('../../../assets/images/questionMark.png');

export default function CantChooseButton({onPress}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ButtonDict} = dictionary;
  const [buttonState, setButtonState] = useState();

  useEffect(() => {
    setInterval(() => {
      setButtonState('ready');
    }, 10000);
  }, []);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    touch: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    image: {
      height: getHeight(16),
      width: getHeight(16),
    },
    button: {
      width: getWidth(20),
      height: getWidth(20),
      backgroundColor: colors.paleGrey100,
      borderRadius: radius(14),
      justifyContent: 'center',
      alignItems: 'center',
    },
    largerButton: {
      height: getHeight(28),
      backgroundColor: colors.white100,
      borderRadius: radius(18),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: getWidth(12),
      paddingRight: getWidth(4.5),
    },
    largerText: {
      ...textStyles.bold15_paleGrey100,
      marginRight: getWidth(10),
    },
    readyQuestionMark: {
      ...textStyles.bold15_white100,
      fontSize: fontSize(12),
      textAlign: 'center',
    },
    notReadyContainer: {
      height: getHeight(33),
      width: getHeight(33),
      backgroundColor: colors.white100,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius(100),
    },
    notReadyQuestionMark: {
      ...textStyles.bold15_paleGrey100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  if (buttonState === 'ready') {
    return (
      <Animatable.View
        style={styles.largerButton}
        animation={isRTL() ? 'slideInLeft' : 'slideInRight'}>
        <TouchableOpacity style={styles.touch} onPress={onPress}>
          <Text style={styles.largerText}>{ButtonDict.CantChoose}</Text>
          <View style={styles.button}>
            <Text style={styles.readyQuestionMark}>
              {ButtonDict.QuestionMark}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.touch} onPress={onPress}>
        <View style={styles.notReadyContainer}>
          <Text style={styles.notReadyQuestionMark}>?</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
