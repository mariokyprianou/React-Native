/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 16:39:00 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import useData from '../../hooks/data/UseData';
import fakeProgressData from '../../hooks/data/FakeProgressData'; // to delete
import TransformationChallenge from '../../components/Buttons/TransformationChallenge';
import Calendar from 'the-core-ui-module-tdcalendar';
import processProgressData from '../../utils/processProgressData';

const fakeImage = require('../../../assets/fake2.png');
const fakeGraph = require('../../../assets/fakeGraph.png');

export default function ProgressScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles, singleCalendarStyles} = useTheme();
  const {
    days,
    daysTextStyles,
    daysContainerStyles,
    dateCellStyles,
    lookupStyleTable,
    pillWidth,
  } = singleCalendarStyles;
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;

  // const [
  //   progress,
  //   // getProgress,
  //   // challenges,
  //   // getChallenges,
  //   // challengeHistory,
  //   // getChallengeHistory,
  //   // progressHistory,
  //   // getProgressHistory,
  //   // progressImages,
  //   // getProgressImages,
  // ] = useData();
  // console.log(progress);
  const {fakeProgress, fakeChallenges} = fakeProgressData();
  const progressData = processProgressData(fakeProgress.days);

  const navigation = useNavigation();

  navigation.setOptions({
    header: () => null,
  });

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
      flexDirection: 'row',
      marginTop: getHeight(20),
      marginBottom: getHeight(15),
      width: '100%',
      alignSelf: 'center',
    },
    yourTitle: {
      ...textStyles.bold34_black100,
      textAlign: 'left',
      marginRight: getWidth(6),
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
      marginBottom: getHeight(10),
      alignSelf: 'center',
    },
    calendarTitle: {
      ...textStyles.bold20_black100,
      textAlign: 'left',
      marginTop: getHeight(17),
      marginBottom: getHeight(7),
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
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'android' && <View style={styles.androidSafeArea} />}
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.yourTitle}>{ProgressDict.Your}</Text>
            <Text
              style={styles.progressTitle}>{`${ProgressDict.Progress}`}</Text>
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
            <TransformationChallenge
              type="progress"
              title="Transformation"
              image={fakeImage}
              onPress={() => navigation.navigate('Transformation')}
            />
            {fakeChallenges.map((challenge, index) => {
              const {name} = challenge;
              return (
                <TransformationChallenge
                  key={index}
                  type="challenge"
                  title={name}
                  image={fakeGraph}
                  onPress={() => navigation.navigate('Challenge', {challenge})}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
