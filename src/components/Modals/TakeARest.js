/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 08:29:01 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import FadingBottomView from '../Views/FadingBottomView';
import DefaultButton from '../Buttons/DefaultButton';
import Header from '../Headers/Header';

const fakeImage = require('../../../assets/fake2.png');

export default function TakeARest({name, onPressClose}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_TakeARest, InfoText_TakeARest} = dictionary;
  const navigation = useNavigation();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    infoTextContainer: {
      position: 'absolute',
      top: getHeight(90),
      width: '90%',
      alignSelf: 'center',
    },
    infoText: {
      ...textStyles.semiBold16_white90,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: getHeight(10),
      width: '100%',
      alignItems: 'center',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleContinue() {
    navigation.navigate('StartWorkout');
    onPressClose();
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <ImageBackground source={fakeImage} style={styles.image}>
        <FadingBottomView color="black" />
        <Header
          title={TitleText_TakeARest}
          right="times"
          rightAction={onPressClose}
          white
          transparent
        />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{InfoText_TakeARest(name)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="continue"
            icon="chevron"
            variant="white"
            onPress={handleContinue}
          />
          <DefaultButton
            type="goBack"
            variant="transparentWhiteText"
            onPress={() => onPressClose()}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
