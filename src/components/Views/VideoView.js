/*
 * Created Date: Mon, 9th Nov 2020, 15:35:47 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import IconTextView from '../Infographics/IconTextView';
import SliderProgressView from '../Views/SliderProgressView';
import {
  FileManager,
  VideoView,
  TestData,
} from 'the-core-ui-module-tdmediamanager';

const fakeImage = require('../../../assets/images/fake.png');

const playIcon = require('../../../assets/icons/play.png');
let ScreenHeight = Dimensions.get('window').height;

export default function ({}) {
  const {getWidth, fontSize, getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const styles = {
    container: {
      width: '100%',
      height: getHeight(ScreenHeight),
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
    startInFullScreen: false,
    volume: 10,
    controlsColor: '#932',
    onLoadStart: () => console.log('Start loading video'),
    onLoadEnd: () => console.log('Finished loading video'),
    onError: (error) => console.log('Error loading video:', error),
    onProgress: (currentTime) => console.log('Video playing at: ', currentTime),
    onReplay: () => console.log('Replay video'),
    onPaused: () => console.log('Play/Pause'),
    onEnd: () => console.log('End'),
    onFullScreen: () => console.log('Fullscreen changed'),

    customControls: <></>,
    renderToolbar: () => <View />,
  };

  return (
    <View style={styles.container}>
      <View style={{height: getHeight(300)}}>
        <VideoView {...videoProps} />

        <SliderProgressView />
        <TouchableOpacity
          onPress={() => {}}
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
