/*
 * Created Date: Mon, 9th Nov 2020, 13:30:27 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {FormHook} from 'the-core-ui-module-tdforms';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import {Form} from 'the-core-ui-module-tdforms';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {emailRegex} from '../../utils/regex';
import {Auth} from 'aws-amplify';
import Intercom from 'react-native-intercom';
import useUserData from '../../hooks/data/useUserData';
import AsyncStorage from '@react-native-community/async-storage';

export default function ChangeEmailScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, cellFormConfig, cellFormStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ProfileDict} = dictionary;
  const {cleanErrors, getValues, updateError} = FormHook();
  const navigation = useNavigation();
  const {userData} = useUserData();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header title={ProfileDict.ChangeEmailScreenTitle} goBack />
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

    const {newEmail} = getValues();

    if (!newEmail || !emailRegex.test(newEmail)) {
      updateError({
        name: 'newEmail',
        value: ProfileDict.IncorrectEmail,
      });
      return;
    }

    let user = await Auth.currentAuthenticatedUser();

    await Auth.updateUserAttributes(user, {email: newEmail})
      .then(async (res) => {
        // Transfer value to new email address
        const {email} = userData;
        const value =
          (await AsyncStorage.getItem(`@${email}REVIEW_REQUEST_SHOWN`)) ||
          'false';

        console.log(`@${email}REVIEW_REQUEST_SHOWN`, value);
        await AsyncStorage.setItem(`@${newEmail}REVIEW_REQUEST_SHOWN`, value);

        Intercom.updateUser({email: newEmail});
        navigation.navigate('VerifyChangeEmail', {email: newEmail});
      })
      .catch((err) => console.log(err));
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  const cells = [
    {
      name: 'newEmail',
      type: 'text',
      variant: 'email',
      textContentType: 'emailAddress',
      autoCompleteType: 'email',
      label: ProfileDict.ChangeEmailLabel2,
      ...cellFormStyles,
      inputContainerStyle: {
        ...cellFormStyles.inputContainerStyle,
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
        type="changeEmail"
        variant="white"
        onPress={onPressChange}
        icon="chevron"
      />
    </View>
  );
}
