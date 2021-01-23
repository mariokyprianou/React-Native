/*
 * Created Date: Mon, 9th Nov 2020, 15:35:47 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import SliderProgressView from './SliderProgressView';
import {VideoView} from 'the-core-ui-module-tdmediamanager';
import ControlsView from './ControlsView';

export default function ({video, videoEasy, videoEasiest}) {
  const videos = {
    video,
    videoEasy,
    videoEasiest,
  };

  const {getHeight} = ScaleHook();
  const {colors} = useTheme();

  const [videoDuration, setVideoDuration] = useState(100);
  const [currentProgress, setCurrentProgress] = useState(0);

  const [isPaused, setIsPaused] = useState(true);

  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(1));
  const [showControls, setShowControls] = useState(false);

  const [currentVideo, setCurrentVideo] = useState('video');

  const videoRef = useRef();

  useEffect(() => {}, []);
  const styles = {
    container: {
      width: '100%',
    },
  };

  const videoProps = {
    height: getHeight(300),
    url: videos[currentVideo],
    skipCache: true,
    autoplay: false,
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
      }}>
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
      <View style={{height: getHeight(300)}}>
        <VideoView {...videoProps} ref={videoRef} />
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
