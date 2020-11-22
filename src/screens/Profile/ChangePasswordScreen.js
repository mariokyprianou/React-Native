/*
 * Created Date: Mon, 9th Nov 2020, 13:48:59 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {FormHook} from 'the-core-ui-module-tdforms';
import useDictionary from '../../hooks/localisation/useDictionary';
import TwoFieldChangeScreenUI from './TwoFieldChangeScreenUI';

export default function ChangePasswordScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {ProfileDict} = dictionary;
  const {cleanErrors, getValues, updateError, cleanValues} = FormHook();

  // MARK: - Local
  const firstValueName = 'changePasswordValue1';
  const secondValueName = 'changePasswordValue2';

  // MARK: - Logic
  const changePassword = (newPassword) => {
    // TODO: - Logic
  };

  // MARK: - Actions
  const onPressChange = () => {
    const {
      changePasswordValue1: oldPassword,
      changePasswordValue2: newPassword,
    } = getValues();
    // TODO: - Verify Values
    changePassword(newPassword);
  };

  // MARK: - Render
  return (
    <TwoFieldChangeScreenUI
      screenTitle={ProfileDict.ChangePasswordScreenTitle}
      firstFieldLabel={ProfileDict.ChangePasswordLabel1}
      secondFieldLabel={ProfileDict.ChangePasswordLabel2}
      firstFieldName={firstValueName}
      secondFieldName={secondValueName}
      buttonType={'changePassword'}
      onPressChange={onPressChange}
    />
  );
}
