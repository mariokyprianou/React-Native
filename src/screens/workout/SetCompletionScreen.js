/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 14:26:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {useTimer} from 'the-core-ui-module-tdcountdown';
import {msToHMS} from '../../utils/dateTimeUtils';
import {useMutation} from '@apollo/client';
import AddExerciseWeight from '../../apollo/mutations/AddExerciseWeight';
import UseData from '../../hooks/data/UseData';
import NumbersWheel from '../../components/Infographics/NumbersWheel';

export default function SetCompletionScreen({
  restTime,
  setSetComplete,
  finishWorkout,
  setReps,
  setNumber,
  exercise,
  weightPreference,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const [addWeight] = useMutation(AddExerciseWeight);
  const {selectedWeight} = UseData();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    card: {
      height: restTime === 0 ? getHeight(302) : getHeight(349),
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
      borderTopLeftRadius: radius(15),
      borderTopRightRadius: radius(15),
      paddingTop: getHeight(23),
      position: 'absolute',
      bottom: 0,
    },
    contentContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    title: {
      ...textStyles.bold22_black100,
      textAlign: 'center',
      marginBottom: restTime === 0 ? 0 : getHeight(20),
    },
    text: {
      ...textStyles.regular15_brownishGrey100,
      marginTop: getHeight(22),
    },
    weightSelectionContainer: {
      marginTop: getHeight(10),
      height: getHeight(69),
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: getHeight(30),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handleAddWeight() {
    let weightToUpload = Number(selectedWeight);

    if (weightPreference === 'lb') {
      weightToUpload = Math.round(weightToUpload / 2.20462262185);
    }

    await addWeight({
      variables: {
        input: {
          weight: weightToUpload,
          reps: setReps,
          setNumber: setNumber,
          exerciseId: exercise,
        },
      },
    })
      .then((res) => {
        setSetComplete(false);
        finishWorkout();
      })
      .catch((err) => console.log(err, '<---error on adding weight'));
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => setSetComplete(false)}>
          {restTime ? (
            <TimerView
              title={WorkoutDict.GreatJob}
              restTime={restTime}
              setSetComplete={setSetComplete}
            />
          ) : (
            <Text style={styles.title}>{WorkoutDict.GreatJobNoRest}</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.text}>{WorkoutDict.WhichWeight}</Text>
        <View style={styles.weightSelectionContainer}>
          <NumbersWheel weightPreference={weightPreference} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="addWeight"
          variant="gradient"
          icon="chevron"
          onPress={handleAddWeight}
        />
      </View>
    </View>
  );
}

function TimerView(props) {
  const {textStyles} = useTheme();
  const {getHeight} = ScaleHook();

  const {remaining, remainingMS, toggle, active, reset} = useTimer({
    timer: props.restTime,
  });

  const styles = {
    title: {
      ...textStyles.bold22_black100,
      textAlign: 'center',
      marginBottom: props.restTime === 0 ? 0 : getHeight(20),
    },
    timerText: {
      textAlign: 'center',
      ...textStyles.bold34_black100,
    },
  };

  useEffect(() => {
    reset();
    toggle();
  }, []);

  useEffect(() => {
    if (remainingMS === 0) {
      setTimeout(() => {
        props.setSetComplete(false);
      }, 1000);
    }
  }, [remainingMS]);

  return (
    <>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.timerText}>{msToHMS(remainingMS)}</Text>
    </>
  );
}
