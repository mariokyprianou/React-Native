/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 13:34:45 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {TouchableOpacity, View, Text, ImageBackground} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import FadingBottomView from '../Views/FadingBottomView';
import DefaultButton from '../Buttons/DefaultButton';

const fakeImage = require('../../../assets/fake2.png');

export default function CongratulatoryModal({name, venue, onPressClose}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const [reminders, showReminders] = useState(false);
  const {dictionary} = useDictionary();
  const {
    TitleText_Congratulations,
    InfoText_StartedProgrammeWithVenue,
    InfoText_SwitchedByMistake,
  } = dictionary;

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
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      top: getHeight(45),
    },
    title: {
      ...textStyles.bold22_white100,
    },
    iconContainer: {
      position: 'absolute',
      right: getWidth(20),
      alignItems: 'center',
    },
    icon: {
      size: fontSize(24),
      color: colors.white100,
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
      bottom: getHeight(30),
      width: '100%',
      alignItems: 'center',
    },
    switchedText: {
      ...textStyles.regular15_white100,
      marginTop: getHeight(20),
      marginBottom: getHeight(5),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePressJumpIn() {
    // navigate to start of programme
  }

  function handleCancel() {
    onPressClose();
  }

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View>
      <ImageBackground source={fakeImage} style={styles.image}>
        <FadingBottomView color="black" />
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{TitleText_Congratulations}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={onPressClose}>
            <TDIcon input={'times'} inputStyle={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>
            {InfoText_StartedProgrammeWithVenue(name, venue)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="jumpIn"
            icon="chevron"
            variant="white"
            onPress={handlePressJumpIn}
          />
          <Text style={styles.switchedText}>{InfoText_SwitchedByMistake}</Text>
          <DefaultButton
            type="cancel"
            variant="transparentWhiteText"
            onPress={handleCancel}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
