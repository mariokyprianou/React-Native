/*
 * Created Date: Fri, 7th May 2021, 11:17:55 am
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import LinearGradient from 'react-native-linear-gradient';

export default function WorkoutTagButton({
  workoutTag,
  onPressCard,
  isSelected,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: getWidth(72),
      height: getWidth(72),
      borderRadius: radius(36),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isSelected ? colors.red100 : colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
      marginBottom: getHeight(2),
      marginTop: getHeight(2),
    },
    touch: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      ...textStyles.medium12_brownishGrey100,
      color: isSelected ? colors.white100 : colors.brownishGrey100,
      textAlign: 'center',
    },
    linearGradientStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: getWidth(72),
      height: getWidth(72),
      borderRadius: radius(36),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touch}
        onPress={() => onPressCard(workoutTag)}>
        {isSelected ? (
          <LinearGradient
            style={{...styles.linearGradientStyle, ...styles.box}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.tealish100, colors.tiffanyBlue100]}>
            <Text style={styles.name}>{workoutTag.name.toUpperCase()}</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.name}>{workoutTag.name.toUpperCase()}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
