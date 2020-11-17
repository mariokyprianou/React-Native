/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 12:38:07 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import LinearGradient from 'react-native-linear-gradient';
import DefaultButton from '../Buttons/DefaultButton';
import FadingBottomView from '../Views/FadingBottomView';
import Header from '../Headers/Header';

const fakeImage = require('../../../assets/fake2.png');

export default function HelpMeChooseResultsModal({
  onPressClose,
  name = 'Katrina',
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {
    TitleText_Result,
    InfoText_SuggestedProgramme,
    TitleText_HelpMeChoose,
  } = dictionary;

  const capitalizedName = name.toUpperCase();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.veryLightPink100,
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
    },
    image: {
      width: '100%',
      height: getHeight(420),
      resizeMode: 'cover',
      position: 'absolute',
      top: getHeight(145),
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
    },
    result: {
      ...textStyles.regular15_white100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress() {
    console.log('selected!');
    // navigate to programme
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <Header
        title={TitleText_HelpMeChoose}
        right="times"
        rightAction={onPressClose}
      />
      <View style={styles.imageContainer}>
        <Image source={fakeImage} style={styles.image} />
        <FadingBottomView color="black" height={565} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{TitleText_Result}</Text>
        <View style={styles.barContainer}>
          <LinearGradient
            style={styles.bar}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.tiffanyBlue100, colors.tealish100]}
          />
        </View>
        <Text style={styles.name}>{capitalizedName}</Text>
        <Text style={styles.result}>{InfoText_SuggestedProgramme(name)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="programme"
          trainerName={capitalizedName}
          icon="chevron"
          variant="white"
          onPress={handlePress}
        />
      </View>
    </View>
  );
}
