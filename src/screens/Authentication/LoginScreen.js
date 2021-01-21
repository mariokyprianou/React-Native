/*
 * Created Date: Fri, 6th Nov 2020, 12:50:46 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Alert} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex, passwordRegex} from '../../utils/regex';
import PasswordEyeIcon from '../../components/cells/PasswordEyeIcon';
import Header from '../../components/Headers/Header';
import {Auth} from 'aws-amplify';
import useUserData from '../../hooks/data/useUserData';

export default function LoginScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;
  const [passwordEyeEnabled, setPasswordEyeEnabled] = useState(true);

  const {permissionsNeeded} = useUserData();

  navigation.setOptions({
    header: () => (
      <Header
        title={AuthDict.LoginScreenTitle}
        noSearch
        showBurger={false}
        goBack
      />
    ),
  });

  const {cellFormStyles, cellFormConfig, textStyles} = useTheme();
  const {cleanErrors, getValues, updateError, cleanValues} = FormHook();
  const {getHeight, getWidth} = ScaleHook();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.backgroundWhite100,
    },
    scrollViewContainer: {
      alignSelf: 'center',

      alignContent: 'center',
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
    forgotPasswordContainerStyle: {
      flexDirection: 'row',
      marginTop: getHeight(20),
      alignSelf: 'center',
      padding: getWidth(2),
    },
    forgotPasswordStyle: {...textStyles.semiBold16_brownishGrey100},
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handleLogin() {
    cleanErrors();

    const {emailAddress, password} = getValues();

    if (!emailAddress || !emailRegex.test(emailAddress)) {
      updateError({
        name: 'emailAddress',
        value: AuthDict.InvalidEmail,
      });
      return;
    }
    if (!password || !passwordRegex.test(password)) {
      updateError({
        name: 'password',
        value: AuthDict.InvalidPassword,
      });
      return;
    }

    await Auth.signIn(emailAddress, password)
      .then(async (res) => {
        const permissionNeeded = await permissionsNeeded();

        if (permissionNeeded) {
          navigation.navigate(permissionNeeded);
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'TabContainer'}],
          });
        }
      })
      .catch((error) => {
        console.log('error signing in', error);
        if (error.code === 'UserNotConfirmedException') {
          cleanValues();
          navigation.navigate('EmailVerification', {
            email: emailAddress,
            password: password,
            fromLogin: true,
          });
        } else if (error.code === 'NotAuthorizedException') {
          Alert.alert(AuthDict.IncorrectEmailOrPassword);
        }
      });

    // Intercom.registerIdentifiedUser({userId: '123456'}); // change to current user ID when query available
  }

  function forgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  const FormFooter = () => (
    <TouchableOpacity
      style={styles.forgotPasswordContainerStyle}
      onPress={forgotPassword}>
      <Text style={styles.forgotPasswordStyle}>
        {AuthDict.ForgotPasswordButtonText}
      </Text>
    </TouchableOpacity>
  );

  const cells = [
    {
      name: 'emailAddress',
      type: 'text',
      variant: 'email',
      label: AuthDict.EmailLabel,
      placeholder: '',
      textContentType: 'emailAddress',
      autoCompleteType: 'email',
      ...cellFormStyles,
      inputContainerStyle: {
        paddingHorizontal: 0,
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
          type="login"
          variant="white"
          icon="chevron"
          onPress={handleLogin}
        />
      </View>
    </View>
  );
}
