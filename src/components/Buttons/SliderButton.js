/*
 * Jira Ticket:
 * Created Date: Mon, 9th Nov 2020, 10:41:44 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import TDIcon from 'the-core-ui-component-tdicon';

const SliderButton = ({onPress}) => {
  // ******* SETUP *******
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();

  // ******* STYLES *******
  const styles = {
    button: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: getHeight(10),
      width: '90%',
      height: getHeight(50),
      marginTop: getHeight(20),
    },
    linearGradientStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: getHeight(50),
    },
    buttonText: {
      ...textStyles.bold15_white100,
    },
    iconContainer: {
      position: 'absolute',
      right: getWidth(10),
    },
  };

  return (
    <View style={styles.button}>
      <LinearGradient
        style={styles.linearGradientStyle}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.tealish100, colors.tiffanyBlue100]}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.buttonText}>ADD PHOTO</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TDIcon
            input="chevron-right"
            inputStyle={{
              size: styles.buttonText.fontSize,
              color: styles.buttonText.color,
              solid: true,
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default SliderButton;
