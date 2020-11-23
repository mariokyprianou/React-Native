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
  const navigation = useNavigation();

  const {cleanErrors, getValues, updateError} = FormHook();
  const {dictionary, getLanguage} = useDictionary();
  const {SettingsDict, LanguageDict} = dictionary;

  const dropdownData = [
    LanguageDict.English,
    LanguageDict.Hindi,
    LanguageDict.Urdu,
  ];

  navigation.setOptions({
    header: () => <Header title={SettingsDict.ScreenTitle} goBack />,
  });

  const {getHeight, getWidth} = ScaleHook();
  const {
    colors,
    cellFormConfig,
    cellFormStyles,
    textStyles,
    dropdownStyle,
  } = useTheme();

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
      header: () => <Header title={SettingsDict.ScreenTitle} goBack />,
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
      backgroundColor: colors.backgroundWhite100,
      justifyContent: 'space-between',
      paddingVertical: getHeight(20),
    },
    formContainer: {
      width: '90%',
    },
    headerTextStyle: {
      ...textStyles.bold20_black100,
      marginBottom: getHeight(10),
      textAlign: 'left',
    },
    versionTextStyle: {
      ...textStyles.semiBold12_black100,
      textAlign: 'left',
    },
    switchTitleStyle: {
      ...textStyles.semiBold14_brownishGrey100,
      alignSelf: 'center',
      textAlign: 'left',
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
      textAlign: 'left',
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
          {SettingsDict.MarketingPreferences}
        </Text>
      ),
    },
    {
      customComponent: () => (
        <SettingsCell
          title={SettingsDict.MarketingPrefEmail.toUpperCase()}
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
          title={SettingsDict.MarketingPrefNotifications.toUpperCase()}
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
        <Text style={styles.headerTextStyle}>{SettingsDict.AppSettings}</Text>
      ),
    },
    {
      customComponent: () => (
        <SettingsCell
          title={SettingsDict.DownloadWorkouts.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          showSwitch
          switchValue={downloadWorkouts}
          switchStyle={styles.switchStyle}
          onSwitchChange={onToggleDownloadWorkouts}
          descriptionTextStyle={styles.switchDescriptionStyle}
          description={SettingsDict.DownloadWorkoutsText}
        />
      ),
    },
  ];

  const cells2 = [
    {
      name: 'settings_downloadsQuality',
      type: 'dropdown',
      label: SettingsDict.DownloadWorkoutsQuality,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      //   placeholder: registrationData.countries[0],
      //   data: registrationData.countries,
    },
    {
      name: 'settings_timeZone',
      type: 'dropdown',
      label: SettingsDict.DownloadWorkoutsTimeZone,
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
          title={SettingsDict.DataCollection.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          descriptionTextStyle={styles.switchDescriptionStyle}
          description={SettingsDict.DataCollectionText}
        />
      ),
    },
    {
      customComponent: () => (
        <SettingsCell
          title={SettingsDict.ErrorReports.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          showSwitch
          switchValue={errorReports}
          switchStyle={styles.switchStyle}
          onSwitchChange={onToggleErrorReports}
          descriptionTextStyle={styles.switchDescriptionStyle}
          description={SettingsDict.ErrorReportsText}
        />
      ),
    },
    {
      customComponent: () => (
        <SettingsCell
          title={SettingsDict.Analytics.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          showSwitch
          switchValue={analytics}
          switchStyle={styles.switchStyle}
          onSwitchChange={onToggleAnalytics}
          descriptionTextStyle={styles.switchDescriptionStyle}
          description={SettingsDict.AnalyticsText}
        />
      ),
    },
  ];

  const cells4 = [
    {
      name: 'settings_language',
      type: 'dropdown',
      label: SettingsDict.Language,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: getLanguage() || dropdownData[0],
      data: dropdownData,
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
        versionText={SettingsDict.VersionText}
        versionTextStyle={styles.versionTextStyle}
        versionContainerStyle={{}}
      />
    </ScrollView>
  );
};

export default SettingsScreen;
