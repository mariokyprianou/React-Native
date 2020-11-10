/*
 * Created Date: Fri, 6th Nov 2020, 14:18:54 pm
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

    const enabledIcon = require('../../../assets/icons/passwordEyeSlash.png');

    const disabledIcon = require('../../../assets/icons/passwordEyeSlash.png');
  return (
    <View style={{marginRight: getWidth(-5)}}>
      <TDIcon
        input={enabled ? enabledIcon : disabledIcon}
      />
    </View>
  );
}