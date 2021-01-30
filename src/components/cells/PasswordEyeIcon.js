/*
 * Created Date: Fri, 6th Nov 2020, 14:18:54 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import TDIcon from 'the-core-ui-component-tdicon';

export default function ({enabled = true}) {
  const {getWidth, fontSize} = ScaleHook();

  const styles = {
    icon: {
      size: fontSize(12),
    },
  };

  return (
    <View style={{marginRight: getWidth(-5)}}>
      <TDIcon input={enabled ? 'eye' : 'eye-slash'} inputStyle={styles.icon} />
    </View>
  );
}
