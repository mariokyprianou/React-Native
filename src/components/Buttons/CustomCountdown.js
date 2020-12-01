/*
 * Jira Ticket:
 * Created Date: Mon, 9th Nov 2020, 15:00:17 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import TDIcon from 'the-core-ui-component-tdicon';
import {ScaleHook} from 'react-native-design-to-component';
import useDictionary from '../../hooks/localisation/useDictionary';
import useTheme from '../../hooks/theme/UseTheme';

const reminder = require('../../../assets/icons/reminder.png');

const CustomCountdown = ({onPress}) => {
  const {getHeight, fontSize} = ScaleHook();
  const {dictionary} = useDictionary();
  const {ButtonDict} = dictionary;
  const {textStyles} = useTheme();

  const styles = {
    countdownStyle: {
      height: getHeight(25),
      width: getHeight(25),
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: getHeight(6),
      marginTop: getHeight(17),
      justifySelf: 'flex-end',
    },
    text: {
      ...textStyles.semiBold14_black100,
      lineHeight: fontSize(15),
      textAlign: 'center',
    },
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconContainer}>
        <TDIcon input={reminder} inputStyle={{style: styles.countdownStyle}} />
      </View>
      <Text style={styles.text}>{ButtonDict.ThreeSecs}</Text>
    </TouchableOpacity>
  );
};

export default CustomCountdown;
