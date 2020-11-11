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
import IconTextView from '../Infographics/IconTextView';
import SliderProgressView from './SliderProgressView';
import {VideoView, TestData} from 'the-core-ui-module-tdmediamanager';

const playIcon = require('../../../assets/icons/play.png');
let ScreenHeight = Dimensions.get('window').height;

export default function ({}) {
  const {getWidth, fontSize, getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const [videoDuration, setVideoDuration] = useState(100);
  const [currentProgress, setCurrentProgress] = useState(0);

  const videoRef = useRef();

  const styles = {
    container: {
      width: '100%',
      //height: getHeight(ScreenHeight),
    },
    imageStyle: {
      width: '100%',
      height: '100%',
    },
    contentStyle: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      marginBottom: getHeight(15),
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
    onPaused: (paused) => console.log('Paused:', paused),
    onEnd: () => console.log('End'),

    customControls: <></>,
    renderToolbar: () => <View />,
  };

  return (
    <View style={styles.container}>
      <View style={{height: getHeight(300)}}>
        <VideoView {...videoProps} ref={videoRef} />

        <SliderProgressView max={videoDuration} progress={currentProgress} />
        <TouchableOpacity
          onPress={() => {
            videoRef.current.pause();
          }}
          style={{
            alignSelf: 'center',
            position: 'absolute',
            top: getHeight(ScreenHeight / 6),
          }}>
          <Image source={playIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentStyle} />
    </View>
  );
}
