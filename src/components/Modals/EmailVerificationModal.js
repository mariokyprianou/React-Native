/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 16:27:14 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreenUI from '../../screens/auth/PermissionScreenUI';

export default function EmailVerificationModal() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_VerifyEmail, InfoText_VerifyEmail} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    card: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.veryLightPink100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function onPressButton() {
    // TO DO - resend
  }

  function onPressBottomButton() {
    // TO DO - go back
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <PermissionScreenUI
        title={TitleText_VerifyEmail}
        text={InfoText_VerifyEmail}
        buttonType="resend"
        bottomButtonType="goBack"
        onPressButton={onPressButton}
        onPressBottomButton={onPressBottomButton}
      />
    </View>
  );
}
