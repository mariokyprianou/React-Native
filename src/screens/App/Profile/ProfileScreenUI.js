/*
 * Created Date: Mon, 9th Nov 2020, 16:22:14 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {FormHook} from 'the-core-ui-module-tdforms';
import {useNavigation} from '@react-navigation/native';
import {Form} from 'the-core-ui-module-tdforms';
import {format} from 'date-fns';

import useDictionary from '../../../hooks/localisation/useDictionary';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import Spacer from '../../../components/Utility/Spacer';
import useTheme from '../../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import DropDownIcon from '../../../components/cells/DropDownIcon';
import useRegistrationData from '../../../hooks/data/useRegistrationData';
import CalendarIcon from '../../../components/cells/CalendarIcon';
import ProfileUserCard from '../../../components/Views/ProfileUserCard';

export default function ProfileScreenUI({onSaveChanges}) {
  // MARK: - Hooks
  const {
    colors,
    cellFormConfig,
    cellFormStyles,
    textStyles,
    dropdownStyle,
  } = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {
    Profile_PersonalDetails,
    Profile_NotificationsTitle,
    Profile_FormLabel1,
    Profile_FormLabel2,
    Profile_FormLabel3,
    Profile_FormLabel4,
    Profile_FormLabel5,
    Profile_FormLabel6,
    Profile_FormLabel7,
  } = dictionary;

  const {registrationData} = useRegistrationData();

  // MARK: - Local
  const [userName, setUserName] = useState('John Appleased');

  // MARK: - Logic

  // MARK: - Use Effect
  useEffect(() => {}, []);

  // MARK: - Actions
  const onPressChangePassword = () => {};
  // const onPressChangePassword = () => {};

  // MARK: - Styles
  const styles = {
    container: {
      flex: 1,
    },
    contentContainer: {
      alignItems: 'center',
    },
    notificationsContainer: {
      width: '90%',
      marginTop: getHeight(30),
    },
    title: {...textStyles.bold20_black100},
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
  };

  const userCard = () => {
    return (
      <>
        <Spacer height={30} />
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

  const notifications = () => {
    return (
      <View style={styles.notificationsContainer}>
        <Text style={styles.title}>{Profile_NotificationsTitle}</Text>
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
          }}>
          {Profile_PersonalDetails}
        </Text>
      ),
    },
    {
      name: 'profile_firstName',
      type: 'text',
      label: Profile_FormLabel1,
      ...cellFormStyles,
    },
    {
      name: 'profile_lastName',
      type: 'text',
      label: Profile_FormLabel2,
      ...cellFormStyles,
    },
    {
      name: 'profile_email',
      type: 'dropdown',
      label: Profile_FormLabel3,
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
      label: Profile_FormLabel4,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: registrationData.genders[0],
      data: registrationData.genders,
    },
    {
      name: 'profile_dateOfBirth',
      type: 'calendar',
      label: Profile_FormLabel5,
      dateFormat: (e) => format(e, 'dd/MM/yyyy'),
      rightAccessory: () => <CalendarIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
    },
    {
      name: 'profile_country',
      type: 'dropdown',
      label: Profile_FormLabel6,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: registrationData.countries[0],
      data: registrationData.countries,
    },
    {
      name: 'profile_region',
      type: 'dropdown',
      label: Profile_FormLabel7,
      ...cellFormStyles,
      ...dropdownStyle,
      rightAccessory: () => <DropDownIcon />,
      placeholder: registrationData.regions[0],
      data: registrationData.regions,
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
        onPress={onPressChangePassword}
        icon={'chevron'}
      />
      <Spacer height={20} />
      <DefaultButton
        type={'needToSignOut'}
        variant="transparentGreyText"
        onPress={onPressChangePassword}
      />
      <DefaultButton
        type={'logout'}
        variant="transparentBlackBoldText"
        onPress={onPressChangePassword}
      />
    </View>
  );

  // MARK: - Render

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {userCard()}
      {notifications()}
      {form()}
      {buttons()}
    </ScrollView>
  );
}
