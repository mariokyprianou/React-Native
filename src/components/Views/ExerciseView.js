/*
 * Created Date: Wed, 11th Nov 2020, 17:08:56 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
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
import UseData from '../../hooks/data/UseData';
import displayAlert from '../../utils/DisplayAlert';
import {ScrollView} from 'react-native-gesture-handler';
import useCustomQuery from '../../hooks/customQuery/useCustomQuery';
import useWorkoutTimer from '../../hooks/timer/useWorkoutTimer';
// import SoundPlayer from 'react-native-sound-player';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-community/async-storage';

const completeIcon = require('../../../assets/icons/completeExercise.png');
const checkIcon = require('../../../assets/icons/check.png');
const weightIcon = require('../../../assets/icons/weight.png');
const notesIcon = require('../../../assets/icons/notes.png');

export default function ExerciseView(props) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {exercise, index, setEnableScroll, weightLabel, hasAudioCues} = props;
  const navigation = useNavigation();
  const {getHeight, getWidth} = ScaleHook();
  const {exerciseViewStyle, Constants} = useTheme();

  const styles = exerciseViewStyle;
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const {currentExerciseIndex} = UseData();

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
        console.log(
          'getWeightHistory Processed Res:',
          exercise.id,
          exercise.name,
          res,
        );

        if (res) {
          if (res && res.length > 0) {
            setWeightHistory(res);
          } else {
            setWeightHistory([]);
          }
        }
      },
    });
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
    let initSets = props.sets.slice().sort((a, b) => a.setNumber > b.setNumber);

    initSets = initSets.map((it, index) => {
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

    setSets(initSets);
  }, []);

  useEffect(() => {
    if (props.isContinuous && index === currentExerciseIndex) {
      setCountDown(true);
    }
  }, [currentExerciseIndex]);

  // Finished weight submition, check if it was last set
  useEffect(() => {
    if (!props.isContinuous && setComplete === false) {
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

  useEffect(() => {
    props.setShowPreviewOfNextVideo &&
      props.setShowPreviewOfNextVideo(showUpNextLabel);
  }, [showUpNextLabel]);

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  const onSetCompleted = (completedIndex) => {
    // Move to next Set
    if (completedIndex + 1 === sets.length) {
      setCurrentSet(sets.length);
    } else {
      setCurrentSet(currentSet + 1);
    }
    // Needed to determine of countdown is to be shown
    let selectedSetSecs, selectedSetRest;

    // Update Sets states
    const newSets = sets.map((it, index) => {
      if (index <= completedIndex) {
        if (index === completedIndex) {
          if (it.restTime && it.restTime > 0) {
            setRestTime(it.restTime * 1000);
            selectedSetRest = it.restTime * 1000;
          }

          if (it.quantity && it.quantity > 0 && props.setType !== 'REPS') {
            setExerciseTime(it.quantity * 1000);
            selectedSetSecs = it.quantity * 1000;
          }
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

    console.log('selectedSetSecs', selectedSetSecs);
    console.log('selectedSetRest', selectedSetRest);

    // Only if its Reps show weight first, timed sets need to show counddown first
    if (exercise.weight && selectedSetRest && props.setType === 'REPS') {
      setSetComplete(true);

      // also show rest timer behind weight input
      setCountDown(true);
    } else if (exercise.weight && selectedSetRest && props.setType !== 'REPS') {
      setCountDown(true);
    }
    // Show rest timer countdown
    else if (selectedSetSecs) {
      setCountDown(true);
    }
    // show weight input modal
    else if (!props.isContinuous && exercise.weight) {
      setSetComplete(true);
    }
    // Show rest timer countdown
    else if (selectedSetRest) {
      setCountDown(true);
    }

    // Handle no weight or rest time
    // If we dont have rest time or weight option just finish exercise set immediately
    if (
      completedIndex === sets.length - 1 &&
      (!selectedSetRest || selectedSetRest === 0) &&
      !exercise.weight
    ) {
      finishExercise();
    }
  };

  const checkShouldFinishExercise = useCallback(async () => {
    // On timer done, check if exercise is done
    if (props.isContinuous) {
      finishExercise();
      return;
    }

    if (currentSet === sets.length) {
      finishExercise();
    }
  }, [currentSet, props.isContinuous, sets.length]);

  /* DEPRECATED
  const onCancelTimer = () => {
    setCountDown(false);

    // Set with Reps already showed weight input, timed sets need to show weight after countdown
    if (exercise.weight && props.setType !== 'REPS') {
      setSetComplete(true);
      return;
    }

    checkShouldFinishExercise();
  };

  const onFinishTimer = () => {
    setCountDown(false);
    setShowUpNextLabel(false);
    checkShouldFinishExercise();
  };
  */

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
    if (!weightHistory || !exercise.name || !props.setType || !weightLabel) {
      return;
    }

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

  const exerciseAudioCue = useRef(null);
  const restAudioCue = useRef(null);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        if (exerciseAudioCue?.current) {
          exerciseAudioCue.current.stop();
          exerciseAudioCue.current.release();
          exerciseAudioCue.current = null;
        }

        if (restAudioCue?.current) {
          restAudioCue.current.stop();
          restAudioCue.current.release();
          restAudioCue.current = null;
        }
      }, 500);
    };
  }, [hasAudioCues]);

  return (
    <View style={{height: Constants.EXERCISE_VIEW_HEIGHT}}>
      <ExerciseVideoView
        {...exercise}
        index={index}
        setType={props.setType}
        isContinuous={props.isContinuous}
      />

      <View style={styles.contentStyle}>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.exerciseTitleStyle}>{exercise.name}</Text>
          <View>
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
        </View>

        <ScrollView>
          {exercise.coachingTips && (
            <Text style={styles.exerciseDescriptionStyle}>
              {exercise.coachingTips}
            </Text>
          )}
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

        {/* Exercise timer */}
        {React.useMemo(() => {
          if (countDown && exerciseTime > 0) {
            const done = () => {
              // Finished exercise time and have weight
              if (!props.isContinuous && exercise.weight) {
                setSetComplete(true);
              }

              setExerciseTime(0);

              // Exercise time is canceled without rest time, we finish exercise
              if (!restTime) {
                setCountDown(false);

                checkShouldFinishExercise();
              }
            };

            return (
              <SimpleTimerView
                audioRef={exerciseAudioCue}
                duration={exerciseTime}
                isExerciseTime={true}
                setType={props.setType}
                hasAudioCues={hasAudioCues}
                onCancel={() => {
                  // Continuous cannot be canceled
                  if (props.isContinuous) {
                    return;
                  }
                  done();
                }}
                onFinish={() => {
                  if (props.isContinuous) {
                    setShowUpNextLabel(false);
                  }
                  done();
                }}
              />
            );
          }
        }, [
          countDown,
          exerciseTime,
          props.setType,
          props.isContinuous,
          hasAudioCues,
          exercise.weight,
          restTime,
          checkShouldFinishExercise,
        ])}

        {/* Rest timer */}
        {React.useMemo(() => {
          if (
            countDown &&
            restTime > 0 &&
            (!exerciseTime || exerciseTime === 0)
          ) {
            if (props.isContinuous && !props.isLastExercise) {
              setShowUpNextLabel(true);
            }

            return (
              <SimpleTimerView
                audioRef={restAudioCue}
                duration={restTime}
                isExerciseTime={false}
                setType={props.setType}
                hasAudioCues={hasAudioCues}
                onCancel={() => {
                  // Continuous cannot be canceled
                  if (props.isContinuous) {
                    return;
                  }

                  // Rest time is canceled
                  setCountDown(false);
                  checkShouldFinishExercise();
                }}
                onFinish={() => {
                  if (props.isContinuous) {
                    setShowUpNextLabel(false);
                  }

                  setCountDown(false);
                  checkShouldFinishExercise();
                }}
              />
            );
          }
        }, [
          countDown,
          restTime,
          exerciseTime,
          props.isContinuous,
          props.isLastExercise,
          props.setType,
          hasAudioCues,
          checkShouldFinishExercise,
        ])}
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

function SimpleTimerView({
  audioRef,
  duration,
  isExerciseTime,
  setType,
  onCancel,
  onFinish,
  hasAudioCues = true,
}) {
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  const {exerciseViewStyle} = useTheme();

  const {getHeight, getWidth} = ScaleHook();
  const styles = exerciseViewStyle;

  const {remainingMS, toggle, reset, active} = useTimer({
    timer: msToHMS(duration),
  });

  const [timerRunning, setTimerRunning] = useState(false);
  const {isWorkoutTimerRunning} = useWorkoutTimer();

  useEffect(() => {
    if (hasAudioCues) {
      const resource =
        isExerciseTime === true ? 'end_exercise.mp3' : 'end_rest.mp3';

      // Load audio
      audioRef.current = new Sound(resource, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });
    }
  }, [audioRef, hasAudioCues, isExerciseTime]);

  useEffect(() => {
    if (!timerRunning) {
      console.log('useEffect: initialLoad reset timer');

      setTimerRunning(true);
      reset();
      toggle();
    }
  }, [timerRunning, reset, toggle]);

  // When timer is paused by user.
  useEffect(() => {
    if (!isWorkoutTimerRunning) {
      audioRef.current.pause();
    } else {
      if (
        !audioRef.current.isPlaying() &&
        hasAudioCues &&
        remainingMS <= 3000
      ) {
        // Move audio back a bit to sync with UI
        audioRef.current.getCurrentTime((secs) => {
          audioRef.current.setCurrentTime(secs - 0.5);
          audioRef.current.play();
        });
      }
    }

    if (
      (!active && isWorkoutTimerRunning) ||
      (active && !isWorkoutTimerRunning)
    ) {
      console.log('useEffect: toggle');

      toggle();
    }
  }, [
    active,
    hasAudioCues,
    isWorkoutTimerRunning,
    toggle,
    remainingMS,
    audioRef,
  ]);

  // Check remaining seconds
  useEffect(() => {
    if (hasAudioCues) {
      if (remainingMS === 3000) {
        audioRef.current.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
    }

    if (remainingMS === 0) {
      onFinish && onFinish();
    }
  }, [onFinish, remainingMS, isExerciseTime, hasAudioCues, audioRef]);

  const progress = duration - remainingMS;

  const renderTime = () => {
    const timeStamp = msToHMS(remainingMS).split('');

    return (
      <>
        {timeStamp.map((it) => {
          return (
            <Text
              style={{
                ...styles.timerTextStyle,
                width: isNaN(it) ? getWidth(22) : getWidth(45),
                lineHeight: isNaN(it) ? getHeight(95) : getHeight(100),
              }}>
              {it}
            </Text>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.timerContainer}>
      {setType !== 'REPS' && (
        <SliderProgressView
          max={duration}
          progress={progress}
          height={getHeight(5)}
        />
      )}

      <TouchableOpacity
        style={styles.timerTouchArea}
        onPress={() => {
          onCancel && onCancel();
        }}>
        <View style={styles.timerTextContainer}>
          <View style={{flexDirection: 'row'}}>{renderTime()}</View>
          {!isExerciseTime && (
            <Text style={styles.timerRestTextStyle}>{WorkoutDict.Rest}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
