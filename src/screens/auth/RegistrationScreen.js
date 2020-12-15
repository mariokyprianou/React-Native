/*
 * Created Date: Thu, 5th Nov 2020, 16:02:12 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Platform} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';
import {format} from 'date-fns';
import {useQuery, useMutation} from 'react-apollo';
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
import PasswordEyeIcon from '../../components/cells/PasswordEyeIcon';
import AllCountries from '../../apollo/queries/AllCountries';
import RegisterUser from '../../apollo/mutations/RegisterUser';
import {getUniqueId} from 'react-native-device-info';

export default function RegisterScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;
  const [termsAndConditions, setTerms] = useState('off');
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [activeRegister, setActiveRegister] = useState(false);
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
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {loading, error, data: countryData} = useQuery(AllCountries);
  const [countriesList, setCountriesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [deviceTimeZone, setDeviceTimeZone] = useState();
  const [deviceUid, setDeviceUid] = useState();
  const {getValueByName, cleanValues} = FormHook();
  const selectedCountry = getValueByName('country');
  const [execute] = useMutation(RegisterUser);

  navigation.setOptions({
    header: () => <Header title={AuthDict.RegistrationScreenTitle} goBack />,
  });

  const countryIdLookup = countryData.allCountries.reduce((acc, obj) => {
    let {country, id} = obj;
    return {...acc, [country]: id};
  }, {});

  const indianRegions = countryData.allCountries.filter(
    (country) => country.country === 'India',
  )[0].regions;

  const indianRegionsLookup = indianRegions.reduce((acc, obj) => {
    let {region, id} = obj;
    return {...acc, [region]: id};
  }, {});

  const gendersData = [
    AuthDict.RegistrationGendersFemale,
    AuthDict.RegistrationGendersMale,
    AuthDict.RegistrationGendersOther,
    AuthDict.RegistrationGendersPreferNot,
  ];

  useEffect(() => {
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

    if (givenName && familyName && email && password && dateOfBirth && gender) {
      return setActiveRegister(true);
    }
    setActiveRegister(false);
  }, [getValues]);

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

  useEffect(() => {
    const getTimeZone = async () => {
      const timeZone = await TimeZone.getTimeZone().then((zone) => zone);
      setDeviceTimeZone(timeZone);
    };
    getTimeZone();

    const deviceId = getUniqueId();
    setDeviceUid(deviceId);
  }, []);

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
    setLoadingRegister(true);
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

    const countryID = countryIdLookup[country];

    if (!emailRegex.test(email)) {
      updateError({
        name: 'email',
        value: AuthDict.InvalidEmail,
      });
      setLoadingRegister(false);
      return;
    }
    if (!passwordRegex.test(password)) {
      updateError({
        name: 'password',
        value: AuthDict.InvalidPassword,
      });
      setLoadingRegister(false);
      return;
    }

    await execute({
      variables: {
        input: {
          givenName: givenName,
          familyName: familyName,
          email: email,
          password: password,
          gender: gender.toLowerCase(),
          dateOfBirth: dateOfBirth,
          country: countryID,
          region:
            selectedCountry === 'India' ? indianRegionsLookup[region] : null,
          deviceUDID: deviceUid,
          timeZone: deviceTimeZone,
          // programmeId: programmeId,  <---- property name to be confirmed by back end
        },
      },
    })
      .then((res) => {
        if (res.data.registerUser === true) {
          if (Platform.OS === 'android') {
            navigation.navigate('TabContainer');
          } else {
            navigation.navigate('Notifications');
          }
          setLoadingRegister(false);
        }
      })
      .catch((err) => console.log(err));
    cleanValues();
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
        // onPress={() => {
        //   if (Platform.OS === 'android') {
        //     navigation.navigate('TabContainer');
        //   } else {
        //     navigation.navigate('Notifications');
        //   }
        // }}
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
      placeholder: '',
      textContentType: 'name',
      ...cellFormStyles,
    },
    {
      name: 'familyName',
      type: 'text',
      label: AuthDict.LastNameLabel,
      placeholder: '',
      textContentType: 'name',
      ...cellFormStyles,
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
    },
    {
      name: 'password',
      type: 'text',
      variant: 'password',
      label: AuthDict.PasswordLabel,
      textContentType: 'password',
      autoCompleteType: 'password',
      rightAccessory: () => <PasswordEyeIcon />,
      autoCorrect: false,
      ...cellFormStyles,
    },
    {
      name: 'gender',
      type: 'dropdown',
      label: AuthDict.GenderLabel,
      data: gendersData,
      rightAccessory: () => <DropDownIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
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
    },
    {
      name: 'country',
      type: 'dropdown',
      label: AuthDict.CountryLabel,
      data: countriesList,
      rightAccessory: () => <DropDownIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
    },
    {
      name: 'region',
      type: selectedCountry === 'India' ? 'dropdown' : 'text',
      editable: false,
      label: AuthDict.RegionLabel,
      data: regionsList,
      rightAccessory: () => (
        <DropDownIcon enabled={selectedCountry === 'India' ? true : false} />
      ),
      ...cellFormStyles,
      ...dropdownStyle,
    },
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
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.render.scrollViewContainer}>
        <View style={{marginHorizontal: getWidth(25)}}>
          <Form cells={cells} config={config} />
        </View>
      </ScrollView>
    </View>
  );
}
