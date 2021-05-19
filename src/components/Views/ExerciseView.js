/*
 * Created Date: Wed, 11th Nov 2020, 17:08:56 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect, useCallback} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import RepCell from '../cells/RepCell';
import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import ExerciseVideoView from './ExerciseVideoView';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useTimer} from 'the-core-ui-module-tdcountdown';
import {msToHMS} from '../../utils/dateTimeUtils';
import SetCompletionScreen from '../../screens/workout/SetCompletionScreen';
import GetExerciseWeight from '../../apollo/queries/GetExerciseWeight';
import SliderProgressView from './SliderProgressView';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import UseData from '../../hooks/data/UseData';
import useUserData from '../../hooks/data/useUserData';
import displayAlert from '../../utils/DisplayAlert';
import {ScrollView} from 'react-native-gesture-handler';
import useCustomQuery from '../../hooks/customQuery/useCustomQuery';
import FadingBottomView from './FadingBottomView';

const completeIcon = require('../../../assets/icons/completeExercise.png');
const checkIcon = require('../../../assets/icons/check.png');
const weightIcon = require('../../../assets/icons/weight.png');
const notesIcon = require('../../../assets/icons/notes.png');

export default function ExerciseView(props) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {exercise, index, setEnableScroll, weightLabel} = props;
  const navigation = useNavigation();
  const {getHeight, getWidth} = ScaleHook();
  const {exerciseViewStyle, Constants} = useTheme();

  const styles = exerciseViewStyle;
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const {selectedWorkout, setSelectedWeight, currentExerciseIndex} = UseData();

  const {runQuery} = useCustomQuery();

  const [countDown, setCountDown] = useState(false);
  const [sets, setSets] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);

  // Rest time of the active set
  const [restTime, setRestTime] = useState();

  // Exercise time of the active set
  const [exerciseTime, setExerciseTime] = useState(null);

  const [setComplete, setSetComplete] = useState(null);

  const [weightHistory, setWeightHistory] = useState([]);

  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const [showUpNextLabel, setShowUpNextLabel] = useState(false);

  const getWeightHistory = useCallback(async () => {
    const res = await runQuery({
      query: GetExerciseWeight,
      key: 'getExerciseWeight',
      variables: {exercise: exercise.id},
      setValue: (res) => {
        if (res) {
          if (res && res && res.length > 0) {
            setWeightHistory(res);
          } else {
            setWeightHistory([]);
          }
        }
      },
    });

    console.log('getWeightHistory Processed Res:', res.success);
  }, [runQuery, exercise]);

  // To observe sets are behaving as expected
  useEffect(() => {
    if (index === currentExerciseIndex) {
      console.log(sets);
    }
  }, [sets]);

  // Initial render
  useEffect(() => {
    if (exercise.weight) {
      getWeightHistory();
    }
  }, []);

  // Mark current exercise as complete
  useEffect(() => {
    if (exerciseCompleted) {
      props.exerciseFinished && props.exerciseFinished();
    }
  }, [exerciseCompleted]);

  // Initialise sets, Sort and set states
  useEffect(() => {
    let sets = props.sets.slice().sort((a, b) => a.setNumber > b.setNumber);

    sets = sets.map((it, index) => {
      if (index === 0) {
        if (it.restTime && it.restTime > 0) {
          setRestTime(it.restTime * 1000);
        }

        if (it.quantity && it.quantity > 0 && props.setType !== 'REPS') {
          setExerciseTime(it.quantity * 1000);
        }

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

    if (props.isContinuous && index === currentExerciseIndex) {
      setCountDown(true);
    }

    setSets(sets);
  }, []);

  useEffect(() => {
    if (props.isContinuous && index === currentExerciseIndex) {
      setCountDown(true);
    }
  }, [currentExerciseIndex]);

  // Finished weight submition, check if it was last set
  useEffect(() => {
    if (setComplete === false) {
      checkShouldFinishExercise();
    }
  }, [setComplete]);

  // Enable/disable scroll based on any set completion modal showing
  useEffect(() => {
    if ((countDown && restTime > 0) || setComplete || props.isContinuous) {
      setEnableScroll(false);
    } else {
      setEnableScroll(true);
    }
  }, [countDown, restTime, setComplete]);

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
        return {
          ...it,
          state: 'completed',
        };
      } else if (index === completedIndex + 1) {
        if (it.restTime && it.restTime > 0) {
          setRestTime(it.restTime * 1000);
        }

        if (it.quantity && it.quantity > 0 && props.setType !== 'REPS') {
          setExerciseTime(it.quantity * 1000);
        }

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
      setSetComplete(true);
    }

    // Handle no weight or rest time
    // If we dont have rest time or weight option just finish exercise set immediately
    if (
      completedIndex === sets.length - 1 &&
      (!restTime || restTime === 0) &&
      !exercise.weight
    ) {
      finishExercise();
    }
  };

  async function checkShouldFinishExercise() {
    // On timer done, check if exercise is done
    if (props.isContinuous) {
      finishExercise();
      return;
    }

    if (currentSet === sets.length) {
      finishExercise();
    }
  }

  const onCancelTimer = () => {
    setCountDown(false);
    checkShouldFinishExercise();
  };

  const onFinishTimer = () => {
    setCountDown(false);
    setShowUpNextLabel(false);
    checkShouldFinishExercise();
  };

  const onExerciseCompleted = () => {
    setCurrentSet(sets.length);

    // Update all Sets states as completed
    const newSets = sets.map((it) => {
      return {
        ...it,
        state: 'completed',
      };
    });

    setSets(newSets);

    finishExercise();
  };

  async function finishExercise() {
    setExerciseCompleted(true);
  }

  const handleSelectWeights = () => {
    if (!weightHistory || !exercise.name || !props.setType || !weightLabel)
      return;

    if (weightHistory.length > 0) {
      navigation.navigate('WeightCapture', {
        exerciseName: exercise.name,
        weightHistory: weightHistory,
        weightPreference: weightLabel,
        setType: props.setType,
      });
    } else {
      displayAlert({text: WorkoutDict.WorkoutNoWeightsWarning});
    }
  };

  // ** ** ** ** ** RENDER ** ** ** ** **

  const RepsList = ({sets}) => {
    return (
      <View style={styles.repsContainerStyle}>
        {sets.map((item, index) => {
          return (
            <View style={{marginStart: getWidth(14)}}>
              <RepCell
                key={index}
                {...item}
                setType={props.setType}
                onPress={() => onSetCompleted(index)}
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{height: Constants.EXERCISE_VIEW_HEIGHT}}>
      <ExerciseVideoView
        {...exercise}
        index={index}
        setType={props.setType}
        isContinuous={props.isContinuous}
        showUpNext={
          showUpNextLabel && (
            <>
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                }}>
                <FadingBottomView color="black" height={100} />
              </View>
              <Text style={styles.timerUpNextTextStyle}>
                {WorkoutDict.UpNext}
              </Text>
            </>
          )
        }
      />

      <View style={styles.contentStyle}>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.exerciseTitleStyle}>{exercise.name}</Text>
          <TouchableOpacity
            activeOpacity={exerciseCompleted ? 1.0 : 0.1}
            onPress={
              exerciseCompleted || countDown ? null : onExerciseCompleted
            }>
            <Image
              source={completeIcon}
              style={{opacity: exerciseCompleted ? 0.4 : 1.0}}
            />
            <Image
              style={{
                ...styles.checkIconStyle,
                opacity: exerciseCompleted ? 0.4 : 1.0,
              }}
              source={checkIcon}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Text style={styles.exerciseDescriptionStyle}>
            {exercise.coachingTips}
          </Text>
        </ScrollView>

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
            exerciseTime={exerciseTime}
            restTime={restTime}
            onCancelTimer={onCancelTimer}
            onFinish={onFinishTimer}
            onStartRest={() => {
              console.log('starting rest');
              if (props.isContinuous && !props.isLastExercise) {
                setShowUpNextLabel(true);
              }
            }}
            setType={props.setType}
            isContinuous={props.isContinuous}
          />
        )}
      </View>
      {setComplete && (
        <SetCompletionScreen
          restTime={restTime && restTime > 0 ? msToHMS(restTime) : 0}
          setSetComplete={setSetComplete}
          currentSet={sets[currentSet - 1]}
          exerciseHistory={weightHistory}
          setWeightHistory={setWeightHistory}
          exercise={exercise.id}
          setType={props.setType}
          weightPreference={weightLabel}
        />
      )}
    </View>
  );
}

function TimerView(props) {
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  let durationMS = props.exerciseTime ? props.exerciseTime : props.restTime;
  let durationFormatted = msToHMS(durationMS);
  const [shouldRestAfterExercise, setShouldRestAfterExercise] = useState(
    props.exerciseTime !== null,
  );

  const {remainingMS, toggle, reset, restart} = useTimer({
    timer: durationFormatted,
  });

  useEffect(() => {
    reset();
    toggle();
  }, []);

  useEffect(() => {
    if (remainingMS === 0) {
      if (shouldRestAfterExercise === true) {
        durationMS = props.restTime;
        durationFormatted = msToHMS(durationMS);
        restart(durationMS);
        setShouldRestAfterExercise(false);
        props.onStartRest && props.onStartRest();
      } else {
        props.onFinish && props.onFinish();
      }
    }
  }, [remainingMS, shouldRestAfterExercise]);

  const {exerciseViewStyle} = useTheme();
  const {getHeight} = ScaleHook();
  const styles = exerciseViewStyle;
  const progress = durationMS - remainingMS;

  return (
    <View style={styles.timerContainer}>
      {props.setType !== 'REPS' && (
        <SliderProgressView
          max={durationMS}
          progress={progress}
          height={getHeight(5)}
        />
      )}

      <TouchableOpacity
        style={styles.timerTouchArea}
        onPress={() => {
          if (!props.isContinuous) {
            props.onCancelTimer();
          }
        }}>
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerTextStyle}>{msToHMS(remainingMS)}</Text>
          {!shouldRestAfterExercise && (
            <Text style={styles.timerRestTextStyle}>{WorkoutDict.Rest}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
