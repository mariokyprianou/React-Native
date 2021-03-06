/*
 * Created Date: Fri, 6th Nov 2020, 12:50:46 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex, passwordRegex} from '../../utils/regex';
import Header from '../../components/Headers/Header';
import {Auth} from 'aws-amplify';
import useUserData from '../../hooks/data/useUserData';
import useLoading from '../../hooks/loading/useLoading';
import Intercom from 'react-native-intercom';
import displayAlert from '../../utils/DisplayAlert';
import AsyncStorage from '@react-native-community/async-storage';

export default function LoginScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;

  const {permissionsNeeded, firebaseLogEvent, analyticsEvents} = useUserData();
  const {setLoading} = useLoading();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
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
  }, []);

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
    setLoading(true);

    await Auth.signIn(emailAddress, password)
      .then(async (res) => {
        // We want to only remove these if the new user logged in is a different user
        const lastUserEmail = await AsyncStorage.getItem(
          '@LAST_SESSION_USER_EMAIL',
        );

        if (lastUserEmail !== emailAddress) {
          await AsyncStorage.removeItem('@CURRENT_WEEK');
          await AsyncStorage.removeItem('@COMPLETE_WEEK_MODAL_NUMBER');
        }

        const {attributes} = await Auth.currentAuthenticatedUser();

        if (attributes.email_verified === false) {
          navigation.navigate('VerifyChangeEmail', {
            email: emailAddress,
            fromLogin: true,
          });
          cleanValues();
        } else {
          Intercom.registerIdentifiedUser({email: emailAddress});

          firebaseLogEvent(analyticsEvents.signIn, {email: emailAddress});

          const permissionNeeded = await permissionsNeeded();

          if (permissionNeeded) {
            navigation.navigate(permissionNeeded);
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'TabContainer'}],
            });
          }
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
          displayAlert({text: AuthDict.IncorrectEmailOrPassword});
        }
      })
      .finally(() => setLoading(false));
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
