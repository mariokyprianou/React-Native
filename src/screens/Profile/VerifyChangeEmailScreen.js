/*
 * Jira Ticket:
 * Created Date: Tue, 19th Jan 2021, 10:50:04 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {FormHook} from 'the-core-ui-module-tdforms';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import {Form} from 'the-core-ui-module-tdforms';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {Auth} from 'aws-amplify';
import {useRoute} from '@react-navigation/core';
import UpdateEmail from '../../apollo/mutations/UpdateEmail';

export default function VerifyChangeEmailScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, cellFormConfig, cellFormStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ProfileDict} = dictionary;
  const {cleanErrors, getValues, updateError, cleanValues} = FormHook();
  const {
    params: {email, userData, setUserData},
  } = useRoute();
  const [changeEmail] = useMutation(UpdateEmail);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header title={ProfileDict.VerifyEmailScreenTitle} goBack />
      ),
    });
  }, []);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundWhite100,
      justifyContent: 'space-between',
      paddingBottom: getHeight(40),
      alignItems: 'center',
    },
    scrollViewContainer: {
      height: '100%',
      width: '100%',
      alignSelf: 'center',
    },
    formContainer: {
      width: '90%',
      alignSelf: 'center',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function onPressChange() {
    cleanErrors();

    const {code} = getValues();

    if (!code || code.length < 6) {
      updateError({
        name: 'code',
        value: ProfileDict.InvalidChangeEmailCode,
      });
      return;
    }

    await Auth.verifyCurrentUserAttributeSubmit('email', code)
      .then(async (res) => {
        cleanValues();

        await changeEmail({variables: {email: email}})
          .then((res) => {
            setUserData({...userData, email: email});
            navigation.navigate('Profile');
          })
          .catch((err) =>
            console.log(err, '<---error changing email on back end'),
          );
      })
      .catch((err) => {
        console.log(err, '<---error verifying code with cognito');
        if (err.code === 'CodeMismatchException') {
          updateError({
            name: 'code',
            value: ProfileDict.InvalidChangeEmailCode,
          });
        }
      });
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  const cells = [
    {
      type: 'text',
      variant: 'number',
      name: 'code',
      label: ProfileDict.CodeLabel,
      placeholder: '123456',
      textContentType: 'oneTimeCode',
      ...cellFormStyles,
      inputContainerStyle: {
        paddingHorizontal: 0,
      },
    },
  ];
  const config = {
    ...cellFormConfig,
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewContainer}>
        <View style={styles.formContainer}>
          <Form cells={cells} config={config} />
        </View>
      </ScrollView>
      <DefaultButton
        type="done"
        variant="white"
        onPress={onPressChange}
        icon="chevron"
      />
    </View>
  );
}