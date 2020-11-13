/*
 * Created Date: Fri, 6th Nov 2020, 11:01:45 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';
import WebView from 'react-native-webview';

import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import FadingBottomView from './FadingBottomView';

export default function TermsPolicyContentView({isHtml, content}) {
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

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    scrollViewContainer: {
      paddingHorizontal: getWidth(25),
      height: '100%',
      width: '100%',
    },
    webViewContainer: {
      flex: 1,
      width: '100%',
      minHeight: getHeight(1050),
      alignSelf: 'center',
      marginBottom: getHeight(120),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewContainer}>
        <View style={styles.webViewContainer}>
          {isHtml ? (
            <WebView
              style={{
                backgroundColor: 'transparent',
                paddingBottom: getHeight(80),
              }}
              source={{html: content}}
              scalesPageToFit={false}
              scrollEnabled={false}
              userAgent={'mobileapp'}
            />
          ) : (
            <Text style={{...textStyles.regular15_brownishGrey100}}>
              {content}
            </Text>
          )}
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <FadingBottomView height={337} />
      </View>
    </>
  );
}
