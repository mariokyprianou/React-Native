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


const screenWidth = Dimensions.get('screen').width;

export default function ChallengeCompletionScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {history} = useProgressData();
  const {dictionary} = useDictionary();
  const {WorkoutDict, ShareDict} = dictionary;
  const {
    params: {name, type, result, trainer, id, weightPreference, unitType},
  } = useRoute();
  const navigation = useNavigation();
  const {firebaseLogEvent, analyticsEvents} = useUserData();

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

  function handleShare() {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          url: '',
          message: ShareDict.ShareProgress,
        },
        (error) => console.log(error),
        (success, method) => {
          if (success) {
            shareEvent();
            console.log('Successfully shared', success);
          }
        },
      );
    } else {
      Share.open({shareOptions})
        .then((res) => {
          shareEvent();
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
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
