/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 14:35:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import Slideshow from 'the-core-ui-module-tdslideshow';
import SliderThumb from '../components/Buttons/SliderThumb';

const fakeBeforePic =
  'https://cdn.vox-cdn.com/thumbor/wyuKqIJeQwb745RJb5zsK2FCOaY=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19424316/EKo3U_qXkAEK1Fz.jpeg';
const fakeAfterPic =
  'https://media.wired.com/photos/5cdefb92b86e041493d389df/191:100/w_1280,c_limit/Culture-Grumpy-Cat-487386121.jpg';

export default function TestScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const screenWidth = Dimensions.get('screen').width;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    sliderStyles: {
      height: getHeight(10),
      minimumTrackTintColor: 'transparent',
      maximumTrackTintColor: 'transparent',
    },
    image: {
      width: screenWidth,
      height: getHeight(470),
    },
    spacerHeight: {
      height: getHeight(184),
    },
    button: {
      width: '90%',
      height: getHeight(50),
      marginTop: getHeight(20),
    },
    buttonText: {
      ...textStyles.bold15_white100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <Slideshow
        setPhoto={() => console.log('set photo')}
        beforePic={fakeBeforePic}
        afterPic={fakeAfterPic}
        imageWidth={styles.image.width}
        imageHeight={styles.image.height}
        sliderSpacerHeight={styles.spacerHeight}
        buttonStyles={styles.button}
        buttonTextStyles={styles.buttonText}
        sliderStyles={styles.sliderStyles}
        // sliderIcon={<SliderThumb />}
        // cameraHeaderText={}
        // overlayImage={}
        // overlayStyles={}
        // cameraButtonStyles={}
      />
    </View>
  );
}
