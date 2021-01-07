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
import {useQuery, useMutation} from '@apollo/client';
import {useRoute} from '@react-navigation/core';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import useDictionary from '../../hooks/localisation/useDictionary';
import DropDownIcon from '../../components/cells/DropDownIcon';
import Spacer from '../../components/Utility/Spacer';
import Preferences from '../../apollo/queries/Preferences';

const SettingsScreen = ({}) => {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {dictionary, getLanguage} = useDictionary();
  const {SettingsDict, LanguageDict} = dictionary;
  const {getHeight, getWidth} = ScaleHook();
  const {
    colors,
    cellFormConfig,
    cellFormStyles,
    textStyles,
    dropdownStyle,
  } = useTheme();
  const {params: timeZone} = useRoute();
  const {loading, error, data} = useQuery(Preferences);

  const languageDropdownData = [
    LanguageDict.English,
    LanguageDict.Hindi,
    LanguageDict.Urdu,
  ];

  const downloadQualityDropdownData = [
    SettingsDict.DownloadQualityHigh,
    SettingsDict.DownloadQualityLow,
  ];

  navigation.setOptions({
    header: () => <Header title={SettingsDict.ScreenTitle} goBack />,
  });

  const {
    settings_downloadsQuality,
    settings_timeZone,
    settings_language,
  } = getValues();

  const [marketingPrefEmail, setMarketingPrefEmail] = useState(false);
  const [marketingPrefNotifications, setMarketingPrefNotifications] = useState(
    false,
  );
  const [downloadWorkouts, setDownloadWorkouts] = useState(true);
  const [prefDownloadQuality, setPrefDownloadQuality] = useState(true);
  const [prefErrorReports, setPrefErrorReports] = useState(false);
  const [prefAnalytics, setPrefAnalytics] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={SettingsDict.ScreenTitle} goBack />,
    });
  }, []);

  useEffect(() => {
    if (data) {
      const {
        emails,
        notifications,
        analytics,
        downloadQuality,
        errorReports,
      } = data.preferences;

      setMarketingPrefEmail(emails);
      setMarketingPrefNotifications(notifications);
      setPrefErrorReports(errorReports);
      setPrefAnalytics(analytics);
      setPrefDownloadQuality(downloadQuality);
    } else {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   // TODO - quality changed
  // }, [settings_downloadsQuality]);

  // useEffect(() => {
  //   // TODO - language changed
  // }, [settings_language]);

  // useEffect(() => {
  //   // TODO - timeZone changed
  // }, [settings_timeZone]);

  // ** ** ** ** ** STYLES ** ** ** ** **
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
      trackColorOn: colors.aquamarine100,
      thumbTintColorOn: colors.white100,
      thumbTintColorOff: colors.white100,
      ios_backgroundColor: colors.aquamarine100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
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
    setPrefErrorReports(bool);
  };
  const onToggleAnalytics = (bool) => {
    // TODO
    setPrefAnalytics(bool);
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
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
      placeholder: downloadQualityDropdownData[0],
      data: downloadQualityDropdownData,
    },
    {
      name: 'settings_timeZone',
      type: 'dropdown',
      label: SettingsDict.DownloadWorkoutsTimeZone,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: timeZone.timeZone,
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
          switchValue={prefErrorReports}
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
          switchValue={prefAnalytics}
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
      placeholder: getLanguage() || languageDropdownData[0],
      data: languageDropdownData,
    },
  ];

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
