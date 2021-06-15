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
import isValidChecksum from './utils/checksumValidation';
import AppContainer from './AppContainer';
import {useAsyncStorage} from '@react-native-community/async-storage';
import Amplify from 'aws-amplify';
import {TDGraphQLProvider} from './apollo/Client';
import UserDataProvider from './hooks/data/UserDataProvider';
import Secrets from './environment/Secrets';
import LoadingProvider from './hooks/loading/LoadingProvider';
import CommonDataProvider from './hooks/data/CommonDataProvider';
import ProgressDataProvider from './hooks/data/ProgressDataProvider';
import WorkoutTimerProvider from './hooks/timer/WorkoutTimerProvider';
import ShareProvider from './hooks/share/ShareProvider';
import QueryProvider from './hooks/customQuery/Provider';
import {firebase} from '@react-native-firebase/analytics';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import OfflineHandlerProvider from './hooks/offlineHandler/Provider';
import RefetchProvider from './hooks/refetch/Provider';

const {awsRegion, userPoolId, clientId} = Secrets();

const authConfig = {
  Auth: {
    region: awsRegion,
    userPoolId: userPoolId,
    userPoolWebClientId: clientId,
  },
};

Amplify.configure(authConfig);

const App = () => {
  const [client, setClient] = useState();
  const [validChecksum, setValidChecksum] = useState(true);
  const {getItem} = useAsyncStorage('@language');
  const [presetLocale, setPresetLocale] = useState();

  useEffect(() => {
    async function BuildClient() {
      const gqlClient = await TDGraphQLProvider();
      setClient(gqlClient);

      if (!firebase.apps.length) {
        await firebase.initializeApp();
      }
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

    setPresetLocale(language || 'en-GB');
  };

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');

    validateChecksum();
    languageSet();
  }, []);

  if (!validChecksum) {
    return <View style={{flex: 1, backgroundColor: 'pink'}} />;
  }

  if (!client) {
    return <View />;
  }

  if (!presetLocale) {
    return <View />;
  }

  return (
    <>
      {Platform.OS === 'android' && (
        <StatusBar translucent backgroundColor="transparent" />
      )}
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <QueryProvider>
            <ScaleProvider config={{height: 667, width: 375}}>
              <ThemeProvider>
                {/* Pass preset locale value on provider to avoid rendering wrong default value   */}
                <DictionaryProvider presetLocale={presetLocale}>
                  <DataProvider>
                    <UserDataProvider>
                      <CommonDataProvider>
                        <ProgressDataProvider>
                          <WorkoutTimerProvider>
                            <ShareProvider>
                              <LoadingProvider>
                                <RefetchProvider>
                                  <NavigationContainer>
                                    <TDCountdown>
                                      <FormProvider>
                                        <OfflineHandlerProvider>
                                          <AppContainer />
                                        </OfflineHandlerProvider>
                                      </FormProvider>
                                    </TDCountdown>
                                  </NavigationContainer>
                                </RefetchProvider>
                              </LoadingProvider>
                            </ShareProvider>
                          </WorkoutTimerProvider>
                        </ProgressDataProvider>
                      </CommonDataProvider>
                    </UserDataProvider>
                  </DataProvider>
                </DictionaryProvider>
              </ThemeProvider>
            </ScaleProvider>
          </QueryProvider>
        </ApolloProvider>
      </SafeAreaProvider>
      <QuickPicker />
    </>
  );
};

export default App;
