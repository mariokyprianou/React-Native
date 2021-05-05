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
import { SafeAreaProvider,} from 'react-native-safe-area-context';

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
  const {getItem, setItem} = useAsyncStorage('@language');

  useEffect(() => {
    async function BuildClient() {
      const gqlClient = await TDGraphQLProvider();
      setClient(gqlClient);

      await firebase.initializeApp();
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

    validateChecksum();
    languageSet();
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
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <ScaleProvider config={{height: 667, width: 375}}>
            <ThemeProvider>
              <DictionaryProvider>
                <QueryProvider>
                  <DataProvider>
                    <UserDataProvider>
                      <CommonDataProvider>
                        <ProgressDataProvider>
                          <WorkoutTimerProvider>
                            <ShareProvider>
                              <LoadingProvider>
                                <NavigationContainer>
                                  <TDCountdown>
                                    <FormProvider>
                                      <AppContainer />
                                    </FormProvider>
                                  </TDCountdown>
                                </NavigationContainer>
                              </LoadingProvider>
                            </ShareProvider>
                          </WorkoutTimerProvider>
                        </ProgressDataProvider>
                      </CommonDataProvider>
                    </UserDataProvider>
                  </DataProvider>
                </QueryProvider>
              </DictionaryProvider>
            </ThemeProvider>
          </ScaleProvider>
        </ApolloProvider>
      </SafeAreaProvider>
      <QuickPicker />
    </>
  );
};

export default App;
