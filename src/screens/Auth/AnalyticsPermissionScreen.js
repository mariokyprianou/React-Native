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

export default function AnalyticsPermissionScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;

  const navigation = useNavigation();

  // MARK: - Logic

  // MARK: - Actions
  const onPressButton = () => {
    navigation.navigate('TabContainer');
  };
  const onPressBottomButton = () => {
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
    />
  );
}
