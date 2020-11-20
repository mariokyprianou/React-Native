/*
 * Created Date: Mon, 9th Nov 2020, 13:03:47 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreenUI from './PermissionScreenUI';
import Header from '../../components/Headers/Header';
import {useNavigation} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';

export default function NotificationPermissionScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {
    NotificationsPermissions_Title,
    NotificationsPermissions_Text,
  } = dictionary;

  const navigation = useNavigation();

  navigation.setOptions({
    header: () => <Header title={'Notifications'} showModalCross={true} />,
    ...TransitionPresets.ModalSlideFromBottomIOS,
  });

  // MARK: - Logic

  // MARK: - Actions
  const onPressButton = () => {
    // TODO: - Allow Notifications
    navigation.navigate('Analytics');
  };
  const onPressBottomButton = () => {
    // TODO: - Skip permission
    navigation.navigate('Analytics');
  };

  // MARK: - Render
  return (
    <PermissionScreenUI
      title={NotificationsPermissions_Title}
      text={NotificationsPermissions_Text}
      buttonType="allowNotifications"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
    />
  );
}
