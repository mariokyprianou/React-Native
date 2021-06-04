/*
 * Created Date: Thu, 6th May 2021, 11:11:21 am
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {OnDemandStack} from '../navigation';
import OnDemandScreen from '../screens/OnDemand/OnDemandScreen';
import StartWorkoutScreen from '../screens/workout/StartWorkoutScreen';
import {TransitionPresets} from '@react-navigation/stack';

export default function OnDemandContainer(props) {
  // Potencial solution for jumping issue on tab switch
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // React.useEffect(() => {
  //   Animated.spring(fadeAnim, {
  //     toValue: 1,
  //     duration: 100,
  //     useNativeDriver: true,
  //   }).start();
  // }, [fadeAnim]);

  // return (
  //   <Animated.View style={{opacity: fadeAnim, flex: 1}}>
  //      </Animated.View>
  // )

  return (
    <OnDemandStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <OnDemandStack.Screen
        name="OnDemand"
        component={OnDemandScreen}
        options={{headerShown: false}}
      />
      <OnDemandStack.Screen
        name="StartWorkout"
        component={StartWorkoutScreen}
      />
    </OnDemandStack.Navigator>
  );
}
