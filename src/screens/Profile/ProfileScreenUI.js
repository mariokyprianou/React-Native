/*
 * Created Date: Mon, 9th Nov 2020, 16:22:14 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState, useCallback} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {useQuery} from 'react-apollo';
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
  // MARK: - Hooks
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
  const {loading, error, data: countryData} = useQuery(AllCountries);
  const [countriesList, setCountriesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const selectedCountry = getValueByName('profile_country');

  useEffect(() => {
    const countries = countryData.allCountries.map(
      (country) => country.country,
    );
    setCountriesList(countries);

    const indianRegions = countryData.allCountries
      .filter((country) => country.country === 'India')[0]
      .regions.map((region) => region.region);
    setRegionsList(indianRegions);
  }, [countryData]);

  const gendersData = [
    AuthDict.RegistrationGendersFemale,
    AuthDict.RegistrationGendersMale,
    AuthDict.RegistrationGendersOther,
    AuthDict.RegistrationGendersPreferNot,
  ];
  // MARK: - Local

  // MARK: - Logic

  // MARK: - Use Effect

  // MARK: - Actions
  const onPressChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  // MARK: - Styles
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

  const userCard = () => {
    return (
      <>
        <Spacer height={50} />
        <ProfileUserCard
          firstName={'Johny'}
          lastName={'Appleased'}
          memberSince={2080}
          workoutsComplete={751}
          onPressRightIcon={() => {
            navigation.navigate('Settings');
          }}
        />
      </>
    );
  };

  // MARK - Notifications UI
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

  // MARK: - Form
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
    },
    {
      name: 'profile_lastName',
      type: 'text',
      label: ProfileDict.FormLabel2,
      ...cellFormStyles,
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
    },
    {
      name: 'profile_gender',
      type: 'dropdown',
      label: ProfileDict.FormLabel4,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      data: gendersData,
    },
    {
      name: 'profile_dateOfBirth',
      type: 'calendar',
      label: ProfileDict.FormLabel5,
      dateFormat: (e) => format(e, 'dd/MM/yyyy'),
      rightAccessory: () => <CalendarIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
    },
    {
      name: 'profile_country',
      type: 'dropdown',
      label: ProfileDict.FormLabel6,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      data: countriesList,
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

  // MARK: - Buttons
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

  // MARK: - Render

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
