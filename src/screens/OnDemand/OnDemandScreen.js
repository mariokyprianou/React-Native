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
  ScrollView,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import useLoading from '../../hooks/loading/useLoading';
import useData from '../../hooks/data/UseData';
import useUserData from '../../hooks/data/useUserData';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import * as R from 'ramda';
import {differenceInDays, format} from 'date-fns';
import OnDemandWorkoutCard from '../../components/Cards/OnDemandWorkoutCard';
import WorkoutTagButton from '../../components/Buttons/WorkoutTagButton';
import displayAlert from '../../utils/DisplayAlert';

export default function OnDemandScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles, colors} = useTheme();
  const {dictionary} = useDictionary();
  const {OnDemandDict, WorkoutDict} = dictionary;

  const [weekNumber, setWeekNumber] = useState(1);
  const [stayTunedEnabled, setStayTunedEnabled] = useState(true);

  const [workoutsToDisplay, setWorkoutsToDisplay] = useState([]);
  const [workoutTagsToDisplay, setWorkoutTagsToDisplay] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState();
  const navigation = useNavigation();
  const {setLoading} = useLoading();
  const {
    suspendedAccount,
    isSubscriptionActive,
    completedFreeWorkouts,
  } = useUserData();

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

  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, []);

  useEffect(() => {
    if (isFocused && (!workoutTags || workoutTags.length === 0)) {
      console.log('Focused Tab2: need refetch');
      setLoading(true);
      getWorkoutTags();
    }
  }, [isFocused]);

  // Check if week is completed
  useEffect(() => {
    if (workoutTags && workoutTags.length > 0) {
      const tagIds = workoutTags.map((tag) => tag.id);

      const newWorkoutTags = workoutTags.map((obj) => ({
        ...obj,
        isSelected: false,
      }));
      setWorkoutTagsToDisplay(newWorkoutTags);
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
      setLoading(false);
    }
  }, [onDemandWorkouts]);

  useEffect(() => {
    const selectedWorkouts = workoutTagsToDisplay.filter(
      (x) => x.isSelected == true,
    );

    const tagIds =
      selectedWorkouts.length > 0
        ? selectedWorkouts.map((x) => x.id)
        : workoutTagsToDisplay.map((x) => x.id);

    setSelectedWorkoutTags(tagIds);

    if (onDemandWorkouts && onDemandWorkouts.length > 0) {
      const filtered = onDemandWorkouts.filter((workout) => {
        let matchingIds = 0;
        workout.tags.forEach((tag) => {
          if (tagIds.includes(tag.id)) {
            matchingIds++;
          }
        });
        return matchingIds > 0;
      });
      setFilteredWorkouts(filtered);
    }

    // getOnDemandWorkouts(tagIds);
  }, [workoutTagsToDisplay]);

  useEffect(() => {
    if (filteredWorkouts) {
      setWorkoutsToDisplay(filteredWorkouts);
      setLoading(false);
    }
  }, [filteredWorkouts]);

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
      marginTop: getHeight(40),
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
      letterSpacing: -0.32,
      lineHeight: fontSize(20),
      textAlign: 'left',
      marginRight: getWidth(6),
    },
    list: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    tagsList: {
      width: '100%',
      height: getWidth(90),
    },
    separatorComponent: {
      height: '100%',
      width: getWidth(16),
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <SafeAreaView style={styles.safeArea} forceInset={{top: 'always'}}>
      {Platform.OS === 'android' && <View style={styles.androidSafeArea} />}
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{OnDemandDict.title}</Text>
            <Text style={styles.subtitle}>{OnDemandDict.subtitle}</Text>
          </View>
        </View>

        <FlatList
          horizontal={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={workoutTagsToDisplay}
          style={styles.tagsList}
          keyExtractor={(item, index) => `${item.id}`}
          ItemSeparatorComponent={() => (
            <View style={styles.separatorComponent} />
          )}
          ListHeaderComponent={() => <View style={styles.separatorComponent} />}
          ListFooterComponent={() => <View style={styles.separatorComponent} />}
          renderItem={({item, index}) => {
            return (
              <WorkoutTagButton
                workoutTag={item}
                isSelected={item.isSelected}
                onPressCard={(workoutTag) => {
                  let newTags = workoutTagsToDisplay.slice();
                  const foundIndex = newTags.findIndex(
                    (x) => x.id == workoutTag.id,
                  );
                  const existingTag = newTags[foundIndex];
                  const newTag = {
                    ...existingTag,
                    isSelected: !existingTag.isSelected,
                  };
                  newTags.splice(foundIndex, 1);
                  newTags.splice(foundIndex, 0, newTag);
                  setLoading(true);
                  setWorkoutTagsToDisplay(newTags);
                }}
              />
            );
          }}
        />

        <FlatList
          style={styles.list}
          scrollEnabled={false}
          data={workoutsToDisplay}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: getWidth(20),
                  paddingTop: index === 0 ? getHeight(10) : 0,
                }}>
                <OnDemandWorkoutCard
                  workout={item}
                  title={item.name}
                  duration={item.duration}
                  intensity={item.intensity}
                  image={item.overviewImageThumbnail}
                  onPressCard={async (workout) => {
                    if (suspendedAccount === true) {
                      displayAlert({
                        text: WorkoutDict.SuspendedAccount,
                      });
                      return;
                    }

                    if (completedFreeWorkouts && !isSubscriptionActive) {
                      navigation.navigate('PurchaseModal');
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
