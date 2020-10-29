/*
 * Jira Ticket:
 * Created Date: Thu, 29th Oct 2020, 13:00:59 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Theme from '../styles/AppTheme';
import Secrets from '../environment/Secrets';

const image = require('../../assets/images/initial-release/initial-release.png');

const InitialReleaseScreen = () => {
  useEffect(() => {
    SplashScreen.hide();

    const secrets = Secrets();
    console.log('Fetched secrets:', secrets);
  }, []);

  return (
    <View style={Theme.InitialReleaseScreen.container}>
      <Image source={image} style={Theme.InitialReleaseScreen.image} />
    </View>
  );
};

export default InitialReleaseScreen;
