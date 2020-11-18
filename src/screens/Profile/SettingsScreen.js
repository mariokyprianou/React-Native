/*
 * Created Date: Tue, 10th Nov 2020, 05:25:23 am
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import TDSettings from 'the-core-ui-module-tdsettings';
import SettingsCell from 'the-core-ui-module-tdsettings/src/cells/SettingsCell';
import VersionCell from 'the-core-ui-module-tdsettings/src/cells/VersionCell';
import {Form, FormHook} from 'the-core-ui-module-tdforms';

import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import useDictionary from '../../hooks/localisation/useDictionary';
import DropDownIcon from '../../components/cells/DropDownIcon';
import Spacer from '../../components/Utility/Spacer';

const SettingsScreen = ({}) => {
  // MARK: - Hooks
  const {getHeight, getWidth} = ScaleHook();
  const {
    colors,
    cellFormConfig,
    cellFormStyles,
    textStyles,
    dropdownStyle,
  } = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {
    Settings_ScreenTitle,
    Settings_VersionText,
    Settings_MarketingPreferences,
    Settings_AppSettings,
    Settings_MarketingPrefEmail = '',
    Settings_MarketingPrefNotifications = '',
    Settings_DownloadWorkouts = '',
    Settings_DownloadWorkoutsText,
    Settings_DownloadWorkoutsQuality,
    Settings_DownloadWorkoutsTimeZone,
    Settings_DataCollection = '',
    Settings_DataCollectionText,
    Settings_ErrorReports = '',
    Settings_ErrorReportsText,
    Settings_Analytics = '',
    Settings_AnalyticsText,
    Settings_Language,
  } = dictionary;
  const {
    settings_downloadsQuality,
    settings_timeZone,
    settings_language,
  } = getValues();

  // MARK: - Local
  const [marketingPrefEmail, setMarketingPrefEmail] = useState(false);
  const [marketingPrefNotifications, setMarketingPrefNotifications] = useState(
    false,
  );
  const [downloadWorkouts, setDownloadWorkouts] = useState(false);
  const [errorReports, setErrorReports] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  // MARK: - Use Effect
  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={Settings_ScreenTitle} goBack />,
    });
  }, []);

  useEffect(() => {
    // TODO - quality changed
  }, [settings_downloadsQuality]);

  useEffect(() => {
    // TODO - language changed
  }, [settings_language]);

  useEffect(() => {
    // TODO - timeZone changed
  }, [settings_timeZone]);

  // MARK: - Actions
  const onToggleMarketingPrefEmail = (bool) => {
    // TODO
    setMarketingPrefEmail(bool);
  };
  const onToggleMarketingPrefNotifications = (bool) => {
    // TODO
    setMarketingPrefNotifications(bool);
  };
  const onToggleDownloadWorkouts = (bool) => {
    // TODO
    setDownloadWorkouts(bool);
  };
  const onToggleErrorReports = (bool) => {
    // TODO
    setErrorReports(bool);
  };
  const onToggleAnalytics = (bool) => {
    // TODO
    setAnalytics(bool);
  };

  // MARK: - Styles
  const styles = {
    container: {
      flex: 1,
    },
    contentContainer: {
      alignItems: 'center',
      backgroundColor: colors.offWhite,
      justifyContent: 'space-between',
      paddingBottom: getHeight(40),
    },
    formContainer: {
      width: '90%',
    },
    headerTextStyle: {
      ...textStyles.bold20_black100,
      marginTop: getHeight(20),
      marginBottom: getHeight(10),
    },
    versionTextStyle: {
      ...textStyles.semiBold12_black100,
    },
    switchTitleStyle: {
      ...textStyles.semiBold14_brownishGrey100,
      alignSelf: 'center',
    },
    switchTitleContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: getHeight(16),
    },
    switchDescriptionStyle: {
      ...textStyles.regular15_brownishGrey100,
      marginBottom: getHeight(16),
    },
    switchStyle: {
      //   trackColorOff: colors.aquamarine100,
      trackColorOn: colors.aquamarine100,
      thumbTintColorOn: colors.white100,
      ios_backgroundColor: colors.aquamarine100,
    },
  };

  // MARK: - Settings Cells & Forms

  const formConfig = {
    ...cellFormConfig,
    formContainerStyle: {
      ...styles.formContainer,
      marginTop: -getHeight(20),
      paddingTop: 0,
    },
  };

  const settingsConfig = {
    showVersion: false,
    containerStyle: {...styles.formContainer},
  };
  const cells = [
    {
      customComponent: () => (
        <Text style={styles.headerTextStyle}>
          {Settings_MarketingPreferences}
        </Text>
      ),
    },
    {
      customComponent: () => (
        <SettingsCell
          title={Settings_MarketingPrefEmail.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          showSwitch
          switchValue={marketingPrefEmail}
          switchStyle={styles.switchStyle}
          onSwitchChange={onToggleMarketingPrefEmail}
        />
      ),
    },
    {
      customComponent: () => (
        <SettingsCell
          title={Settings_MarketingPrefNotifications.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          showSwitch
          switchValue={marketingPrefNotifications}
          switchStyle={styles.switchStyle}
          onSwitchChange={onToggleMarketingPrefNotifications}
        />
      ),
    },
    {
      customComponent: () => (
        <Text style={styles.headerTextStyle}>{Settings_AppSettings}</Text>
      ),
    },
    {
      customComponent: () => (
        <SettingsCell
          title={Settings_DownloadWorkouts.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          showSwitch
          switchValue={downloadWorkouts}
          switchStyle={styles.switchStyle}
          onSwitchChange={onToggleDownloadWorkouts}
          descriptionTextStyle={styles.switchDescriptionStyle}
          description={Settings_DownloadWorkoutsText}
        />
      ),
    },
  ];

  const cells2 = [
    {
      name: 'settings_downloadsQuality',
      type: 'dropdown',
      label: Settings_DownloadWorkoutsQuality,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      //   placeholder: registrationData.countries[0],
      //   data: registrationData.countries,
    },
    {
      name: 'settings_timeZone',
      type: 'dropdown',
      label: Settings_DownloadWorkoutsTimeZone,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      //   placeholder: registrationData.countries[0],
      //   data: registrationData.countries,
    },
  ];
  const cells3 = [
    {
      customComponent: () => (
        <SettingsCell
          title={Settings_DataCollection.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          descriptionTextStyle={styles.switchDescriptionStyle}
          description={Settings_DataCollectionText}
        />
      ),
    },
    {
      customComponent: () => (
        <SettingsCell
          title={Settings_ErrorReports.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          showSwitch
          switchValue={errorReports}
          switchStyle={styles.switchStyle}
          onSwitchChange={onToggleErrorReports}
          descriptionTextStyle={styles.switchDescriptionStyle}
          description={Settings_ErrorReportsText}
        />
      ),
    },
    {
      customComponent: () => (
        <SettingsCell
          title={Settings_Analytics.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          showSwitch
          switchValue={analytics}
          switchStyle={styles.switchStyle}
          onSwitchChange={onToggleAnalytics}
          descriptionTextStyle={styles.switchDescriptionStyle}
          description={Settings_AnalyticsText}
        />
      ),
    },
  ];

  const cells4 = [
    {
      name: 'settings_language',
      type: 'dropdown',
      label: Settings_Language,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      //   placeholder: registrationData.countries[0],
      //   data: registrationData.countries,
    },
  ];

  // MARK: - Render

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <TDSettings cells={cells} config={settingsConfig} scrollEnabled={false} />
      <Form cells={cells2} config={formConfig} />
      <TDSettings
        cells={cells3}
        config={settingsConfig}
        scrollEnabled={false}
      />
      <Form cells={cells4} config={formConfig} />
      <Spacer height={25} />
      <VersionCell
        versionText={Settings_VersionText}
        versionTextStyle={styles.versionTextStyle}
        versionContainerStyle={{}}
      />
    </ScrollView>
  );
};

export default SettingsScreen;
