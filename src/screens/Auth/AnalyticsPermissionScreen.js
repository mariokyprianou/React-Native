/*
 * Created Date: Mon, 9th Nov 2020, 12:22:43 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useEffect} from 'react';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreenUI from './PermissionScreenUI';

export default function AnalyticsPermissionScreen() {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {AnalyticsPermissions_Title, AnalyticsPermissions_Text} = dictionary;

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
    <PermissionScreenUI
      title={AnalyticsPermissions_Title}
      text={AnalyticsPermissions_Text}
      buttonType="allowAnalytics"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
    />
  );
}
