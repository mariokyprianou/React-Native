/*
 * Created Date: Thu, 5th Nov 2020, 16:02:12 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';
import {format} from 'date-fns';
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
import RegisterUser from '../../apollo/mutations/RegisterUser';
import {getUniqueId} from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import displayAlert from '../../utils/DisplayAlert';
import useLoading from '../../hooks/loading/useLoading';

export default function RegisterScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;
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
  const [regionsList, setRegionsList] = useState([]);
  const [countryLookup, setCountryLookup] = useState();
  const [regionLookup, setRegionLookup] = useState();
  const [deviceTimeZone, setDeviceTimeZone] = useState();
  const [deviceUid, setDeviceUid] = useState();
  const {getValueByName, cleanValues} = FormHook();
  const selectedCountry = getValueByName('country');
  const [execute] = useMutation(RegisterUser);
  const {setLoading} = useLoading();

  navigation.setOptions({
    header: () => <Header title={AuthDict.RegistrationScreenTitle} goBack />,
  });

  const gendersData = [
    AuthDict.RegistrationGendersFemale,
    AuthDict.RegistrationGendersMale,
    // AuthDict.RegistrationGendersOther,
    // AuthDict.RegistrationGendersPreferNot,
  ];

  useQuery(AllCountries, {
    onCompleted: (data) => {
      const countries = data.allCountries.map((country) => country.country);
      setCountriesList(countries);

      const indianRegions = data.allCountries.filter(
        (country) => country.country === 'India',
      )[0].regions;

      const indianRegionsLookup = indianRegions.reduce((acc, obj) => {
        let {region, id} = obj;
        return {...acc, [region]: id};
      }, {});
      setRegionLookup(indianRegionsLookup);

      const indianRegionsList = indianRegions.map((region) => region.region);
      setRegionsList(indianRegionsList);

      const countryIdLookup = data.allCountries.reduce((acc, obj) => {
        let {country, id} = obj;
        return {...acc, [country]: id};
      }, {});
      setCountryLookup(countryIdLookup);
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
      gender,
      dateOfBirth,
      country,
      region,
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

    execute({
      variables: {
        input: {
          givenName: givenName,
          familyName: familyName,
          email: email,
          password: password,
          gender: gender ? gender.toLowerCase() : null,
          dateOfBirth: dateOfBirth,
          country: country ? countryID : null,
          region: selectedCountry === 'India' ? regionLookup[region] : null,
          deviceUDID: deviceUid,
          timeZone: deviceTimeZone,
          programme: programmeId,
        },
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.registerUser === true) {
          cleanValues();
          navigation.navigate('EmailVerification', {email, password});
        }
      })
      .catch((err) => {
        displayAlert({
          text: 'Network request failed',
        });
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  const handleTermsAndConditionsButton = () => {
    const value = termsAndConditions === 'on' ? 'off' : 'on';
    setTerms(value);
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  const FormFooter = () => (
    <View style={styles.formFooter.container}>
      <DefaultButton
        type="createAccount"
        variant="white"
        icon="chevron"
        onPress={handleRegister}
      />
    </View>
  );

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
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
      },
    },
    {
      name: 'familyName',
      type: 'text',
      label: AuthDict.LastNameLabel,
      ...cellFormStyles,
      inputContainerStyle: {
        paddingHorizontal: 0,
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
        paddingHorizontal: 0,
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
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
      },
    },
    {
      name: 'gender',
      type: 'dropdown',
      label: AuthDict.GenderLabel,
      data: gendersData,
      rightAccessory: () => <DropDownIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
      },
    },
    {
      name: 'dateOfBirth',
      type: 'calendar',
      label: AuthDict.DobLabel,
      placeholder: '',
      dateFormat: (e) => format(e, 'dd/MM/yyyy'),
      rightAccessory: () => <CalendarIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
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
      },
    },
  ];

  if (selectedCountry === 'India') {
    cells.push({
      name: 'region',
      type: 'dropdown',
      placeholder: '',
      editable: false,
      label: AuthDict.RegionLabel,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
      },
      rightAccessory: () => <DropDownIcon />,
      data: regionsList,
    });
  }

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
    formFooter: FormFooter,
  };

  return (
    <View style={styles.render.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        enableOnAndroid={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{marginHorizontal: getWidth(25)}}>
          <Form cells={cells} config={{...cellFormConfig}} />
          <Form cells={cells2} config={config} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
