/*
 * Created Date: Wed, 11th Nov 2020, 17:08:56 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, StatusBar} from 'react-native';
import RepCell from '../cells/RepCell';

import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import ExerciseVideoView from './ExerciseVideoView';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTimer} from 'the-core-ui-module-tdcountdown';
import {msToHMS} from '../../utils/dateTimeUtils';

const completeIcon = require('../../../assets/icons/completeExercise.png');
const checkIcon = require('../../../assets/icons/check.png');
const weightIcon = require('../../../assets/icons/weight.png');
const notesIcon = require('../../../assets/icons/notes.png');

export default function () {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const insets = useSafeArea();
  const {remaining, remainingMS, toggle, active, reset} = useTimer({
    timer: '00:60',
  });

  const [countDown, setCountDown] = useState(false);

  const {weightText, notesText, setsText} = dictionary.WorkoutDict;
  const exerciseTitle = 'Lateral lunges';
  const exerciseDescription =
    'Keep your front knee in line with your toes, with your back neutral and upright lorem ipsum dolor sit amet';

  const reps = [{}, {}, {}, {}, {}];
  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    contentStyle: {},
    titleContainerStyle: {
      marginTop: getWidth(20),
      marginHorizontal: getWidth(20),
      flexDirection: 'row',
      justifyContent: 'space-between',

      alignItems: 'center',
    },
    exerciseTitleStyle: {
      ...textStyles.bold21_black100,
    },
    exerciseDescriptionStyle: {
      marginTop: getHeight(10),
      marginHorizontal: getWidth(20),
      ...textStyles.regular15_brownishGrey100,
    },
    competedSetsTitleStyle: {
      ...textStyles.bold18_brownishGrey100,
      lineHeight: getHeight(20),
    },
    competedSetsTextStyle: {
      ...textStyles.bold16_brownishGrey100,
    },
    checkIconStyle: {
      tintColor: colors.brownishGrey100,
      position: 'absolute',
      alignSelf: 'center',
      margin: getWidth(4),
    },
    setsContainerStyle: {
      marginHorizontal: getWidth(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    extraTextStyle: {
      ...textStyles.semiBold14_black100,
      marginStart: getWidth(6),
    },
    extraContainerStyle: {
      flexDirection: 'row',
      marginTop: getHeight(16),
      marginBottom: getHeight(20),
      marginHorizontal: getWidth(20),
    },
    weightTouchStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    setsCompletedContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    repsContainerStyle: {
      flexDirection: 'row',
      flex: 1,
      marginStart: getWidth(10),
      justifyContent: 'space-evenly',
    },
    timerContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: colors.white90,
      justifyContent: 'center',
    },
    timerTextStyle: {
      ...textStyles.bold76_black100,
      alignSelf: 'center',
      lineHeight: getHeight(80),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onExerciseCompleted = () => {
    if (countDown) {
      reset();
      setCountDown(false);
    } else {
    }
  };
  const onWeightsPressed = () => {};
  const onNotesPressed = () => {};
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
            onPress={onWeightsPressed}>
            <Image source={weightIcon} />
            <Text style={styles.extraTextStyle}>{weightText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.weightTouchStyle,
              marginStart: getWidth(40),
            }}
            onPress={onNotesPressed}>
            <Image source={notesIcon} />
            <Text style={styles.extraTextStyle}>{notesText}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.setsContainerStyle}>
          <View style={styles.setsCompletedContainerStyle}>
            <Text style={styles.competedSetsTitleStyle}>2/5</Text>
            <Text style={styles.competedSetsTextStyle}>{setsText}</Text>
          </View>
          <RepsList reps={reps} />
        </View>

        {countDown && renderCountDown()}
      </View>
    </View>
  );
}
