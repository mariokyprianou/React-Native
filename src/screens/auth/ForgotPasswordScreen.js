/*
 * Created Date: Fri, 6th Nov 2020, 12:50:51 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';
import {format} from 'date-fns';
import QuickPicker from 'quick-picker';
import TDIcon from 'the-core-ui-component-tdicon';


import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex, passwordRegex} from '../../utils/regex';
import useRegistrationData from '../../hooks/data/useRegistrationData';
import Header from '../../components/Headers/Header';
import StylisedText from '../../components/text/StylisedText';

{/* 
   <AppStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
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
    */}


export default function Screen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {cellFormStyles, dropdownStyle, cellFormConfig, textStyles, colors} = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {dictionary} = useDictionary();
  const { 
    
    emailLabel,
    passwordLabel, 
    forgotPasswordButtonText,  
  invalidEmail,
invalidPassword } = dictionary.RegistrationDict;

  const [loading, setLoading] = useState(false);
  const [activeReset, setActiveReset] = useState(false);

  useEffect(() => {
    const {
      emailAddress,
      password, 
    } = getValues();
    
    if (emailAddress && password ) {
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
        alignItems: 'center'
    },
    forgotPasswordContainerStyle: {flexDirection: 'row', marginTop: getHeight(20), alignSelf:'center', padding: getWidth(2)},
    forgotPasswordStyle: {...textStyles.semiBold16_brownishGrey100}
 
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleSendReset() {
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
  }


  // ** ** ** ** ** RENDER ** ** ** ** **
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
   
  ];

  const config = {
    ...cellFormConfig,
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewContainer}>
        <Form cells={cells} config={config} />
        
      </ScrollView>
      <View style={styles.buttonContainer}>
        <DefaultButton type="resetRequest" variant="white" icon="chevron" onPress={handleSendReset}/>
        </View>
     
    </View>
  );
}