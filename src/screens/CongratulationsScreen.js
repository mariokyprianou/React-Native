/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 15:42:23 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import DefaultButton from '../components/Buttons/DefaultButton';
import FadingBottomView from '../components/Views/FadingBottomView';

const fakeImage = require('../../assets/fake2.png');

export default function CongratulationsScreen({name = 'Katrina'}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_Congratulations, InfoText_StartedProgramme} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
      position: 'absolute',
      top: 0,
    },
    textContainer: {
      width: '90%',
      height: '100%',
      alignSelf: 'center',
      paddingTop: getHeight(75),
    },
    title: {
      ...textStyles.bold30_white100,
      marginBottom: getHeight(4),
    },
    text: {
      ...textStyles.semiBold16_white90,
      marginBottom: getHeight(400),
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: 30,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePressShare() {}

  function handlePressStart() {}

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={fakeImage} style={styles.image} />
        <FadingBottomView color="black" height="full" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{TitleText_Congratulations}</Text>
        <Text style={styles.text}>{InfoText_StartedProgramme(name)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="share"
          icon="share"
          variant="white"
          onPress={handlePressShare}
        />
        <DefaultButton
          type="getStarted"
          variant="transparentWhiteText"
          onPress={handlePressStart}
        />
      </View>
    </View>
  );
}
