/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 15:11:20 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Image, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import FadingBottomView from '../Views/FadingBottomView';

export default function OnboardingSliderItem({image, header, text}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();

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
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <Image source={image} style={styles.image} />
        <FadingBottomView color="white" height={60} />
      </View>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
