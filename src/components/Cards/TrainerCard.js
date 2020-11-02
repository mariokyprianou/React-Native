/*
 * Jira Ticket:
 * Created Date: Mon, 2nd Nov 2020, 11:04:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import FadingBottomView from '../Views/FadingBottomView';
import GymHomeSelector from '../Buttons/GymHomeSelector';
import PercentageBar from '../Infographics/PercentageBar';

export default function TrainerCard({name = 'Katrina'}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const fake = require('../../../assets/images/fake.png');

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    imagesContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
    },
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      resizeMode: 'cover',
    },
    overlay: {
      width: '100%',
      position: 'absolute',
    },
    titleContainer: {
      backgroundColor: 'orange',
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    nameText: {
      ...textStyles.bold30_white100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <Image source={fake} style={styles.image} />
        <FadingBottomView color="blue" />
      </View>
      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <GymHomeSelector />
        </View>
        <PercentageBar icon="lightning" text="FAT LOSS" percentage={35} />
        <PercentageBar icon="heartRate" text="FITNESS" percentage={75} />
        <PercentageBar icon="weight" text="BUILD MUSCLE" percentage={20} />
      </View>
    </View>
  );
}
