/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 11:46:15 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import DefaultButton from '../components/Buttons/DefaultButton';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import TDIcon from 'the-core-ui-component-tdicon';

const splashImage = require('../../assets/images/splash.png');

export default function LanguageSelectionScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {
    DropdownText_English,
    DropdownText_Hindi,
    DropdownText_SelectLanguage,
    DropdownText_Urdu,
  } = dictionary;
  const dropdownData = [
    DropdownText_English,
    DropdownText_Hindi,
    DropdownText_Urdu,
  ];

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
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
      height: getHeight(150),
      width: '100%',
      alignItems: 'center',
    },
    iconStyle: {
      size: fontSize(12),
      solid: true,
    },
    labelText: {
      ...textStyles.medium14_brownishGrey100,
    },
  };

  const cells = [
    {
      name: 'language',
      type: 'dropdown',
      label: DropdownText_SelectLanguage,
      labelTextStyle: styles.labelText,
      placeholder: DropdownText_English,
      data: dropdownData,
      rightAccessory: () => (
        <View style={styles.iconContainer}>
          <TDIcon input="chevron-down" inputStyle={styles.iconStyle} />
        </View>
      ),
      iconTintColor: colors.black100,
    },
  ];
  const config = {
    editedColor: colors.brownishGrey100,
    inactiveColor: colors.brownishGrey100,
    activeColor: colors.brownishGrey100,
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Form {...{cells, config}} />
        <DefaultButton type="setLanguage" variant="white" />
      </View>
    </View>
  );
}
