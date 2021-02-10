/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 09:46:44 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {useNavigation} from '@react-navigation/native';
import useDictionary from '../../hooks/localisation/useDictionary';
import FadingBottomView from '../../components/Views/FadingBottomView';
import DefaultButton from '../../components/Buttons/DefaultButton';
import IconTextView from '../../components/Infographics/IconTextView';
import Header from '../../components/Headers/Header';
import {useRoute} from '@react-navigation/core';
import UseData from '../../hooks/data/UseData';
import useUserData from '../../hooks/data/useUserData';

const fakeImage = require('../../../assets/fake2.png');

export default function WeekCompleteScreen() {
  const {
    params: {
      name = 'Katrina',
      weekNumber = 1,
      totalDuration = 1,
      totalReps = 1,
      totalSets = 1,
    },
  } = useRoute();

  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();
  const {programme, programmeModalImage} = UseData();
  const {firebaseLogEvent, analyticsEvents} = useUserData();

  navigation.setOptions({
    header: () => <></>,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    infoTextContainer: {
      position: 'absolute',
      top: getHeight(100),
      width: '90%',
      alignSelf: 'center',
    },
    infoText: {
      ...textStyles.semiBold16_white90,
      textAlign: 'left',
    },
    infoIconsContainer: {
      marginBottom: getHeight(34),
      alignSelf: 'center',
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
    firebaseLogEvent(analyticsEvents.shareCompletedWorkout, {
      trainerId: programme.trainer.id,
      programmeId: programme.id,
    });
    // handle share
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <>
      <View>
        <Image
          source={programmeModalImage ? {uri: programmeModalImage} : fakeImage}
          style={styles.image}
        />
        <FadingBottomView color="black" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>
            {WorkoutDict.WeekComplete(name, weekNumber)}
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
      </View>
      <Header
        title={WorkoutDict.WeekCompleteTitle}
        showModalCross
        white
        transparent
      />
    </>
  );
}
