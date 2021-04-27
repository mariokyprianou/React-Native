/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 09:06:22 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {StyleSheet, Platform, View, Image, Alert} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import TDIcon from 'the-core-ui-component-tdicon';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import {BottomTab} from '../navigation';
import WorkoutContainer from './WorkoutContainer';
import ProgressContainer from './ProgressContainer';
import ProfileContainer from './ProfileContainer';
import isIphoneX from '../utils/isIphoneX';
import {useNavigation} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import useUserData from '../hooks/data/useUserData';
import * as ScreenCapture from 'expo-screen-capture';
import displayAlert from '../utils/DisplayAlert';
import ScreenshotTaken from '../apollo/mutations/ScreenshotTaken';
import {useMutation} from '@apollo/client';

const notificationCount = 2;

export default function TabContainer() {
  // ** ** ** ** ** SETUP ** ** ** ** **

  const navigation = useNavigation();

  const {fontSize, getHeight, getWidth} = ScaleHook();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {TabsTitleDict} = dictionary;

  const {changeDevice, setSuspendedAccount} = useUserData();

  const [increaseShotTaken] = useMutation(ScreenshotTaken);

  useEffect(() => {
    if (changeDevice && changeDevice.newDeviceId) {
      navigation.navigate('ChangeDevice', {...changeDevice});
    }
  }, [changeDevice]);

  useEffect(async () => {
    let screenshotListener;

    if (Platform.OS === 'ios') {
      await ScreenCapture.preventScreenCaptureAsync();

      screenshotListener = ScreenCapture.addScreenshotListener(() => {
        displayAlert({
          text: TabsTitleDict.ScreenShotMessage,
          buttons: [
            {
              text: TabsTitleDict.ScreenShotButton,
              onPress: () => {
                increaseShotTaken()
                  .then((res) => {
                    if (
                      res &&
                      res.data.screenshotTaken &&
                      res.data.screenshotTaken.success
                    ) {
                      if (res.data.screenshotTaken.screenshotsTaken >= 7) {
                        setSuspendedAccount(true);
                      }
                    }
                  })
                  .catch((err) => {
                    console.log('increaseShotTaken - err', err);
                  });
              },
            },
          ],
        });
      });
    }

    return () => {
      if (Platform.OS === 'ios') {
        screenshotListener.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabIcons = {
    workout: require('../../assets/icons/workout.png'),
    progress: require('../../assets/icons/progress.png'),
    profile: require('../../assets/icons/profile.png'),
  };
  const notificationDot = require('../../assets/icons/notificationDot.png');

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    tabBarStyle: {
      height: getHeight(70),
    },
    tabBarItemStyle: {
      justifyContent: 'center',
      marginBottom: isIphoneX() ? getHeight(0) : getHeight(20),
      marginTop: isIphoneX() ? getHeight(10) : getHeight(15),
    },
    labelStyle: {
      fontFamily: 'proximanova-semibold',
      fontSize: fontSize(10),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const TabIcon = ({color, name}) => {
    return (
      <View style={{position: 'relative'}}>
        <TDIcon
          input={tabIcons[name]}
          inputStyle={{
            style: {
              height: getHeight(18),
              width: getWidth(18),
              resizeMode: 'contain',
              tintColor: color,
            },
          }}
        />
        {notificationCount > 0 && name === 'profile' && (
          <Image
            source={notificationDot}
            style={{
              position: 'absolute',
              top: 0,
              right: -6,
            }}
          />
        )}
      </View>
    );
  };

  function getTabBarVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route) || route.name;

    // const routeName = route.state
    //   ? route.state.routes[route.state.index].name
    //   : route.name;

    if (
      routeName === 'Calendar' ||
      routeName === 'Transformation' ||
      routeName === 'Transformation' ||
      routeName === 'Challenge' ||
      routeName === 'ChallengeEnd' ||
      routeName === 'ChallengeComplete' ||
      routeName === 'StartWorkout' ||
      routeName === 'Notes' ||
      routeName === 'Workout' ||
      routeName === 'WeightCapture' ||
      routeName === 'WeekComplete' ||
      routeName === 'TakeARest' ||
      routeName === 'WorkoutComplete' ||
      routeName === 'SetCompletion' ||
      routeName === 'AddPhoto' ||
      routeName === 'ChangePassword' ||
      routeName === 'ChangeEmail' ||
      routeName === 'StayTuned' ||
      routeName === 'VerifyChangeEmail' ||
      routeName === 'Settings'
    ) {
      return false;
    }
    return true;
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        tabStyle: styles.tabBarItemStyle,
        style: styles.tabBarStyle,
        labelStyle: styles.labelStyle,
        activeTintColor: colors.black100,
        inactiveTintColor: colors.black30,
      }}>
      <BottomTab.Screen
        name="Tab1"
        component={WorkoutContainer}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color}) => <TabIcon name="workout" color={color} />,
          tabBarLabel: TabsTitleDict.Workouts,
        })}
      />
      <BottomTab.Screen
        name="Tab2"
        component={ProgressContainer}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color}) => <TabIcon name="progress" color={color} />,
          tabBarLabel: TabsTitleDict.Progress,
        })}
      />
      <BottomTab.Screen
        name="Tab3"
        component={ProfileContainer}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color}) => <TabIcon name="profile" color={color} />,
          tabBarLabel: TabsTitleDict.Profile,
        })}
      />
    </BottomTab.Navigator>
  );
}
