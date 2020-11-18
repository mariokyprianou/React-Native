/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 16:27:14 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreenUI from './PermissionScreenUI';

export default function EmailVerificationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {dictionary} = useDictionary();
  const {TitleText_VerifyEmail, InfoText_VerifyEmail} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function onPressButton() {
    // TO DO - resend
  }

  function onPressBottomButton() {
    // TO DO - go back
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <PermissionScreenUI
      title={TitleText_VerifyEmail}
      text={InfoText_VerifyEmail}
      buttonType="resend"
      bottomButtonType="goBack"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
    />
  );
}
