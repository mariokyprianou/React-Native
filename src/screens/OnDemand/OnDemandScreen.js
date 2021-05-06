/*
 * Created Date: Thu, 6th May 2021, 11:25:22 am
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import useLoading from '../../hooks/loading/useLoading';
import useData from '../../hooks/data/UseData';
import useUserData from '../../hooks/data/useUserData';
import {useNavigation} from '@react-navigation/native';
import * as R from 'ramda';
import {differenceInDays, format} from 'date-fns';
import OnDemandWorkoutCard from '../../components/Cards/OnDemandWorkoutCard';

export default function OnDemandScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles, colors} = useTheme();
  const {dictionary} = useDictionary();
  const {OnDemandDict, WorkoutDict} = dictionary;

  const [weekNumber, setWeekNumber] = useState(1);
  const [stayTunedEnabled, setStayTunedEnabled] = useState(true);

  const [workoutsToDisplay, setWorkoutsToDisplay] = useState([]);
  const navigation = useNavigation();
  const {setLoading} = useLoading();
  const {suspendedAccount} = useUserData();

  navigation.setOptions({
    header: () => null,
  });

  const {
    workoutTags,
    getWorkoutTags,
    setWorkoutTags,
    setSelectedWorkoutTags,
    onDemandWorkouts,
    getOnDemandWorkouts,
    setOnDemandWorkouts,
    setSelectedWorkout,
    setIsSelectedWorkoutOnDemand,
  } = useData();

  useEffect(() => {
    setLoading(true);
    getWorkoutTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if week is completed
  useEffect(() => {
    if (workoutTags && workoutTags.length > 0) {
      const tagIds = workoutTags.map((tag) => tag.id);
      setSelectedWorkoutTags(tagIds);
      getOnDemandWorkouts();
    } else {
      // TODO - Handle Zero State
    }
  }, [workoutTags]);

  useEffect(() => {
    if (onDemandWorkouts && onDemandWorkouts.length > 0) {
      setWorkoutsToDisplay(onDemandWorkouts);
      setLoading(false);
    } else {
      // TODO - Handle Zero State
    }
  }, [onDemandWorkouts]);

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

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
      flex: 1,
    },
    container: {
      width: '90%',
      marginTop: Platform.OS === 'android' ? getHeight(20) : 0,
      alignSelf: 'center',
    },
    titleContainer: {
      flexDirection: 'column',
      marginTop: getHeight(20),
      marginBottom: getHeight(15),
      width: '100%',
      alignSelf: 'center',
    },
    title: {
      ...textStyles.bold34_black100,
      textAlign: 'left',
      marginRight: getWidth(6),
    },
    subtitle: {
      ...textStyles.regular16_black90,
      textAlign: 'left',
      marginRight: getWidth(6),
    },
    list: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'android' && <View style={styles.androidSafeArea} />}
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{OnDemandDict.title}</Text>
            <Text style={styles.subtitle}>{OnDemandDict.subtitle}</Text>
          </View>
        </View>

        <FlatList
          style={styles.list}
          scrollEnabled={false}
          data={workoutsToDisplay}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: getWidth(20),
                  paddingTop: index === 0 ? getHeight(20) : 0,
                }}>
                <OnDemandWorkoutCard
                  workout={item}
                  title={item.name}
                  duration={item.duration}
                  intensity={item.intensity}
                  image={item.overviewImage}
                  onPressCard={async (workout) => {
                    if (suspendedAccount === true) {
                      DisplayAlert({
                        text: WorkoutDict.SuspendedAccount,
                      });
                      return;
                    }

                    const newWorkout = {
                      ...workout,
                      exercises: workout.exercises
                        .slice()
                        .sort((a, b) => a.orderIndex - b.orderIndex),
                    };

                    setSelectedWorkout(newWorkout);
                    setIsSelectedWorkoutOnDemand(true);
                    navigation.navigate('StartWorkout');
                  }}
                />
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
