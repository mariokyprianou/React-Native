/*
 * Created Date: Tue, 24th Dec 2019, 18:43:10 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View, StatusBar, Platform, I18nManager} from 'react-native';
import ThemeProvider from './hooks/theme/ThemeProvider';
import DictionaryProvider from './hooks/localisation/DictionaryProvider';
import {ApolloProvider} from 'react-apollo';
import {NavigationContainer} from '@react-navigation/native';
import {ScaleProvider} from 'react-native-design-to-component';
import {FormProvider} from 'the-core-ui-module-tdforms';
import QuickPicker from 'quick-picker';
import {TDCountdown} from 'the-core-ui-module-tdcountdown';
import * as ScreenCapture from 'expo-screen-capture';

import ApolloClient from './apollo/ApolloClient';
import Theme from './styles/AppTheme';
import isValidChecksum from './utils/checksumValidation';
import {Navigator as AppNavigator, Screen} from './navigation/AppStack';
import AppContainer from './AppContainer';
import SplashScreen from 'react-native-splash-screen';
import {useAsyncStorage} from '@react-native-community/async-storage';

const App = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validChecksum, setValidChecksum] = useState(true);
  const {getItem, setItem} = useAsyncStorage('@language');

  const setupApollo = async () => {
    const newClient = await ApolloClient();
    setClient(newClient);
    SplashScreen.hide();
    setLoading(false);
  };

  const validateChecksum = async () => {
    const valid = await isValidChecksum();
    setValidChecksum(valid);
  };

  useEffect(() => {
    if (!client) {
      setupApollo();
    }
    StatusBar.setBarStyle('dark-content');

    const screenshotListener = ScreenCapture.addScreenshotListener(() => {
      console.log('Screenshoted!');
    });

    validateChecksum();
    languageSet();

    return () => {
      screenshotListener.remove();
    };
  }, [client]);

  if (!validChecksum) {
    return <View style={{flex: 1, backgroundColor: 'pink'}} />;
  }

  // if (loading) {
  //   return <View />;
  // }

  // const selectedLanguage = 'LTR';

  const languageSet = async () => {
    const language = await getItem();

    if (language === 'ur-IN') {
      if (!I18nManager.isRTL) {
        I18nManager.forceRTL(true);
      }
    } else {
      if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
      }
    }
  };

  return (
    <>
      {Platform.OS === 'android' && (
        <StatusBar translucent backgroundColor="transparent" />
      )}

      <ScaleProvider config={{height: 667, width: 375}}>
        <ThemeProvider>
          <DictionaryProvider>
            {/* <ApolloProvider client={client}> */}
            <NavigationContainer>
              <TDCountdown>
                <FormProvider>
                  <AppContainer />
                </FormProvider>
              </TDCountdown>
            </NavigationContainer>
            {/* </ApolloProvider> */}
          </DictionaryProvider>
        </ThemeProvider>
      </ScaleProvider>
      <QuickPicker />
    </>
  );
};

export default App;
