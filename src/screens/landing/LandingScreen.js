import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import NumbersWheel from '../../components/Infographics/NumbersWheel';
import Intercom from 'react-native-intercom';

export default function LandingScreen(props) {
  const {reset} = useNavigation();
  useEffect(() => {
    async function checkAuth() {
      await Auth.currentAuthenticatedUser()
        .then((_res) => {
          Intercom.registerIdentifiedUser({email: _res.attributes.email});
          reset({
            index: 0,
            routes: [{name: 'TabContainer'}],
          });

          setTimeout(() => {
            SplashScreen.hide();
          }, 1000);
        })
        .catch((_err) => {
          Intercom.registerUnidentifiedUser();
          reset({
            index: 0,
            routes: [{name: 'AuthContainer'}],
          });
        })
        .finally(() => {
          // setTimeout(() => {
          //   SplashScreen.hide();
          // }, 1000);
        });
    }
    if (reset) {
      checkAuth();
    }
  }, [reset]);

  return <View />;
}
