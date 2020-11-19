/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 16:39:00 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import useCalendar from '../../hooks/data/useCalendar';
import useProgress from '../../hooks/data/useProgress';
import TransformationChallenge from '../../components/Buttons/TransformationChallenge';
import Calendar from 'the-core-ui-module-tdcalendar';

const fakeImage = require('../../../assets/fake2.png');
const fakeGraph = require('../../../assets/fakeGraph.png');

export default function ProgressScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles, singleCalendarStyles} = useTheme();
  const {
    days,
    daysTextStyles,
    daysContainerStyles,
    dateCellStyles,
    pillWidth,
  } = singleCalendarStyles;
  const {dictionary} = useDictionary();
  const {TitleText_Your, TitleText_Progress} = dictionary;
  const {progressCalendarData} = useCalendar();
  const {challengeData} = useProgress();
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => null,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '90%',
      height: '100%',
      alignSelf: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      marginTop: getHeight(50),
      marginBottom: getHeight(15),
      width: '100%',
      alignSelf: 'center',
    },
    yourTitle: {
      ...textStyles.bold34_black100,
    },
    progressTitle: {
      ...textStyles.bold34_aquamarine100,
    },
    calendarContainer: {
      height: getHeight(280),
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
    boxWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.yourTitle}>{TitleText_Your}</Text>
        <Text style={styles.progressTitle}>{` ${TitleText_Progress}`}</Text>
      </View>
      <View style={styles.calendarContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Calendar
            days={days}
            daysTextStyles={daysTextStyles}
            daysContainerStyles={daysContainerStyles}
            firstDayOfWeek="Monday"
            calendarType="single-month"
            showPrevNextDays={false}
            datesSelectable={false}
            dateCellStyles={dateCellStyles}
            cellData={progressCalendarData}
            pillWidth={pillWidth}
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
        {challengeData.map((challenge, index) => {
          const {name, image} = challenge;
          return (
            <TransformationChallenge
              key={index}
              type="challenge"
              title={name}
              image={fakeGraph}
              onPress={() => navigation.navigate('Challenge')}
            />
          );
        })}
      </View>
    </View>
  );
}