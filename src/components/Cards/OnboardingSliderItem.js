/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 15:11:20 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {Dimensions, View, Image, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import TDIcon from 'the-core-ui-component-tdicon';
import isRTL from '../../utils/isRTL';

export default function OnboardingSliderItem({
  image,
  header,
  text,
  handlePress,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();

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
    textContainer: {
      alignItems: 'center',
    },
    header: {
      ...textStyles.bold24_black100,
      marginTop: getHeight(36),
    },
    text: {
      ...textStyles.medium15_brownishGrey100,
      marginTop: getHeight(6),
      marginBottom: getHeight(10),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handlePress('left')}>
          <TDIcon
            input={isRTL() ? 'chevron-right' : 'chevron-left'}
            inputStyle={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('right')}>
          <TDIcon
            input={isRTL() ? 'chevron-left' : 'chevron-right'}
            inputStyle={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}
