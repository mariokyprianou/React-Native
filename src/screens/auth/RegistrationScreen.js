/*
 * Created Date: Thu, 5th Nov 2020, 16:02:12 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */


import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';
import {format} from 'date-fns';
import QuickPicker from 'quick-picker';

import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex, E164_VALIDATOR, passwordRegex} from '../../utils/regex';
import useRegistrationData from '../../hooks/data/useRegistrationData';

export default function RegisterScreen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {cellFormStyles, dropdownStyle, cellFormConfig, textStyles} = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth} = ScaleHook();
  const {dictionary} = useDictionary();
  const { 
    formTitle,
    firstNameLabel,
    lastNameLabel,
    emailLabel,
    passwordLabel,
    genderLabel,
    dobLabel,
    countryLabel,
    regionLabel,
    termsAndConditionsText,
  invalidEmail,
invalidPassword } = dictionary.RegistrationDict;

  const { registrationData } = useRegistrationData();

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
      region
    } = getValues();
    
    if (firstName && lastName && emailAddress && password && birthDate && gender) {
      return setActiveRegister(true);
    }
    setActiveRegister(false);
  }, [getValues]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    render: {
      container: {
        flex: 1,
      },
      scrollViewContainer: {
        paddingHorizontal: getWidth(25),
        height: '100%',
        width: '100%',
      },
    },
    formFooter: {
      container: {
        marginTop: getHeight(30),
        marginBottom: getHeight(40),
        alignSelf: 'center'
      },
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
        value: invalidEmail,
      });
      setLoadingRegister(false);
      return;
    }
    if (!passwordRegex.test(password)) {
      updateError({
        name: 'password',
        value: invalidPassword,
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
      <DefaultButton type="createAccount" variant="white" icon="chevron"/>

    </View>
  );


  

  

  const cells = [
    {
      name: 'registerTitle',
      labelComponent: () => null,
      inputComponent: () => <Text style={{...textStyles.regular15_brownishGrey100, marginTop: getHeight(20), marginBottom: getHeight(10)}}>{formTitle}</Text>,
    },
    {
      name: 'firstName',
      type: 'text',
      label: firstNameLabel,
      placeholder: '',
      textContentType: 'name',
      ...cellFormStyles,
    },
    {
      name: 'lastName',
      type: 'text',
      label: lastNameLabel,
      placeholder: '',
      textContentType: 'name',
      ...cellFormStyles,
    },
    {
      name: 'emailAddress',
      type: 'text',
      variant: 'email',
      label: emailLabel,
      placeholder: '',
      textContentType: 'emailAddress',
      autoCompleteType: 'email',
      ...cellFormStyles,
    },
    {
      name: 'password',
      type: 'text',
      variant: 'password',
      label: passwordLabel,
      textContentType: 'password',
      autoCompleteType: 'password',
      autoCorrect: false,
      ...cellFormStyles,
    },
    {
      name: 'gender',
      type: 'dropdown',
      label: genderLabel,
      placeholder: registrationData.genders[0],
      data: registrationData.genders,
      ...cellFormStyles,
      ...dropdownStyle,
    },
    {
      name: 'birthDate',
      type: 'calendar',
      label: dobLabel,
      placeholder: "",
      dateFormat: (e) => format(e, 'dd/MM/yyyy'),
      ...cellFormStyles,
      ...dropdownStyle,
    },
     {
      name: 'country',
      type: 'dropdown',
      label: countryLabel,
      placeholder: registrationData.countries[0],
      data: registrationData.countries,
      ...cellFormStyles,
      ...dropdownStyle,
    },
     {
      name: 'region',
      type: 'dropdown',
      label: regionLabel,
      placeholder: registrationData.regions[0],
      data: registrationData.regions,
      ...cellFormStyles,
      ...dropdownStyle,
    },
    {
      name: 'termsAndConditions',
      labelComponent: () => null,
      inputComponent: () => (
        <View style={{paddingVertical: getHeight(10)}}>
          <TouchableOpacity
            buttonState={termsAndConditions}
            onPress={handleTermsAndConditionsButton}
            
            underlineText={true}
          >
            <Text>TermsAndConditionsText</Text>
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
        <Form cells={cells} config={config} />
      </ScrollView>
     
    </View>
  );
}