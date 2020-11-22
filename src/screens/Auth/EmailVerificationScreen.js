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
  const {AuthDict} = dictionary;

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
      title={AuthDict.VerifyEmailTitle}
      text={AuthDict.VerifyEmail}
      buttonType="resend"
      bottomButtonType="goBack"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
    />
  );
}
