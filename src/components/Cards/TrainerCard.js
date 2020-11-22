/*
 * Jira Ticket:
 * Created Date: Mon, 2nd Nov 2020, 11:04:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import FadingBottomView from '../Views/FadingBottomView';
import GymHomeSelector from '../Buttons/GymHomeSelector';
import PercentageBar from '../Infographics/PercentageBar';

export default function TrainerCard({
  name,
  fatLoss,
  fitness,
  buildMuscle,
  image,
  onPressGymHome,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const {MeetYourIconsDict} = dictionary;

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
      bottom: getHeight(120),
    },
    titleContainer: {
      width: '90%',
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: getHeight(20),
    },
    nameText: {
      ...textStyles.bold30_white100,
    },
    barsContainer: {
      justifyContent: 'center',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <Image source={image} style={styles.image} />
        <FadingBottomView color="blue" height={337} />
      </View>
      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <GymHomeSelector onPress={onPressGymHome} />
        </View>
        <View style={styles.barsContainer}>
          <PercentageBar
            icon="lightning"
            text={MeetYourIconsDict.FatLoss}
            percentage={fatLoss}
          />
          <PercentageBar
            icon="heartRate"
            text={MeetYourIconsDict.Fitness}
            percentage={fitness}
          />
          <PercentageBar
            icon="weight"
            text={MeetYourIconsDict.BuildMuscle}
            percentage={buildMuscle}
          />
        </View>
      </View>
    </View>
  );
}
