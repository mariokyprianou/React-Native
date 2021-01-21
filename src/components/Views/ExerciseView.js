/*
 * Created Date: Wed, 11th Nov 2020, 17:08:56 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
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
  const {exercise, exerciseDoneFunction} = props;
  console.log(props);

  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles, exerciseViewStyle} = useTheme();
  const styles = exerciseViewStyle;
  const navigation = useNavigation();

  const {dictionary} = useDictionary();
  const insets = useSafeArea();
  // const {remainingMS, toggle, reset} = useTimer({
  //   timer: '00:05',
  // });

  const [countDown, setCountDown] = useState(false);
  const [msLeft, setMsLeft] = useState();

  const [currentSet, setCurrentSet] = useState(0);
  const [sets, setSets] = useState([]);
  const {WorkoutDict} = dictionary;
  const exerciseTitle = exercise.name;
  const exerciseDescription = exercise.coachingTips;

  useEffect(() => {
    let sets = props.sets;

    sets = sets.map((it) => {
      return {
        ...it,
        state: 'inactive',
      };
    });

    setSets(sets);
  }, []);

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onExerciseCompleted = () => {
    if (countDown) {
      //reset();
      setCountDown(false);
    } else {
    }
  };

  const onSetCompleted = (completedIndex) => {
    const newSets = sets.map((it, index) => {
      if (index === completedIndex) {
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

    // Update Sets
    setSets(newSets);

    // Move to next set
    if (currentSet < sets.length) {
      setCurrentSet(completedIndex + 1);
    }

    setCountDown(true);
    //toggle();
  };

  const onCancelTimer = () => {
    setCountDown(false);
  };

  // useEffect(() => {
  //   if (msToHMS(remainingMS) === '00:00') {
  //     setTimeout(() => {
  //       setCountDown(false);
  //       reset();
  //     }, 1000);
  //   }
  // }, [remainingMS, setCountDown]);

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

  const renderCountDown = () => {
    return (
      <View style={styles.timerContainer}>
        <TouchableOpacity style={styles.timerTouchArea} onPress={onCancelTimer}>
          <View style={styles.timerTextContainer}>
            {/* <Text style={styles.timerTextStyle}>{msToHMS(remainingMS)}</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{height: getHeight(667 - 56 - insets.top)}}>
      <ExerciseVideoView />
      <View style={styles.contentStyle}>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.exerciseTitleStyle}>{exerciseTitle}</Text>
          <TouchableOpacity onPress={countDown ? null : onExerciseCompleted}>
            <Image source={completeIcon} />
            <Image style={styles.checkIconStyle} source={checkIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.exerciseDescriptionStyle}>
          {exerciseDescription}
        </Text>

        <View style={styles.extraContainerStyle}>
          <TouchableOpacity
            style={styles.weightTouchStyle}
            onPress={() => navigation.navigate('WeightCapture')}>
            <Image source={weightIcon} />
            <Text style={styles.extraTextStyle}>{WorkoutDict.WeightText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.weightTouchStyle,
              marginStart: getWidth(40),
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
        {countDown && renderCountDown()}
      </View>
    </View>
  );
}
