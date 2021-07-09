/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 08:12:16 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Platform, FlatList} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import Spacer from '../../components/Utility/Spacer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useRoute} from '@react-navigation/core';
import {useMutation} from '@apollo/client';
import UpdateExerciseNote from '../../apollo/mutations/UpdateExerciseNote';
import useData from '../../hooks/data/UseData';
import {useBackHandler} from '@react-native-community/hooks';
import WEEK_STATE from '../../utils/WEEK_STATE';
import {navItem} from 'aws-amplify';
import {ScrollView} from 'react-native-gesture-handler';
import WorkoutCard from '../../components/Cards/WorkoutCard';

export default function ProgrammeUI() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {
    colors,
    textStyles,
    cellFormConfig,
    cellFormStyles,
    Constants,
  } = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();

  const {displayWeeks, currentWeekNumber} = useData();

  const listRef = useRef(null);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      //backgroundColor: 'red',

      width: Constants.SCREEN_WIDTH,
    },
    bottomContainer: {
      height: getHeight(216),
      width: Constants.SCREEN_WIDTH,
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    dayContainer: {},
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const data = [
    {
      startedAt: '2021-05-01T19:59:25.839Z',
      state: WEEK_STATE.PAST,
      weekNumber: 1,
      workouts: [
        {
          completedAt: '2021-05-03T19:59:25.839Z',
          duration: 30,
          name: 'Upper body',
          orderIndex: 1,
        },
        {},
        {},
        {
          completedAt: '2021-05-05T19:59:25.839Z',
          duration: 60,
          name: 'Legs and glutes',
          orderIndex: 2,
        },
        {
          completedAt: '2021-05-06T19:59:25.839Z',
          duration: 30,
          name: 'Full body',
          orderIndex: 3,
        },
        {},
        {},
      ],
    },
    {
      startedAt: '2021-07-08T19:59:25.839Z',
      state: WEEK_STATE.CURRENT,
      weekNumber: 2,
      workouts: [
        {
          completedAt: '2021-07-09T19:59:25.839Z',
          duration: 30,
          name: 'Upper body',
          orderIndex: 1,
        },
        {
          completedAt: null,
          duration: 60,
          name: 'Legs and glutes',
          orderIndex: 2,
        },
        {
          completedAt: null,
          duration: 30,
          name: 'Full body',
          orderIndex: 3,
        },
      ],
    },
    {
      startedAt: null,
      state: WEEK_STATE.FUTURE,
      weekNumber: 3,
      workouts: [
        {
          completedAt: null,
          duration: 30,
          name: 'Upper body',
          orderIndex: 1,
        },
        {},
        {
          completedAt: null,
          duration: 60,
          name: 'Legs and glutes',
          orderIndex: 2,
        },
        {},
        {
          completedAt: null,
          duration: 30,
          name: 'Full body',
          orderIndex: 3,
        },
        {},
        {},
      ],
    },
  ];

  useEffect(() => {
    // Show correct week
    if (listRef?.current && currentWeekNumber) {
      listRef.current.scrollToIndex({
        animated: false,
        index: currentWeekNumber,
      });
    }
  }, [currentWeekNumber]);

  // ** ** ** ** ** RENDER ** ** ** ** **
  const Day = ({item, listIndex, state}) => {
    return (
      <WorkoutCard
        workout={item}
        title={item.name}
        day={item.orderIndex}
        duration={item.duration}
        drag={null}
        status={state === WEEK_STATE.PAST && 'complete'}
        onPressCard={null}
      />
    );
  };

  // Need to render draggable lisrt here
  const CurrentWeek = (item) => (
    <View
      style={{width: '100%', height: 200, backgroundColor: item.color}}></View>
  );

  const AnyWeek = ({item, state}) => {
    return (
      <View>
        <FlatList
          style={{paddingTop: getHeight(20), paddingHorizontal: getWidth(20)}}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={false}
          overScrollMode={'never'}
          scrollEnabled={false}
          decelerationRate={'fast'}
          data={item.workouts}
          renderItem={({item, index}) => (
            <Day item={item} listIndex={index} state={state} />
          )}
          keyExtractor={(index) => index}
        />
      </View>
    );
  };

  const renderWeek = (week) => {
    switch (week.state) {
      case WEEK_STATE.PAST: {
        // Add rest days
        return <AnyWeek item={week} state={WEEK_STATE.PAST} />;
      }
      case WEEK_STATE.FUTURE: {
        // Add rest days
        return <AnyWeek item={week} state={WEEK_STATE.FUTURE} />;
      }
      default: {
        // Should be structured already
        return <CurrentWeek item={week} />;
      }
    }
  };

  return (
    <ScrollView bounces={false}>
      <FlatList
        ref={listRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        snapToAlignment={'start'}
        snapToInterval={Constants.SCREEN_WIDTH}
        decelerationRate={'fast'}
        pagingEnabled
        data={data}
        renderItem={({item, index}) => (
          <View style={styles.container}>{renderWeek(item)}</View>
        )}
        keyExtractor={(item, index) => index}
      />
      <View style={styles.bottomContainer} />
    </ScrollView>
  );
}
