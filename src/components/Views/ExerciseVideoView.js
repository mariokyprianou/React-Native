/*
 * Created Date: Mon, 9th Nov 2020, 15:35:47 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Animated, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import SliderProgressView from './SliderProgressView';
import {VideoView} from 'the-core-ui-module-tdmediamanager';
import ControlsView from './ControlsView';
import UseData from '../../hooks/data/UseData';
import crashlytics from '@react-native-firebase/crashlytics';
import useWorkoutTimer from '../../hooks/timer/useWorkoutTimer';

export default function ({
  video,
  videoEasy,
  videoEasiest,
  index,
  isContinuous,
  showUpNext,
  isPreview,
}) {
  const videos = {
    video,
    videoEasy,
    videoEasiest,
  };

  const {getHeight} = ScaleHook();
  const {colors, Constants} = useTheme();
  const {isDownloadEnabled, currentExerciseIndex} = UseData();

  const [videoDuration, setVideoDuration] = useState(100);
  const [currentProgress, setCurrentProgress] = useState(0);

  const [isPaused, setIsPaused] = useState(true);

  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(1));
  const [showControls, setShowControls] = useState(!isContinuous);

  const [currentVideo, setCurrentVideo] = useState('video');

  const {isWorkoutTimerRunning} = useWorkoutTimer();

  const videoRef = useRef();

  // For 16:9 it will be 1:1 square video view, for anything longer, will be 60% of the screen.
  const videoHeight =
    Constants.SCREEN_LAYOUT <= 16
      ? Dimensions.get('window').width
      : Constants.EXERCISE_VIEW_HEIGHT * 0.6;

  const styles = {
    container: {
      width: '100%',
      height: videoHeight,
    },
    containerPreview: {
      width: '100%',
      height: videoHeight,
      position: 'absolute',
    },
  };

  useEffect(() => {
    // Autoplay if its current exercise and there is remaining video
    if (
      index === currentExerciseIndex &&
      currentProgress < videoDuration &&
      isPaused
    ) {
      videoRef.current.pause();

      // Only call if any other than current is playing
    } else if (!isPaused && !isContinuous) {
      videoRef.current.pause();
    }
  }, [currentExerciseIndex, index]);

  // When timer is paused by user.
  useEffect(() => {
    if (isContinuous) {
      if (isWorkoutTimerRunning === false) {
        videoRef.current.pause();
        setIsPaused(true);
      } else if (isWorkoutTimerRunning === true && isPaused === true) {
        videoRef.current.pause();
        setIsPaused(false);
      }
    }
  }, [isWorkoutTimerRunning]);

  const videoProps = {
    height: videoHeight,
    url: videos[currentVideo],
    filename: videos[currentVideo].split('/').pop().split('?').shift(),
    skipCache: !isDownloadEnabled,
    autoplay: false,
    muted: true,
    repeat: true,
    playWhenInactive: true,

    onLoadEnd: (duration) => {
      setVideoDuration(duration);
    },

    onProgress: (currentTime) => {
      setCurrentProgress(currentTime);
    },

    onPaused: (paused) => {
      setIsPaused(paused);
    },

    onEnd: () => {
      setCurrentProgress(videoDuration);
    },

    onError: (error) => {
      console.log('Error loading video:', error);
      crashlytics().log(
        `Error loading video: ${videos[currentVideo]
          .split('/')
          .pop()
          .split('?')
          .shift()}, ${error}`,
      );
    },

    customControls: <></>,
    renderToolbar: () => <></>,
  };

  useEffect(() => {
    if (showControls) {
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
        setShowControls(false);
      }, 4000);
    }
  }, [showControls, fadeAnimation]);

  const controls = () => (
    <Animated.View
      style={{
        opacity: fadeAnimation,
        alignSelf: 'center',
        position: 'absolute',
        height: showControls ? '100%' : 0,
        width: showControls ? '100%' : 0,
        backgroundColor: colors.black20,
      }}
      useNativeDriver={true}>
      <ControlsView
        pauseOnPress={() => {
          videoRef.current.pause();
        }}
        isPaused={isPaused}
        videos={videos}
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
      />
    </Animated.View>
  );

  return (
    <View style={isPreview ? styles.containerPreview : styles.container}>
      <View style={{height: videoHeight}}>
        <VideoView {...videoProps} ref={videoRef} />

        {/* Controls not showing so render a touch view to allow showing them */}
        {!showControls && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            activeOpacity={1}
            onPress={() => {
              if (!isContinuous) {
                setShowControls(!showControls);
              }
            }}
          />
        )}
        {showControls && controls()}
        {showUpNext}
      </View>
    </View>
  );
}
