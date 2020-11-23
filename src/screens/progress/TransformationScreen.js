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
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import Slideshow from 'the-core-ui-module-tdslideshow';
import useDictionary from '../../hooks/localisation/useDictionary';
import SliderButton from '../../components/Buttons/SliderButton';
import CustomCountdown from '../../components/Buttons/CustomCountdown';
import CustomDateSelectors from '../../components/Buttons/CustomDateSelectors';
import Header from '../../components/Headers/Header';

const fakeBeforePic =
  'https://cdn.vox-cdn.com/thumbor/wyuKqIJeQwb745RJb5zsK2FCOaY=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19424316/EKo3U_qXkAEK1Fz.jpeg';
const fakeAfterPic =
  'https://media.wired.com/photos/5cdefb92b86e041493d389df/191:100/w_1280,c_limit/Culture-Grumpy-Cat-487386121.jpg';

const sliderThumb = require('../../../assets/icons/photoSlider.png');
const cameraButton = require('../../../assets/icons/cameraButton.png');
const overlay = require('../../../assets/images/cameraPerson.png');

export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const [beforePic, setBeforePic] = useState(fakeBeforePic);
  const [afterPic, setAfterPic] = useState(fakeAfterPic);
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
  const navigation = useNavigation();
  const {colors} = useTheme();

  const screenWidth = Dimensions.get('screen').width;

  navigation.setOptions({
    header: () => (
      <Header
        title={ProgressDict.TransformationScreenTitle}
        goBack
        right="shareIcon"
        rightAction={handleShare}
      />
    ),
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    sliderStyles: {
      height: getHeight(10),
      minimumTrackTintColor: 'transparent',
      maximumTrackTintColor: 'transparent',
    },
    image: {
      width: screenWidth,
      height: getHeight(440),
    },
    spacerHeight: {
      height: getHeight(170),
    },
    overlay: {
      height: getHeight(440),
      top: getHeight(-50),
      resizeMode: 'contain',
    },
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

  function handleShare() {}

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
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
        cameraButtonImage={cameraButton}
        cameraHeaderText={ProgressDict.Upload}
        overlayStyles={styles.overlay}
        sliderIcon={sliderThumb}
        overlayImage={overlay}
      />
    </View>
  );
}
