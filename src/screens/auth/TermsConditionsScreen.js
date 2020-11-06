/*
 * Created Date: Fri, 6th Nov 2020, 10:23:25 am
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
import WebView from 'react-native-webview';


import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import {emailRegex, passwordRegex} from '../../utils/regex';
import useTermsPolicyData from '../../hooks/data/useTermsPolicyData';
import Header from '../../components/Headers/Header';
import FadingBottomView from '../../components/Views/FadingBottomView';
import TermsPolicyContentView from '../../components/Views/TermsPolicyContentView';
 


export default function RegisterScreen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {cellFormStyles, dropdownStyle, cellFormConfig, textStyles, colors} = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth, fontSize} = ScaleHook();

  const { termsAndConditions, isHtml } = useTermsPolicyData();


  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    render: {
      container: {
        flex: 1,
      },
  
    },
    
    buttonContainer: {
     
        position: 'absolute',
        bottom:0,
        width: "100%",
        marginBottom: getHeight(40),
        alignItems: 'center'
    
    }
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  


  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View style={styles.render.container}>
      <TermsPolicyContentView isHtml={isHtml} content={termsAndConditions}/>
      <View style={styles.buttonContainer}>
        <DefaultButton type="done" variant="white" icon="chevron"/>
      </View>
    </View>
  );
}