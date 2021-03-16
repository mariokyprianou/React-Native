/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 15:42:23 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  ActionSheetIOS,
  StatusBar,
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import FadingBottomView from '../../components/Views/FadingBottomView';
import {useRoute} from '@react-navigation/core';
import Share from 'react-native-share';
import UseData from '../../hooks/data/UseData';

const fakeImage = require('../../../assets/congratulationsBackground.png');

export default function CongratulationsScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {MeetYourIconsDict, WorkoutDict, ShareDict} = dictionary;
  const {
    params: {switchProgramme, newTrainer, environment, programmeId},
  } = useRoute();
  const navigation = useNavigation();

  const {programmeModalImage} = UseData();
  navigation.setOptions({
    header: () => null,
  });

  StatusBar.setBarStyle('light-content');

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
      position: 'absolute',
      top: 0,
    },
    textContainer: {
      width: '90%',
      height: '100%',
      alignSelf: 'center',
      paddingTop: getHeight(75),
    },
    title: {
      ...textStyles.bold30_white100,
      marginBottom: getHeight(4),
      textAlign: 'left',
    },
    text: {
      ...textStyles.semiBold16_white90,
      marginBottom: getHeight(400),
      textAlign: 'left',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: 30,
    },
    switchedText: {
      ...textStyles.regular15_white100,
      marginTop: getHeight(18),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const url = 'www.google.com';
  const shareOptions = Platform.select({
    ios: {
      activityItemSources: [
        {
          // For sharing url with custom title.
          placeholderItem: {
            type: 'url',
            content: url,
          },
          item: {
            default: {type: 'url', content: url},
          },
          subject: {
            default: ShareDict.ShareProgress,
          },
          linkMetadata: {
            originalUrl: url,
            url,
            title: ShareDict.ShareProgress,
          },
        },
      ],
    },
    default: {
      title: ShareDict.ShareProgress,
      subject: ShareDict.ShareProgress,
      message: `${ShareDict.Message} ${url}`,
    },
  });

  function handlePressShare() {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          url: '',
          message: ShareDict.ShareProgress,
        },
        (error) => console.log(error),
        (success, method) => {
          if (success) {
            console.log('Successfully shared', success);
          }
        },
      );
    } else {
      Share.open({shareOptions})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    }
  }

  function handlePressStart() {
    if (switchProgramme === true) {
      navigation.reset({
        index: 0,
        routes: [{name: 'TabContainer'}], // add params for which programme selected
      });
    } else {
      navigation.navigate('Registration', {
        programmeId: programmeId,
      });
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={programmeModalImage ? {uri: programmeModalImage} : fakeImage}
          style={styles.image}
        />
        <FadingBottomView color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {MeetYourIconsDict.CongratulationsTitle}
        </Text>
        <Text style={styles.text}>
          {MeetYourIconsDict.StartedProgramme(
            newTrainer,
            environment.toLowerCase(),
          )}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {switchProgramme === true ? (
          <>
            <DefaultButton
              type="jumpIn"
              icon="chevron"
              variant="white"
              onPress={handlePressStart}
            />
            <Text style={styles.switchedText}>
              {WorkoutDict.SwitchedByMistake}
            </Text>
            <DefaultButton
              type="cancel"
              variant="transparentWhiteText"
              onPress={() => navigation.goBack()}
            />
          </>
        ) : (
          <>
            <DefaultButton
              type="share"
              icon="share"
              variant="white"
              onPress={handlePressShare}
            />
            <DefaultButton
              type="getStarted"
              variant="transparentWhiteText"
              onPress={handlePressStart}
            />
          </>
        )}
      </View>
    </View>
  );
}
