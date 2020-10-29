/*
 * Created Date: Sat, 28th Dec 2019, 17:57:15 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import {NativeModules, Platform} from 'react-native';

const iOSSecretsManager = NativeModules.iOSSecretsManager;
const AndroidSecretsManager = NativeModules.AndroidSecretsManager;

export default function fetchSecrets(environment) {
  if (Platform.OS === 'ios') {
    try {
      const secrets = iOSSecretsManager.fetch(environment);
      return secrets;
    } catch (error) {
      console.error(error);
      return null;
    }
  } else if (Platform.OS === 'android') {
    const secrets = AndroidSecretsManager.fetch(environment);
    return secrets;
  }

  return null;
}
