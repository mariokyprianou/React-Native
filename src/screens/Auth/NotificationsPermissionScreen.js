/*
 * Created Date: Mon, 9th Nov 2020, 13:03:47 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreenUI from './PermissionScreenUI';
import {useNavigation} from '@react-navigation/native';

export default function NotificationPermissionScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;

  const navigation = useNavigation();

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
      title={AuthDict.NotificationsPermissionsScreenTitle}
      text={AuthDict.NotificationsPermissionsText}
      buttonType="allowNotifications"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
    />
  );
}
