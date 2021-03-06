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
import {useBackHandler} from '@react-native-community/hooks';

import TDSettings from 'the-core-ui-module-tdsettings';
import SettingsCell from 'the-core-ui-module-tdsettings/src/cells/SettingsCell';
import VersionCell from 'the-core-ui-module-tdsettings/src/cells/VersionCell';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {useMutation} from '@apollo/client';
import {useRoute} from '@react-navigation/core';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import useDictionary from '../../hooks/localisation/useDictionary';
import DropDownIcon from '../../components/cells/DropDownIcon';
import Spacer from '../../components/Utility/Spacer';
import UpdatePreference from '../../apollo/mutations/UpdatePreference';
import useUserData from '../../hooks/data/useUserData';
import AsyncStorage from '@react-native-community/async-storage';
import displayAlert from '../../utils/DisplayAlert';
import UpdateProfile from '../../apollo/mutations/UpdateProfile';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import UseData from '../../hooks/data/UseData';
import {useNetInfo} from '@react-native-community/netinfo';
import useCommonData from '../../hooks/data/useCommonData';
import useProgressData from '../../hooks/data/useProgressData';
import useLoading from '../../hooks/loading/useLoading';

const SettingsScreen = ({}) => {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getValues} = FormHook();
  const {dictionary, getLanguage, setLanguage, locale} = useDictionary();
  const {SettingsDict, LanguageDict, ProfileDict, OfflineMessage} = dictionary;
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {isConnected, isInternetReachable} = useNetInfo();

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
    getProfile,
  } = useUserData();

  const {commonDataProviderSyncronousUpdate} = useCommonData();
  const {dataProviderSyncronousUpdate} = UseData();
  const {progressProviderSyncronousUpdate} = useProgressData();
  const {setLoading} = useLoading();

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

  useBackHandler(() => {
    updateSettingsAndNavigate();
    return true;
  });

  const [updatePreferences] = useMutation(UpdatePreference);
  const [updateProfile] = useMutation(UpdateProfile);

  const [marketingPrefEmail, setMarketingPrefEmail] = useState(
    preferences.emails,
  );
  const [marketingPrefNotifications, setMarketingPrefNotifications] = useState(
    preferences.notifications,
  );

  const [prefErrorReports, setPrefErrorReports] = useState(
    preferences.errorReports,
  );
  const [prefAnalytics, setPrefAnalytics] = useState(preferences.analytics);
  const [downloadWorkouts, setDownloadWorkouts] = useState(true);
  const [downloadQuality, setDownloadQuality] = useState(
    preferences.downloadQuality,
  );
  const [weightPref, setWeightPref] = useState(preferences.weightPreference);

  // MARK: - Logic
  const checkDownloadEnabled = async () => {
    const value = (await AsyncStorage.getItem('@DOWNLOAD_ENABLED')) || 'false';
    const enabled = JSON.parse(value);
    setDownloadWorkouts(enabled);
  };

  useEffect(() => {
    checkDownloadEnabled();
    getPreferences();
  }, []);

  useEffect(() => {
    if (preferences) {
      setMarketingPrefEmail(preferences.emails);
      setMarketingPrefNotifications(preferences.notifications);
      setPrefErrorReports(preferences.errorReports);
      setPrefAnalytics(preferences.analytics);
      setDownloadQuality(preferences.downloadQuality);
      setWeightPref(preferences.weightPreference);
    }
  }, [preferences]);

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
      lineHeight: fontSize(26),
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
      lineHeight: fontSize(20),
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

    if (!isConnected) {
      displayAlert({text: OfflineMessage});
      return;
    }
    console.log('DOWNLOAD_ENABLED', downloadWorkouts);

    // await AsyncStorage.setItem(
    //   '@DOWNLOAD_ENABLED',
    //   JSON.stringify(downloadWorkouts),
    // );

    // if (downloadWorkouts) {
    //   await AsyncStorage.setItem(
    //     '@SHOULD_CACHE_NEW_WEEK',
    //     JSON.stringify(true),
    //   );

    //   //initCacheWeekVideos(programme.currentWeek.workouts);
    // }

    const {
      formDownloadsQuality,
      formTimeZone,
      formLanguage,
      formWeightMeasurement,
    } = getValues();

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

    analytics().setAnalyticsCollectionEnabled(prefAnalytics);
    crashlytics().setCrashlyticsCollectionEnabled(prefErrorReports);

    console.log('newPreferences', newPreferences);

    const newUserData = {
      familyName: userData.familyName,
      givenName: userData.givenName,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
      // country: userData.country,
      // region: userData.region,
      timeZone: formTimeZone || userData.timeZone,
    };

    console.log('newUserData', newUserData);

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
            text: ProfileDict.UnableToUpdate,
          });
        } else {
          setPreferences(newPreferences);
        }
      })
      .catch(() => {
        displayAlert({
          text: ProfileDict.UnableToUpdate,
        });
      });

    const prevLanguage = getLanguage();

    const languageMap = {
      English: 'English',
      ????????????????????????: 'English',
      Hindi: 'Hindi',
      ???????????????: 'Hindi',
    };
    const language = languageMap[formLanguage] || languageDropdownData[0];

    if (prevLanguage !== language) {
      displayAlert({
        title: null,
        text: ProfileDict.RefreshAlert,
        buttons: [
          {
            text: ProfileDict.Cancel,
            style: 'cancel',
          },
          {
            text: ProfileDict.Refresh,
            onPress: async () => {
              setLoading(true);
              // We only want to change language if the user selects to refresh,
              // otherwise we'll end up with static translated content and not strtanslated dynamic content
              await setLanguage(language);
              await Promise.all([
                dataProviderSyncronousUpdate(),
                commonDataProviderSyncronousUpdate(),
                progressProviderSyncronousUpdate(),
                getProfile(),
              ]);
              setLoading(false);
            },
          },
        ],
      });
    }
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

  const languageDropdownData = [LanguageDict.English, LanguageDict.Hindi];

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

  const [appSoundsPref, setAppSoundsPref] = useState('On');
  const appSoundsData = [SettingsDict.On, SettingsDict.Off];
  const appSoundsMap = {
    On: SettingsDict.On,
    Off: SettingsDict.Off,
  };

  useEffect(() => {
    AsyncStorage.getItem('@app_sounds').then((res) => {
      if (res !== null) {
        setAppSoundsPref(res);
      } else {
        setAppSoundsPref('On');
        AsyncStorage.setItem('@app_sounds', 'On');
      }
    });
  }, []);

  useEffect(() => {
    const {formAppSounds} = getValues();
    if (formAppSounds) {
      AsyncStorage.setItem(
        '@app_sounds',
        formAppSounds === appSoundsMap.On ? 'On' : 'Off',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues]);

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
    // {
    //   customComponent: () => (
    //     <SettingsCell
    //       title={SettingsDict.MarketingPrefNotifications.toUpperCase()}
    //       titleTextStyle={styles.switchTitleStyle}
    //       titleSwitchContainerStyle={styles.switchTitleContainerStyle}
    //       showSwitch
    //       switchValue={marketingPrefNotifications}
    //       switchStyle={styles.switchStyle}
    //       onSwitchChange={onToggleMarketingPrefNotifications}
    //     />
    //   ),
    // },
    {
      customComponent: () => (
        <View style={{marginTop: getHeight(8)}}>
          <Text style={styles.headerTextStyle}>{SettingsDict.AppSettings}</Text>
        </View>
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
          descriptionTextStyle={{
            ...styles.switchDescriptionStyle,
            marginBottom: getHeight(10),
          }}
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
          descriptionTextStyle={{
            ...styles.switchDescriptionStyle,
            marginBottom: getHeight(8),
          }}
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
  // const language = getLanguage();
  const language = locale === 'hi-IN' ? '???????????????' : 'English';
  const cells6 = [
    {
      name: 'formLanguage',
      type: 'dropdown',
      label: SettingsDict.Language,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: language || languageDropdownData[0],
      data: language
        ? [
            language,
            ...languageDropdownData.filter((item) => item !== language),
          ]
        : languageDropdownData,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
    },
  ];

  const cells7 = [
    {
      name: 'formAppSounds',
      type: 'dropdown',
      label: SettingsDict.AppSounds,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: appSoundsMap[appSoundsPref],
      data: appSoundsData,
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
      <TDSettings
        cells={cells}
        config={settingsConfig}
        scrollProps={{scrollEnabled: false}}
      />
      <Spacer height={20} />
      {/* Weight */}
      <Form cells={cells2} config={formConfig} />
      <Spacer height={25} />

      {/* Download */}
      {/* <TDSettings
        cells={cells3}
        config={settingsConfig}
        scrollProps={{scrollEnabled: false}}
      /> */}

      {/* Download Quality */}
      <Form cells={cells4} config={formConfig} />
      <Spacer height={25} />

      {/* Download Quality */}
      <Form cells={cells7} config={formConfig} />
      <Spacer height={25} />

      {/* Data Collection */}
      <TDSettings
        cells={cells5}
        config={settingsConfig}
        scrollProps={{scrollEnabled: false}}
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
