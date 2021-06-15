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
// import AddExerciseWeight from '../../apollo/mutations/AddExerciseWeight';
import UseData from '../../hooks/data/UseData';
import HorizontalScrollPicker from '../../components/Infographics/HorizontalScrollPicker';
import useWorkoutTimer from '../../hooks/timer/useWorkoutTimer';

export default function SetCompletionScreen({
  restTime,
  setSetComplete,
  currentSet,
  exerciseHistory,
  setWeightHistory,
  exercise,
  setType,
  weightPreference,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  // const [addWeight] = useMutation(AddExerciseWeight);
  const {
    selectedWeight,
    weightsToUpload,
    setWeightsToUpload,
    setSelectedWeight,
  } = UseData();

  // Selected value passed to horizontal scroll to preselect
  const [preSelected, setPreSelected] = useState(20);
  const [timerFinished, setTimerFinished] = useState(false);
  const [weightAdded, setWeightAdded] = useState(false);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    containerStyle: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.brownishGrey60,
    },
    offModalTouchableStyle: {flex: 1},
    card: {
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
      marginBottom: restTime ? 0 : getHeight(20),
    },
    text: {
      ...textStyles.regular15_brownishGrey100,
    },
    weightSelectionContainer: {
      marginTop: getHeight(10),
      height: getHeight(69),
      width: '100%',
      justifyContent: 'center',
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
      marginVertical: getHeight(30),
    },
  });

  useEffect(() => {
    if (exerciseHistory && exerciseHistory.length > 0) {
      let lastWeight = exerciseHistory[exerciseHistory.length - 1].weight;
      console.log('Last weight in KG ', lastWeight);

      if (weightPreference && weightPreference === 'lb') {
        lastWeight = Math.round(lastWeight * 2.20462262185);
      }

      setPreSelected(lastWeight);
    }
  }, [exerciseHistory]);

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handleAddWeight() {
    let weightToAdd = selectedWeight || 20;
    console.log('handleAddWeight', weightToAdd);

    if (weightPreference && weightPreference === 'lb') {
      weightToAdd = Math.round(weightToAdd / 2.20462262185);
    }

    let weightDetails = {
      exerciseId: exercise,
      weight: weightToAdd,
      setNumber: currentSet.setNumber,
      setType: setType,
      quantity: currentSet.quantity,
      completedAt: new Date(),
    };

    setWeightsToUpload([...weightsToUpload, weightDetails]);

    // Add to history so it sshows on the graph
    weightDetails = {
      ...weightDetails,
      createdAt: new Date().toISOString(),
    };

    setWeightHistory([...exerciseHistory, weightDetails]);

    setWeightAdded(true);
    if (!restTime || timerFinished === true) {
      setSetComplete(false);
    }
  }

  console.log('WEIGHT ADDED: ', weightAdded);

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        style={styles.offModalTouchableStyle}
        onPress={() => setSetComplete(false)}
      />

      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <View>
            {restTime ? (
              <TimerView
                title={WorkoutDict.GreatJob}
                restTime={restTime}
                setSetComplete={setSetComplete}
                onFinish={() => {
                  setTimerFinished(true);
                  if (weightAdded === true) {
                    setSetComplete(false);
                  }
                }}
              />
            ) : (
              <Text style={styles.title}>{WorkoutDict.GreatJobNoRest}</Text>
            )}
          </View>
          <Text style={styles.text}>{WorkoutDict.WhichWeight}</Text>

          <View style={styles.weightSelectionContainer}>
            <HorizontalScrollPicker
              weightPreference={weightPreference}
              selected={preSelected}
              weightAdded={weightAdded}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="addWeight"
            variant="gradient"
            icon="chevron"
            disabled={weightAdded}
            onPress={handleAddWeight}
          />
        </View>
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

  const {isWorkoutTimerRunning} = useWorkoutTimer();

  const styles = {
    title: {
      ...textStyles.bold22_black100,
      textAlign: 'center',
      marginBottom: props.restTime === 0 ? 0 : getHeight(20),
    },
    timerText: {
      textAlign: 'center',
      ...textStyles.bold34_black100,
      marginBottom: getHeight(22),
    },
  };

  useEffect(() => {
    reset();
    toggle();
  }, []);

  // When timer is paused by user.
  useEffect(() => {
    toggle();
  }, [isWorkoutTimerRunning]);

  useEffect(() => {
    if (remainingMS === 0) {
      setTimeout(() => {
        props.onFinish && props.onFinish();
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
