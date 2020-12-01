/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 14:35:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {View, Dimensions, Platform, Alert} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import {TDSlideshow} from 'the-core-ui-module-tdslideshow';
import useDictionary from '../../hooks/localisation/useDictionary';
import CustomDateSelectors from '../../components/Buttons/CustomDateSelectors';
import Header from '../../components/Headers/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';
import fakeProgressData from '../../hooks/data/FakeProgressData'; // to delete
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const fakeBeforePic = require('../../../assets/fakeBefore.png');
const fakeAfterPic = require('../../../assets/fakeAfter.png');
const sliderThumb = require('../../../assets/icons/photoSlider.png');

export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const [beforePic, setBeforePic] = useState(fakeBeforePic);
  const [afterPic, setAfterPic] = useState(fakeAfterPic);
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
  const navigation = useNavigation();
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
  const {fakeProgressImages} = fakeProgressData();
  const screenWidth = Dimensions.get('screen').width;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      height: '100%',
      width: '100%',
    },
    sliderStyles: {
      height: getHeight(10),
      width: '92%',
      minimumTrackTintColor: 'transparent',
      maximumTrackTintColor: 'transparent',
    },
    image: {
      width: screenWidth,
      height: getHeight(440),
    },
    spacerHeight: {
      height: getHeight(190),
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleSelectDate(dateItem, imageToSelect) {
    console.log(dateItem);
    // retrieve ProgressImage from back end using date
    // if imageToSelect === 'before' setBeforePic(dateItem.imageURL)
    // if imageToSelect === 'after' setAfterPic(dateItem.imageURL)
  }

  function handleNavigateAddPhoto() {
    request(
      Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      }),
    )
      .then((result) => {
        if (result === RESULTS.UNAVAILABLE) {
          Alert.alert('This function is not available on this device');
        }
        if (result === RESULTS.BLOCKED) {
          Alert.alert('Unable to access camera');
        }
        if (result === RESULTS.GRANTED) {
          navigation.navigate('AddPhoto');
        }
      })
      .catch((err) => console.log(err));
  }

  function handleShare() {}

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <TDSlideshow
        beforePic={beforePic}
        afterPic={afterPic}
        imageWidth={styles.image.width}
        imageHeight={styles.image.height}
        sliderSpacerHeight={styles.spacerHeight}
        sliderStyles={styles.sliderStyles}
        minimumTrackTintColor={styles.sliderStyles.minimumTrackTintColor}
        maximumTrackTintColor={styles.sliderStyles.maximumTrackTintColor}
        sliderSpacerHeight={styles.spacerHeight}
        sliderIcon={sliderThumb}
        DateSelectors={() => (
          <CustomDateSelectors
            onPress={handleSelectDate}
            images={fakeProgressImages}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="addPhoto"
          variant="gradient"
          icon="chevron"
          onPress={handleNavigateAddPhoto}
        />
      </View>
    </View>
  );
}
