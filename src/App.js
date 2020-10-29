/*
 * Created Date: Tue, 24th Dec 2019, 18:43:10 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {ApolloProvider} from 'react-apollo';
import {NavigationContainer} from '@react-navigation/native';

import ApolloClient from './apollo/ApolloClient';
import Theme from './styles/AppTheme';
import isValidChecksum from './utils/checksumValidation';
import {Navigator as AppNavigator, Screen} from './navigation/AppStack';
import AppContainer from './AppContainer';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validChecksum, setValidChecksum] = useState(true);

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

    validateChecksum();
  }, [client]);

  // if (!validChecksum) {
  //   return <View style={{flex: 1, backgroundColor: 'pink'}} />;
  // }

  // if (loading) {
  //   return <View />;
  // }

  return (
    <ThemeProvider theme={Theme}>
      {/* <ApolloProvider client={client}> */}
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
      {/* </ApolloProvider> */}
    </ThemeProvider>
  );
};

export default App;
