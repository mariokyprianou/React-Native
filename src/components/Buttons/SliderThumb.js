/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 15:32:51 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import TDIcon from 'the-core-ui-component-tdicon';

export default function SliderThumb() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      width: getWidth(45),
      height: getHeight(22),
      radius: radius(14),
      backgroundColor: colors.veryLightPink100,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    icon: {
      size: fontSize(10),
      color: colors.black100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <TDIcon input={'chevron-left'} inputStyle={styles.icon} />
      <TDIcon input={'chevron-right'} inputStyle={styles.icon} />
    </View>
  );
}
