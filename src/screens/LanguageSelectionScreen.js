/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 11:46:15 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import DefaultButton from '../components/Buttons/DefaultButton';

const splashImage = require('../../assets/images/splash.png');

export default function LanguageSelectionScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {
    DropdownText_English,
    DropdownText_Hindi,
    DropdownText_SelectLanguage,
    DropdownText_Urdu,
  } = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'flex-end',
    },
    image: {
      position: 'absolute',
      top: getHeight(270),
    },
    buttonContainer: {
      marginBottom: getHeight(40),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />
      <View style={styles.buttonContainer}>
        <DefaultButton type="setLanguage" variant="white" />
      </View>
    </View>
  );
}
