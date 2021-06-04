/*
 * Created Date: Fri, 6th Nov 2020, 14:11:33 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import TDIcon from 'the-core-ui-component-tdicon';
import useTheme from '../../hooks/theme/UseTheme';

export default function ({enabled = true}) {
  const {getWidth, fontSize} = ScaleHook();
  const {colors} = useTheme();

  const icon = require('../../../assets/icons/dropdown.png');

  const styles = {
    style: {
      opacity: enabled === false ? 0.5 : 1,
    },
  };
  return (
    <View style={{marginRight: getWidth(-5)}}>
      <TDIcon
        input="chevron-down"
        inputStyle={{solid: true, size: fontSize(12.5), color: colors.black100}}
      />
    </View>
  );
}
