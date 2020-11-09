/*
 * Created Date: Fri, 6th Nov 2020, 13:57:37 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React from 'react';
import {View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import TDIcon from 'the-core-ui-component-tdicon';
import useTheme from '../../hooks/theme/UseTheme';

export default function({enabled = true}) {
  const {getWidth, fontSize} = ScaleHook();
  const {colors} = useTheme();

    const icon = require('../../../assets/icons/calendar.png');

  return (
    <View style={{marginRight: getWidth(-5)}}>
      <TDIcon
        input={icon}
      />
    </View>
  );
}