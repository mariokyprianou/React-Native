/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 12:28:58 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import useCalendar from '../hooks/data/useCalendar';
import Calendar from 'the-core-ui-module-tdcalendar';
import Header from '../components/Headers/Header';

export default function DefaultScreen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {singleCalendarStyles} = useTheme();
  const {
    days,
    daysTextStyles,
    daysContainerStyles,
    dateCellStyles,
    pillWidth,
    lookupStyleTable,
  } = singleCalendarStyles;
  const {calendarScreenData} = useCalendar();
  const {dictionary} = useDictionary();
  const {ScreenHeader_YourWorkouts} = dictionary;

  navigation.setOptions({
    header: () => <Header title={ScreenHeader_YourWorkouts} goBack />,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Calendar
        days={days}
        daysTextStyles={daysTextStyles}
        daysContainerStyles={daysContainerStyles}
        firstDayOfWeek="Monday"
        showPrevNextDays={false}
        datesSelectable={false}
        dateCellStyles={dateCellStyles}
        cellData={calendarScreenData}
        pillWidth={pillWidth}
        calendarType="multiple-month"
        lookupStyleTable={lookupStyleTable}
      />
    </View>
  );
}
