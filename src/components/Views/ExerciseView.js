/*
 * Created Date: Wed, 11th Nov 2020, 17:08:56 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import RepCell from '../cells/RepCell';

import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import ExerciseVideoView from './ExerciseVideoView';

export default function () {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    scrollViewContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.white100,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      marginBottom: getHeight(40),
      alignItems: 'center',
    },
    fadeContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **

  const RepsList = React.memo(({reps}) => {
    return (
      <View style={{flexDirection: 'row', flex: 1, width: '70%'}}>
        {reps.map((index) => (
          <View style={{flex: 1 / reps.length}}>
            <RepCell key={index} />
          </View>
        ))}
      </View>
    );
  });

  return (
    <View style={{flex: 1}}>
      <ExerciseVideoView />

      <Text>Lateral lunges</Text>

      <View>
        <RepsList reps={[{}, {}, {}, {}]} />
      </View>
    </View>
  );
}
