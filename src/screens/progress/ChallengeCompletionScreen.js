/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 16:13:18 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Platform, ActionSheetIOS} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Spacer from '../../components/Utility/Spacer';
import ProgressChart from '../../components/Infographics/ProgressChart';
import Header from '../../components/Headers/Header';
import {useRoute} from '@react-navigation/core';
import Share from 'react-native-share';
import useUserData from '../../hooks/data/useUserData';
import useProgressData from '../../hooks/data/useProgressData';
import PowerShareAssetsManager from '../../utils/PowerShareAssetsManager';
import {SampleImageUrl} from '../../utils/SampleData';
import useLoading from '../../hooks/loading/useLoading';
import useShare from '../../hooks/share/useShare';
import displayAlert from '../../utils/DisplayAlert';

const screenWidth = Dimensions.get('screen').width;

export default function ChallengeCompletionScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {history} = useProgressData();
  const {dictionary} = useDictionary();
  const {WorkoutDict, ShareDict, ProfileDict} = dictionary;
  const {
    params: {
      name,
      type,
      result,
      trainer,
      id,
      weightPreference,
      unitType,
      ellapsedTime,
      description,
      duration,
    },
  } = useRoute();
  const navigation = useNavigation();
  const {firebaseLogEvent, analyticsEvents} = useUserData();
  const {setLoading} = useLoading();
  const {ShareMediaType, getShareData} = useShare();

  const [chartInfo, setChartInfo] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={WorkoutDict.ChallengeCompleteTitle} />,
    });
  }, []);

  useEffect(() => {
    async function getInfo() {
      const info = await generateChartInfo(
        history,
        id,
        weightPreference,
        unitType,
        type,
      );
      setChartInfo(info);
    }
    getInfo();
  }, [history, id, weightPreference, unitType, type]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    descriptionContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    description: {
      marginTop: getHeight(20),
      ...textStyles.semiBold16_brownishGrey100,
      textAlign: 'left',
    },
    buttonContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      bottom: getHeight(40),
    },
    card: {
      height: getHeight(220),
      width: '55%',
      position: 'absolute',
      top: getHeight(120),
    },
    resultContainer: {
      backgroundColor: colors.veryLightPinkTwo100,
      borderRadius: radius(15),
      borderTopLeftRadius: 0,
      padding: getHeight(10),
      marginRight: getWidth(20),
    },
    resultTitle: {
      ...textStyles.medium14_brownishGrey100,
      textAlign: 'left',
    },
    timeResult: {
      ...textStyles.bold30_black100,
      fontSize: fontSize(28),
      textAlign: 'left',
    },
    resultText: {
      ...textStyles.bold34_black100,
      fontSize: fontSize(32),
      textAlign: 'left',
    },
    line: {
      height: getHeight(1),
      width: '100%',
      backgroundColor: colors.veryLightPink100,
      marginTop: getHeight(280),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

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

    const {colour, url} = await getShareData(
      ShareMediaType.challengeComplete,
    ).catch((err) => {
      console.log(err, '<---getShareData err');
      displayAlert({text: ShareDict.UnableToShare});
      setLoading(false);
      return;
    });

    console.log('name: ', name);
    console.log('result: ', result);
    console.log('weightPreference: ', weightPreference);
    console.log('unitType: ', unitType);
    console.log('ellapsedTime: ', ellapsedTime);
    console.log('type: ', type);
    console.log('duration: ', duration);

    if (type === 'STOPWATCH') {
      const unit = unitType === 'WEIGHT' ? weightPreference : '';
      const achievementValueString = ellapsedTime + ' ' + unit;

      PowerShareAssetsManager.shareStringAchievement({
        imageUrl: url,
        achievementValueString: ellapsedTime,
        subtitle: name,
        colour: colour,
      })
        .then((res) => {
          setLoading(false);
          shareEvent();
        })
        .catch((err) => {
          console.log('SHARE ERR: ', err);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    } else if (type === 'COUNTDOWN') {
      const unit = unitType === 'WEIGHT' ? weightPreference : '';
      const achievedResult =
        typeof result === 'number' ? result : parseInt(result, 10);
      const durationTimeString =
        typeof duration === 'string' ? duration : duration.toString();
      const subtitle = name + '\nin ' + durationTimeString + ' seconds';
      const achievedValueString = `${achievedResult} ${unit}`;

      PowerShareAssetsManager.shareStringAchievement({
        imageUrl: url,
        achievementValueString: achievedValueString,
        subtitle: subtitle,
        colour: colour,
      })
        .then((res) => {
          setLoading(false);
          shareEvent();
        })
        .catch((err) => {
          setLoading(false);
        })
        .finally(() => setLoading(false));
    } else {
      const unit = unitType === 'WEIGHT' ? weightPreference : '';
      const achievedResult =
        typeof result === 'number' ? result : parseInt(result, 10);
      const achievedValueString = `${achievedResult} ${unit}`;

      PowerShareAssetsManager.shareStringAchievement({
        imageUrl: url,
        achievementValueString: achievedValueString,
        subtitle: name,
        colour: colour,
      })
        .then((res) => {
          setLoading(false);
          shareEvent();
        })
        .catch((err) => {
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  }

  function shareEvent() {
    firebaseLogEvent(analyticsEvents.shareCompletedChallenge, {});
  }

  function handleDone() {
    firebaseLogEvent(analyticsEvents.completedChallenge, {});
    navigation.navigate('Progress');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {WorkoutDict.ChallengeComplete(name, trainer)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          height: getHeight(220),
          marginTop: getHeight(80),
        }}>
        <View style={{flex: 0.6}}>
          {chartInfo && (
            <ProgressChart
              data={chartInfo.processedHistory}
              chartLabel={''}
              chartDataPoints={chartInfo.dataPoints}
              interval={chartInfo.interval}
              ticks={chartInfo.ticks}
              axis={false}
              background={false}
              scrollToEnd={true}
            />
          )}
        </View>

        <View style={{flex: 0.4}}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>{WorkoutDict.Today}</Text>
            {chartInfo && (
              <Text
                style={
                  type === 'STOPWATCH' ? styles.timeResult : styles.resultText
                }>
                {`${result} ${chartInfo.chartLabel}`}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.line} />
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="share"
          icon="share"
          variant="gradient"
          onPress={handleShare}
        />
        <Spacer height={20} />
        <DefaultButton
          type="done"
          icon="chevron"
          variant="white"
          onPress={handleDone}
        />
      </View>
    </View>
  );
}
