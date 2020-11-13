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

const reminder = require('../../../assets/icons/reminder.png');

const CustomCountdown = ({onPress}) => {
  const {getHeight} = ScaleHook();
  const {dictionary} = useDictionary();
  const {ButtonText_3secs} = dictionary;

  const styles = {
    countdownStyle: {
      height: getHeight(25),
      width: getHeight(25),
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: getHeight(6),
      justifySelf: 'flex-end',
    },
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconContainer}>
        <TDIcon input={reminder} inputStyle={{style: styles.countdownStyle}} />
      </View>
      <Text style={styles.text}>{ButtonText_3secs}</Text>
    </TouchableOpacity>
  );
};

export default CustomCountdown;
