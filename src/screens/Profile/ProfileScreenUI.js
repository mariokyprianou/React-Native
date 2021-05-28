/*
 * Created Date: Mon, 9th Nov 2020, 16:22:14 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {FormHook} from 'the-core-ui-module-tdforms';
import {useNavigation} from '@react-navigation/native';
import {Form} from 'the-core-ui-module-tdforms';
import {format, parseISO} from 'date-fns';
import {Auth} from 'aws-amplify';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Spacer from '../../components/Utility/Spacer';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import DropDownIcon from '../../components/cells/DropDownIcon';
import CalendarIcon from '../../components/cells/CalendarIcon';
import ProfileUserCard from '../../components/Views/ProfileUserCard';
import {FlatList} from 'react-native-gesture-handler';
import NotificationCell from '../../components/cells/NotificationCell';
import TDIcon from 'the-core-ui-component-tdicon';
import AllCountries from '../../apollo/queries/AllCountries';
import Profile from '../../apollo/queries/Profile';
import UpdateProfile from '../../apollo/mutations/UpdateProfile';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import displayAlert from '../../utils/DisplayAlert';
import useUserData from '../../hooks/data/useUserData';
import Intercom from 'react-native-intercom';
import TimeZone from 'react-native-timezone';
import useLoading from '../../hooks/loading/useLoading';
import AsyncStorage from '@react-native-community/async-storage';
import useData from '../../hooks/data/UseData';
import useProgressData from '../../hooks/data/useProgressData';

const notifications = [
  {
    id: 789789787,
    subject: 'SUBJECT',
    message: 'Message',
    sentAt: new Date(),
    readAt: null,
  },
];

export default function ProfileScreenUI({onPressNeedHelp}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {
    cellFormConfig,
    cellFormStyles,
    textStyles,
    dropdownStyle,
    colors,
  } = useTheme();
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {ProfileDict, AuthDict, GenderDict, OfflineMessage} = dictionary;
  const {getValueByName, updateValue} = FormHook();
  const {isConnected, isInternetReachable} = useNetInfo();
  const {
    loading: countryLoading,
    error: countryError,
    data: countryData,
  } = useQuery(AllCountries);
  const [updateProfile] = useMutation(UpdateProfile);
  const [countriesList, setCountriesList] = useState([]);
  const [countryLookup, setCountryLookup] = useState();
  const {cleanErrors, getValues, cleanValues, cleanValueByName} = FormHook();
  const [newDateOfBirth, setNewDateOfBirth] = useState();
  const [storedNotifications, setStoredNotifications] = useState();

  const {userData, setUserData} = useUserData();
  const {reset} = useData();
  const {setUserImages} = useProgressData();
  const {setLoading} = useLoading();

  useEffect(() => {
    if (countryData) {
      const countries = countryData.allCountries.map(
        (country) => country.country,
      );
      setCountriesList(['', ...countries]);

      const countryIdLookup = countryData.allCountries.reduce((acc, obj) => {
        let {country, id} = obj;
        return {...acc, [country]: id};
      }, {});
      setCountryLookup(countryIdLookup);
    } else {
      console.log(countryLoading, countryError);
    }
  }, [countryData, countryLoading, countryError]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      cleanValues();
    });
    return unsubscribe;
  }, [navigation]);

  useQuery(Profile, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        const memberSince = res.profile.createdAt.slice(0, 4);
        const userProfile = {...res.profile, memberSince};
        setUserData(userProfile);
      }
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (userData) {
      if (userData.gender === null) {
        updateValue({
          name: 'profile_gender',
          value: GenderDict.Female,
        });
      }

      updateValue({
        name: 'profile_country',
        value: userData.country,
      });
    }
  }, [userData, updateValue]);

  const gendersData = [
    GenderDict.Female,
    GenderDict.Male,
    GenderDict.Other,
    GenderDict.PreferNotToSay,
  ];

  const gendersRef = {
    female: GenderDict.Female,
    male: GenderDict.Male,
    other: GenderDict.Other,
    null: GenderDict.PreferNotToSay,
  };

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    safeArea: {
      flex: 1,
      backgroundColor: colors.backgroundWhite100,
    },
    androidSafeArea: {
      backgroundColor: colors.backgroundWhite100,
      height: 30,
      width: '100%',
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      alignItems: 'center',
      backgroundColor: colors.backgroundWhite100,
    },
    notificationsContainer: {
      width: '100%',
      marginTop: getHeight(30),
    },
    title: {
      ...textStyles.bold20_black100,
      textAlign: 'left',
    },
    formContainer: {
      width: '90%',
      marginTop: getHeight(10),
    },
    buttonsBottomContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: getHeight(35),
      marginBottom: getHeight(15),
    },
    signOut: {
      ...textStyles.semiBold14_brownishGrey100,
    },
    icon: {
      solid: true,
      size: fontSize(12.5),
      color: colors.black100,
    },
    needHelp: {
      ...textStyles.bold16_aquamarine100,
      textDecorationLine: 'underline',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onPressChangePassword = () => {
    if (!isConnected) {
      displayAlert({text: OfflineMessage});
      return;
    }

    navigation.navigate('ChangePassword');
  };

  async function handleUpdate() {
    if (!isConnected) {
      displayAlert({text: OfflineMessage});
      return;
    }

    cleanErrors();

    const {
      profile_firstName,
      profile_lastName,
      profile_gender,
      profile_dateOfBirth,
      profile_country,
    } = getValues();

    // if (
    //   !profile_firstName &&
    //   !profile_lastName &&
    //   !profile_gender &&
    //   !profile_dateOfBirth &&
    //   !profile_country
    // ) {
    //   return;
    // }

    setLoading(true);

    const dob = parseISO(newDateOfBirth || userData.dateOfBirth);

    console.log(newCountry);
    const newCountry = countryLookup[profile_country];

    const gender = gendersData.includes(profile_gender)
      ? profile_gender === GenderDict.PreferNotToSay
        ? null
        : profile_gender?.toLowerCase()
      : userData.gender;

    const newVals = {
      givenName: profile_firstName || userData.givenName,
      familyName: profile_lastName || userData.familyName,
      gender: gender,
      dateOfBirth: !newDateOfBirth && !userData.dateOfBirth ? null : dob,
      country: newCountry || null,
      timeZone: userData.timeZone,
    };

    console.log('newVals', newVals);

    await updateProfile({
      variables: {
        input: {
          ...newVals,
        },
      },
    })
      .then((res) => {
        const newData = {...userData, ...res.data.updateProfile};
        console.log('UpdateRes', newData);
        setUserData(newData);
      })
      .catch((err) => {
        console.log(err, '<---error on updating');
        displayAlert({
          text: ProfileDict.UnableToUpdate,
        });
      })
      .finally(() => setLoading(false));

    //cleanValues();
  }

  function handleLogout() {
    displayAlert({
      title: null,
      text: ProfileDict.LogoutModalText,
      buttons: [
        {
          text: ProfileDict.Cancel,
        },
        {
          text: ProfileDict.LogoutModalButton,
          onPress: async () => {
            await Auth.signOut()
              .then(async (res) => {
                console.log(res, '<----sign out res');
                setUserData({});
                Intercom.logout();
                setUserImages([]);
                reset();

                navigation.reset({
                  index: 0,
                  routes: [{name: 'AuthContainer'}],
                });
              })
              .catch(async (err) => {
                console.log('Error signing out', err);
              });
          },
        },
      ],
    });
  }

  function deleteNotification(id) {
    // change to work with backend and real data when ready
    const updatedNotifications = storedNotifications.filter(
      (not) => not.id !== id,
    );
    setStoredNotifications(updatedNotifications);
  }

  function readNotification(id) {
    const today = new Date();
    const updatedNotifications = storedNotifications.map((not) => {
      if (not.id === id) {
        not.readAt = today;
      }
      not.key = not.id;
      return not;
    });
    setStoredNotifications(updatedNotifications);
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  const userCard = () => {
    return (
      <>
        <Spacer height={Platform.OS === 'ios' ? 30 : 60} />
        <ProfileUserCard
          firstName={userData.givenName}
          lastName={userData.familyName}
          memberSince={userData.memberSince}
          workoutsComplete={userData.completedWorkouts}
          onPressRightIcon={() => {
            navigation.navigate('Settings', {timeZone: userData.timeZone});
          }}
        />
      </>
    );
  };

  // Notifications UI
  const notificationsUI = () => {
    const renderNotificationCell = ({item, index}) => {
      return (
        <NotificationCell
          {...item}
          index={index}
          onPress={() => readNotification(item.id)}
          onDelete={() => deleteNotification(item.id)}
        />
      );
    };
    return (
      <View style={styles.notificationsContainer}>
        <Text
          style={{
            ...styles.title,
            marginLeft: getWidth(20),
            marginBottom: getHeight(10),
          }}>
          {ProfileDict.NotificationsTitle}
        </Text>
        <FlatList
          data={storedNotifications}
          renderItem={renderNotificationCell}
        />
      </View>
    );
  };

  // Form
  const cells = [
    {
      name: 'profileTitle',
      labelComponent: () => null,
      inputComponent: () => (
        <View>
          <Text
            style={{
              ...textStyles.bold20_black100,
              marginTop: getHeight(20),
              marginBottom: getHeight(10),
              textAlign: 'left',
            }}>
            {ProfileDict.PersonalDetails}
          </Text>
        </View>
      ),
    },
    {
      name: 'profile_firstName',
      type: 'text',
      label: ProfileDict.FormLabel1,
      ...cellFormStyles,
      inputContainerStyle: {
        ...cellFormStyles.inputContainerStyle,
        paddingRight: getWidth(6),
      },
      placeholder: userData.givenName,
      defaultValue: userData.givenName,
    },
    {
      name: 'profile_lastName',
      type: 'text',
      label: ProfileDict.FormLabel2,
      ...cellFormStyles,
      inputContainerStyle: {
        ...cellFormStyles.inputContainerStyle,
        paddingRight: getWidth(6),
      },
      placeholder: userData.familyName,
      defaultValue: userData.familyName,
    },
    {
      name: 'profile_email',
      type: 'dropdown',
      label: ProfileDict.FormLabel3,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
      rightAccessory: () => (
        <TDIcon input="chevron-right" inputStyle={styles.icon} />
      ),
      rightAccessoryOnPress: () => {
        if (!isConnected) {
          displayAlert({text: OfflineMessage});
          return;
        }

        navigation.navigate('ChangeEmail');
      },
      placeholder: userData.email,
    },
    {
      name: 'profile_changePassword',
      type: 'dropdown',
      label: ProfileDict.FormLabel8,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
      rightAccessory: () => (
        <TDIcon input="chevron-right" inputStyle={styles.icon} />
      ),
      rightAccessoryOnPress: () => {
        navigation.navigate('ChangePassword');
      },
      placeholder: ProfileDict.Form8Placeholder,
    },
    {
      name: 'profile_gender',
      type: 'dropdown',
      label: ProfileDict.FormLabel4,
      rightAccessory: () => <DropDownIcon />,
      data: gendersData,
      placeholder: gendersRef[userData.gender] || '',
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
    },
    {
      name: 'profile_dateOfBirth',
      type: 'calendar',
      label: ProfileDict.FormLabel5,
      maximumDate: new Date(),
      dateFormat: (e) => {
        const formattedDate = format(e, 'yyyy-LL-dd');
        setNewDateOfBirth(formattedDate);
        return format(e, 'dd/MM/yyyy');
      },
      rightAccessory: () => <CalendarIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
      placeholder:
        userData.dateOfBirth !== undefined && userData.dateOfBirth !== null
          ? format(parseISO(userData.dateOfBirth), 'dd/MM/yyyy')
          : null,
    },
    {
      name: 'profile_country',
      type: 'dropdown',
      label: ProfileDict.FormLabel6,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      inputContainerStyle: {
        paddingLeft: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
      placeholder: countriesList[0],
      defaultValue: userData.country || countriesList[0],
      data: countriesList,
    },
  ];

  const config = {
    ...cellFormConfig,
  };

  const form = () => (
    <View style={styles.formContainer}>
      <Form cells={cells} config={config} />
    </View>
  );

  // Buttons
  const buttons = () => (
    <View style={styles.buttonsBottomContainer}>
      <DefaultButton
        type={'saveChanges'}
        variant="white"
        onPress={handleUpdate}
      />
      <Spacer height={20} />
      <DefaultButton
        type={'logout'}
        variant="gradient"
        onPress={handleLogout}
        icon={'chevron'}
      />
      <Spacer height={25} />
      <TouchableOpacity onPress={onPressNeedHelp}>
        <Text style={styles.needHelp}>{ProfileDict.NeedHelp}</Text>
      </TouchableOpacity>
      <Spacer height={10} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'android' && <View style={styles.androidSafeArea} />}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {userCard()}
        {storedNotifications &&
          storedNotifications.length > 0 &&
          notificationsUI()}
        {form()}
        {buttons()}
      </ScrollView>
    </SafeAreaView>
  );
}
