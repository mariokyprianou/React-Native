/*
 * Jira Ticket:
 * Created Date: Thu, 29th Oct 2020, 15:16:27 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';

export default function GymHomeSelector({onPress, text}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ButtonDict} = dictionary;
  const [buttonText, setButtonText] = useState(ButtonDict.Gym);
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
      ...textStyles.bold15_brownishGrey100,
      marginRight: getWidth(5),
    },
    icon: {
      color: colors.brownishGrey100,
      size: 15,
      solid: true,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleSelect() {
    if (buttonText === ButtonDict.Gym) {
      setButtonText(ButtonDict.Home);
      onPress('HOME');
    }
    if (buttonText === ButtonDict.Home) {
      setButtonText(ButtonDict.Gym);
      onPress('GYM');
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.pill}>
      <TouchableOpacity onPress={onPress} style={styles.touch}>
        <Text style={styles.text}>{text}</Text>
        <TDIcon input={buttonIcon} inputStyle={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
