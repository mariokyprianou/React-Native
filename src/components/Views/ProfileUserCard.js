/*
 * Created Date: Mon, 9th Nov 2020, 20:36:45 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import {FormHook} from 'the-core-ui-module-tdforms';

import useDictionary from '../../hooks/localisation/useDictionary';
import useTheme from '../../hooks/theme/UseTheme';
import TDIcon from 'the-core-ui-component-tdicon';
import {color} from 'react-native-reanimated';
import Spacer from '../Utility/Spacer';

const corkIcon = require('../../../assets/icons/settings.png');

export default function ProfileUserCard({
  firstName = 'Supply firstName',
  lastName = 'Supply lastName',
  memberSince = 'Supply Year',
  workoutsComplete = 'Supply Number',
  onPressRightIcon,
}) {
  // MARK: - Hooks
  const {
    colors,
    cellFormConfig,
    cellFormStyles,
    textStyles,
    dropdownStyle,
  } = useTheme();
  const {cleanErrors, getValues, updateError} = FormHook();
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const navigation = useNavigation();
  const {dictionary} = useDictionary();

  const {ProfileDict} = dictionary;

  // MARK: - Styles

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.white100,
      width: '90%',
      padding: getHeight(20),
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    },
    title: {...textStyles.bold34_black100, textAlign: 'left'},
    titleBlue: {...textStyles.bold34_aquamarine100, textAlign: 'left'},
    icon: {
      size: 15,
      solid: true,
    },
    header: {
      ...textStyles.medium14_brownishGrey100,
      color: colors.brownishGrey100,
      textAlign: 'left',
    },
  };

  // MARK: - Render

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.title}>{firstName}</Text>
          <Text style={styles.titleBlue}>{lastName}</Text>
        </View>
        <TouchableOpacity
          style={styles.topRightIconContainer}
          onPress={onPressRightIcon}>
          <TDIcon input={corkIcon} />
        </TouchableOpacity>
      </View>
      <Spacer height={20} />
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.header}>
            {ProfileDict.MemberSince.toUpperCase()}
          </Text>
          <Text style={styles.title}>{memberSince}</Text>
        </View>
        <View>
          <Text style={styles.header}>
            {ProfileDict.WorkoutsComplete.toUpperCase()}
          </Text>
          <Text style={styles.title}>{workoutsComplete}</Text>
        </View>
      </View>
    </View>
  );
}
