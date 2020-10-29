/*
 * Created Date: Fri, 27th Dec 2019, 21:02:13 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Theme from '../../styles/AppTheme';
import Secrets from '../../environment/Secrets';

const image = require('../../../assets/images/initial-release/initial-release.png');

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
