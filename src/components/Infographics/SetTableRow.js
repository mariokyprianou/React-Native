/*
 * Jira Ticket:
 * Created Date: Fri, 13th Nov 2020, 11:15:29 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';

export default function SetTableRow({
  setNumber,
  reps,
  setType = "REPS",
  weight,
  weightPreference,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      flex: 1,
    },
    text: {
      ...textStyles.medium14_brownishGrey100,
      textAlign: 'left',
      flex: 0.4,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.row}>
      <Text
        style={
          styles.text
        }>{`${WorkoutDict.WeightsSetText} ${setNumber}`}</Text>
      <Text
        style={styles.text}>{`${reps} ${setType === "SECS" ? WorkoutDict.WeightsRepsSecsText : WorkoutDict.WeightsRepsText}`}</Text>
      <Text style={styles.text}>{`${weight} ${weightPreference}`}</Text>
    </View>
  );
}
