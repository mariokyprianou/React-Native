/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 10:49:32 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, Alert, StatusBar} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import FadingBottomView from '../../components/Views/FadingBottomView';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Header from '../../components/Headers/Header';
import {useRoute} from '@react-navigation/core';
import {format} from 'date-fns';
import UseData from '../../hooks/data/UseData';

const fakeImage = require('../../../assets/congratulationsBackground.png');

export default function StayTuned() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {textStyles} = useTheme();
  const [reminders, showReminders] = useState(true);
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const {
    params: {name, venue, image, date, type},
  } = useRoute();
  const formattedDate = format(date, 'do LLLL');
  const navigation = useNavigation();

  const {programmeModalImage} = UseData();

  useEffect(() => {
    navigation.setOptions({
      header: () => <></>,
    });
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

 
  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
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
      bottom: getHeight(30),
      width: '100%',
      alignItems: 'center',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleReminders(time) {
    // set up reminders
  }

  function handlePressRemindMe() {
    Alert.alert(
      WorkoutDict.ReminderTitle,
      WorkoutDict.ReminderText,
      [
        {text: 'Morning', onPress: () => handleReminders('morning')},
        {text: 'Afternoon', onPress: () => handleReminders('afternoon')},
        {text: 'Evening', onPress: () => handleReminders('evening')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  if (type === 'workoutsComplete') {
    return (
      <>
        <View>
          <ImageBackground
            source={
              programmeModalImage ? {uri: programmeModalImage} : fakeImage
            }
            style={styles.image}>
            <FadingBottomView color="black" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>
                {WorkoutDict.StayTuned(name, formattedDate)}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <DefaultButton
                type="remindMe"
                icon="reminder"
                variant="white"
                onPress={handlePressRemindMe}
              />
            </View>
          </ImageBackground>
        </View>
        <Header
          title={WorkoutDict.StayTunedTitle}
          showModalCross
          white
          transparent
        />
      </>
    );
  }

  if (type === 'programmeComplete') {
    return (
      <>
        <View>
          <ImageBackground source={fakeImage} style={styles.image}>
            <FadingBottomView color="black" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>
                {WorkoutDict.ProgrammeComplete(name, venue)}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <DefaultButton
                type="remindMe"
                icon="reminder"
                variant="white"
                onPress={handlePressRemindMe}
              />
            </View>
          </ImageBackground>
        </View>
        <Header
          title={WorkoutDict.StayTunedTitle}
          showModalCross
          white
          transparent
        />
      </>
    );
  }
}
