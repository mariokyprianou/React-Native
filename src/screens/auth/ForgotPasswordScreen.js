/*
 * Created Date: Fri, 6th Nov 2020, 12:50:51 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React from 'react';
import {ScrollView, View} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex} from '../../utils/regex';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';

export default function Screen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  navigation.setOptions({
    header: () => <Header title={'Forgot password'} goBack />,
  });

  const {cellFormStyles, cellFormConfig, textStyles, colors} = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth} = ScaleHook();
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;

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
    forgotPasswordContainerStyle: {
      flexDirection: 'row',
      marginTop: getHeight(20),
      alignSelf: 'center',
      padding: getWidth(2),
    },
    forgotPasswordStyle: {...textStyles.semiBold16_brownishGrey100},
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleSendReset() {
    cleanErrors();
    const {emailAddress} = getValues();
    if (!emailAddress || !emailRegex.test(emailAddress)) {
      updateError({
        name: 'emailAddress',
        value: AuthDict.InvalidEmail,
      });
      return;
    }
    navigation.navigate('ResetPassword');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
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
        <View style={{marginHorizontal: getWidth(25)}}>
          <Form cells={cells} config={config} />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="resetRequest"
          variant="white"
          icon="chevron"
          onPress={handleSendReset}
        />
      </View>
    </View>
  );
}
