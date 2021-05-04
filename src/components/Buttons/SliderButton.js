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
import useDictionary from '../../hooks/localisation/useDictionary';
import isRTL from '../../utils/isRTL';

const SliderButton = ({onPress}) => {
  // ******* SETUP *******
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const {dictionary} = useDictionary();
  const {ButtonDict} = dictionary;

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
      marginTop: getHeight(40),
    },
    linearGradientStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: getHeight(50),
    },
    touch: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      ...textStyles.bold15_white100,
    },
    iconContainer: {
      position: 'absolute',
      right: getWidth(15),
    },
  };

  return (
    <View style={styles.button}>
      <LinearGradient
        style={styles.linearGradientStyle}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.tealish100, colors.tiffanyBlue100]}>
        <TouchableOpacity onPress={onPress} style={styles.touch}>
          <Text style={styles.buttonText}>{ButtonDict.AddPhoto}</Text>
          <View style={styles.iconContainer}>
            <TDIcon
              input={isRTL() ? 'chevron-left' : 'chevron-right'}
              inputStyle={{
                size: styles.buttonText.fontSize,
                color: styles.buttonText.color,
                solid: true,
              }}
            />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default SliderButton;
