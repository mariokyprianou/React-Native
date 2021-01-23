/*
 * Created Date: Wed, 11th Nov 2020, 17:08:56 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect, Component} from 'react';
import {View, TouchableOpacity, Text, Image, StatusBar} from 'react-native';
import RepCell from '../cells/RepCell';
import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import ExerciseVideoView from './ExerciseVideoView';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTimer} from 'the-core-ui-module-tdcountdown';
import {msToHMS} from '../../utils/dateTimeUtils';
import SliderProgressView from './SliderProgressView';
import {it} from 'date-fns/locale';

const completeIcon = require('../../../assets/icons/completeExercise.png');
const checkIcon = require('../../../assets/icons/check.png');
const weightIcon = require('../../../assets/icons/weight.png');
const notesIcon = require('../../../assets/icons/notes.png');

export default function ExerciseView(props) {
  const {exercise} = props;
  console.log(exercise);

  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {getHeight, getWidth} = ScaleHook();
  const insets = useSafeArea();
  const {exerciseViewStyle} = useTheme();
  const styles = exerciseViewStyle;
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  const [countDown, setCountDown] = useState(false);
  const [sets, setSets] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);
  const [restTime, setRestTime] = useState();

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

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  const onSetCompleted = (completedIndex) => {
    const newSets = sets.map((it, index) => {
      if (index <= completedIndex) {
        setRestTime((it.restTime || 0) * 1000);
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

    // Cool down and move to next set

    if (currentSet < sets.length) {
      setCurrentSet(currentSet + 1);
      setCountDown(true);
    }

    // Update Sets
    setSets(newSets);
  };

  const onCancelTimer = () => {
    setCountDown(false);
  };

  const onFinishTimer = () => {
    setCountDown(false);
  };

  const onExerciseCompleted = () => {
    onSetCompleted(sets.length);
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
      <ExerciseVideoView {...exercise} />
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
              onPress={() => navigation.navigate('WeightCapture')}>
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
            onPress={() => navigation.navigate('Notes')}>
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
