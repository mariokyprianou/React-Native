/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 09:06:22 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, Platform, View, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import TDIcon from 'the-core-ui-component-tdicon';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import {BottomTab} from '../navigation';
import WorkoutContainer from './WorkoutContainer';
import ProgressContainer from './ProgressContainer';
import ProfileContainer from './ProfileContainer';

const notificationCount = 2;

export default function TabContainer() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {fontSize, getHeight, getWidth} = ScaleHook();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {TabsTitleDict} = dictionary;

  const tabIcons = {
    workout: require('../../assets/icons/workout.png'),
    progress: require('../../assets/icons/progress.png'),
    profile: require('../../assets/icons/profile.png'),
  };
  const notificationDot = require('../../assets/icons/notificationDot.png');

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    tabBarOptionStyles: {
      justifyContent: 'center',
    },
    labelStyle: {
      // fontFamily: 'Poppins-SemiBold',
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
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.name;

    if (
      routeName === 'Calendar' ||
      routeName === 'Transformation' ||
      routeName === 'Transformation' ||
      routeName === 'Challenge' ||
      routeName === 'ChallengeEnd' ||
      routeName === 'ChallengeComplete' ||
      routeName === 'StartWorkout'
    ) {
      return false;
    }
    return true;
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: styles.tabBarOptionStyles,
        labelStyle: styles.labelStyle,
        activeTintColor: colors.black100,
        inactiveTintColor: colors.black30,
        ...Platform.select({
          android: {
            safeAreaInsets: {
              bottom: 10,
            },
          },
        }),
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
