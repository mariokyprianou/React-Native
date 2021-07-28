/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 08:12:16 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import useData from '../../hooks/data/UseData';
import WEEK_STATE from '../../utils/WEEK_STATE';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import WorkoutCard from '../../components/Cards/WorkoutCard';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {differenceInDays} from 'date-fns';
import useLoading from '../../hooks/loading/useLoading';
import {CircularProgress} from 'react-native-circular-gradient-progress';

export default function WeekContent({updateOrder, onPressCard}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, Constants, textStyles, fonts} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flex: 1,
      width: Constants.SCREEN_WIDTH,
    },
    bottomContainer: {
      height: getHeight(235),
      padding: getHeight(26),
      marginTop: getHeight(12),
      width: Constants.SCREEN_WIDTH,
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
      alignItems: 'center',
    },
    circularProgressContainer: {
      height: getHeight(130),
      alignItems: 'center',
    },
    currentWeekContainer: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    currentWeekNumber: {
      justifyContent: 'center',
      fontFamily: fonts.regular,
      fontSize: fontSize(25),
      color: colors.dividerGrey100,
      marginTop: getHeight(20),
    },
    currentWeekText: {
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: fonts.semiBold,
      fontSize: fontSize(12),
      color: colors.durationGrey100,
      marginTop: getHeight(4),
    },
    newWorkoutsText: {
      textAlign: 'center',
      fontFamily: fonts.semiBold,
      fontSize: fontSize(12),
      color: colors.newWorkoutBlue100,
      marginTop: getHeight(20),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const {setLoading} = useLoading();
  const {
    displayWeeks,
    selectedWeekIndex,
    setSelectedWeekIndex,
    currentWeekNumber,
    totalWeeks,
  } = useData();

  useEffect(() => {
    if (displayWeeks.length > 0 && selectedWeekIndex !== null) {
      setLoading(false);
    }
  }, [selectedWeekIndex, displayWeeks, setLoading]);

  // ** ** ** ** ** RENDER ** ** ** ** **
  const Day = ({item, listIndex, state}) => {
    return (
      <View style={{paddingHorizontal: getWidth(20)}}>
        <WorkoutCard
          workout={item}
          title={item.name}
          day={item.orderIndex}
          duration={item.duration}
          drag={null}
          status={state === WEEK_STATE.PAST && 'complete'}
          onPressCard={() => onPressCard(item)}
        />
      </View>
    );
  };

  const CurrentWeekDay = ({item, index, drag, isActive}) => {
    return (
      <View
        style={{
          paddingHorizontal: getWidth(20),
        }}>
        <WorkoutCard
          workout={item}
          title={item.name}
          day={item.day}
          duration={item.duration}
          drag={drag}
          status={
            item.completedAt || differenceInDays(item.exactDate, new Date()) < 0
              ? 'complete'
              : null
          }
          onPressCard={() => onPressCard(item)}
        />
      </View>
    );
  };

  const AnyWeek = ({item, state}) => {
    return (
      <FlatList
        data={item.workouts}
        keyExtractor={(index) => index}
        renderItem={({item, index}) => (
          <Day item={item} listIndex={index} state={state} />
        )}
        ListFooterComponent={renderBottomContainer}
        style={{paddingTop: getHeight(20)}}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={true}
        overScrollMode={'always'}
        bounces={false}
        scrollEnabled={true}
        decelerationRate={'fast'}
      />
    );
  };

  // Need to render draggable list here
  const CurrentWeek = ({item}) => (
    <DraggableFlatList
      data={item.workouts}
      keyExtractor={(item, index) => `${item.name + index}`}
      renderItem={(data) => <CurrentWeekDay {...data} />}
      ListFooterComponent={renderBottomContainer}
      onDragEnd={({data, from, to}) => {
        const lastValidIndex = item.workouts
          ? item.workouts.indexOf(
              item.workouts
                .slice()
                .filter(
                  (it) =>
                    it.completedAt ||
                    differenceInDays(it.exactDate, new Date()) < 0,
                )
                .pop(),
            )
          : -1;

        // Only do order change if its a valid position
        if (from !== to && (lastValidIndex === -1 || to > lastValidIndex)) {
          updateOrder(data);
        }
      }}
      bounces={false}
      style={{paddingTop: getHeight(20)}}
    />
  );

  const renderWeek = (week) => {
    switch (week.state) {
      case WEEK_STATE.PAST: {
        return <AnyWeek item={week} state={WEEK_STATE.PAST} />;
      }
      case WEEK_STATE.FUTURE: {
        return <AnyWeek item={week} state={WEEK_STATE.FUTURE} />;
      }
      default: {
        // Should be structured already
        return <CurrentWeek item={week} state={WEEK_STATE.CURRENT} />;
      }
    }
  };

  const renderBottomContainer = () => {
    return (
      <View style={styles.bottomContainer}>
        {selectedWeekIndex !== null && totalWeeks && (
          <TouchableOpacity
            disabled={selectedWeekIndex + 1 === currentWeekNumber}
            onPress={() => setSelectedWeekIndex(currentWeekNumber - 1)}>
            <View style={styles.circularProgressContainer}>
              <CircularProgress
                size={getHeight(130)}
                progress={(currentWeekNumber * 100) / totalWeeks}
                color={colors.aquamarine100}
                emptyColor={colors.aquamarine20}
                strokeWidth={1}
              />
              <View style={styles.currentWeekContainer}>
                <Text
                  style={
                    styles.currentWeekNumber
                  }>{` ${currentWeekNumber} / ${totalWeeks}`}</Text>
                <Text style={styles.currentWeekText}>
                  {WorkoutDict.CurrentWeek}
                </Text>
              </View>
            </View>
            <Text style={styles.newWorkoutsText}>
              {WorkoutDict.NewWorkoutsEachWeek}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {displayWeeks.length > 0 &&
        selectedWeekIndex !== null &&
        displayWeeks[selectedWeekIndex] !== undefined &&
        renderWeek(displayWeeks[selectedWeekIndex])}
    </View>
  );
}
