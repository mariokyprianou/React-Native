/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 12:38:07 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import LinearGradient from 'react-native-linear-gradient';
import DefaultButton from '../Buttons/DefaultButton';
import FadingBottomView from '../Views/FadingBottomView';
import Header from '../Headers/Header';

const fakeImage = require('../../../assets/images/helpChooseResults.png');

export default function HelpMeChooseResultsModal({
  onPressClose,
  onSelectProgramme,
  name = 'Katrina',
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {HelpMeChooseDict} = dictionary;

  const capitalizedName = name.toUpperCase();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    headerContainer: {
      position: 'absolute',
      top: 0,
      zIndex: 9,
      backgroundColor: 'green',
    },
    imageContainer: {
      width: '100%',
      height: getHeight(420),
      position: 'absolute',
      top: getHeight(145),
      zIndex: 0,
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
      position: 'absolute',
      top: 0,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      top: getHeight(35),
    },
    modalTitle: {
      ...textStyles.bold22_black100,
      textAlign: 'left',
    },
    titleContainer: {
      width: '90%',
      height: getHeight(480),
      alignSelf: 'center',
      position: 'absolute',
      top: getHeight(70),
    },
    iconContainer: {
      position: 'absolute',
      right: getWidth(20),
      alignItems: 'center',
    },
    icon: {
      size: fontSize(22),
      color: colors.black100,
    },
    title: {
      ...textStyles.semiBold14_black100,
      marginTop: getHeight(30),
      textAlign: 'left',
    },
    barContainer: {
      width: '100%',
      height: getHeight(4),
    },
    bar: {
      flex: 1,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: getHeight(40),
      backgroundColor: 'transparent',
    },
    name: {
      ...textStyles.bold18_white100,
      marginTop: getHeight(340),
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
      <Header
        title={HelpMeChooseDict.HelpMeChoose}
        right="crossIcon"
        rightAction={onPressClose}
      />
      <View style={styles.imageContainer}>
        <Image source={fakeImage} style={styles.image} />
        <View style={styles.fadeContainer}>
          <FadingBottomView color="black" height={420} />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{HelpMeChooseDict.Result}</Text>
        <View style={styles.barContainer}>
          <LinearGradient
            style={styles.bar}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.tiffanyBlue100, colors.tealish100]}
          />
        </View>
        <Text style={styles.name}>{capitalizedName}</Text>
        <Text style={styles.result}>
          {HelpMeChooseDict.SuggestedProgramme(name)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="programme"
          trainerName={capitalizedName}
          icon="chevron"
          variant="transparentBlackBoldText"
          onPress={onSelectProgramme}
        />
      </View>
    </View>
  );
}
