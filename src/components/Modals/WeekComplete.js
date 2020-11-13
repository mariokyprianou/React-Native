/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 09:46:44 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {TouchableOpacity, View, Text, ImageBackground} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import FadingBottomView from '../Views/FadingBottomView';
import DefaultButton from '../Buttons/DefaultButton';
import IconTextView from '../Infographics/IconTextView';

const fakeImage = require('../../../assets/fake2.png');

export default function TakeARest({
  name,
  weekNumber,
  totalDuration,
  totalReps,
  totalSets,
  onPressClose,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_WeekComplete, InfoText_WeekComplete} = dictionary;

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
    infoIconsContainer: {
      marginBottom: getHeight(34),
      alignSelf: 'flex-start',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: getHeight(30),
      width: '100%',
      alignItems: 'center',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleShare() {
    // handle share
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <ImageBackground source={fakeImage} style={styles.image}>
        <FadingBottomView color="black" />
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{TitleText_WeekComplete}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={onPressClose}>
            <TDIcon input={'times'} inputStyle={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>
            {InfoText_WeekComplete(name, weekNumber)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.infoIconsContainer}>
            <IconTextView
              type="workoutComplete"
              duration={totalDuration}
              reps={totalReps}
              sets={totalSets}
              color="white"
            />
          </View>
          <DefaultButton
            type="share"
            icon="share"
            variant="white"
            onPress={handleShare}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
