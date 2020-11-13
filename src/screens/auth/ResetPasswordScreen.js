/*
 * Created Date: Fri, 6th Nov 2020, 12:51:36 pm
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

{
  /*
   <AppStack.Screen
        name="ForgotPassword"
        component={ResetPasswordScreen}
        options={{
          header: () => (
            <Header
              title={"Forgot password"}
              noSearch
              showBurger={false}
              goBack
            />
          ),
        }}
      />
    */
}

export default function Screen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {
    cellFormStyles,
    dropdownStyle,
    cellFormConfig,
    textStyles,
    colors,
  } = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {dictionary} = useDictionary();
  const {
    invalidPassword,
    invalidResetCode,
    forgotPasswordCodeLabel,
    forgotPasswordLabel,
    resetPasswordDescriptionText,
  } = dictionary.RegistrationDict;

  const [loading, setLoading] = useState(false);
  const [activeReset, setActiveReset] = useState(false);

  useEffect(() => {
    const {code, password} = getValues();

    if (code && password) {
      return setActiveReset(true);
    }
    setActiveReset(false);
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
    descriptionStyle: {
      ...textStyles.regular15_brownishGrey100,
      marginTop: getHeight(30),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleChangePassword() {
    setLoading(true);
    cleanErrors();

    const {code, password} = getValues();

    if (!code || code.length < 6) {
      updateError({
        name: 'code',
        value: invalidResetCode,
      });
      setLoading(false);
      return;
    }

    if (!emailRegex.test(password)) {
      updateError({
        name: 'password',
        value: invalidPassword,
      });
      setLoading(false);
      return;
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **

  const FormFooter = () => (
    <Text style={styles.descriptionStyle}>{resetPasswordDescriptionText}</Text>
  );

  const cells = [
    {
      type: 'text',
      variant: 'number',
      name: 'code',
      label: forgotPasswordCodeLabel,
      placeholder: '123456',
      textContentType: 'oneTimeCode',
      ...cellFormStyles,
    },
    {
      name: 'password',
      type: 'text',
      variant: 'password',
      label: forgotPasswordLabel,
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
          type="changePassword"
          variant="white"
          icon="chevron"
          onPress={handleChangePassword}
        />
      </View>
    </View>
  );
}