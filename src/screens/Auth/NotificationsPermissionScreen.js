/*
 * Created Date: Mon, 9th Nov 2020, 13:03:47 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreen from './PermissionScreen';

export default function NotificationPermissionScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {
    NotificationsPermissionsTitle,
    NotificationsPermissionsText,
  } = dictionary;

  // MARK: - Logic

  // MARK: - Actions
  const onPressButton = () => {
    // TODO: - Allow Notifications
  };
  const onPressSkip = () => {
    // TODO: - Skip permission
  };

  // MARK: - Render
  return (
    <PermissionScreen
      title={NotificationsPermissionsTitle}
      text={NotificationsPermissionsText}
      buttonType="allowNotifications"
      onPressButton
      onPressSkip
    />
  );
}
