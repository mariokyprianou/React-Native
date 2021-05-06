/*
 * Created Date: Thu, 6th May 2021, 11:25:22 am
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import useLoading from '../../hooks/loading/useLoading';
import {useNavigation} from '@react-navigation/native';
import * as R from 'ramda';

export default function OnDemandScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles, colors} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  const [weekNumber, setWeekNumber] = useState(1);
  const [stayTunedEnabled, setStayTunedEnabled] = useState(true);

  const [workoutsToDisplay, setWorkoutsToDisplay] = useState([]);
  const navigation = useNavigation();
  const {setLoading} = useLoading();

  navigation.setOptions({
    header: () => null,
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return <View />;
}
