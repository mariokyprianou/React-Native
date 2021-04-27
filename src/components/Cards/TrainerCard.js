/*
 * Jira Ticket:
 * Created Date: Mon, 2nd Nov 2020, 11:04:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import FadingBottomView from '../Views/FadingBottomView';
import GymHomeSelector from '../Buttons/GymHomeSelector';
import FastImage from 'react-native-fast-image';
import TrainerIconCard from '../Cards/TrainerIconCard';

export default function TrainerCard({
  trainer,
  currentProgram,
  onPressGymHome,
  suggestedEnv,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {textStyles, colors} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    imagesContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
    },
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      resizeMode: 'cover',
    },
    overlay: {
      width: '100%',
      bottom: getHeight(140),
      paddingTop: getHeight(60),
      alignItems: 'center',
    },
    titleContainer: {
      width: getWidth(335),
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    nameText: {
      ...textStyles.bold30_black100,
    },
    buttonContainer: {
      width: getWidth(110),
      height: getHeight(37),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: getWidth(-14),
      top: getHeight(3),
      backgroundColor: 'transparent',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <FastImage
          source={{uri: currentProgram.programmeImage}}
          style={styles.image}
        />
        <FadingBottomView
          color="custom"
          customStart={colors.veryLightPinkTwo0}
          customEnd={colors.veryLightPinkTwo100}
          height={250}
        />
      </View>
      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
          <Text style={styles.nameText}>{trainer.name}</Text>
          <View style={styles.buttonContainer}>
            <GymHomeSelector
              onPress={onPressGymHome}
              text={suggestedEnv ? suggestedEnv : currentProgram.environment}
              singleProgramme={trainer.programmes.length === 1 ? true : false}
            />
          </View>
        </View>
        <TrainerIconCard />
      </View>
    </View>
  );
}
