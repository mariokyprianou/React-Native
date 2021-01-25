/*
 * Created Date: Fri, 6th Nov 2020, 16:41:25 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import isRTL from '../../utils/isRTL';

export default function (props) {
  const {name} = props.exercise;

  const {getWidth, fontSize, getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {exerciseInfoFormatText} = dictionary.WorkoutDict;

  const styles = {
    touchableStyle: {
      height: getHeight(77),
      width: '100%',
      flexDirection: 'row',
    },
    containerStyle: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      marginStart: getWidth(25),
      borderBottomColor: colors.dividerBrownishGrey80,
      borderBottomWidth: getHeight(1.5),
    },
    exerciseNameStyle: {
      ...textStyles.semiBold14_black100,
      textAlign: 'left',
    },
    exerciseInfoStyle: {
      ...textStyles.medium14_brownishGrey100,
      marginStart: getWidth(30),
      marginTop: getHeight(3),
      textAlign: 'left',
    },
  };

  const exerciseNameTitle = isRTL()
    ? `${name} :${props.index}/${props.total}`
    : `${props.index}/${props.total}: ${name}`;

  const sets = props.sets;
  const reps = sets.reduce((n, {quantity}) => n + quantity, 0);
  return (
    <TouchableOpacity activeOpacity={1} style={styles.touchableStyle}>
      <View style={styles.containerStyle}>
        <View>
          <Text style={styles.exerciseNameStyle}>{exerciseNameTitle}</Text>
          <Text style={styles.exerciseInfoStyle}>
            {exerciseInfoFormatText(sets.length, reps)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
