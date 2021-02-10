/*
 * Created Date: Mon, 9th Nov 2020, 12:22:43 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useEffect} from 'react';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreenUI from './PermissionScreenUI';
import Header from '../../components/Headers/Header';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import UpdatePreference from '../../apollo/mutations/UpdatePreference';
import AsyncStorage from '@react-native-community/async-storage';

import useUserData from '../../hooks/data/useUserData';

export default function AnalyticsPermissionScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;

  const navigation = useNavigation();
  const {preferences, getPreferences, setPreferences} = useUserData();
  const [updatePreferences] = useMutation(UpdatePreference);

  // MARK: - Logic
  useEffect(() => {
    getPreferences();
  }, []);

  const saveSetting = async (enabled) => {
    const newPreferences = {
      emails: preferences.emails,
      downloadQuality: preferences.downloadQuality,
      notifications: preferences.notifications,
      errorReports: enabled,
      analytics: enabled,
    };
    setPreferences(newPreferences);
    await AsyncStorage.setItem('@ANALYTICS_ASKED', 'true')
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
        console.log('AnalyticsScreenUpdate', res);

        navigateForward();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // MARK: - Actions
  const onPressButton = () => {
    saveSetting(true);
  };
  const onPressBottomButton = () => {
    saveSetting(false);
  };

  const navigateForward = () => {
    navigation.navigate('TabContainer');
  };

  // MARK: - Render
  return (
    <PermissionScreenUI
      title={AuthDict.AnalyticsPermissionsScreenTitle}
      text={AuthDict.AnalyticsPermissionsText}
      buttonType="allowAnalytics"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
      icon="chevron"
    />
  );
}
