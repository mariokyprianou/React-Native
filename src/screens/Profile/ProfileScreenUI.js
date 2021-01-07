/*
 * Created Date: Mon, 9th Nov 2020, 16:22:14 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState, useCallback} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {useApolloClient, useQuery} from '@apollo/client';
import {FormHook} from 'the-core-ui-module-tdforms';
import {useNavigation} from '@react-navigation/native';
import {Form} from 'the-core-ui-module-tdforms';
import {format} from 'date-fns';

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
import AllCountries from '../../apollo/queries/AllCountries';
import Profile from '../../apollo/queries/Profile';

const notifications = [
  {
    id: 789789787,
    subject: 'Subject',
    message: 'Message',
    sentAt: new Date(),
    readAt: undefined,
  },
  {
    id: 78789789789,
    subject: 'Very Very Very Loooooooooooooooooooong Subject',
    message: 'Message Full Of Infoooooooooooooooooooooooooooooooooooooooooo',
    sentAt: new Date(),
    readAt: undefined,
  },
];

export default function ProfileScreenUI({
  onSaveChanges,
  onPressNeedHelp,
  onPressLogout,
}) {
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
  const {ProfileDict, AuthDict} = dictionary;
  const {getValueByName} = FormHook();
  const {
    loading: countryLoading,
    error: countryError,
    data: countryData,
  } = useQuery(AllCountries);
  const {
    loading: profileLoading,
    error: profileError,
    data: profileData,
  } = useQuery(Profile);
  const [userData, setUserData] = useState({});
  const [countriesList, setCountriesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const selectedCountry = getValueByName('profile_country');

  useEffect(() => {
    if (countryData) {
      const countries = countryData.allCountries.map(
        (country) => country.country,
      );
      setCountriesList(countries);

      const indianRegions = countryData.allCountries
        .filter((country) => country.country === 'India')[0]
        .regions.map((region) => region.region);
      setRegionsList(indianRegions);
    } else {
      console.log(countryLoading, countryError);
    }
  }, [countryData, countryLoading, countryError]);

  useEffect(() => {
    if (profileData) {
      const memberSince = profileData.profile.createdAt.slice(0, 4);
      const userProfile = {...profileData.profile};
      userProfile.memberSince = memberSince;
      setUserData(userProfile);
    } else {
      console.log(profileLoading, profileError);
    }
  }, [profileData, profileLoading, profileError]);

  console.log(userData, '<---userData');

  const gendersData = [
    AuthDict.RegistrationGendersFemale,
    AuthDict.RegistrationGendersMale,
    AuthDict.RegistrationGendersOther,
    AuthDict.RegistrationGendersPreferNot,
  ];

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
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
      marginTop: getHeight(30),
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
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onPressChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  const userCard = () => {
    return (
      <>
        <Spacer height={50} />
        <ProfileUserCard
          firstName={userData.givenName}
          lastName={userData.familyName}
          memberSince={userData.memberSince}
          workoutsComplete={751} // to be added - not yet available on query
          onPressRightIcon={() => {
            navigation.navigate('Settings');
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
          // onPress={() => readNotificationAction(item.id)}
          // onDelete={() => deleteNotificationAction(item.id)}
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
        <FlatList data={notifications} renderItem={renderNotificationCell} />
      </View>
    );
  };

  // Form
  const cells = [
    {
      name: 'profileTitle',
      labelComponent: () => null,
      inputComponent: () => (
        <Text
          style={{
            ...textStyles.bold20_black100,
            marginTop: getHeight(20),
            marginBottom: getHeight(10),
            textAlign: 'left',
          }}>
          {ProfileDict.PersonalDetails}
        </Text>
      ),
    },
    {
      name: 'profile_firstName',
      type: 'text',
      label: ProfileDict.FormLabel1,
      ...cellFormStyles,
      placeholder: userData.givenName,
    },
    {
      name: 'profile_lastName',
      type: 'text',
      label: ProfileDict.FormLabel2,
      ...cellFormStyles,
      placeholder: userData.familyName,
    },
    {
      name: 'profile_email',
      type: 'dropdown',
      label: ProfileDict.FormLabel3,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      rightAccessoryOnPress: () => {
        navigation.navigate('ChangeEmail');
      },
      placeholder: userData.email,
    },
    {
      name: 'profile_gender',
      type: 'dropdown',
      label: ProfileDict.FormLabel4,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      data: gendersData,
      placeholder: userData.gender || '',
    },
    {
      name: 'profile_dateOfBirth',
      type: 'calendar',
      label: ProfileDict.FormLabel5,
      dateFormat: (e) => format(e, 'dd/MM/yyyy'),
      rightAccessory: () => <CalendarIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
      placeholder: userData.dateOfBirth || '',
    },
    {
      name: 'profile_country',
      type: 'dropdown',
      label: ProfileDict.FormLabel6,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      data: countriesList,
      placeholder: userData.country || '',
    },
    {
      name: 'profile_region',
      type: selectedCountry === 'India' ? 'dropdown' : 'text',
      label: ProfileDict.FormLabel7,
      editable: false,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => (
        <DropDownIcon enabled={selectedCountry === 'India' ? true : false} />
      ),
      data: regionsList,
      placeholder: userData.region || '',
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
        onPress={onSaveChanges}
        icon={'chevron'}
      />
      <Spacer height={20} />
      <DefaultButton
        type={'changePassword'}
        variant="white"
        onPress={onPressChangePassword}
        icon={'chevron'}
      />
      <Spacer height={20} />
      <DefaultButton
        type={'needHelp'}
        variant="gradient"
        onPress={onPressNeedHelp}
        icon={'chevron'}
      />
      <Spacer height={30} />
      <Text style={styles.signOut}>{ProfileDict.NeedToSignOut}</Text>
      <DefaultButton
        type={'logout'}
        variant="transparentBlackBoldText"
        onPress={onPressLogout}
      />
      <Spacer height={20} />
    </View>
  );

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {userCard()}
      {notificationsUI()}
      {form()}
      {buttons()}
    </ScrollView>
  );
}
