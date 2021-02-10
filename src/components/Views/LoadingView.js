/*
 * Created Date: Thu, 28th Jan 2021, 23:09:57 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */
import React from 'react';

import {View, ActivityIndicator} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';

const LoadingView = () => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: '50%',
      }}>
      <ActivityIndicator size={'large'} color={colors.blueGreen100} />
    </View>
  );
};

export default LoadingView;
