/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 15:11:20 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import FadingBottomView from '../Views/FadingBottomView';

import FastImage from 'react-native-fast-image';

import PersistentImage from '../Utility/PersistedImage';

const fallBackImage = require('../../../assets/images/onboardingImage.png');

export default function OnboardingSliderItem({image, header, text, local}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getScaledHeight, getScaledWidth} = ScaleHook();
  const {textStyles, colors} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      width: '100%',
      paddingHorizontal: getScaledWidth(20),
    },
    imagesContainer: {
      height: getScaledHeight(310),
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'flex-end',
    },
    image: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: getHeight(0),
    },
    header: {
      ...textStyles.bold24_black100,
      textAlign: 'center',
      marginTop: getScaledHeight(36),
    },
    text: {
      ...textStyles.medium15_brownishGrey100,
      textAlign: 'center',
      marginTop: getScaledHeight(6),
      marginBottom: getScaledHeight(10),
    },
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        {image && !local ? (
          <PersistentImage imageUrl={image} style={styles.image} />
        ) : (
          <FastImage source={image ?? fallBackImage} style={styles.image} />
        )}

        <FadingBottomView
          customStart={colors.white0}
          customEnd={colors.backgroundWhite100}
          color="custom"
          height={140}
        />
      </View>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
