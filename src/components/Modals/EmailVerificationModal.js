/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 16:27:14 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import Header from '../Headers/Header';
import DefaultButton from '../Buttons/DefaultButton';

export default function EmailVerificationModal() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_VerifyEmail} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    card: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.veryLightPink100,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: getHeight(40),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <Header
        title={TitleText_VerifyEmail}
        right="times"
        rightAction={() => console.log('close modal')}
      />
      <View style={styles.buttonContainer}>
        <DefaultButton type="resend" variant="white" />
        <DefaultButton type="goBack" variant="transparentGreyText" />
      </View>
    </View>
  );
}
