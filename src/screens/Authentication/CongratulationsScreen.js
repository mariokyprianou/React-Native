/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 15:42:23 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
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
import UseData from '../../hooks/data/UseData';
import useUserData from '../../hooks/data/useUserData';
import useCommonData from '../../hooks/data/useCommonData';
import useLoading from '../../hooks/loading/useLoading';
import RestartProgramme from '../../apollo/mutations/RestartProgramme';
import ContinueProgramme from '../../apollo/mutations/ContinueProgramme';
import StartProgramme from '../../apollo/mutations/StartProgramme';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

import PowerShareAssetsManager from '../../utils/PowerShareAssetsManager';

import {SampleImageUrl} from '../../utils/SampleData';

import useShare from '../../hooks/share/useShare';
import displayAlert from '../../utils/DisplayAlert';
import FastImage from 'react-native-fast-image';

const fakeImage = require('../../../assets/congratulationsBackground.png');

export default function CongratulationsScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {MeetYourIconsDict, WorkoutDict, ShareDict, ProfileDict} = dictionary;

  // Switch programme parsms
  const {
    params: {switchProgramme, type, currentProgramme, newProgramme},
  } = useRoute();

  const {
    params: {trainerId, newTrainer, environment, programmeId},
  } = useRoute();

  const navigation = useNavigation();

  const [restartProgramme] = useMutation(RestartProgramme);
  const [continueProgramme] = useMutation(ContinueProgramme);
  const [startProgramme] = useMutation(StartProgramme);

  const {firebaseLogEvent, analyticsEvents} = useUserData();

  const {getTrainers} = useCommonData();
  const {
    programmeModalImage,
    setProgrammeModalImage,
    programme,
    getProgramme,
    reset,
  } = UseData();
  const {setLoading} = useLoading();
  const {ShareMediaType, getShareData} = useShare();

  navigation.setOptions({
    header: () => null,
  });

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

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

  async function handlePressShare() {
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

    const prog = newProgramme || currentProgramme;
    const url = prog.progressStartShareMediaImage.url || prog.programmeImage;

    PowerShareAssetsManager.shareProgrammeStart({
      imageUrl: url,
    })
      .then((res) => {
        setLoading(false);
        shareEvent();
      })
      .catch((err) => {
        setLoading(false);
        console.log('ERR', err);
      })
      .finally(() => setLoading(false));
  }

  function shareEvent() {
    firebaseLogEvent(analyticsEvents.shareSelectedTrainer, {
      trainerId: trainerId,
      programmeId: programmeId,
    });
  }

  function handlePressStart() {
    if (switchProgramme === true) {
      // Reset this when switching program otherwise modal won't show for new program
      AsyncStorage.removeItem('@COMPLETE_WEEK_MODAL_NUMBER');
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

  function handleNewProgramme() {
    switch (type) {
      case 'restart':
        handleRestartProgramme();
        break;
      case 'continue':
        handleContinueProgramme();
        break;
      case 'start':
        handleStartNewProgramme();
        break;
    }
  }

  async function handleRestartProgramme() {
    setLoading(true);
    restartProgramme({
      variables: {
        input: {
          programme: programmeId,
        },
      },
    })
      .then((res) => {
        console.log('restartProgramme', res);
        submitAnalyticsEvent(false);

        changedAssignedProgramme();
      })
      .catch((err) => {
        console.log(err, '<---restart programme error');
        setLoading(false);
      });
  }

  async function handleContinueProgramme() {
    setLoading(true);
    continueProgramme({
      variables: {
        input: {
          programme: programmeId,
        },
      },
    })
      .then((res) => {
        console.log('continueProgramme', res);

        submitAnalyticsEvent(false);
        changedAssignedProgramme();
      })
      .catch((err) => {
        console.log(err, '<---continue programme error');
        setLoading(false);
      });
  }

  async function handleStartNewProgramme() {
    setLoading(true);
    startProgramme({
      variables: {
        input: {
          programme: programmeId,
        },
      },
    })
      .then((res) => {
        console.log('startProgramme', res);

        submitAnalyticsEvent(true);
        changedAssignedProgramme();
      })
      .catch((err) => {
        console.log(err, '<---start new programme error');
        setLoading(false);
      });
  }

  async function changedAssignedProgramme() {
    await reset();

    await getProgramme();
    await getTrainers();

    setProgrammeModalImage(newProgramme.programmeImage);
    navigation.navigate('TabContainer');
  }

  function submitAnalyticsEvent(newTrainer = false) {
    if (programme && currentProgramme.trainer) {
      firebaseLogEvent(analyticsEvents.leftTrainer, {
        trainerId: currentProgramme.trainer.id,
        programmeId: currentProgramme.id,
      });
    }
    firebaseLogEvent(
      newTrainer
        ? analyticsEvents.selectedTrainer
        : analyticsEvents.restartContinueTrainer,
      {
        trainerId: newTrainer.id,
        programmeId: programmeId.id,
      },
    );
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.imageContainer}>
        <FastImage
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
              onPress={handleNewProgramme}
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
