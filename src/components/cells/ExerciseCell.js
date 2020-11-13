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

export default function ({
  onPress = () => alert('Exercise on press'),
  number = 1,
  total = 12,
  name = 'WALKING LUNGES',
  reps = '12',
  sets = '5',
}) {
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
    },
    exerciseInfoStyle: {
      ...textStyles.medium14_brownishGrey100,
      marginStart: getWidth(40),
      marginTop: getHeight(3),
    },
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.touchableStyle}>
      <View style={styles.containerStyle}>
        <View>
          <Text
            style={
              styles.exerciseNameStyle
            }>{`${number}/${total}: ${name}`}</Text>
          <Text style={styles.exerciseInfoStyle}>
            {exerciseInfoFormatText(sets, reps)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}