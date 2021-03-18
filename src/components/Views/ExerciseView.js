/*
 * Created Date: Wed, 11th Nov 2020, 17:08:56 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, Alert} from 'react-native';
import RepCell from '../cells/RepCell';
import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import ExerciseVideoView from './ExerciseVideoView';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTimer} from 'the-core-ui-module-tdcountdown';
import {msToHMS} from '../../utils/dateTimeUtils';
import SetCompletionScreen from '../../screens/workout/SetCompletionScreen';
import {useQuery} from '@apollo/client';
import GetExerciseWeight from '../../apollo/queries/GetExerciseWeight';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import UseData from '../../hooks/data/UseData';
import useUserData from '../../hooks/data/useUserData';

const completeIcon = require('../../../assets/icons/completeExercise.png');
const checkIcon = require('../../../assets/icons/check.png');
const weightIcon = require('../../../assets/icons/weight.png');
const notesIcon = require('../../../assets/icons/notes.png');

export default function ExerciseView(props) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {exercise, index} = props;
  const {isConnected, isInternetReachable} = useNetInfo();
  const navigation = useNavigation();
  const {getHeight, getWidth} = ScaleHook();
  const insets = useSafeArea();
  const {exerciseViewStyle} = useTheme();
  const styles = exerciseViewStyle;
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const {selectedWorkout, setSelectedWeight} = UseData();
  const {getPreferences, preferences} = useUserData();

  const [countDown, setCountDown] = useState(false);
  const [sets, setSets] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);
  const [restTime, setRestTime] = useState();
  const [setComplete, setSetComplete] = useState(null);
  const [lastWeight, setLastWeight] = useState('20');
  const [weightHistory, setWeightHistory] = useState([]);
  const [weightLabel, setWeightLabel] = useState();

  useEffect(() => {
    getPreferences();
  }, []);

  useEffect(() => {
    if (preferences.weightPreference) {
      const weightPreference = preferences.weightPreference.toLowerCase();
      setWeightLabel(weightPreference);
    }
  }, [preferences]);

  useEffect(() => {
    let sets = props.sets;

    sets = sets.map((it, index) => {
      if (index === 0) {
        return {
          ...it,
          state: 'active',
        };
      }
      return {
        ...it,
        state: 'inactive',
      };
    });

    setSets(sets);
  }, []);

  useQuery(GetExerciseWeight, {
    variables: {exercise: exercise.id},
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res.getExerciseWeight.length > 0) {
        const lastIndex = res.getExerciseWeight.length - 1;
        if (res.getExerciseWeight[lastIndex].weight) {
          setLastWeight(res.getExerciseWeight[lastIndex].weight);
        }
        setWeightHistory(res.getExerciseWeight);
      }
    },
    onError: (error) => console.log(error, '<---- error fetching weights'),
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  const onSetCompleted = (completedIndex) => {
    
    // Move to next Set
    if (completedIndex + 1 === sets.length) {
      setCurrentSet(sets.length);
    } else {
      setCurrentSet(currentSet + 1);
    }

    // Update Sets states
    const newSets = sets.map((it, index) => {
      if (index <= completedIndex) {
        if (it.restTime && it.restTime > 0) {
            setRestTime(it.restTime * 1000);
        }
        return {
          ...it,
          state: 'completed',
        };
      } else if (index === completedIndex + 1) {
        return {
          ...it,
          state: 'active',
        };
      }
      return it;
    });
   
    setSets(newSets);

    // start rest timer
    if (restTime) {
      setCountDown(true);
    }
    
    // show set completion modal with weights if applicable
    if (exercise.weight) {
      setSelectedWeight(lastWeight);
      setSetComplete(true);
    }

  };


  // Finished weight submition, check if it was last set
  useEffect(() => {
    if (setComplete === false) {
      checkShouldFinishExercise();
    }
  }, [setComplete])

  async function checkShouldFinishExercise() {
      // On timer done, check if exercise is done
      if (currentSet === sets.length) {
        props.exerciseFinished();
      }
    
  }

  const onCancelTimer = () => {
    setCountDown(false);
    checkShouldFinishExercise();
  };

  const onFinishTimer = () => {
    setCountDown(false);
    checkShouldFinishExercise()
  };

  const onExerciseCompleted = () => {
    onSetCompleted(sets.length - 1);

     // If we dont have rest time or weight option just finish exercise set immediatelly
     if ((!restTime || restTime === 0) && !exercise.weight) {
      props.exerciseFinished();
    }
  };

  const handleSelectWeights = () => {
    if (weightHistory.length === 0) {
      Alert.alert(WorkoutDict.WorkoutNoWeightsWarning);
    } else {
      navigation.navigate('WeightCapture', {
        weightHistory: weightHistory,
        weightPreference: weightLabel,
      });
    }
  };

  // ** ** ** ** ** RENDER ** ** ** ** **

  const RepsList = ({sets}) => {
    return (
      <View style={styles.repsContainerStyle}>
        {sets.map((item, index) => {
          return (
            <RepCell
              key={index}
              {...item}
              onPress={() => onSetCompleted(index)}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={{height: getHeight(667 - 56 - insets.top)}}>
      <ExerciseVideoView {...exercise} index={index} />
      <View style={styles.contentStyle}>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.exerciseTitleStyle}>{exercise.name}</Text>
          <TouchableOpacity onPress={countDown ? null : onExerciseCompleted}>
            <Image source={completeIcon} />
            <Image style={styles.checkIconStyle} source={checkIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.exerciseDescriptionStyle}>
          {exercise.coachingTips}
        </Text>

        <View style={styles.extraContainerStyle}>
          {exercise.weight && (
            <TouchableOpacity
              style={{
                ...styles.weightTouchStyle,
                marginEnd: getWidth(40),
              }}
              onPress={handleSelectWeights}>
              <Image source={weightIcon} />
              <Text style={styles.extraTextStyle}>
                {WorkoutDict.WeightText}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              ...styles.weightTouchStyle,
            }}
            onPress={() =>
              navigation.navigate('Notes', {
                id: exercise.id,
                description: exercise.coachingTips,
              })
            }>
            <Image source={notesIcon} />
            <Text style={styles.extraTextStyle}>{WorkoutDict.NotesText}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.setsContainerStyle}>
          <View style={styles.setsCompletedContainerStyle}>
            <Text style={styles.competedSetsTitleStyle}>
              {currentSet}/{sets.length}
            </Text>
            <Text style={styles.competedSetsTextStyle}>
              {WorkoutDict.SetsText}
            </Text>
          </View>
          <RepsList sets={sets} />
        </View>
        {countDown && restTime > 0 && (
          <TimerView
            duration={msToHMS(restTime)}
            onCancelTimer={onCancelTimer}
            onFinish={onFinishTimer}
          />
        )}
      </View>
      {setComplete && (
        <SetCompletionScreen
          restTime={restTime && restTime > 0 ? msToHMS(restTime): 0}
          setSetComplete={setSetComplete}
          setReps={sets[currentSet - 1].quantity}
          setNumber={sets[currentSet - 1].setNumber}
          exercise={exercise.id}
          weightPreference={weightLabel}
        />
      )}
    </View>
  );
}

function TimerView(props) {
  const {remainingMS, toggle, reset} = useTimer({
    timer: props.duration,
  });

  useEffect(() => {
    reset();
    toggle();
  }, []);

  useEffect(() => {
    if (remainingMS === 0) {
      props.onFinish && props.onFinish();
    }
  }, [remainingMS]);

  const {exerciseViewStyle} = useTheme();
  const styles = exerciseViewStyle;

  return (
    <View style={styles.timerContainer}>
      <TouchableOpacity
        style={styles.timerTouchArea}
        onPress={props.onCancelTimer}>
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerTextStyle}>{msToHMS(remainingMS)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
