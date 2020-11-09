/*
 * Created Date: Mon, 9th Nov 2020, 12:22:43 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useEffect} from 'react';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreen from './PermissionScreen';

export default function AnalyticsPermissionScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {AnalyticsPermissionsTitle, AnalyticsPermissionsText} = dictionary;

  // MARK: - Logic

  // MARK: - Actions
  const onPressButton = () => {
    // TODO: - Allow Analytics
  };
  const onPressBottomButton = () => {
    // TODO: - Skip permission
  };

  // MARK: - Render
  return (
    <PermissionScreen
      title={AnalyticsPermissionsTitle}
      text={AnalyticsPermissionsText}
      buttonType="allowAnalytics"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
    />
  );
}
