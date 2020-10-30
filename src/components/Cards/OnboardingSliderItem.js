/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 15:11:20 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {Dimensions, View, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function OnboardingSliderItem({image}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors} = useTheme();

  const fake = require('../../../assets/fake.png');
  const screenWidth = Dimensions.get('screen').width;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      width: '100%',
      paddingHorizontal: getWidth(20),
    },
    iconContainer: {
      width: '100%',
      height: getHeight(309),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingBottom: getHeight(93),
    },
    image: {
      height: getHeight(309),
      width: getWidth(196),
      position: 'absolute',
      top: 0,
      left: screenWidth / 2 - getWidth(196) / 2,
    },
    icon: {
      size: fontSize(18),
      color: colors.black100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePressLeft() {}

  function handlePressRight() {}

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handlePressLeft}>
          <TDIcon input={'chevron-left'} inputStyle={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressRight}>
          <TDIcon input={'chevron-right'} inputStyle={styles.icon} />
        </TouchableOpacity>
      </View>
      <Image source={fake} style={styles.image} />
    </View>
  );
}
