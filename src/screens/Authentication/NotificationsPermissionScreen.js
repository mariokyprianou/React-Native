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
import AsyncStorage from '@react-native-community/async-storage';
import {useMutation} from '@apollo/client';
import UpdatePreference from '../../apollo/mutations/UpdatePreference';
import useUserData from '../../hooks/data/useUserData';

// import {Notifications} from 'react-native-notifications';
// import {NotificationsHook} from 'the-core-ui-module-tdnotifications';

export default function NotificationPermissionScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;

  const navigation = useNavigation();

  // const {updateNotificationsPreferencesTo} = NotificationsHook();

  const {preferences, getPreferences, setPreferences} = useUserData();

  const [updatePreferences] = useMutation(UpdatePreference);

  // MARK: - Logic
  useEffect(() => {
    getPreferences();
  }, []);

  const disallowNotifications = () => {
    return AsyncStorage.setItem('@NOTIFICATIONS_ASKED', 'false').then((res) => {
      navigateForward();
    });
  };

  const saveSetting = async (enabled) => {
    // Notifications.registerRemoteNotifications();
    // updateNotificationsPreferencesTo(true);

    const newPreferences = {
      emails: preferences.emails || true,
      errorReports: preferences.errorReports || true,
      analytics: preferences.analytics || true,
      downloadQuality: preferences.downloadQuality || "HIGH",
      notifications: enabled,
      weightPreference: preferences.weightPreference || 'KG',
    };

    setPreferences(newPreferences);

    await AsyncStorage.setItem('@NOTIFICATIONS_ASKED', 'true')
      .then(() => {
        return updatePreferences({
          variables: {
            input: {
              ...newPreferences,
            },
          },
        });
      })
      .then((res) => {
        console.log('NotificationsScreenUpdate', res);
        navigateForward();
      })
      .catch((err) => {
        console.log(err, '<---notifications screen error');
      });
  };

  // MARK: - Actions
  const onPressButton = () => {
    saveSetting(true);
  };
  const onPressBottomButton = () => {
    disallowNotifications();
  };

  const navigateForward = () => {
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
      icon="chevron"
    />
  );
}
