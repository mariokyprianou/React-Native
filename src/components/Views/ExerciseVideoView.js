/*
 * Created Date: Mon, 9th Nov 2020, 15:35:47 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import SliderProgressView from './SliderProgressView';
import {VideoView} from 'the-core-ui-module-tdmediamanager';
import ControlsView from './ControlsView';
import UseData from '../../hooks/data/UseData';

export default function ({video, videoEasy, videoEasiest, index}) {
  const videos = {
    video,
    videoEasy,
    videoEasiest,
  };

  const {getHeight} = ScaleHook();
  const {colors} = useTheme();
  const {isDownloadEnabled, currentExerciseIndex} = UseData();

  const [videoDuration, setVideoDuration] = useState(100);
  const [currentProgress, setCurrentProgress] = useState(0);

  const [isPaused, setIsPaused] = useState(true);

  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(1));
  const [showControls, setShowControls] = useState(true);

  const [currentVideo, setCurrentVideo] = useState('video');

  const videoRef = useRef();

  const styles = {
    container: {
      width: '100%',
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
    } else if (!isPaused) {
      videoRef.current.pause();
    }
  }, [currentExerciseIndex, index]);

  const videoProps = {
    height: getHeight(385),
    url: videos[currentVideo],
    skipCache: !isDownloadEnabled,
    autoplay: false, //index === currentExerciseIndex,
    muted: true,

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

    onError: (error) => console.log('Error loading video:', error),

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
        backgroundColor: colors.black10,
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
    <View style={styles.container}>
      <View style={{height: getHeight(385)}}>
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
              setShowControls(!showControls);
            }}
          />
        )}
        <SliderProgressView
          max={videoDuration}
          progress={currentProgress}
          height={getHeight(5)}
        />
        {controls()}
      </View>
    </View>
  );
}
