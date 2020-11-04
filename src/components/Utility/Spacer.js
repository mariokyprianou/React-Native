/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 10:21:43 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';

export default function (props) {
  const {getHeight} = ScaleHook();

  if (!props.height) {
    throw new Error('Spacer requires a height prop.');
  }

  const styles = {
    spacer: {
      height: getHeight(props.height),
    },
  };

  return <View style={styles.spacer} />;
}
