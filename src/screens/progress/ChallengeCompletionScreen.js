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


const screenWidth = Dimensions.get('screen').width;

export default function ChallengeCompletionScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {history} = useProgressData();
  const {dictionary} = useDictionary();
  const {WorkoutDict, ShareDict} = dictionary;
  const {
    params: {name, type, result, trainer, id, weightPreference, unitType, ellapsedTime, description},
  } = useRoute();
  const navigation = useNavigation();
  const {firebaseLogEvent, analyticsEvents} = useUserData();
  const {setLoading} = useLoading();
  const {ShareMediaType, getShareData} = useShare();

  const [chartInfo, setChartInfo] = useState(null);


  useEffect(()=> {
    navigation.setOptions({
      header: () => (
        <Header
          title={WorkoutDict.ChallengeCompleteTitle}
          right="crossIcon"
          rightAction={() => navigation.navigate('Progress')}
        />
      ),
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
      width: screenWidth * 0.95 - getWidth(175),
      position: 'absolute',
      top: getHeight(120),
    },
    resultContainer: {
      backgroundColor: colors.veryLightPinkTwo100,
      borderRadius: radius(15),
      borderTopLeftRadius: 0,
      width: getWidth(170),
      height: getHeight(110),
      padding: getHeight(10),
      position: 'absolute',
      right: getWidth(20),
      top: getHeight(120),
    },
    resultTitle: {
      ...textStyles.medium14_brownishGrey100,
      textAlign: 'left',
    },
    timeResult: {
      ...textStyles.bold30_black100,
      textAlign: 'left',
    },
    resultText: {
      ...textStyles.bold34_black100,
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
    setLoading(true)
    
    const { colour, url } = await getShareData(ShareMediaType.challengeComplete);

    // Achievement either int or string value on the banner
    let isTimeBased = type === "STOPWATCH";

    if (isTimeBased) {
      PowerShareAssetsManager.shareStringAchievement({
        imageUrl: url,
        achievementValueString: ellapsedTime,
        subtitle: description,
        colour: colour
      })
        .then((res) => {
          shareEvent()
        })
        .catch((err) => {
          console.log('SHARE ERR: ', err);
        })
        .finally(()=> setLoading(false));
    }
    else {
      PowerShareAssetsManager.shareIntAchievemnt({
        imageUrl: url,
        achievedValue: result,
        subtitle: description,
        colour: colour,
      })
        .then((res) => {
          shareEvent();
        })
        .catch((err) => {

        })
        .finally(()=> setLoading(false));
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
      <View style={styles.card}>
        {chartInfo && (
          <ProgressChart
            data={chartInfo.processedHistory}
            chartLabel={chartInfo.chartLabel}
            chartDataPoints={chartInfo.dataPoints}
            interval={chartInfo.interval}
            ticks={chartInfo.ticks}
            axis={false}
            background={false}
            scrollToEnd={true}
          />
        )}
      </View>
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
