/*
 * Created Date: Fri, 6th Nov 2020, 12:51:36 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {ScrollView, View, Text, Alert, Linking} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';

import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {passwordRegex} from '../../utils/regex';

import PasswordEyeIcon from '../../components/cells/PasswordEyeIcon';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import {Auth} from 'aws-amplify';
import {Platform} from 'react-native';

export default function Screen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;
  const onlyNumbersRegex = /^\d+$/;

  navigation.setOptions({
    header: () => <Header title={AuthDict.ResetPasswordScreenTitle} goBack />,
  });

  const {cellFormStyles, cellFormConfig, textStyles, colors} = useTheme();
  const {
    cleanErrors,
    getValues,
    updateError,
    cleanValues,
    updateValue,
  } = FormHook();
  const {getHeight, getWidth} = ScaleHook();

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

  // MARK: - Deep linking

  const handleUrl = (url = '') => {
    console.log('Handle url:', url);
    const receivedCode = url.length > 0 ? url.substr(url.length - 6) : '';
    if (url.includes('forgotPassword') && onlyNumbersRegex.test(receivedCode)) {
      updateValue({name: 'code', value: receivedCode});
    }
  };

  const handleUrlEvent = (event = {}) => {
    const {url} = event;
    handleUrl(url);
  };

  const setup = () => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        handleUrl(url);
      });
    } else {
      Linking.addEventListener('url', handleUrlEvent);
    }
  };

  // MARK: - Effects
  useEffect(() => {
    setup();
    return () => {
      cleanValues();
      cleanErrors();
      Linking.removeEventListener('url', handleUrlEvent);
    };
  }, []);

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleChangePassword() {
    cleanErrors();

    const {code, newPassword, emailAddress} = getValues();

    if (!code || code.length < 6) {
      updateError({
        name: 'code',
        value: AuthDict.InvalidResetCode,
      });
      return;
    }

    if (!newPassword || !passwordRegex.test(newPassword)) {
      updateError({
        name: 'newPassword',
        value: AuthDict.InvalidNotNewPassword,
      });
      return;
    }

    Auth.forgotPasswordSubmit(emailAddress, code, newPassword)
      .then((data) => {
        console.log(data, '<---reset password data');
        cleanValues();
        navigation.navigate('Login');
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 'CodeMismatchException') {
          Alert.alert(AuthDict.VerificationNotRecognized);
        }
      });
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
      inputContainerStyle: {
        paddingHorizontal: 0,
      },
    },
    {
      name: 'newPassword',
      type: 'text',
      variant: 'password',
      label: AuthDict.ForgotPasswordLabel,
      textContentType: 'password',
      autoCompleteType: 'password',
      autoCorrect: false,
      ...cellFormStyles,
      inputContainerStyle: {
        paddingHorizontal: 0,
        paddingRight: getWidth(6),
      },
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
