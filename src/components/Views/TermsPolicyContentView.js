/*
 * Created Date: Fri, 6th Nov 2020, 11:01:45 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import WebView from 'react-native-webview';
import useTheme from '../../hooks/theme/UseTheme';
import FadingBottomView from './FadingBottomView';

export default function TermsPolicyContentView({isHtml, content}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    scrollViewContainer: {
      height: '100%',
      width: '100%',
    },
    webViewContainer: {
      paddingHorizontal: getWidth(25),
      flex: 1,
      width: '100%',
      minHeight: getHeight(1050),
      alignSelf: 'center',
      marginBottom: getHeight(120),
    },
    text: {
      ...textStyles.regular15_brownishGrey100,
    },
    webView: {
      backgroundColor: 'transparent',
      paddingBottom: getHeight(80),
    },
    bottomView: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
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
              style={styles.webView}
              source={{html: content}}
              scalesPageToFit={false}
              scrollEnabled={false}
              userAgent={'mobileapp'}
            />
          ) : (
            <Text style={styles.text}>{content}</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <FadingBottomView height={250} />
      </View>
    </>
  );
}
