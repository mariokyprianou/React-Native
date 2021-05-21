/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 09:46:44 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
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
import PowerShareAssetsManager from '../../utils/PowerShareAssetsManager';
import {SampleImageUrl} from '../../utils/SampleData';
import useShare from '../../hooks/share/useShare';
import useLoading from '../../hooks/loading/useLoading';
import displayAlert from '../../utils/DisplayAlert';

const fakeImage = require('../../../assets/fake2.png');

export default function WeekCompleteScreen() {
  const {
    params: {
      name = 'Katrina',
      weekNumber = 1,
      totalDuration = 1,
      totalReps = 1,
      totalSets = 1,
      totalWorkouts = 1,
      environment = 'GYM',
    },
  } = useRoute();

  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict, ShareDict, ProfileDict} = dictionary;
  const navigation = useNavigation();
  const {programme, programmeModalImage} = UseData();
  const {firebaseLogEvent, analyticsEvents} = useUserData();
  const {ShareMediaType, getShareData} = useShare();
  const {setLoading} = useLoading();

  useEffect(() => {
    navigation.setOptions({
      header: () => <></>,
    });
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

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

  // handle share
  async function handleShare() {
    const isInstaAvailable = await PowerShareAssetsManager.isInstagramAvailable();

    if (!isInstaAvailable) {
      displayAlert({
        title: null,
        text: ShareDict.InstaPromptText,
        buttons: [
          {
            text: ProfileDict.Cancel,
            style: 'cancel',
          },
          {
            text: ProfileDict.Ok,
            onPress: async () => {
              PowerShareAssetsManager.promptIsntagramAppDownload();
            },
          },
        ],
      });

      return;
    }

    setLoading(true);
    const {colour, url} = await getShareData(ShareMediaType.weekComplete).catch(
      (err) => {
        console.log(err, '<---getShareData err');
        displayAlert({text: ShareDict.UnableToShareWeekComplete});
        setLoading(false);
        return;
      },
    );

    console.log('getShareData(ShareMediaType.weekComplete)', {colour, url});

    let mins = totalDuration % 60;
    let hrs = (totalDuration - mins) / 60;

    hrs = hrs === 0 ? '00' : hrs < 10 ? `0${hrs}` : hrs;
    mins = mins === 0 ? '00' : mins < 10 ? `0${mins}` : mins;

    const totalTimeTrained = hrs.toString() + ':' + mins.toString() + ':00';

    try {
      // TODO: - Hook up relevant values
      // TODO: -  Display loading
      let res = await PowerShareAssetsManager.shareWeekComplete({
        imageUrl: url,
        title: ShareDict.WeekCompleteTitle(
          weekNumber,
          name,
          environment.toLowerCase(),
        ),
        workoutsCompleted: totalWorkouts,
        totalTimeTrained: totalTimeTrained,
        colour: colour,
      });

      firebaseLogEvent(analyticsEvents.shareCompletedWorkout, {
        trainerId: programme.trainer.id,
        programmeId: programme.id,
      });
    } catch (err) {
      console.log('SHARE ERR: ', err);
    }

    setLoading(false);
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
