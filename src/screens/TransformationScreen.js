/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 14:35:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import Slideshow from 'the-core-ui-module-tdslideshow';
import DropDownPicker from 'react-native-dropdown-picker';
import SliderButton from '../components/Buttons/SliderButton';

const fakeBeforePic =
  'https://cdn.vox-cdn.com/thumbor/wyuKqIJeQwb745RJb5zsK2FCOaY=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19424316/EKo3U_qXkAEK1Fz.jpeg';
const fakeAfterPic =
  'https://media.wired.com/photos/5cdefb92b86e041493d389df/191:100/w_1280,c_limit/Culture-Grumpy-Cat-487386121.jpg';

const sliderThumb = require('../../assets/icons/transformation-slider.png');

const imageDates = [
  {
    label: '25/08/2020',
    value: '2020-08-25T09:18:44.579Z',
  },
  {
    label: '01/09/2020',
    value: '2020-09-01T09:18:44.579Z',
  },
  {
    label: '10/09/2020',
    value: '2020-09-10T09:18:44.579Z',
  },
];

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
    dropdown: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      position: 'absolute',
      top: getHeight(20),
      left: getWidth(20),
      zIndex: 9,
    },
    dropdownContainer: {
      height: getHeight(28),
      width: getWidth(112),
    },
    dropdownBox: {
      backgroundColor: colors.white80,
      borderTopLeftRadius: radius(18),
      borderTopRightRadius: radius(18),
      borderBottomLeftRadius: radius(18),
      borderBottomRightRadius: radius(18),
    },
    dropdownList: {
      backgroundColor: colors.white80,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePhoto() {
    console.log('set photo');
    // send to back end with today's date
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.dropdown}>
        <DropDownPicker
          items={imageDates}
          defaultValue={imageDates[0].value}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdownBox}
          dropDownStyle={styles.dropdownList}
          onChangeItem={(item) => console.log(item)}
        />
        <DropDownPicker
          items={imageDates}
          defaultValue={imageDates[0].value}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdownBox}
          dropDownStyle={styles.dropdownList}
          onChangeItem={(item) => console.log(item)}
        />
      </View>
      <Slideshow
        setPhoto={handlePhoto}
        beforePic={fakeBeforePic}
        afterPic={fakeAfterPic}
        imageWidth={styles.image.width}
        imageHeight={styles.image.height}
        sliderSpacerHeight={styles.spacerHeight}
        sliderStyles={styles.sliderStyles}
        CustomButton={SliderButton}
        // sliderIcon={{uri: sliderThumb}}
        // cameraHeaderText={}
        // overlayImage={}
        // overlayStyles={}
        // cameraButtonStyles={}
      />
    </View>
  );
}
