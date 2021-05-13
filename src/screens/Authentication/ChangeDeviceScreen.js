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
import useLoading from '../../hooks/loading/useLoading';
import {useBackHandler} from '@react-native-community/hooks';
import AsyncStorage from '@react-native-community/async-storage';


export default function ChangeDeviceScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {ChangeDeviceDict} = dictionary;
  const navigation = useNavigation();
  const {permissionsNeeded, firebaseLogEvent, analyticsEvents, setChangeDevice} = useUserData();

  const {setLoading} = useLoading();

  const [changeDevice] = useMutation(ChangeDevice);

  const {
    params: {canChangeDevice, newDeviceId},
  } = useRoute();

  useBackHandler(() => {
    return true;
  });

  useEffect(()=> {
    setLoading(false);
  }, []);

  // MARK: - Actions
  const onPressButton = async () => {
    
    setLoading(true);
    changeDevice({
      variables: {
        input: {
          deviceId: newDeviceId,
        },
      },
    })
      .then(async (res) => {
        const response = getResponse(res, 'changeDevice');
        console.log("changeDeviceRes", response);

        if (response) {

          // Reset change devoce data
          setChangeDevice(null);

          await AsyncStorage.setItem(
            '@DOWNLOAD_ENABLED',
            JSON.stringify(true),
          );
          
          const permissionNeeded = await permissionsNeeded();

          if (permissionNeeded) {
            navigation.goBack();
            navigation.navigate(permissionNeeded);
          }
          else {
            navigation.goBack();
          }

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
      }).finally(()=> setLoading(false));
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
      closeModal={__DEV__ || false}
    />
  );
}
