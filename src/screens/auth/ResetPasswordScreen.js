/*
 * Created Date: Fri, 6th Nov 2020, 12:51:36 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';

import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex, passwordRegex} from '../../utils/regex';

import PasswordEyeIcon from '../../components/cells/PasswordEyeIcon';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import {Auth} from 'aws-amplify';

export default function Screen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;

  navigation.setOptions({
    header: () => <Header title={AuthDict.ResetPasswordScreenTitle} goBack />,
  });

  const {cellFormStyles, cellFormConfig, textStyles, colors} = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth} = ScaleHook();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => console.log(user, '<---user'))
      .catch((err) => console.log(err, '<---error here'));
  }, []);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.backgroundWhite100,
    },
    scrollViewContainer: {
      height: '100%',
      width: '100%',
    },

    buttonContainer: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      marginTop: getHeight(30),
      marginBottom: getHeight(40),
      alignItems: 'center',
    },
    descriptionStyle: {
      ...textStyles.regular15_brownishGrey100,
      marginTop: getHeight(30),
      textAlign: 'left',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleChangePassword() {
    cleanErrors();

    const {code, password} = getValues();

    if (!code || code.length < 6) {
      updateError({
        name: 'code',
        value: AuthDict.InvalidResetCode,
      });
      return;
    }

    if (!emailRegex.test(password)) {
      updateError({
        name: 'password',
        value: AuthDict.InvalidPassword,
      });
      return;
    }
    navigation.navigate('Login');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **

  const FormFooter = () => (
    <Text style={styles.descriptionStyle}>
      {AuthDict.ResetPasswordDescriptionText}
    </Text>
  );

  const cells = [
    {
      type: 'text',
      variant: 'number',
      name: 'code',
      label: AuthDict.ForgotPasswordCodeLabel,
      placeholder: '123456',
      textContentType: 'oneTimeCode',
      ...cellFormStyles,
    },
    {
      name: 'password',
      type: 'text',
      variant: 'password',
      label: AuthDict.ForgotPasswordLabel,
      textContentType: 'password',
      autoCompleteType: 'password',
      autoCorrect: false,
      rightAccessory: () => <PasswordEyeIcon />,
      ...cellFormStyles,
    },
  ];

  const config = {
    ...cellFormConfig,
    formFooter: FormFooter,
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewContainer}>
        <View style={{marginHorizontal: getWidth(25)}}>
          <Form cells={cells} config={config} />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="changePassword"
          variant="white"
          icon="chevron"
          onPress={handleChangePassword}
        />
      </View>
    </View>
  );
}
