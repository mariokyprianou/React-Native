/*
 * Created Date: Mon, 9th Nov 2020, 15:35:47 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import SliderProgressView from './SliderProgressView';
import {VideoView, TestData} from 'the-core-ui-module-tdmediamanager';
import ControlsView from './ControlsView';

let ScreenHeight = Dimensions.get('window').height;

export default function ({}) {
  const {getWidth, fontSize, getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const [videoDuration, setVideoDuration] = useState(100);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const videoRef = useRef();

  const styles = {
    container: {
      width: '100%',
    },
  };

  const videoProps = {
    height: getHeight(300),
    url: TestData[0],
    skipCache: true,
    autoplay: false,

    onLoadEnd: (duration) => {
      console.log('Total time:', duration);
      setVideoDuration(duration);
    },
    onError: (error) => console.log('Error loading video:', error),
    onProgress: (currentTime) => {
      console.log('Video playing at: ', currentTime);
      setCurrentProgress(currentTime);
    },
    onPaused: (paused) => {
      console.log('Paused:', paused);
      setIsPaused(paused);
    },
    onEnd: () => console.log('End'),

    customControls: <></>,
    renderToolbar: () => <View />,
  };

  const controls = () => (
    <ControlsView
      pauseOnPress={() => videoRef.current.pause()}
      isPaused={isPaused}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{height: getHeight(300)}}>
        <VideoView {...videoProps} ref={videoRef} />
        <SliderProgressView max={videoDuration} progress={currentProgress} />
        {controls()}
      </View>
    </View>
  );
}
