/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 12:28:58 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import Calendar from 'the-core-ui-module-tdcalendar';
import Header from '../../components/Headers/Header';
import fakeProgressData from '../../hooks/data/FakeProgressData'; // to delete
import processProgressData from '../../utils/processProgressData';

export default function CalendarScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {singleCalendarStyles, colors, textStyles} = useTheme();
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

  navigation.setOptions({
    header: () => <Header title={ProgressDict.YourWorkouts} goBack />,
  });

  const {fakeProgressHistory} = fakeProgressData();

  const progressHistoryData = fakeProgressHistory
    .map((month) => {
      return processProgressData(month.days);
    })
    .flat();

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
