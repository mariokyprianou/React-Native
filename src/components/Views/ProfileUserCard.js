/*
 * Created Date: Mon, 9th Nov 2020, 20:36:45 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useDictionary from '../../hooks/localisation/useDictionary';
import useTheme from '../../hooks/theme/UseTheme';
import TDIcon from 'the-core-ui-component-tdicon';
import Spacer from '../Utility/Spacer';

const corkIcon = require('../../../assets/icons/settings.png');

export default function ProfileUserCard({
  firstName = 'firstName',
  lastName = 'lastName',
  memberSince = 'Year',
  workoutsComplete = 'Number',
  onPressRightIcon,
}) {
  // MARK: - Hooks
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
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
    settingsButtonStyle: {
      position: 'absolute', 
      top: getHeight(10), 
      right: getWidth(10), 
      width: getWidth(40), 
      height: getWidth(40), 
      alignItems: 'center', 
      justifyContent: 'center'
    }
  };

  // MARK: - Render

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.title}>{firstName}</Text>
          <Text style={styles.titleBlue}>{lastName}</Text>
        </View>
       
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

      <TouchableOpacity
          style={styles.settingsButtonStyle}
          onPress={onPressRightIcon}>
          <TDIcon input={corkIcon} />
        </TouchableOpacity>
    </View>
  );
}
