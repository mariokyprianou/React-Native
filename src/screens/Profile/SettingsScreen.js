/*
 * Created Date: Tue, 10th Nov 2020, 05:25:23 am
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {Text, ScrollView, View} from 'react-native';
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
import UpdatePreference from '../../apollo/mutations/UpdatePreference';
import useUserData from '../../hooks/data/useUserData';
import useData from '../../hooks/data/UseData';
import AsyncStorage from '@react-native-community/async-storage';
import displayAlert from '../../utils/DisplayAlert';
import UpdateProfile from '../../apollo/mutations/UpdateProfile';
import {firebase} from '@react-native-firebase/analytics';

const SettingsScreen = ({}) => {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getValues} = FormHook();
  const {dictionary, getLanguage, setLanguage} = useDictionary();
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
  const {
    userData,
    setUserData,
    preferences,
    getPreferences,
    setPreferences,
    timeZones,
  } = useUserData();

  const navigation = useNavigation();

  navigation.setOptions({
    header: () => (
      <Header
        title={SettingsDict.ScreenTitle}
        goBack
        leftAction={() => updateSettingsAndNavigate()}
      />
    ),
  });

  const [updatePreferences] = useMutation(UpdatePreference);
  const [updateProfile] = useMutation(UpdateProfile);

  const [marketingPrefEmail, setMarketingPrefEmail] = useState(
    preferences.emails || false,
  );
  const [marketingPrefNotifications, setMarketingPrefNotifications] = useState(
    preferences.notifications || false,
  );
  const [prefErrorReports, setPrefErrorReports] = useState(
    preferences.errorReports || false,
  );
  const [prefAnalytics, setPrefAnalytics] = useState(
    preferences.analytics || false,
  );
  const [downloadWorkouts, setDownloadWorkouts] = useState(true);
  const [downloadQuality, setDownloadQuality] = useState(
    preferences.downloadQuality || 'LOW',
  );
  const [weightPref, setWeightPref] = useState(
    preferences.weightPreference || 'KG',
  );

  // MARK: - Logic
  const checkDownloadEnabled = async () => {
    const value = (await AsyncStorage.getItem('@DOWNLOAD_ENABLED')) || 'false';
    const enabled = JSON.parse(value);
    setDownloadWorkouts(enabled);
  };

  useEffect(() => {
    checkDownloadEnabled();
    getPreferences()
    
  }, []);

  useEffect(()  => {
    setMarketingPrefEmail(preferences.emails || false);
    setMarketingPrefNotifications(preferences.notifications || false);
    setPrefErrorReports(preferences.errorReports || false);
    setPrefAnalytics(preferences.analytics || false);
    setDownloadQuality(preferences.downloadQuality || "LOW");
    setWeightPref(preferences.weightPreference || "KG");
  }, [preferences])

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flex: 1,
    },
    contentContainer: {
      alignItems: 'center',
      backgroundColor: colors.backgroundWhite100,
      justifyContent: 'space-between',
      paddingVertical: getHeight(10),
    },
    formContainer: {
      width: '90%',
    },
    headerTextStyle: {
      ...textStyles.bold20_black100,
      marginBottom: getHeight(12),
      textAlign: 'left',
    },
    versionTextStyle: {
      ...textStyles.semiBold12_black100,
      textAlign: 'left',
    },
    switchTitleStyle: {
      ...textStyles.medium14_brownishGrey100,
      alignSelf: 'center',
      textAlign: 'left',
    },
    switchTitleContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: getHeight(10),
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
  const updateSettingsAndNavigate = async () => {
    navigation.goBack();

    
    AsyncStorage.setItem('@DOWNLOAD_ENABLED', JSON.stringify(downloadWorkouts));

    const {
      formDownloadsQuality,
      formTimeZone,
      formLanguage,
      formWeightMeasurement,
    } = getValues();

    const language = formLanguage || getLanguage();
    setLanguage(language);

    const newDownloadQuality =
      Object.keys(downloadQualityMap).find(
        (key) => downloadQualityMap[key] === formDownloadsQuality,
      ) || downloadQuality;

    const newWeightPref =
      Object.keys(weightDropdownMap).find(
        (key) => weightDropdownMap[key] === formWeightMeasurement,
      ) || weightPref;

    const newPreferences = {
      notifications: marketingPrefNotifications,
      emails: marketingPrefEmail,
      errorReports: prefErrorReports,
      analytics: prefAnalytics,
      downloadQuality: newDownloadQuality,
      weightPreference: newWeightPref,
    };

    firebase.analytics().setAnalyticsCollectionEnabled(prefAnalytics);
    console.log(
      "newPreferences", newPreferences
    );

    const newUserData = {
      familyName: userData.familyName,
      givenName: userData.givenName,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
      // country: userData.country,
      // region: userData.region,
      timeZone: formTimeZone || userData.timeZone,
    };

    console.log("newUserData", newUserData)

    updateProfile({
      variables: {
        input: {
          ...newUserData,
        },
      },
    })
      .then((res) => {
        setUserData({...userData, ...newUserData});
      })
      .catch((err) => console.log(err));

    updatePreferences({
      variables: {
        input: {
          ...newPreferences,
        },
      },
    })
      .then((res) => {
        if (!res.data) {
          displayAlert({
            text: 'Unable to update settings',
          });
        } else {
          setPreferences(newPreferences);
          
        }
      })
      .catch((err) => {
        displayAlert({
          text: 'Unable to update settings',
        });
      });
  };

  function onToggleMarketingPrefEmail() {
    setMarketingPrefEmail(!marketingPrefEmail);
  }
  function onToggleMarketingPrefNotifications() {
    setMarketingPrefNotifications(!marketingPrefNotifications);
  }
  function onToggleErrorReports() {
    setPrefErrorReports(!prefErrorReports);
  }
  function onToggleAnalytics() {
    setPrefAnalytics(!prefAnalytics);
  }
  function onToggleDownloads() {
    setDownloadWorkouts(!downloadWorkouts);
  }

  const languageDropdownData = [
    LanguageDict.English,
    LanguageDict.Hindi,
    LanguageDict.Urdu,
  ];

  const downloadQualityDropdownData = [
    SettingsDict.DownloadQualityHigh,
    SettingsDict.DownloadQualityLow,
  ];

  const downloadQualityMap = {
    HIGH: SettingsDict.DownloadQualityHigh,
    LOW: SettingsDict.DownloadQualityLow,
  };

  const weightDropdownData = [SettingsDict.WeightKgs, SettingsDict.WeightLbs];

  const weightDropdownMap = {
    KG: SettingsDict.WeightKgs,
    LB: SettingsDict.WeightLbs,
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
        <View style={{marginTop: getHeight(8)}}><Text style={styles.headerTextStyle}>{SettingsDict.AppSettings}</Text></View>
      ),
    },
  ];

  const cells2 = [
    {
      name: 'formWeightMeasurement',
      type: 'dropdown',
      label: SettingsDict.Weight,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: weightDropdownMap[weightPref],
      data: weightDropdownData,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
     
    },
  ];

  const cells3 = [
    {
      customComponent: () => (
        <SettingsCell
          title={SettingsDict.DownloadWorkouts.toUpperCase()}
          titleTextStyle={styles.switchTitleStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          showSwitch
          switchValue={downloadWorkouts}
          switchStyle={styles.switchStyle}
          onSwitchChange={onToggleDownloads}
          descriptionTextStyle={styles.switchDescriptionStyle}
          description={SettingsDict.DownloadWorkoutsText}
        />
      ),
    },
  ];

  const cells4 = [
    {
      name: 'formDownloadsQuality',
      type: 'dropdown',
      label: SettingsDict.DownloadWorkoutsQuality,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: downloadQualityMap[downloadQuality],
      data: downloadQualityDropdownData,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
    },
    {
      name: 'formTimeZone',
      type: 'dropdown',
      label: SettingsDict.DownloadWorkoutsTimeZone,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: userData.timeZone,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
      data: timeZones,
    },
  ];
  const cells5 = [
    {
      customComponent: () => (
        <SettingsCell
          title={SettingsDict.DataCollection}
          titleTextStyle={styles.headerTextStyle}
          titleSwitchContainerStyle={styles.switchTitleContainerStyle}
          descriptionTextStyle={{...styles.switchDescriptionStyle, marginBottom: getHeight(10)}}
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
          descriptionTextStyle={{...styles.switchDescriptionStyle, marginBottom: getHeight(8)}}
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
  const cells6 = [
    {
      name: 'formLanguage',
      type: 'dropdown',
      label: SettingsDict.Language,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: getLanguage() || languageDropdownData[0],
      data: getLanguage() ? [getLanguage(), ...languageDropdownData.filter(item => item !== getLanguage())] : languageDropdownData,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
    },
  ];

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <TDSettings cells={cells} config={settingsConfig} scrollEnabled={false} />
      <Spacer height={20}/>
      {/* Weight */}
      <Form cells={cells2} config={formConfig} />   
      <Spacer height={25}/>

      {/* Download */}
      <TDSettings
        cells={cells3}
        config={settingsConfig}
        scrollEnabled={false}
      />

      {/* Download Quality */}
      <Form cells={cells4} config={formConfig} />
      <Spacer height={25}/>
      
      {/* Data Collection */}
      <TDSettings
        cells={cells5}
        config={settingsConfig}
        scrollEnabled={false}
      />
      <Form cells={cells6} config={formConfig} />
      <Spacer height={20} />
      <VersionCell
        versionText={SettingsDict.VersionText}
        versionTextStyle={styles.versionTextStyle}
        versionContainerStyle={{}}
      />
    </ScrollView>
  );
};

export default SettingsScreen;
