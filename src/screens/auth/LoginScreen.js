/*
 * Created Date: Fri, 6th Nov 2020, 12:50:46 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';

import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex, passwordRegex} from '../../utils/regex';
import PasswordEyeIcon from '../../components/cells/PasswordEyeIcon';

// <AppStack.Screen
//       name="Login"
//       component={LoginScreen}
//       options={{
//         header: () => (
//           <Header
//             title={"Login"}
//             noSearch
//             showBurger={false}
//             goBack
//           />
//         ),
//       }}
//     />

export default function RegisterScreen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {
    cellFormStyles,

    cellFormConfig,
    textStyles,
  } = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth} = ScaleHook();
  const {dictionary} = useDictionary();
  const {
    emailLabel,
    passwordLabel,
    forgotPasswordButtonText,
    invalidEmail,
    invalidPassword,
  } = dictionary.RegistrationDict;

  const [loading, setLoading] = useState(false);
  const [activeLogin, setActiveLogin] = useState(false);

  useEffect(() => {
    const {emailAddress, password} = getValues();

    if (emailAddress && password) {
      return setActiveLogin(true);
    }
    setActiveLogin(false);
  }, [getValues]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flex: 1,
    },
    scrollViewContainer: {
      paddingHorizontal: getWidth(25),
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
  function handleLogin() {
    setLoading(true);
    cleanErrors();

    const {emailAddress, password} = getValues();

    if (!emailRegex.test(emailAddress)) {
      updateError({
        name: 'emailAddress',
        value: invalidEmail,
      });
      setLoading(false);
      return;
    }
    if (!passwordRegex.test(password)) {
      updateError({
        name: 'password',
        value: invalidPassword,
      });
      setLoading(false);
      return;
    }
  }

  function forgotPassword() {}

  // ** ** ** ** ** RENDER ** ** ** ** **
  const FormFooter = () => (
    <TouchableOpacity
      style={styles.forgotPasswordContainerStyle}
      onPress={forgotPassword}>
      <Text style={styles.forgotPasswordStyle}>{forgotPasswordButtonText}</Text>
    </TouchableOpacity>
  );

  const cells = [
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
        <Form cells={cells} config={config} />
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
