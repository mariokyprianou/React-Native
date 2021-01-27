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
import FadingBottomView from '../Views/FadingBottomView';
import TDIcon from 'the-core-ui-component-tdicon';
import isRTL from '../../utils/isRTL';

export default function OnboardingSliderItem({
  image,
  header,
  text,
  handlePress,
  activeIndex,
  lastScreenIndex,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles, colors} = useTheme();
  const url = {uri: image};

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      width: '100%',
      paddingHorizontal: getWidth(20),
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
      top: getHeight(0),
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
    touch: {
      height: getHeight(60),
      width: getWidth(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      width: '100%',
      height: getHeight(60),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      alignSelf: 'center',
      top: getHeight(150),
    },
    icon: {
      size: fontSize(18),
      color: colors.black100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => handlePress('left')}
          style={styles.touch}
          disabled={activeIndex === 0 ? true : false}>
          <TDIcon
            input={isRTL() ? 'chevron-right' : 'chevron-left'}
            inputStyle={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress('right')}
          style={styles.touch}
          disabled={activeIndex === lastScreenIndex ? true : false}>
          <TDIcon
            input={isRTL() ? 'chevron-left' : 'chevron-right'}
            inputStyle={styles.icon}
            style={styles.touch}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imagesContainer}>
        <Image source={url} style={styles.image} />
        <FadingBottomView color="white" height={60} />
      </View>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
