import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import NumbersWheel from '../../components/Infographics/NumbersWheel';

export default function LandingScreen(props) {
  const {reset} = useNavigation();
  useEffect(() => {
    async function checkAuth() {
      await Auth.currentAuthenticatedUser()
        .then((_res) => {
          reset({
            index: 0,
            routes: [{name: 'TabContainer'}],
          });
        })
        .catch((_err) =>
          reset({
            index: 0,
            routes: [{name: 'AuthContainer'}],
          }),
        )
        .finally(() => {
          setTimeout(()=> {
            SplashScreen.hide();
          }, 500);
        });
    }
    if (reset) {
      checkAuth();
    }
  }, [reset]);

  return <View />;
}
