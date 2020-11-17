/*
 * Jira Ticket:
 * Created Date: Fri, 13th Nov 2020, 11:15:29 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';

export default function SetTableRow({setNumber, reps, weight}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getWidth} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {
    WeightTable_SetText,
    WeightTable_RepsText,
    WeightTable_WeightText,
  } = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      flex: 1,
    },
    text: {
      ...textStyles.medium14_brownishGrey100,
      flex: 0.4,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{`${WeightTable_SetText} ${setNumber}`}</Text>
      <Text style={styles.text}>{`${reps} ${WeightTable_RepsText}`}</Text>
      <Text style={styles.text}>{`${weight} ${WeightTable_WeightText}`}</Text>
    </View>
  );
}
