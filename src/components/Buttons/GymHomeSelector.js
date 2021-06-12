/*
 * Jira Ticket:
 * Created Date: Thu, 29th Oct 2020, 15:16:27 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';

export default function GymHomeSelector({onPress, text, singleProgramme}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {HelpMeChooseDict} = dictionary;
  const buttonIcon = require('../../../assets/icons/reverse.png');

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    pill: {
      backgroundColor: colors.white80,
      flexDirection: 'row',
      width: getWidth(82),
      height: getHeight(28),
      borderRadius: radius(18),
    },
    touch: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      ...textStyles.semiBold13_brownishGrey100,
      marginRight: getWidth(5),
    },
    icon: {
      color: colors.brownishGrey100,
      size: 15,
      solid: true,
    },
  };

  const environmentTitle =
    text === 'HOME'
      ? HelpMeChooseDict.Home.toUpperCase()
      : HelpMeChooseDict.Gym.toUpperCase();

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.pill}>
      <TouchableOpacity
        onPress={!singleProgramme ? onPress : null}
        activeOpacity={singleProgramme ? 1 : 0.2}
        style={styles.touch}>
        <Text style={styles.text}>{environmentTitle}</Text>
        {!singleProgramme && (
          <TDIcon input={buttonIcon} inputStyle={styles.icon} />
        )}
      </TouchableOpacity>
    </View>
  );
}
