/*
 * Created Date: Thu, 5th Nov 2020, 16:02:12 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform, StatusBar} from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import Spacer from '../../components/Utility/Spacer';

const tickIcon = require('../../../assets/icons/tickIcon.png');

export default function RegisterScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {AuthDict, GenderDict} = dictionary;
  const [termsAndConditions, setTerms] = useState(false);
  const [marketingPreferences, setMarketingPreferences] = useState(false);

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
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
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
    header: () => null,
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
      setCountriesList(['', ...countries]);

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
    container: {
      flex: 1,
      backgroundColor: colors.backgroundWhite100,
    },
    gradientContainer: {
      height: getHeight(140),
      width: '100%',
    },
    scrollContainer: {
      height: getHeight(550),
      position: 'absolute',
      top: getHeight(130),
      backgroundColor: colors.backgroundWhite100,
      borderTopLeftRadius: radius(12),
      borderTopRightRadius: radius(12),
    },
    formTitle: {
      marginTop: getHeight(92.5),
      marginLeft: getWidth(18.5),
      ...textStyles.regular15_white100,
    },
    formContainer: {
      marginHorizontal: getWidth(25),
    },
    formFooter: {
      marginTop: getHeight(30),
      alignSelf: 'center',
    },
    termsContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    boxStyle: {
      width: getWidth(25),
      height: getWidth(25),
      borderWidth: 1,
      borderColor: colors.black30,
      borderRadius: 1,
      backgroundColor: colors.paleGrey100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyBoxStyle: {
      width: getWidth(25),
      height: getWidth(25),
      borderWidth: 1,
      borderColor: colors.paleGrey100,
      borderRadius: 1,
    },
    iconStyle: {
      height: getHeight(16),
      width: getWidth(16),
      tintColor: colors.white100,
    },
    termsStyle: {
      alignSelf: 'center',
      marginHorizontal: getWidth(15),
    },
    marketingStyle: {
      ...textStyles.regular12_brownishGrey100,
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

  const handleMarketingPreferences = () => {
    const value = marketingPreferences === 'on' ? 'off' : 'on';
    setMarketingPreferences(value);
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
      defaultValue: countriesList[0],
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
            {termsAndConditions === 'on' ? (
              <View style={styles.boxStyle}>
                <TDIcon
                  input={tickIcon}
                  inputStyle={{style: {...styles.iconStyle}}}
                />
              </View>
            ) : (
              <View style={styles.emptyBoxStyle} />
            )}
            <View style={styles.termsStyle}>
              <StylisedText
                {...{
                  input: linkText,
                  text: AuthDict.TermsAndConditionsText,
                  textStyle: {
                    ...textStyles.regular12_brownishGrey100,
                  },
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      name: 'marketingPrefs',
      labelComponent: () => null,
      inputComponent: () => (
        <View style={{marginTop: getHeight(20)}}>
          <TouchableOpacity
            style={styles.termsContainerStyle}
            onPress={handleMarketingPreferences}>
            {marketingPreferences === 'on' ? (
              <View style={styles.boxStyle}>
                <TDIcon
                  input={tickIcon}
                  inputStyle={{style: {...styles.iconStyle}}}
                />
              </View>
            ) : (
              <View style={styles.emptyBoxStyle} />
            )}
            <View style={styles.termsStyle}>
              <Text style={styles.marketingStyle}>
                {AuthDict.MarketingText}
              </Text>
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
    <View style={styles.container}>
      <View style={styles.gradientContainer}>
        <LinearGradient
          style={{flex: 1}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.tealish100, colors.tiffanyBlue100]}>
          <Header
            title={AuthDict.RegistrationScreenTitle}
            goBack
            leftAction={() => navigation.pop(2)}
            transparent
            white
          />
          <Text style={styles.formTitle}>{AuthDict.FormTitle}</Text>
        </LinearGradient>
      </View>
      <View style={styles.scrollContainer}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.formContainer}>
            <Form cells={cells} config={{...cellFormConfig}} />
            <Form cells={cells2} config={config} />
          </View>
          <View style={styles.formFooter}>
            <DefaultButton
              type="createAccount"
              variant="white"
              icon="chevron"
              onPress={handleRegister}
              disabled={termsAndConditions === 'on' ? false : true}
            />
          </View>
          <Spacer height={50} />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
