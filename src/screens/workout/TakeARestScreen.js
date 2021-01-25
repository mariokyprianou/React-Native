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
import FadingBottomView from '../../components/Views/FadingBottomView';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Header from '../../components/Headers/Header';
import {useRoute} from '@react-navigation/core';

const fakeImage = require('../../../assets/fake2.png');

export default function TakeARestScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();
  const {
    params: {name, setWarningReceived},
  } = useRoute();

  navigation.setOptions({
    header: () => (
      <Header
        title={WorkoutDict.TakeARestTitle}
        right="crossIcon"
        rightAction={handleGoBack}
        white
        transparent
      />
    ),
  });

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
      textAlign: 'left',
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
  }

  function handleGoBack() {
    setWarningReceived(true);
    navigation.goBack();
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <ImageBackground source={fakeImage} style={styles.image}>
        <FadingBottomView color="black" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{WorkoutDict.TakeARest(name)}</Text>
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
            onPress={handleGoBack}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
