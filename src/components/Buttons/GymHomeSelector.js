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

export default function GymHomeSelector() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ButtonText_Gym, ButtonText_Home} = dictionary;
  const [buttonText, setButtonText] = useState(ButtonText_Gym);
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
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    text: {
      ...textStyles.bold15_brownishGrey100,
    },
    icon: {
      color: colors.brownishGrey100,
      size: 15,
      solid: true,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleSelect() {
    if (buttonText === ButtonText_Gym) setButtonText(ButtonText_Home);
    if (buttonText === ButtonText_Home) setButtonText(ButtonText_Gym);
    console.log(buttonText);
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.pill}>
      <TouchableOpacity onPress={handleSelect} style={styles.touch}>
        <Text style={styles.text}>{buttonText}</Text>
        <TDIcon input={buttonIcon} inputStyle={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
