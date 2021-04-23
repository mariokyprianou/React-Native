/*
 * Created Date: Thu, 5th Nov 2020, 16:02:12 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';
import {format, parse} from 'date-fns';
import {useQuery, useMutation} from '@apollo/client';
import TDIcon from 'the-core-ui-component-tdicon';
import TimeZone from 'react-native-timezone';
import {useRoute} from '@react-navigation/core';
import Header from '../../components/Headers/Header';
import {useNavigation} from '@react-navigation/native';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex, passwordRegex} from '../../utils/regex';
import StylisedText from '../../components/text/StylisedText';
import CalendarIcon from '../../components/cells/CalendarIcon';
import DropDownIcon from '../../components/cells/DropDownIcon';
import AllCountries from '../../apollo/queries/AllCountries';
import LookupCountry from '../../apollo/queries/LookupCountry';
import RegisterUser from '../../apollo/mutations/RegisterUser';
import {getUniqueId} from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import displayAlert from '../../utils/DisplayAlert';
import useLoading from '../../hooks/loading/useLoading';
import Intercom from 'react-native-intercom';
import useUserData from '../../hooks/data/useUserData';
import {useBackHandler} from '@react-native-community/hooks';

export default function RegisterScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {AuthDict, GenderDict} = dictionary;
  const [termsAndConditions, setTerms] = useState('off');
  const {
    cellFormStyles,
    dropdownStyle,
    cellFormConfig,
    textStyles,
    colors,
  } = useTheme();
  const {
    params: {programmeId},
  } = useRoute();
  const {cleanErrors, getValues, updateError, updateValue} = FormHook();
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const [countriesList, setCountriesList] = useState([]);
  const [countryLookup, setCountryLookup] = useState();
  const [country, setCountry] = useState();
  const [deviceTimeZone, setDeviceTimeZone] = useState();
  const [deviceUid, setDeviceUid] = useState();
  const {cleanValues} = FormHook();
  const [execute] = useMutation(RegisterUser);
  const {setLoading} = useLoading();

  const {firebaseLogEvent, analyticsEvents} = useUserData();

  navigation.setOptions({
    header: () => (
      <Header
        title={AuthDict.RegistrationScreenTitle}
        goBack
        leftAction={() => navigation.pop(2)}
      />
    ),
  });

  useBackHandler(() => {
    navigation.pop(2);
    return true;
  });

  const sexData = [
    GenderDict.Female,
    GenderDict.Male,
    GenderDict.PreferNotToSay,
  ];

  useQuery(AllCountries, {
    onCompleted: (data) => {
      const countries = data.allCountries.map((country) => country.country);
      setCountriesList(Platform.OS === 'ios' ? ['', ...countries] : countries);

      const countryIdLookup = data.allCountries.reduce((acc, obj) => {
        let {country, id} = obj;
        return {...acc, [country]: id};
      }, {});
      setCountryLookup(countryIdLookup);
    },
  });

  useQuery(LookupCountry, {
    onCompleted: (data) => {
      const estimatedCountry = data.lookupCountry.name;
      setCountry(estimatedCountry);
    },
  });

  useEffect(() => {
    const getTimeZone = async () => {
      const timeZone = await TimeZone.getTimeZone().then((zone) => zone);
      setDeviceTimeZone(timeZone);
    };
    getTimeZone();

    const deviceId = getUniqueId();
    setDeviceUid(deviceId);
  }, []);

  useEffect(() => {
    updateValue({name: 'gender', value: AuthDict.RegistrationGendersFemale});
  }, [updateValue]);

  useEffect(() => {
    if (country) {
      updateValue({name: 'country', value: country});
    }
  }, [updateValue, country]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    render: {
      container: {
        flex: 1,
        backgroundColor: colors.backgroundWhite100,
      },
      scrollViewContainer: {
        height: '100%',
        width: '100%',
      },
    },
    formFooter: {
      container: {
        marginTop: getHeight(30),
        marginBottom: getHeight(40),
        alignSelf: 'center',
      },
    },
    termsContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    boxStyle: {
      width: getWidth(25),
      height: getWidth(25),
      borderWidth: 1,
      borderColor: colors.black30,
      borderRadius: 1,
    },
    iconStyle: {solid: false, size: fontSize(22), color: colors.black30},
    termsStyle: {
      ...textStyles.regular15_brownishGrey100,
      alignSelf: 'center',
      marginHorizontal: getWidth(15),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handleRegister() {
    cleanErrors();

    const {
      givenName,
      familyName,
      email,
      password,
      sex,
      dateOfBirth,
      country,
    } = getValues();

    const countryID = countryLookup[country];
    if (!givenName) {
      updateError({
        name: 'givenName',
        value: AuthDict.InvalidGivenName,
      });
    }

    if (!familyName) {
      updateError({
        name: 'familyName',
        value: AuthDict.InvalidFamilyName,
      });
    }

    if (!emailRegex.test(email)) {
      updateError({
        name: 'email',
        value: AuthDict.InvalidEmail,
      });
      return;
    }
    if (!passwordRegex.test(password)) {
      updateError({
        name: 'password',
        value: AuthDict.InvalidPassword,
      });
      return;
    }
    if (termsAndConditions !== 'on') {
      updateError({
        name: 'termsAndConditions',
        value: AuthDict.InvalidTsAndCs,
      });
      return;
    }
    setLoading(true);

    const correctSex =
      !sex || sex === GenderDict.PreferNotToSay ? null : sex.toLowerCase();

    const data = {
      givenName: givenName,
      familyName: familyName,
      email: email,
      password: password,
      gender: correctSex,
      dateOfBirth: parse(dateOfBirth, 'dd/MM/yyyy', new Date()),
      country: countryID || null,
      deviceUDID: deviceUid,
      timeZone: deviceTimeZone,
      programme: programmeId,
    };

    console.log(data);

    execute({
      variables: {
        input: {
          ...data,
        },
      },
    })
      .then((res) => {
        console.log('REGISTRATION RES', res);
        if (res.data.registerUser === true) {
          cleanValues();
          Intercom.registerIdentifiedUser({email: email});

          firebaseLogEvent(analyticsEvents.registration, {email: email});

          navigation.navigate('EmailVerification', {email, password});
        }
      })
      .catch((err) => {
        if (err.message === 'An account with the given email already exists.') {
          displayAlert({
            text: AuthDict.EmailAlreadyRegistered,
          });
        }
        displayAlert({
          text: AuthDict.NetworkRequestFailed,
        });
      })
      .finally(() => setLoading(false));
  }

  const handleTermsAndConditionsButton = () => {
    const value = termsAndConditions === 'on' ? 'off' : 'on';
    setTerms(value);
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  const linkText = [
    {
      pattern: AuthDict.TermsPattern,
      onPress: () => navigation.navigate('TermsAndConditions'),
    },
    {
      pattern: AuthDict.PolicyPattern,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
  ];

  const cells = [
    {
      name: 'registerTitle',
      labelComponent: () => null,
      inputComponent: () => (
        <Text
          style={{
            ...textStyles.regular15_brownishGrey100,
            marginTop: getHeight(20),
            marginBottom: getHeight(10),
          }}>
          {AuthDict.FormTitle}
        </Text>
      ),
    },
    {
      name: 'givenName',
      type: 'text',
      label: AuthDict.FirstNameLabel,
      ...cellFormStyles,
      inputContainerStyle: {
        ...cellFormStyles.inputContainerStyle,
        paddingRight: getWidth(6),
      },
    },
    {
      name: 'familyName',
      type: 'text',
      label: AuthDict.LastNameLabel,
      ...cellFormStyles,
      inputContainerStyle: {
        ...cellFormStyles.inputContainerStyle,
        paddingRight: getWidth(6),
      },
    },
    {
      name: 'email',
      type: 'text',
      variant: 'email',
      label: AuthDict.EmailLabel,
      placeholder: '',
      textContentType: 'emailAddress',
      autoCompleteType: 'email',
      ...cellFormStyles,
      inputContainerStyle: {
        ...cellFormStyles.inputContainerStyle,
        paddingRight: getWidth(6),
      },
    },
    {
      name: 'password',
      type: 'text',
      variant: 'password',
      label: AuthDict.PasswordLabel,
      textContentType: 'password',
      autoCompleteType: 'password',
      autoCorrect: false,
      ...cellFormStyles,
      inputContainerStyle: {
        ...cellFormStyles.inputContainerStyle,
        paddingRight: getWidth(6),
      },
    },
    {
      name: 'sex',
      type: 'dropdown',
      label: AuthDict.SexLabel,
      data: sexData,
      rightAccessory: () => <DropDownIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
    },
    {
      name: 'dateOfBirth',
      type: 'calendar',
      label: AuthDict.DobLabel,
      maximumDate: new Date(),
      placeholder: '',
      dateFormat: (e) => format(e, 'dd/MM/yyyy'),
      rightAccessory: () => <CalendarIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
    },
    {
      name: 'country',
      type: 'dropdown',
      label: AuthDict.CountryLabel,
      data: countriesList,
      rightAccessory: () => <DropDownIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
        marginTop: -getHeight(5),
      },
    },
  ];

  const cells2 = [
    {
      name: 'termsAndConditions',
      labelComponent: () => null,
      inputComponent: () => (
        <View style={{marginTop: getHeight(20)}}>
          <TouchableOpacity
            style={styles.termsContainerStyle}
            onPress={handleTermsAndConditionsButton}>
            <View style={styles.boxStyle}>
              {termsAndConditions === 'on' && (
                <TDIcon input={'check'} inputStyle={styles.iconStyle} />
              )}
            </View>
            <View style={styles.termsStyle}>
              <StylisedText
                {...{
                  input: linkText,
                  text: AuthDict.TermsAndConditionsText,
                  // If you want to override the main text style
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  const config = {
    ...cellFormConfig,
  };

  return (
    <View style={styles.render.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        enableOnAndroid={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <>
          <View style={{marginHorizontal: getWidth(25)}}>
            <Form cells={cells} config={{...cellFormConfig}} />
            <Form cells={cells2} config={config} />
          </View>
          <View style={styles.formFooter.container}>
            <DefaultButton
              type="createAccount"
              variant="white"
              icon="chevron"
              onPress={handleRegister}
            />
          </View>
        </>
      </KeyboardAwareScrollView>
    </View>
  );
}
