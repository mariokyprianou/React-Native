/*
 * Jira Ticket:
 * Created Date: Mon, 9th Nov 2020, 15:00:17 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {Text, View} from 'react-native';
import TDIcon from 'the-core-ui-component-tdicon';
import {ScaleHook} from 'react-native-design-to-component';
import useDictionary from '../../hooks/localisation/useDictionary';
import useTheme from '../../hooks/theme/UseTheme';

const reminder = require('../../../assets/images/countdownTimer.png');

const CustomCountdown = ({time}) => {
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {dictionary} = useDictionary();
  const {ButtonDict} = dictionary;
  const {textStyles} = useTheme();

  const countdownText = (time / 1000).toString();

  const styles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      //backgroundColor: 'red',
      padding: getWidth(20)
    },
    countdownStyle: {
      height: getHeight(25),
      width: getHeight(25),
    },
    iconContainer: {
      marginRight: getWidth(7),
    },
    text: {
      ...textStyles.semiBold14_black100,
      lineHeight: fontSize(15),
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TDIcon input={reminder} inputStyle={{style: styles.countdownStyle}} />
      </View>
      <Text style={styles.text}>{ButtonDict.Secs(countdownText)}</Text>
    </View>
  );
};

export default CustomCountdown;
