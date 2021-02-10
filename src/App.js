/*
 * Created Date: Tue, 24th Dec 2019, 18:43:10 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View, StatusBar, Platform, I18nManager, Alert} from 'react-native';
import ThemeProvider from './hooks/theme/ThemeProvider';
import DictionaryProvider from './hooks/localisation/DictionaryProvider';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {ScaleProvider} from 'react-native-design-to-component';
import {FormProvider} from 'the-core-ui-module-tdforms';
import DataProvider from './hooks/data/DataProvider';
import QuickPicker from 'quick-picker';
import {TDCountdown} from 'the-core-ui-module-tdcountdown';
import * as ScreenCapture from 'expo-screen-capture';
import isValidChecksum from './utils/checksumValidation';
import AppContainer from './AppContainer';
import {useAsyncStorage} from '@react-native-community/async-storage';
// import Intercom from 'react-native-intercom';
import Amplify from 'aws-amplify';
import {TDGraphQLProvider} from './apollo/Client';
import UserDataProvider from './hooks/data/UserDataProvider';
import LoadingProvider from './hooks/loading/LoadingProvider';
import getTimeZoneOffset from './utils/getTimeZoneOffset';

const authConfig = {
  Auth: {
    region: 'ap-south-1',
    userPoolId: 'ap-south-1_yaNI1zrXU',
    userPoolWebClientId: '1eln0nrnineheq1c9e443shd8l',
  },
};

Amplify.configure(authConfig);

const App = () => {
  const [client, setClient] = useState();
  const [validChecksum, setValidChecksum] = useState(true);
  const {getItem, setItem} = useAsyncStorage('@language');

  useEffect(() => {
    async function BuildClient() {
      const gqlClient = await TDGraphQLProvider();
      setClient(gqlClient);
    }

    BuildClient();
  }, []);

  const validateChecksum = async () => {
    const valid = await isValidChecksum();
    setValidChecksum(valid);
  };

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

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    let screenshotListener;

    if (Platform.OS === 'ios') {
      screenshotListener = ScreenCapture.addScreenshotListener(() => {
        Alert.alert(
          'Oops!',
          'You cannot screen record or take screenshots whilst using the Power application. If you would like to share your progress, please use the Share buttons that can be found throughout the app.',
          [{text: 'OK'}],
          {cancelable: false},
        );
      });
    }
    validateChecksum();
    languageSet();
    // Intercom.registerUnidentifiedUser();

    return () => {
      if (Platform.OS === 'ios') {
        screenshotListener.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!validChecksum) {
    return <View style={{flex: 1, backgroundColor: 'pink'}} />;
  }

  if (!client) {
    return <View />;
  }

  return (
    <>
      {Platform.OS === 'android' && (
        <StatusBar translucent backgroundColor="transparent" />
      )}
      <ApolloProvider client={client}>
        <ScaleProvider config={{height: 667, width: 375}}>
          <ThemeProvider>
            <DataProvider>
              <UserDataProvider>
                <LoadingProvider>
                  <DictionaryProvider>
                    <NavigationContainer>
                      <TDCountdown>
                        <FormProvider>
                          <AppContainer />
                        </FormProvider>
                      </TDCountdown>
                    </NavigationContainer>
                  </DictionaryProvider>
                </LoadingProvider>
              </UserDataProvider>
            </DataProvider>
          </ThemeProvider>
        </ScaleProvider>
      </ApolloProvider>

      <QuickPicker />
    </>
  );
};

export default App;
