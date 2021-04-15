/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 14:35:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Dimensions, Platform, Alert} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {TDSlideshow} from 'the-core-ui-module-tdslideshow';
import useDictionary from '../../hooks/localisation/useDictionary';
import CustomDateSelectors from '../../components/Buttons/CustomDateSelectors';
import Header from '../../components/Headers/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useLazyQuery, useApolloClient} from '@apollo/client';
import ProgressImage from '../../apollo/queries/ProgressImage';
import UseData from '../../hooks/data/UseData';
import useLoading from '../../hooks/loading/useLoading';
import useProgressData from '../../hooks/data/useProgressData';

const sliderThumb = require('../../../assets/icons/photoSlider.png');
const overlay = require('../../../assets/images/progressZero.png');

export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const client = useApolloClient();
  const {colors} = useTheme();
  const {userImages, setUserImages, getImages, beforePic, setBeforePic, afterPic, setAfterPic, getImageUrl, imageUrls} = useProgressData();
  const screenWidth = Dimensions.get('screen').width;
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
  const {setLoading} = useLoading();
  const navigation = useNavigation();
 

  useEffect(()=> {
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
    return () => {
      // setUserImages([]);
      // getImages();
    }
  }, []);

  

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      height: '100%',
      width: '100%',
      // backgroundColor: colors.backgroundWhite100,
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
      position: 'absolute',
      bottom: 40,
      
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handleSelectDate(dateItem, imageToSelect) {
    if (!dateItem.id) return;
    setLoading(true);


    // Check if we already have tthe url for this image
    const existingImage = imageUrls.find((it) => it.id === dateItem.id); 

    let url = null;
    if (existingImage) {
      url = existingImage.url;
    }
    else {
        url = await getImageUrl(dateItem);
    }

    if (imageToSelect === 'before') {
      setBeforePic(url);
    } else if (imageToSelect === 'after') {
      setAfterPic(url);
    }
    setLoading(false);
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
          Alert.alert(ProgressDict.FunctionNotAvailable);
        }
        if (result === RESULTS.BLOCKED) {
          Alert.alert(ProgressDict.NoCamera);
        }
        if (result === RESULTS.GRANTED) {
          navigation.navigate('AddPhoto');
        }
      })
      .catch((err) => console.log("Error add photo: ", err));
  }

  function handleShare() {}

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View style={styles.container}>
      <TDSlideshow
        beforePic={beforePic ? {uri: beforePic} : overlay}
        afterPic={afterPic ? {uri: afterPic} : overlay}
        imageWidth={styles.image.width}
        imageHeight={styles.image.height}
        sliderSpacerHeight={styles.spacerHeight}
        sliderStyles={styles.sliderStyles}
        minimumTrackTintColor={styles.sliderStyles.minimumTrackTintColor}
        maximumTrackTintColor={styles.sliderStyles.maximumTrackTintColor}
        sliderSpacerHeight={styles.spacerHeight}
        sliderIcon={sliderThumb}
        DateSelectors={
          userImages
            ? () => (
                <CustomDateSelectors
                  onPress={handleSelectDate}
                  storedImages={userImages}
                />
              )
            : () => <></>
        }
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
