/*
 * Created Date: Thu, 12th Nov 2020, 11:59:43 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

/*
 * Created Date: Mon, 9th Nov 2020, 15:35:47 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';

const playIcon = require('../../../assets/icons/play.png');
const pauseIcon = require('../../../assets/icons/pauseIcon.png');
const easierIcon = require('../../../assets/icons/easierVideo.png');
const harderIcon = require('../../../assets/icons/videoHarder.png');

let ScreenHeight = Dimensions.get('window').height;

export default function ({
  // easierOnPress,
  // harderOnPress,
  pauseOnPress,
  isPaused,
  videos,
  currentVideo,
  setCurrentVideo,
}) {
  const {getWidth, fontSize, getHeight, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const [harderAvailable, setHarderAvailable] = useState(true);

  const [easierAvailable, setEasierAvailable] = useState(true);

  useEffect(() => {
    setHarderAvailable(
      (currentVideo === 'videoEasiest' && videos.videoEasy) ||
        (currentVideo === 'videoEasy' && videos.video),
    );
    setEasierAvailable(
      (currentVideo === 'video' && videos.videoEasy) ||
        (currentVideo === 'videoEasy' && videos.videoEasiest),
    );
  }, [currentVideo]);

  const styles = {
    controlsContainerStyle: {
      alignItems: 'center',
      top: getHeight(ScreenHeight / 6),
      flexDirection: 'row',
      alignSelf: 'center',
      position: 'absolute',
    },
    controlTextStyle: {
      ...textStyles.bold16_white100,
    },
    easierTouchableStyle: {
      flexDirection: 'row',
      marginRight: getWidth(25),
      alignItems: 'center',
      opacity: easierAvailable ? 1 : 0.4,
    },
    harderTouchableStyle: {
      flexDirection: 'row',
      marginLeft: getWidth(25),
      alignItems: 'center',
      opacity: harderAvailable ? 1 : 0.4,
    },
    intensityIconStyle: {
      margin: getWidth(10),
    },
  };

  function easierOnPress() {
    if (currentVideo === 'video' && videos.videoEasy) {
      setCurrentVideo('videoEasy');
    } else if (currentVideo === 'videoEasy' && videos.videoEasiest) {
      setCurrentVideo('videoEasiest');
    }
  }

  function harderOnPress() {
    if (currentVideo === 'videoEasiest' && videos.videoEasy) {
      setCurrentVideo('videoEasy');
    } else if (currentVideo === 'videoEasy' && videos.video) {
      setCurrentVideo('video');
    }
  }

  return (
    <View style={styles.controlsContainerStyle}>
      <TouchableOpacity
        onPress={easierOnPress}
        disabled={!easierAvailable}
        style={styles.easierTouchableStyle}>
        <Image style={styles.intensityIconStyle} source={easierIcon} />
        <Text style={styles.controlTextStyle}>
          {WorkoutDict.EasierSwitchText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: getWidth(30)}}
        onPress={() => {
          pauseOnPress();
        }}>
        <Image source={isPaused ? playIcon : pauseIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={harderOnPress}
        disabled={!harderAvailable}
        style={styles.harderTouchableStyle}>
        <Text style={styles.controlTextStyle}>
          {WorkoutDict.HarderSwitchText}
        </Text>
        <Image style={styles.intensityIconStyle} source={harderIcon} />
      </TouchableOpacity>
    </View>
  );
}
