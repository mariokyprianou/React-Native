/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 14:35:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import Slideshow from 'the-core-ui-module-tdslideshow';
import DropDownPicker from 'react-native-dropdown-picker';
import useTransformation from '../hooks/data/useTransformation';
import SliderButton from '../components/Buttons/SliderButton';
import CustomCountdown from '../components/Buttons/CustomCountdown';
import CustomDateSelectors from '../components/Buttons/CustomDateSelectors';

const fakeBeforePic =
  'https://cdn.vox-cdn.com/thumbor/wyuKqIJeQwb745RJb5zsK2FCOaY=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19424316/EKo3U_qXkAEK1Fz.jpeg';
const fakeAfterPic =
  'https://media.wired.com/photos/5cdefb92b86e041493d389df/191:100/w_1280,c_limit/Culture-Grumpy-Cat-487386121.jpg';

const sliderThumb = require('../../assets/icons/transformation-slider.png');

export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors} = useTheme();
  const {transformationImages} = useTransformation();
  const [beforePic, setBeforePic] = useState(fakeBeforePic);
  const [afterPic, setAfterPic] = useState(fakeAfterPic);

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
    // dropdown: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   width: '90%',
    //   position: 'absolute',
    //   top: getHeight(20),
    //   left: getWidth(20),
    //   zIndex: 9,
    // },
    // dropdownContainer: {
    //   height: getHeight(30),
    //   width: getWidth(125),
    // },
    // dropdownBox: {
    //   backgroundColor: colors.white80,
    //   borderTopLeftRadius: radius(18),
    //   borderTopRightRadius: radius(18),
    //   borderBottomLeftRadius: radius(18),
    //   borderBottomRightRadius: radius(18),
    // },
    // dropdownList: {
    //   backgroundColor: colors.white80,
    // },
    // dropdownArrow: {
    //   position: 'absolute',
    //   top: 0,
    //   right: 0,
    // },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePhoto() {
    console.log('set photo');
    // send to back end with today's date, format ProgressImage
  }

  function handleSelectDate(dateItem, imageToSelect) {
    console.log(dateItem);
    // retrieve ProgressImage from back end using date
    // if imageToSelect === 'before' setBeforePic(dateItem.imageURL)
    // if imageToSelect === 'after' setAfterPic(dateItem.imageURL)
  }

  function handleCountdownStart() {
    console.log('counting down');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      {/* <View style={styles.dropdown}>
        <DropDownPicker
          items={transformationImages}
          defaultValue={transformationImages[0].value}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdownBox}
          dropDownStyle={styles.dropdownList}
          onChangeItem={(item) => handleSelectDate(item, 'before')}
          arrowStyle={styles.dropdownArrow}
        />
        <DropDownPicker
          items={transformationImages}
          defaultValue={transformationImages[0].value}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdownBox}
          dropDownStyle={styles.dropdownList}
          onChangeItem={(item) => handleSelectDate(item, 'after')}
          arrowStyle={styles.dropdownArrow}
        />
      </View> */}
      <Slideshow
        setPhoto={handlePhoto}
        beforePic={beforePic}
        afterPic={afterPic}
        imageWidth={styles.image.width}
        imageHeight={styles.image.height}
        sliderSpacerHeight={styles.spacerHeight}
        sliderStyles={styles.sliderStyles}
        CustomButton={SliderButton}
        CustomCountdown={() => (
          <CustomCountdown onPress={handleCountdownStart} />
        )}
        DateSelectors={() => <CustomDateSelectors onPress={handleSelectDate} />}
        // sliderIcon={{uri: sliderThumb}}
        // cameraHeaderText={}
        // overlayImage={}
        // overlayStyles={}
        // cameraButtonStyles={}
      />
    </View>
  );
}
