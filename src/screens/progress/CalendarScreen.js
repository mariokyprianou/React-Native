/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 12:28:58 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import Calendar from 'the-core-ui-module-tdcalendar';
import Header from '../../components/Headers/Header';
import processProgressData from '../../utils/processProgressData';
import useProgressData from '../../hooks/data/useProgressData';
import useLoading from '../../hooks/loading/useLoading';
import parseISO from 'date-fns/parseISO';
import { startOfMonth, lastDayOfMonth, eachDayOfInterval } from 'date-fns';

export default function CalendarScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {singleCalendarStyles, colors, textStyles} = useTheme();
  const {progress, getProgress} = useProgressData();
  const {
    days,
    daysTextStyles,
    daysContainerStyles,
    dateCellStyles,
    pillWidth,
    lookupStyleTable,
    monthNames,
  } = singleCalendarStyles;
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
  const navigation = useNavigation();
  const {setLoading} = useLoading();


  const [progressHistoryData, setProgressHistoryData] = useState();

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={ProgressDict.YourWorkouts} goBack />,
    });
    setLoading(true);
  
  }, []);
  function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
   }

   function sameMonth(dateFrom, dateTo) {
    return dateTo.getMonth() === dateFrom.getMonth() &&
      dateTo.getFullYear() === dateFrom.getFullYear()
   }

  useEffect(() => {
    if (progress && progress.length > 0) {

      // Code for adding missing months
      let completeProgress = progress.slice();
      
      // earliest month
      let earliestMonth = completeProgress.sort((a, b) => parseISO(a.startOfMonth) - parseISO(b.startOfMonth))[0];

      earliestMonth = parseISO(earliestMonth.startOfMonth);
      const currentMonth = new Date();

      let checkMonths = monthDiff(earliestMonth, currentMonth); // replace witth months to add

      // Iteerate all months from earliest till now
      for (let i = 1; i <= checkMonths; i++) {
        let newMonth = new Date(earliestMonth);
        newMonth.setMonth(newMonth.getMonth() + i);

        // If there is no data for iteration month, generate it
        if (!completeProgress.find((it)=> sameMonth(parseISO(it.startOfMonth), newMonth))) {

          const firstOfMonth = startOfMonth(newMonth);
          const lastOfMonth = lastDayOfMonth(newMonth);
          const daysOfMonthArray = eachDayOfInterval({
            start: firstOfMonth,
            end: lastOfMonth,
          });

          const days = daysOfMonthArray.map((date) => {
            return {"__typename": "ProgressDay", "date": date.toISOString(), "type": "noData"};
          });

          completeProgress.push({
            "__typename": "ProgressMonth", 
            "days": [...days], 
            "startOfMonth": newMonth.toISOString()
          })
        }

      }

      // Sort months again
      completeProgress = completeProgress.sort((a, b) => parseISO(b.startOfMonth) - parseISO(a.startOfMonth));

      const progressData = completeProgress
        .map((month) => {
          return processProgressData(month.days);
        }).reverse().flat();

      setProgressHistoryData(progressData);

      setLoading(false);
    }
  }, [progress]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    screen: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    container: {
      height: '100%',
      width: '90%',
      alignSelf: 'center',
    },
    monthTitles: {
      ...textStyles.bold20_black100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Calendar
          days={days}
          daysTextStyles={daysTextStyles}
          daysContainerStyles={daysContainerStyles}
          firstDayOfWeek="Monday"
          showPrevNextDays={false}
          datesSelectable={false}
          dateCellStyles={dateCellStyles}
          cellData={progressHistoryData}
          pillWidth={pillWidth}
          calendarType="multiple-month"
          lookupStyleTable={lookupStyleTable}
          calendarMonthNames={monthNames}
          monthTitleTextStyles={styles.monthTitles}
        />
      </View>
    </View>
  );
}
