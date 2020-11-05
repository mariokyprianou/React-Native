/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 15:45:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';

export default function TransformationChallenge({type, title, image, onPress}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ButtonText_Progress, ButtonText_Challenge} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    box: {
      height: getHeight(130),
      width: getHeight(130),
      marginBottom: getHeight(15),
      justifyContent: 'flex-end',
    },
    challengeBox: {
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    textContainer: {
      padding: getHeight(10),
    },
    progressTitle: {
      ...textStyles.bold12_white100,
    },
    progressText: {
      ...textStyles.bold15_white100,
    },
    challengeTitle: {
      ...textStyles.bold12_brownishGrey100,
    },
    challengeText: {
      ...textStyles.bold15_black100,
    },
    photoImage: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
      justifyContent: 'flex-end',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: colors.black40,
    },
    challengeImage: {
      width: getWidth(120),
      height: getHeight(50),
      alignSelf: 'center',
      marginBottom: getHeight(5),
    },
    iconContainer: {
      position: 'absolute',
      top: getHeight(10),
      left: getWidth(10),
    },
    icon: {
      color: colors.white100,
      solid: true,
      size: fontSize(17),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  if (type === 'progress') {
    return (
      <View style={styles.box}>
        <TouchableOpacity onPress={onPress}>
          <ImageBackground source={image} style={styles.photoImage}>
            <View style={styles.overlay} />
            <View style={styles.iconContainer}>
              <TDIcon input={'camera'} inputStyle={styles.icon} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.progressTitle}>{ButtonText_Progress}</Text>
              <Text style={styles.progressText}>{title}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
  if (type === 'challenge') {
    return (
      <View
        style={{
          ...styles.box,
          ...styles.textContainer,
          ...styles.challengeBox,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Image source={image} style={styles.challengeImage} />
          <Text style={styles.challengeTitle}>{ButtonText_Challenge}</Text>
          <Text style={styles.challengeText}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
