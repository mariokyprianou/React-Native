/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 10:49:32 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import FadingBottomView from '../Views/FadingBottomView';
import DefaultButton from '../Buttons/DefaultButton';
import Header from '../Headers/Header';

const fakeImage = require('../../../assets/fake2.png');

export default function StayTuned({name, venue, date, onPressClose, type}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {textStyles} = useTheme();
  const [reminders, showReminders] = useState(true);
  const {dictionary} = useDictionary();
  const {
    TitleText_Stay_Tuned,
    InfoText_StayTuned,
    InfoText_ProgrammeComplete,
    Reminder_Title,
    Reminder_Text,
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
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleReminders(time) {
    // set up reminders
    onPressClose();
  }

  function handlePressRemindMe() {
    Alert.alert(
      Reminder_Title,
      Reminder_Text,
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
      <View>
        <ImageBackground source={fakeImage} style={styles.image}>
          <FadingBottomView color="black" />
          <Header
            title={TitleText_Stay_Tuned}
            right="times"
            rightAction={onPressClose}
            white
            transparent
          />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              {InfoText_StayTuned(name, date)}
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
    );
  }

  if (type === 'programmeComplete') {
    return (
      <View>
        <ImageBackground source={fakeImage} style={styles.image}>
          <FadingBottomView color="black" height="full" />
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{TitleText_Stay_Tuned}</Text>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onPressClose}>
              <TDIcon input={'times'} inputStyle={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              {InfoText_ProgrammeComplete(name, venue)}
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
    );
  }
}
