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
import TrainerCard from '../components/Cards/TrainerCard';

export default function TestScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({});

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View
      style={{
        marginVertical: getHeight(50),
        alignItems: 'center',
        flex: 1,
        // backgroundColor: '#00008B',
      }}>
      <Text style={{marginBottom: 50}}>Test components here</Text>
      <View style={{height: '80%', width: '100%'}}>
        <TrainerCard />
      </View>
    </View>
  );
}
