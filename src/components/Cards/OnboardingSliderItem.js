/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 15:11:20 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import TDIcon from 'the-core-ui-component-tdicon';
import isRTL from '../../utils/isRTL';
import FadingBottomView from '../Views/FadingBottomView';

export default function OnboardingSliderItem({
  image,
  header,
  text,
  handlePress,
  activeIndex,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      width: '100%',
      paddingHorizontal: getWidth(20),
    },
    leftIconContainer: {
      width: getWidth(50),
      alignItems: 'center',
      height: getHeight(50),
      position: 'absolute',
      left: 0,
      top: getHeight(180),
    },
    rightIconContainer: {
      width: getWidth(50),
      alignItems: 'center',
      height: getHeight(50),
      position: 'absolute',
      right: 0,
      top: getHeight(180),
    },
    imagesContainer: {
      height: getHeight(310),
      width: getWidth(210),
      alignSelf: 'center',
      justifyContent: 'flex-end',
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
      position: 'absolute',
      top: getHeight(20),
    },
    icon: {
      size: fontSize(18),
      color: colors.black100,
    },
    header: {
      ...textStyles.bold24_black100,
      textAlign: 'center',
      marginTop: getHeight(36),
    },
    text: {
      ...textStyles.medium15_brownishGrey100,
      textAlign: 'center',
      marginTop: getHeight(6),
      marginBottom: getHeight(10),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      {activeIndex !== 0 && (
        <View style={styles.leftIconContainer}>
          <TouchableOpacity onPress={() => handlePress('left')}>
            <TDIcon
              input={isRTL() ? 'chevron-right' : 'chevron-left'}
              inputStyle={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
      {activeIndex !== 3 && (
        <View style={styles.rightIconContainer}>
          <TouchableOpacity onPress={() => handlePress('right')}>
            <TDIcon
              input={isRTL() ? 'chevron-left' : 'chevron-right'}
              inputStyle={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.imagesContainer}>
        <Image source={image} style={styles.image} />
        <FadingBottomView color="white" height={60} />
      </View>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
