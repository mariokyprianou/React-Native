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
import TDIcon from 'the-core-ui-component-tdicon';
import Header from '../../components/Headers/Header';
import {useNavigation} from '@react-navigation/native';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex, passwordRegex} from '../../utils/regex';
import useRegistrationData from '../../hooks/data/useRegistrationData';
import StylisedText from '../../components/text/StylisedText';
import CalendarIcon from '../../components/cells/CalendarIcon';
import DropDownIcon from '../../components/cells/DropDownIcon';
import PasswordEyeIcon from '../../components/cells/PasswordEyeIcon';

export default function RegisterScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;

  navigation.setOptions({
    header: () => <Header title={AuthDict.RegistrationScreenTitle} goBack />,
  });

  const {
    cellFormStyles,
    dropdownStyle,
    cellFormConfig,
    textStyles,
    colors,
  } = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth, fontSize} = ScaleHook();

  const {registrationData} = useRegistrationData();

  const [termsAndConditions, setTerms] = useState('off');
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [activeRegister, setActiveRegister] = useState(false);

  useEffect(() => {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      gender,
      birthDate,
      country,
      region,
    } = getValues();

    if (
      firstName &&
      lastName &&
      emailAddress &&
      password &&
      birthDate &&
      gender
    ) {
      return setActiveRegister(true);
    }
    setActiveRegister(false);
  }, [getValues]);

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
  function handleRegister() {
    setLoadingRegister(true);
    cleanErrors();

    const {emailAddress, password, telephone} = getValues();

    if (!emailRegex.test(emailAddress)) {
      updateError({
        name: 'emailAddress',
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
        onPress={() => {
          if (Platform.OS === 'android') {
            navigation.navigate('TabContainer');
          } else {
            navigation.navigate('Notifications');
          }
        }}
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
      name: 'firstName',
      type: 'text',
      label: AuthDict.FirstNameLabel,
      placeholder: '',
      textContentType: 'name',
      ...cellFormStyles,
    },
    {
      name: 'lastName',
      type: 'text',
      label: AuthDict.LastNameLabel,
      placeholder: '',
      textContentType: 'name',
      ...cellFormStyles,
    },
    {
      name: 'emailAddress',
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
      autoCorrect: false,
      ...cellFormStyles,
    },
    {
      name: 'gender',
      type: 'dropdown',
      label: AuthDict.GenderLabel,
      placeholder: registrationData.genders[0],
      data: registrationData.genders,
      rightAccessory: () => <DropDownIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
    },
    {
      name: 'birthDate',
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
      placeholder: registrationData.countries[0],
      data: registrationData.countries,
      rightAccessory: () => <DropDownIcon />,
      ...cellFormStyles,
      ...dropdownStyle,
    },
    {
      name: 'region',
      type: 'dropdown',
      label: AuthDict.RegionLabel,
      placeholder: registrationData.regions[0],
      data: registrationData.regions,
      rightAccessory: () => <DropDownIcon />,
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
