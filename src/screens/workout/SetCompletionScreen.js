/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 14:26:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import WeightSelection from '../../components/Infographics/WeightSelection';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {useTimer} from 'the-core-ui-module-tdcountdown';
import {msToHMS} from '../../utils/dateTimeUtils';
import {useMutation} from '@apollo/client';
import AddExerciseWeight from '../../apollo/mutations/AddExerciseWeight';

export default function SetCompletionScreen({
  restTime,
  setSetComplete,
  setReps,
  setNumber,
  exercise,
  lastWeight,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const [addWeight] = useMutation(AddExerciseWeight);
  const [selectedWeight, setSelectedWeight] = useState('0kg');

  const formattedSeconds = new Date(restTime * 1000)
    .toISOString()
    .substr(11, 8);
  const {remaining, remainingMS, toggle, active, reset} = useTimer({
    timer: formattedSeconds,
  });

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
    touch: {
      flex: 1,
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
    timerText: {
      textAlign: 'center',
      ...textStyles.bold34_black100,
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
    const formattedWeight = Number(selectedWeight.slice(0, -2));

    await addWeight({
      variables: {
        input: {
          weight: formattedWeight,
          reps: setReps,
          setNumber: setNumber,
          exerciseId: exercise,
        },
      },
    })
      .then((res) => {
        setSetComplete(false);
      })
      .catch((err) => console.log(err, '<---error on adding weight'));
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => setSetComplete(false)}>
        <View style={styles.contentContainer}>
          {restTime > 0 ? (
            <>
              <Text style={styles.title}>{WorkoutDict.GreatJob}</Text>
              <Text style={styles.timerText}>{msToHMS(remainingMS)}</Text>
            </>
          ) : (
            <Text style={styles.title}>{WorkoutDict.GreatJobNoRest}</Text>
          )}
          <Text style={styles.text}>{WorkoutDict.WhichWeight}</Text>
          <View style={styles.weightSelectionContainer}>
            <WeightSelection
              setSelectedWeight={setSelectedWeight}
              lastWeight={lastWeight}
            />
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
      </TouchableOpacity>
    </View>
  );
}
