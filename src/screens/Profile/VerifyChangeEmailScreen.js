/*
 * Jira Ticket:
 * Created Date: Tue, 19th Jan 2021, 10:50:04 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView, Alert, Text} from 'react-native';
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
import useUserData from '../../hooks/data/useUserData';
import useLoading from '../../hooks/loading/useLoading';

export default function VerifyChangeEmailScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, cellFormConfig, cellFormStyles, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ProfileDict} = dictionary;
  const {cleanErrors, getValues, updateError, cleanValues} = FormHook();
  const {
    params: {email, fromLogin},
  } = useRoute();
  const [changeEmail] = useMutation(UpdateEmail);
  const navigation = useNavigation();
  const {userData, setUserData} = useUserData();
  const {setLoading} = useLoading();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={ProfileDict.VerifyEmailScreenTitle}
          goBack
          leftAction={onPressBack}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (fromLogin === true) {
      async function resendCode() {
        let user = await Auth.currentAuthenticatedUser();

        await Auth.updateUserAttributes(user, {email: email})
          .then((res) => {
            console.log(res, '<---resend code res');
          })
          .catch((err) => console.log(err, '<--resend code err'));
      }
      resendCode();
    }
  }, [fromLogin]);

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
    text: {
      ...textStyles.regular15_brownishGrey100,
      marginTop: getHeight(30),
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

    setLoading(true);

    await Auth.verifyCurrentUserAttributeSubmit('email', code)
      .then(async (res) => {
        cleanValues();

        await changeEmail({variables: {email: email}})
          .then((res) => {
            setUserData({...userData, email: email});
            if (fromLogin === true) {
              navigation.navigate('TabContainer');
            } else {
              navigation.navigate('Profile');
            }
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
      })
      .finally(() => setLoading(false));
  }

  function onPressBack() {
    Alert.alert('', ProfileDict.YouWillBeLoggedOut, [
      {
        text: ProfileDict.LogoutModalButton,
        onPress: async () => {
          await Auth.signOut()
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'AuthContainer'}],
              });
            })
            .catch((err) => console.log('Error signing out', err));
        },
      },
      {
        text: ProfileDict.Cancel,
      },
    ]);
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
          <Text style={styles.text}>{ProfileDict.VerifyEmailScreenInfo}</Text>
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
