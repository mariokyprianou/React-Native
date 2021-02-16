/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 12:38:07 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useRoute} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import DefaultButton from '../../components/Buttons/DefaultButton';
import FadingBottomView from '../../components/Views/FadingBottomView';
import Header from '../../components/Headers/Header';
import isIPhoneX from '../../utils/isIphoneX';
import UseData from '../../hooks/data/UseData';

const fakeImage = require('../../../assets/images/helpChooseResults.png');

export default function HelpMeChooseResultsScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {HelpMeChooseDict} = dictionary;
  const navigation = useNavigation();
  const {
    params: {recommendedTrainer, programmeImage},
  } = useRoute();

  const capitalizedName = recommendedTrainer.toUpperCase();

  navigation.setOptions({
    header: () => (
      <Header
        title={HelpMeChooseDict.HelpMeChoose}
        showModalCross
        rightAction={() => navigation.pop(2)}
      />
    ),
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    imageContainer: {
      width: '90%',
      height: getHeight(70),
      alignSelf: 'center',
    },
    fadeContainer: {
      width: '100%',
      height: getHeight(420),
      top: 0,
    },
    image: {
      width: '100%',
      height: getHeight(420),
      resizeMode: 'cover',
    },
    titleContainer: {
      position: 'absolute',
      width: '90%',
      bottom: getHeight(30),
      marginHorizontal: getWidth(20),
    },
    title: {
      ...textStyles.semiBold14_black100,
      marginTop: getHeight(20),
      marginBottom: getHeight(5),
      textAlign: 'left',
    },
    barContainer: {
      width: '100%',
      height: getHeight(4),
    },
    bar: {
      flex: 1,
      borderRadius: radius(2),
    },
    buttonContainer: {
      width: '100%',
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: isIPhoneX() ? getHeight(8) : 0,
    },
    name: {
      ...textStyles.bold18_white100,
      letterSpacing: 0.9,
      textAlign: 'left',
    },
    result: {
      ...textStyles.regular15_white100,
      textAlign: 'left',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Text style={styles.title}>{HelpMeChooseDict.Result}</Text>

        <View style={styles.barContainer}>
          <LinearGradient
            style={styles.bar}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.tealish100, colors.tiffanyBlue100]}
          />
        </View>
        <Text style={styles.name}>{capitalizedName}</Text>
        <Text style={styles.result}>
          {HelpMeChooseDict.SuggestedProgramme(recommendedTrainer)}
        </Text>
      </View>

      <ImageBackground
        source={programmeImage ? {uri: programmeImage} : fakeImage}
        style={styles.image}>
        <FadingBottomView color="black" height={420} />

        <View style={styles.titleContainer}>
          <Text style={styles.name}>{capitalizedName}</Text>
          <Text style={styles.result}>
            {HelpMeChooseDict.SuggestedProgramme(recommendedTrainer)}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.buttonContainer}>
        <DefaultButton
          type="programme"
          trainerName={capitalizedName}
          icon="chevron"
          variant="transparentBlackBoldText"
          onPress={() => navigation.navigate('MeetYourIcons')}
        />
      </View>
    </View>
  );
}
