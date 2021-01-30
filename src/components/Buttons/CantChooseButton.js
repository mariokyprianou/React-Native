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
      backgroundColor: colors.brownishGrey100,
      borderRadius: radius(14),
    },
    largerButton: {
      height: getHeight(28),
      backgroundColor: colors.white80,
      borderRadius: radius(18),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: getWidth(12),
      paddingRight: getWidth(4.5),
    },
    largerText: {
      ...textStyles.bold15_brownishGrey100,
      marginRight: getWidth(10),
    },
    readyQuestionMark: {
      color: colors.white80,
      fontWeight: 'bold',
      fontSize: fontSize(16),
      textAlign: 'center',
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
        <Image source={questionMark} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}
