/*
 * Jira Ticket:
 * Created Date: Thu, 23rd Jul 2020, 08:33:36 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import TransformationChallenge from '../components/Buttons/TransformationChallenge';

const fakeImage = require('../../assets/fake2.png');
const fakeGraph = require('../../assets/fakeGraph.png');

export default function DefaultScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    boxWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '90%',
      alignSelf: 'center',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.boxWrapper}>
      <TransformationChallenge
        type="progress"
        title="Transformation"
        image={fakeImage}
      />
      <TransformationChallenge
        type="challenge"
        title="60-second squats"
        image={fakeGraph}
      />
      <TransformationChallenge
        type="challenge"
        title="60-second squats"
        image={fakeGraph}
      />
      <TransformationChallenge
        type="challenge"
        title="60-second squats"
        image={fakeGraph}
      />
    </View>
  );
}
