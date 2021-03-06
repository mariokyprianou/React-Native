/*
 * Created Date: Thu, 14th Jan 2021, 16:39:16 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useCallback, useEffect} from 'react';
import {Platform, Linking} from 'react-native';
import {Auth, Hub} from 'aws-amplify';
import {getUniqueId} from 'react-native-device-info';

import AsyncStorage from '@react-native-community/async-storage';

import {useMutation} from '@apollo/client';
import UserDataContext from './UserDataContext';
import Preferences from '../../apollo/queries/Preferences';
import UpdatePreference from '../../apollo/mutations/UpdatePreference';
import GetSubscription from '../../apollo/queries/GetSubscription';
import * as R from 'ramda';
import {format} from 'date-fns';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

import Profile from '../../apollo/queries/Profile';

import useCustomQuery from '../../hooks/customQuery/useCustomQuery';
import OfflineUtils from './OfflineUtils';
import Intercom from 'react-native-intercom';
import displayAlert from '../../utils/DisplayAlert';
import useDictionary from '../localisation/useDictionary';

export default function UserDataProvider(props) {
  const {runQuery} = useCustomQuery();

  const [userData, setUserData] = useState({});
  const [preferences, setPreferences] = useState({
    notifications: false,
    emails: false,
    errorReports: true,
    analytics: false,
    downloadQuality: 'HIGH',
    weightPreference: 'KG',
  });

  const [timeZones, setTimeZones] = useState([
    'Asia/Kolkata',
    'Europe/London',
    'Africa/Johannesburg',
    'America/Cordoba',
    'America/Honolulu',
    'America/Anchorage',
    'America/Campo_Grande',
    'America/Chicago',
    'America/Detroit',
    'America/Halifax',
    'America/Los_Angeles',
    'America/New_York',
    'America/Noronha',
    'America/Phoenix',
    'America/Sao_Paulo',
    'America/St_Johns',
    'America/Vancouver',
    'Asia/Aden',
    'Asia/Colombo',
    'Asia/Dhaka',
    'Asia/Dubai',
    'Asia/Jakarta',
    'Asia/Jerusalem',
    'Asia/Kabul',
    'Asia/Kamchatka',
    'Asia/Karachi',
    'Asia/Kathmandu',
    'Asia/Makassar',
    'Asia/Moscow',
    'Asia/Muscat',
    'Asia/Qatar',
    'Asia/Riyadh',
    'Asia/Seoul',
    'Asia/Shanghai',
    'Asia/Taipei',
    'Asia/Tehran',
    'Asia/Tokyo',
    'Asia/Urumqi',
    'Atlantic/Cape_Verde',
    'Australia/Adelaide',
    'Australia/Darwin',
    'Australia/Syndey',
    'Europe/Istanbul',
    'Europe/Madrid',
    'Europe/Paris',
    'Europe/Rome',
    'Pacific/Pago_Pago',
    'Pacific/Tongatapu',
  ]);

  const [analyticsEvents] = useState({
    registration: 'REGISTRATION',
    signIn: 'SIGN_IN',
    selectedTrainer: 'SELECTED_TRAINER',
    leftTrainer: 'LEFT_TRAINER',
    restartTrainer: 'RESTART_TRAINER',
    continueTrainer: 'CONTINUE_TRAINER',
    completedWorkout: 'COMPLETED_WORKOUT',
    startedWorkout: 'STARTED_WORKOUT',
    completedExercise: 'COMPLETED_EXERCISE',
    startedExercise: 'STARTED_EXERCISE',
    newSubscription: 'SUBSCRIPTION',
    cancelSubscription: 'CANCEL_SUBSCRIPTION', // Not trackable
    completedChallenge: 'COMPLETED_CHALLENGE',
    accessedIntercom: 'ACCESSED_INTERCOM',
    shareSelectedTrainer: 'SHARE_SELECTED_TRAINER',
    shareCompletedWorkout: 'SHARE_COMPLETED_WORKOUT',
    shareCompletedChallenge: 'SHARE_COMPLETED_CHALLENGE',
    shareTransformation: 'SHARE_TRANSFORMATION',
  });

  const getPreferences = useCallback(() => {
    runQuery({
      query: Preferences,
      key: 'preferences',
      setValue: async (data) => {
        setPreferences(data);
      },
    });
  }, [runQuery]);

  const permissionsNeeded = useCallback(async () => {
    if (Platform.OS !== 'ios') {
      return null;
    }

    const analyticsEnabled = await AsyncStorage.getItem('@ANALYTICS_ASKED');
    const notificationsEnabled = await AsyncStorage.getItem(
      '@NOTIFICATIONS_ASKED',
    );

    // if (R.isNil(notificationsEnabled)) {
    //   return 'Notifications';
    // }
    if (R.isNil(analyticsEnabled)) {
      return 'Analytics';
    }
  }, []);

  const firebaseLogEvent = useCallback(
    (event, params = {}) => {
      const time = format(new Date(), 'hh:mm');
      const date = format(new Date(), 'dd/MM/yyyy');

      let data = {
        time,
        date,
      };
      if (userData && userData.email) {
        data = {...data, email: userData.email};
      }

      console.log('AnalyticsEvent: ' + event + ' : ' + {...data, ...params});

      analytics()
        .logEvent(event, {...data, ...params})
        .catch((error) => {
          console.log('AnalyticsEventError', error);
        });
    },
    [userData],
  );

  const [updatePreferences] = useMutation(UpdatePreference);

  const updateDefaultPreferences = useCallback(async () => {
    const optOutMarketing =
      (await AsyncStorage.getItem('@REGISTRATION_MARKETING_OPTION')) || 'off';

    console.log('updateDefaultPreferences: optOutMarketing:', optOutMarketing);

    const newPreferences = {
      notifications: Platform.OS === 'ios' ? false : true,
      emails: optOutMarketing === 'on' ? false : true,
      errorReports: true,
      analytics: Platform.OS === 'ios' ? false : true,
      downloadQuality: 'HIGH',
      weightPreference: 'KG',
    };

    updatePreferences({
      variables: {
        input: {
          ...newPreferences,
        },
      },
    })
      .then(() => {
        setPreferences(newPreferences);
      })
      .catch((err) => {
        console.log('updateDefaultPreferences', err);
      });
  }, [updatePreferences]);

  const [changeDevice, setChangeDevice] = useState(null);
  const [suspendedAccount, setSuspendedAccount] = useState(false);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState();

  // 3 workouts are allowed without subscription
  const [completedFreeWorkouts, setCompletedFreeWorkouts] = useState(false);

  const updateUserData = useCallback(async () => {
    const language = await AsyncStorage.getItem('@language');
    Intercom.updateUser({
      name: `${userData.givenName} ${userData.familyName}`,
      language_override: language.slice(0, 2),
    });
  }, [userData]);

  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  const checkShouldShowReviewMessage = useCallback(async () => {
    const {completedWorkouts, email} = userData;

    // Value stored with email so that the modal doesnt show on the same device and user again
    // Also updated when changing email
    const value =
      (await AsyncStorage.getItem(`@${email}REVIEW_REQUEST_SHOWN`)) || 'false';
    const reviewRequestShown = JSON.parse(value);

    console.log('reviewRequestShown', reviewRequestShown);
    if (reviewRequestShown === true) {
      return;
    }

    if (completedWorkouts >= 2) {
      await AsyncStorage.setItem(
        `@${email}REVIEW_REQUEST_SHOWN`,
        JSON.stringify(true),
      );

      displayAlert({
        title: null,
        text: WorkoutDict.ReviewRequest,
        buttons: [
          {
            text: WorkoutDict.ReviewRequestSkip,
          },
          {
            text: WorkoutDict.ReviewRequestReview,
            onPress: async () => {
              Linking.openURL(
                Platform.OS === 'android'
                  ? 'https://play.google.com/store/apps/details?id=com.powerdigitallimited.power'
                  : 'https://apps.apple.com/gb/app/power-workout-with-the-stars/id1557873992',
              );
            },
          },
        ],
      });
    }
  }, [
    WorkoutDict.ReviewRequest,
    WorkoutDict.ReviewRequestReview,
    WorkoutDict.ReviewRequestSkip,
    userData,
  ]);

  // Update completedFreeWorkouts
  useEffect(() => {
    // if (userData && userData.completedWorkouts) {
    //   const {completedWorkouts} = userData;
    //   console.log('completedWorkouts', completedWorkouts);
    //   setCompletedFreeWorkouts(completedWorkouts >= 3);
    // } else {
    //   setCompletedFreeWorkouts(false);
    // }

    updateUserData();
    checkShouldShowReviewMessage();
  }, [checkShouldShowReviewMessage, updateUserData, userData]);

  const getProfile = useCallback(() => {
    runQuery({
      query: Profile,
      key: 'profile',
      setValue: async (res) => {
        if (res) {
          let data = {
            ...res,
          };

          // Add offline icnreament completed workouts
          const increament = await OfflineUtils.getWorkoutsCompleteIncreament();

          data = {
            ...res,
            completedWorkouts: res.completedWorkouts + increament,
          };

          const memberSinceVal = res.createdAt ? res.createdAt.slice(0, 4) : '';

          data = {...data, memberSince: memberSinceVal};

          setUserData(data);

          const {canChangeDevice, deviceUDID, screenshotsTaken} = data;

          if (screenshotsTaken >= 7) {
            setSuspendedAccount(true);
          }

          checkDeviceId(canChangeDevice, deviceUDID);
        }
      },
    });
  }, [checkDeviceId, runQuery]);

  const checkDeviceId = useCallback(
    (canChangeDevice, existingId) => {
      const deviceId = getUniqueId();

      console.log('ChangeDevice', {
        canChangeDevice: canChangeDevice,
        existingId: existingId,
        newDeviceId: deviceId,
      });

      if (deviceId === existingId) {
        setChangeDevice(null);
      } else {
        setChangeDevice({
          canChangeDevice: canChangeDevice,
          newDeviceId: deviceId,
        });
      }
    },
    [setChangeDevice],
  );

  const checkUserSubscription = useCallback(async () => {
    const {success} = await runQuery({
      query: GetSubscription,
      key: 'subscription',
      setValue: async (res) => {
        console.log('RESSS', res);
        if (res) {
          const {isActive} = res;
          setIsSubscriptionActive(isActive);
        } else {
          setIsSubscriptionActive(false);
        }
      },
    });

    if (!success) {
      setIsSubscriptionActive(false);
    }
  }, [runQuery]);

  const getSubscription = useCallback(async () => {
    return await runQuery({
      query: GetSubscription,
      key: 'subscription',
      setValue: async (res) => {
        console.log('RESSS', res);
        if (res) {
          const {isActive} = res;
          setIsSubscriptionActive(isActive);
          return isActive;
        } else {
          setIsSubscriptionActive(false);
          return false;
        }
      },
    });
  }, [runQuery]);

  useEffect(() => {
    console.log('isSubscriptionActive Changed', isSubscriptionActive);
  }, [isSubscriptionActive]);

  useEffect(() => {
    if (preferences) {
      // check analytics error reporting
      analytics().setAnalyticsCollectionEnabled(preferences.analytics);
      crashlytics().setCrashlyticsCollectionEnabled(preferences.errorReports);
    }
  }, [preferences]);

  useEffect(() => {
    async function checkAuth() {
      await Auth.currentAuthenticatedUser()
        .then(async (_res) => {
          getProfile();
          checkUserSubscription();
        })
        .catch((err) => {
          console.log('UserDataProvider - checkAuth', err);
        });
    }

    Hub.listen('auth', (data) => {
      const {payload} = data;
      console.log('new event has happend ', data);
      if (payload.event === 'signIn') {
        console.log('user has signed in');
        checkAuth();
      }
      if (payload.event === 'signOut') {
        console.log('user has signed out');
      }
    });

    checkAuth();
  }, [checkUserSubscription, getProfile]);

  // ** ** ** ** ** Memoize ** ** ** ** **
  const values = React.useMemo(
    () => ({
      userData,
      setUserData,
      preferences,
      getPreferences,
      setPreferences,
      updateDefaultPreferences,
      permissionsNeeded,
      timeZones,
      setTimeZones,
      firebaseLogEvent,
      analyticsEvents,
      changeDevice,
      setChangeDevice,
      suspendedAccount,
      setSuspendedAccount,
      checkUserSubscription,
      isSubscriptionActive,
      getProfile,
      checkShouldShowReviewMessage,
      getSubscription,
    }),
    [
      userData,
      setUserData,
      preferences,
      getPreferences,
      setPreferences,
      updateDefaultPreferences,
      permissionsNeeded,
      timeZones,
      setTimeZones,
      firebaseLogEvent,
      analyticsEvents,
      changeDevice,
      setChangeDevice,
      suspendedAccount,
      setSuspendedAccount,
      checkUserSubscription,
      isSubscriptionActive,
      getProfile,
      checkShouldShowReviewMessage,
      getSubscription,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <UserDataContext.Provider value={values}>
      {props.children}
    </UserDataContext.Provider>
  );
}
