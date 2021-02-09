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
import {useRoute} from '@react-navigation/core';
import {useMutation} from '@apollo/client';
import ChangeDevice from '../../apollo/mutations/ChangeDevice';
import {useNavigation} from '@react-navigation/native';
import getResponse from '../../utils/getResponse';
import displayAlert from '../../utils/DisplayAlert';
import useUserData from '../../hooks/data/useUserData';

export default function ChangeDeviceScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {ChangeDeviceDict} = dictionary;
  const navigation = useNavigation();
  const {firebaseLogEvent, analyticsEvents} = useUserData();

  const [changeDevice] = useMutation(ChangeDevice);

  const {
    params: {canChangeDevice, newDeviceId},
  } = useRoute();

  // MARK: - Actions
  const onPressButton = () => {
    changeDevice({
      variables: {
        input: {
          deviceId: newDeviceId,
        },
      },
    })
      .then((res) => {
        const response = getResponse(res, 'changeDevice');

        if (response) {
          navigation.goBack();
        } else {
          displayAlert({
            text: ChangeDeviceDict.ChangeDeviceFailedText,
          });
        }
      })
      .catch((err) => {
        console.log(err, '<---change device permissions error');
        displayAlert({
          text: ChangeDeviceDict.ChangeDeviceFailedText,
        });
      });
  };
  const onPressBottomButton = () => {
    firebaseLogEvent(analyticsEvents.accessedIntercom, {});

    Intercom.displayMessenger();
  };

  // MARK: - Render
  const text = canChangeDevice
    ? ChangeDeviceDict.ActiveText
    : ChangeDeviceDict.DisabledText;

  const image = canChangeDevice
    ? require('../../../assets/images/changeDeviceActive.png')
    : require('../../../assets/images/changeDeviceInactive.png');
  return (
    <PermissionScreenUI
      title={ChangeDeviceDict.Title}
      text={text}
      image={image}
      buttonType="changeDevice"
      bottomButtonType="needHelp"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
      disabled={!canChangeDevice}
      icon="chevron"
      backNavigation={false}
    />
  );
}
