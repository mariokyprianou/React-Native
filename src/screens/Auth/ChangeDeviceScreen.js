/*
 * Created Date: Mon, 9th Nov 2020, 15:57:54 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreenUI from './PermissionScreenUI';
import Intercom from 'react-native-intercom';

export default function ChangeDeviceScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {ChangeDeviceDict} = dictionary;

  // MARK: - Local
  const [canChangeDevice, setCanChangeDevice] = useState(false);
  // MARK: - Logic
  // MARK: - UseEffect

  useEffect(() => {
    // TODO: - check it's possible to change device
  });

  // MARK: - Actions
  const onPressButton = () => {
    // TODO: - Change Device
    console.log('HDSJHDKJA');
  };
  const onPressBottomButton = () => {
    Intercom.displayMessenger();
  };

  // MARK: - Render
  const text = canChangeDevice
    ? ChangeDeviceDict.ActiveText
    : ChangeDeviceDict.DisabledText;
  return (
    <PermissionScreenUI
      title={ChangeDeviceDict.Title}
      text={text}
      buttonType="changeDevice"
      bottomButtonType="needHelp"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
      disabled={!canChangeDevice}
      icon="chevron"
    />
  );
}
