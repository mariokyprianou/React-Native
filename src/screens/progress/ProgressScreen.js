/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 16:39:00 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TransformationChallenge from '../../components/Buttons/TransformationChallenge';
import Calendar from 'the-core-ui-module-tdcalendar';
import processProgressData from '../../utils/processProgressData';
import {useNetInfo} from '@react-native-community/netinfo';
import useUserData from '../../hooks/data/useUserData';
import {parseISO} from 'date-fns';
import useProgressData from '../../hooks/data/useProgressData';
import displayAlert from '../../utils/DisplayAlert';

const transformationTileImage = require('../../../assets/transformationTileImage.png');
const challengePlaceholderGraph = require('../../../assets/fakeGraph.png');

export default function ProgressScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles, singleCalendarStyles} = useTheme();
  const {isConnected, isInternetReachable} = useNetInfo();
  const {getPreferences, preferences} = useUserData();
  const {
    progress,
    getProgress,
    challenges,
    getChallenges,
    userImages,
    getImages,
  } = useProgressData();
  const {
    days,
    daysTextStyles,
    daysContainerStyles,
    dateCellStyles,
    lookupStyleTable,
    pillWidth,
  } = singleCalendarStyles;
  const {dictionary} = useDictionary();
  const {ProgressDict, OfflineMessage} = dictionary;
  const navigation = useNavigation();

  const [progressData, setProgressData] = useState();
  const [weightLabel, setWeightLabel] = useState();

  useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !progress) {
      console.log('Focused Tab3: need refetch');

      getPreferences();
      getProgress();
      getChallenges();
      if (userImages.length === 0) {
        getImages();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (preferences && preferences.weightPreference) {
      const weightPreference = preferences.weightPreference.toLowerCase();
      setWeightLabel(weightPreference);
    }
  }, [preferences]);

  useEffect(() => {
    if (progress) {
      const currentMonth = new Date().getMonth();

      let thisMonth = progress.find((month) => {
        return parseISO(month.startOfMonth).getMonth() === currentMonth;
      });

      if (thisMonth) {
        const progressHistoryData = processProgressData(thisMonth.days);

        setProgressData(progressHistoryData);
      }
    }
  }, [progress]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.backgroundWhite100,
    },
    androidSafeArea: {
      backgroundColor: colors.backgroundWhite100,
      height: 30,
      width: '100%',
    },
    screen: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    container: {
      width: '90%',
      height: '100%',
      marginTop: Platform.OS === 'android' ? getHeight(20) : 0,
      alignSelf: 'center',
    },
    titleContainer: {
      flexDirection: 'column',
      marginTop: getHeight(40),
      marginBottom: getHeight(15),
      width: '100%',
      alignSelf: 'center',
    },
    yourTitle: {
      ...textStyles.bold34_black100,
      textAlign: 'left',
      marginRight: getWidth(6),
      letterSpacing: -0.51,
    },
    subHeader: {
      ...textStyles.regular16_black90,
      lineHeight: fontSize(20),
      letterSpacing: -0.32,
    },
    progressTitle: {
      ...textStyles.bold34_aquamarine100,
      textAlign: 'left',
    },
    calendarContainer: {
      width: '100%',
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
      backgroundColor: colors.white100,
      marginBottom: '4%',
      alignSelf: 'center',
      paddingBottom: getHeight(5),
    },
    calendarTitle: {
      ...textStyles.bold20_black100,
      textAlign: 'left',
      marginTop: getHeight(17),
      marginBottom: getHeight(4),
      marginHorizontal: getWidth(24),
    },
    boxWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignSelf: 'center',
      flex: 1,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
      forceInset={{top: 'always'}}>
      {Platform.OS === 'android' && <View style={styles.androidSafeArea} />}
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text
              style={
                styles.yourTitle
              }>{`${ProgressDict.Your} ${ProgressDict.Progress}`}</Text>
            <Text style={styles.subHeader}>{ProgressDict.SubHeader}</Text>
          </View>
          <View style={styles.calendarContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
              <Text style={styles.calendarTitle}>
                {ProgressDict.YourWorkouts}
              </Text>
              <Calendar
                days={days}
                daysTextStyles={daysTextStyles}
                daysContainerStyles={daysContainerStyles}
                firstDayOfWeek="Monday"
                calendarType="single-month"
                showPrevNextDays={false}
                datesSelectable={false}
                dateCellStyles={dateCellStyles}
                cellData={progressData}
                pillWidth={pillWidth}
                lookupStyleTable={lookupStyleTable}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.boxWrapper}>
            {challenges && (
              <>
                <TransformationChallenge
                  type="progress"
                  title={ProgressDict.TransformationScreenTitle}
                  image={transformationTileImage}
                  onPress={() => {
                    if (!isConnected) {
                      displayAlert({text: OfflineMessage});
                      return;
                    }
                    navigation.navigate('Transformation');
                  }}
                />
                {challenges.map((challenge, index) => {
                  const {
                    name,
                    id,
                    fieldDescription,
                    type,
                    duration,
                    fieldTitle,
                    unitType,
                    imageThumbnailUrl,
                  } = challenge;

                  return (
                    <TransformationChallenge
                      key={index}
                      type="challenge"
                      title={name}
                      image={challengePlaceholderGraph}
                      imageUrl={imageThumbnailUrl}
                      onPress={() => {
                        if (!isConnected) {
                          displayAlert({text: OfflineMessage});
                          return;
                        }

                        navigation.navigate('Challenge', {
                          id: id,
                          name: name,
                          description: fieldDescription,
                          fieldTitle: fieldTitle,
                          type: type,
                          duration: duration,
                          unitType: type === 'STOPWATCH' ? 'seconds' : unitType,
                          weightPreference: weightLabel,
                        });
                      }}
                    />
                  );
                })}
                <View style={{width: '48%'}} />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
