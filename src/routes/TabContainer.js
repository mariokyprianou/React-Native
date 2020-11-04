/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 09:06:22 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import TDIcon from 'the-core-ui-component-tdicon';
import {useTheme, useDictionary} from '../../hooks';
import {BottomTab} from '../navigation';

export default function TabContainer() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {fontSize} = ScaleHook();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {TabTitle_Profile, TabTitle_Progress, TabTitle_Workouts} = dictionary;

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
  function renderIcon(color, name) {
    return (
      <TDIcon
        {...{
          input: name,
          inputStyle: {color, size: fontSize(17)},
        }}
      />
    );
  }

  function getTabBarVisibility(route) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.name;

    // Hide the tab bar on these screens/routes - onboarding screen, switch trainer stack, auth stack,
    // workout screen, exercise screen, calendar screen, transformation screen, challenge screen,
    // change password screen, change email screen, settings screen
    if (
      routeName === 'Filter' ||
      routeName === 'ArticleDetail' ||
      routeName === 'Email' ||
      routeName === 'FindAUnion'
    ) {
      return false;
    }

    // Show the tab bar on all other screens/routes.
    return true;
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: styles.tabBarOptionStyles,
        labelStyle: styles.labelStyle,
        activeTintColor: colors.darkBlueGrey100,
        inactiveTintColor: colors.veryLightPink100,
        ...Platform.select({
          android: {
            safeAreaInsets: {
              bottom: 10,
            },
          },
        }),
      }}>
      {/* <BottomTab.Screen
        name="Tab1"
        component={NewsContainer}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color}) => renderIcon(color, 'newspaper'),
          tabBarLabel: TabTitle_Workouts,
        })}
      />
      <BottomTab.Screen
        name="Tab2"
        component={HealthContainer}
        options={{
          tabBarIcon: ({color}) => renderIcon(color, 'heart'),
          tabBarLabel: TabTitle_Progress,
        }}
      />
      <BottomTab.Screen
        name="Tab3"
        component={ResourcesContainer}
        options={{
          tabBarIcon: ({color}) => renderIcon(color, 'books'),
          tabBarLabel: TabTitle_Profile,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}
