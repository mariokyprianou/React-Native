/*
 * Created Date: Mon, 9th Nov 2020, 13:03:47 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreenUI from './PermissionScreenUI';

export default function NotificationPermissionScreen({navigation}) {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {
    NotificationsPermissions_Title,
    NotificationsPermissions_Text,
  } = dictionary;

  navigation.setOptions({
    header: () => (
      <Header
              title={'Create account'}
              noSearch
              showBurger={false}
              goBack
            />
    ),
  });

 
  // MARK: - Logic

  // MARK: - Actions
  const onPressButton = () => {
    // TODO: - Allow Notifications
  };
  const onPressBottomButton = () => {
    // TODO: - Skip permission
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
