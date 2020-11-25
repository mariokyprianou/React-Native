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

const completeIcon = require('../../../assets/icons/completeExercise.png');
const checkIcon = require('../../../assets/icons/check.png');
const weightIcon = require('../../../assets/icons/weight.png');
const notesIcon = require('../../../assets/icons/notes.png');

export default function ExerciseView() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles, exerciseViewStyle} = useTheme();
  const styles = exerciseViewStyle;
  const navigation = useNavigation();

  const {dictionary} = useDictionary();
  const insets = useSafeArea();
  const {remainingMS, toggle, reset} = useTimer({
    timer: '00:60',
  });

  const [countDown, setCountDown] = useState(false);

  const {WorkoutDict} = dictionary;
  const exerciseTitle = 'Lateral lunges';
  const exerciseDescription =
    'Keep your front knee in line with your toes, with your back neutral and upright lorem ipsum dolor sit amet';

  const reps = [{}, {}, {}, {}, {}];

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onExerciseCompleted = () => {
    if (countDown) {
      reset();
      setCountDown(false);
    } else {
    }
  };

  const onSetCompleted = () => {
    setCountDown(true);
    reset();
    toggle();
  };

  useEffect(() => {
    if (remainingMS === 0) {
      toggle();
    }
  }, [remainingMS, toggle]);
  // ** ** ** ** ** RENDER ** ** ** ** **

  const RepsList = React.memo(({reps}) => {
    return (
      <View style={styles.repsContainerStyle}>
        {reps.map((index) => (
          <RepCell key={index} onPress={() => onSetCompleted(index)} />
        ))}
      </View>
    );
  });

  const renderCountDown = () => {
    return (
      <View style={styles.timerContainer}>
        <Text style={styles.timerTextStyle}>{msToHMS(remainingMS)}</Text>
      </View>
    );
  };

  return (
    <View style={{height: getHeight(667 - 56 - insets.top)}}>
      <ExerciseVideoView />
      <View style={styles.contentStyle}>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.exerciseTitleStyle}>{exerciseTitle}</Text>

          <TouchableOpacity style={{zIndex: 1}} onPress={onExerciseCompleted}>
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
            <Text style={styles.competedSetsTitleStyle}>2/5</Text>
            <Text style={styles.competedSetsTextStyle}>
              {WorkoutDict.SetsText}
            </Text>
          </View>
          <RepsList reps={reps} />
        </View>

        {countDown && renderCountDown()}
      </View>
    </View>
  );
}
