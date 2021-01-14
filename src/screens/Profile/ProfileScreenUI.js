/*
 * Created Date: Mon, 9th Nov 2020, 16:22:14 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, SafeAreaView, Platform} from 'react-native';
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

const notifications = [
  {
    id: 789789787,
    subject: 'SUBJECT',
    message: 'Message',
    sentAt: new Date(),
    readAt: undefined,
  },
  {
    id: 78789789789,
    subject: 'VERY VERY VERY LOOOOOOOOOOOOOOOOOOOOOOOOOONG SUBJECT',
    message: 'Message Full Of Infoooooooooooooooooooooooooooooooooooooooooo',
    sentAt: new Date(),
    readAt: undefined,
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
  const {ProfileDict, AuthDict} = dictionary;
  const {getValueByName} = FormHook();

  const {isConnected, isInternetReachable} = useNetInfo();

  const {
    loading: countryLoading,
    error: countryError,
    data: countryData,
  } = useQuery(AllCountries);
  const {
    loading: profileLoading,
    error: profileError,
    data: profileData,
  } = useQuery(Profile, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
  });
  const [updateProfile] = useMutation(UpdateProfile);
  const [userData, setUserData] = useState({});
  const [countriesList, setCountriesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [countryLookup, setCountryLookup] = useState();
  const [regionLookup, setRegionLookup] = useState();
  const {cleanErrors, getValues, cleanValues, cleanValueByName} = FormHook();
  const [newDateOfBirth, setNewDateOfBirth] = useState();

  const formCountry = getValueByName('profile_country');
  useEffect(() => {
    if (formCountry !== 'India') {
      cleanValueByName('profile_region');
    }
  }, [formCountry, cleanValueByName]);

  useEffect(() => {
    if (countryData) {
      const countries = countryData.allCountries.map(
        (country) => country.country,
      );
      setCountriesList(countries);

      const indianRegions = countryData.allCountries.filter(
        (country) => country.country === 'India',
      )[0].regions;

      const indianRegionsLookup = indianRegions.reduce((acc, obj) => {
        let {region, id} = obj;
        return {...acc, [region]: id};
      }, {});
      setRegionLookup(indianRegionsLookup);

      const indianRegionsList = indianRegions.map((region) => region.region);
      setRegionsList(indianRegionsList);

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
    if (profileData) {
      const memberSince = profileData.profile.createdAt.slice(0, 4);
      const userProfile = {...profileData.profile};
      userProfile.memberSince = memberSince;
      setUserData(userProfile);
    } else {
      console.log(profileLoading, profileError);
    }
  }, [profileData, profileLoading, profileError]);

  const gendersData = [
    AuthDict.RegistrationGendersFemale,
    AuthDict.RegistrationGendersMale,
    AuthDict.RegistrationGendersOther,
    AuthDict.RegistrationGendersPreferNot,
  ];

  const gendersRef = {
    female: 'Female',
    male: 'Male',
    other: 'Other',
    preferNotToSay: 'Prefer not to say',
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
    icon: {
      solid: true,
      size: fontSize(11),
      color: colors.black100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onPressChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  async function handleUpdate() {
    cleanErrors();

    const {
      profile_firstName,
      profile_lastName,
      profile_gender,
      profile_dateOfBirth,
      profile_country,
      profile_region,
    } = getValues();

    if (
      !profile_firstName &&
      !profile_lastName &&
      !profile_gender &&
      !profile_dateOfBirth &&
      !profile_country &&
      !profile_region
    ) {
      return;
    }

    const dob = format(
      parseISO(newDateOfBirth || userData.dateOfBirth),
      'yyyy-LL-dd',
    );

    const newCountry =
      countryLookup[profile_country] || countryLookup[userData.country];

    let newRegion =
      profile_country !== 'India'
        ? null
        : regionLookup[profile_region] || regionLookup[userData.region];

    if (profile_country === 'India' && !newRegion) {
      newRegion = regionLookup[regionsList[0]];
    }
    console.log(regionLookup[profile_region]);
    console.log('Input', {
      input: {
        givenName: profile_firstName || userData.givenName,
        familyName: profile_lastName || userData.familyName,
        gender: profile_gender?.toLowerCase() || userData.gender,
        dateOfBirth: dob,
        country: newCountry,
        region: newRegion,
      },
    });
    await updateProfile({
      variables: {
        input: {
          givenName: profile_firstName || userData.givenName,
          familyName: profile_lastName || userData.familyName,
          gender: profile_gender?.toLowerCase() || userData.gender,
          dateOfBirth: dob,
          country: newCountry,
          region: newRegion,
        },
      },
    })
      .then((res) => {
        const newData = {...userData, ...res.data.updateProfile};
        console.log('newData', newData);
        setUserData(newData);
      })
      .catch((err) => console.log(err));

    cleanValues();
  }

  function handleLogout() {
    displayAlert({
      title: null,
      text: ProfileDict.LogoutModalText,
      buttons: [
        {
          text: ProfileDict.LogoutModalButton,
          onPress: async () => {
            await Auth.signOut()
              .then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'AuthContainer'}],
                });
              })
              .catch((err) => console.log('Error signing out', err));
          },
        },
      ],
    });
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
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
      },
      placeholder: userData.givenName,
      style: {
        ...textStyles.regular16_black100,
        flex: 1,
      },
    },
    {
      name: 'profile_lastName',
      type: 'text',
      label: ProfileDict.FormLabel2,
      ...cellFormStyles,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
      },
      placeholder: userData.familyName,
      style: {
        ...textStyles.regular16_black100,
        flex: 1,
      },
    },
    {
      name: 'profile_email',
      type: 'dropdown',
      label: ProfileDict.FormLabel3,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(3),
      },
      inputStyle: {
        ...textStyles.regular16_black60,
      },
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
      placeholder: gendersRef[userData.gender] || '',
    },
    {
      name: 'profile_dateOfBirth',
      type: 'calendar',
      label: ProfileDict.FormLabel5,
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
      },
      placeholder: userData?.dateOfBirth
        ? format(new Date(userData?.dateOfBirth), 'dd/LL/yyyy')
        : '',
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
      },
      placeholder: userData.country || countriesList[0],
      data: countriesList,
    },
  ];

  if (
    formCountry === 'India' ||
    (!formCountry && userData.country === 'India')
  ) {
    cells.push({
      name: 'profile_region',
      type: 'dropdown',
      label: ProfileDict.FormLabel7,
      //editable: false,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
      },
      rightAccessory: () => <DropDownIcon />,
      data: regionsList,
      placeholder: userData.region || regionsList[0],
    });
  }

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
        onPress={handleLogout}
      />
      <Spacer height={20} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'android' && <View style={styles.androidSafeArea} />}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {userCard()}
        {notificationsUI()}
        {form()}
        {buttons()}
      </ScrollView>
    </SafeAreaView>
  );
}
