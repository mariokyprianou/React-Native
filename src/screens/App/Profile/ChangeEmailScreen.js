/*
 * Created Date: Mon, 9th Nov 2020, 13:30:27 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {FormHook} from 'the-core-ui-module-tdforms';
import useDictionary from '../../../hooks/localisation/useDictionary';
import TwoFieldChangeScreen from './TwoFieldChangeScreen';

export default function ChangeEmailScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {
    ChangeEmailScreenTitle,
    ChangeEmailLabel1,
    ChangeEmailLabel2,
  } = dictionary;
  const {cleanErrors, getValues, updateError} = FormHook();

  // MARK: - Local
  const firstValueName = 'changeEmailValue1';
  const secondValueName = 'changeEmailValue2';

  // MARK: - Logic
  const changeEmail = (newEmail) => {
    // TODO: - Logic
  };

  // MARK: - Actions
  const onPressChange = () => {
    const {
      changeEmailValue1: password,
      changeEmailValue2: newEmail,
    } = getValues();
    // TODO: - Verify Values
    changeEmail(newEmail);
  };

  // MARK: - Render
  return (
    <TwoFieldChangeScreen
      screenTitle={ChangeEmailScreenTitle}
      firstFieldLabel={ChangeEmailLabel1}
      secondFieldLabel={ChangeEmailLabel2}
      secondFieldType="emailAddress"
      firstFieldName={firstValueName}
      secondFieldName={secondValueName}
      buttonType={'changeEmail'}
      onPressChange={onPressChange}
    />
  );
}
