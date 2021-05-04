/*
 * Created Date: Fri, 6th Nov 2020, 11:01:45 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {ScrollView, View, Text, Dimensions, Platform} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import WebView from 'react-native-webview';
import useTheme from '../../hooks/theme/UseTheme';
import FadingBottomView from './FadingBottomView';
import RNFetchBlob from 'rn-fetch-blob';

export default function TermsPolicyContentView({isHtml, content}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {textStyles, colors} = useTheme();
  const {getHeight, getWidth} = ScaleHook();

  const baseUrl = RNFetchBlob.fs.dirs.MainBundleDir;
  const fontFileName = 'ProximaNova-Medium';
  const fontFamilyName = 'Proxima Nova';
  const fileFormat = 'otf';
  const fileUri = Platform.select({
    ios: `${fontFileName}.${fileFormat}`,
    android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`,
  });

  const css = `@font-face {
      font-family: '${fontFileName}';
      src: local('${fontFileName}'), url('${fileUri}'), format('opentype');
  }`;

  const screenWidth = Dimensions.get('screen').width;
  const spacing =
    '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>br><br><br><br><br>';
  const style = `<style type="text/css">
        ${css}
        body, h1, h2, h3, p {
            color: ${colors.brownishGrey100};
            font-family: '${fontFileName}';
        }
    </style>`;
  const htmlWithWidth =
    `<html><head><meta name="viewport" content="width=${screenWidth}">` +
    style +
    `</head>${content}${spacing}</html>`;

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
        scrollEnabled={false}
        style={styles.scrollViewContainer}>
        <View style={styles.webViewContainer}>
          {isHtml ? (
            <WebView
              useWebKit={true}
              originWhitelist={['*']}
              style={styles.webView}
              source={{
                html: htmlWithWidth,
                baseUrl,
              }}
              scalesPageToFit={false}
              scrollEnabled={true}
              userAgent={'mobileapp'}
              showsVerticalScrollIndicator={false}
              allowFileAccess={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
            />
          ) : (
            <Text style={styles.text}>{content}</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomView} pointerEvents="none">
        <FadingBottomView height={280} />
      </View>
    </>
  );
}
