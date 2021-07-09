/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 08:12:16 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, Platform, FlatList} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import Spacer from '../../components/Utility/Spacer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useRoute} from '@react-navigation/core';
import {useMutation} from '@apollo/client';
import UpdateExerciseNote from '../../apollo/mutations/UpdateExerciseNote';
import useData from '../../hooks/data/UseData';
import {useBackHandler} from '@react-native-community/hooks';

export default function ProgrammeUI() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles, cellFormConfig, cellFormStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();

  const {displayWeeks, currentWeekNumber} = useData();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {};

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View>
      <FlatList
        horizontal
        data={[]}
        renderItem={() => <></>}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
