/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 14:35:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Dimensions, Platform, Alert, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {TDSlideshow} from 'the-core-ui-module-tdslideshow';
import useDictionary from '../../hooks/localisation/useDictionary';
import CustomDateSelectors from '../../components/Buttons/CustomDateSelectors';
import Header from '../../components/Headers/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useQuery, useLazyQuery} from '@apollo/client';
import ProgressImages from '../../apollo/queries/ProgressImages';
import ProgressImage from '../../apollo/queries/ProgressImage';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import formatProgressImages from '../../utils/formatProgressImages';

const fakeBeforePic = require('../../../assets/fakeBefore.png');
const sliderThumb = require('../../../assets/icons/photoSlider.png');
const overlay = require('../../../assets/images/progressZero.png');

export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors} = useTheme();
  const {isConnected, isInternetReachable} = useNetInfo();
  const screenWidth = Dimensions.get('screen').width;
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

  const [beforePic, setBeforePic] = useState();
  const [afterPic, setAfterPic] = useState();
  const [userImages, setUserImages] = useState();
  const [selectedUrl, setSelectedUrl] = useState();

  // console.log(beforePic, typeof beforePic, '<---before pic');

  useQuery(ProgressImages, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      const formattedImages = formatProgressImages(res.progressImages);
      setUserImages(formattedImages);
    },
    onError: (err) => console.log(err, '<---progress images err'),
  });

  useEffect(() => {
    if (userImages && (userImages.length === 1 || userImages.length === 2)) {
      async function getBeforePicOnly() {
        await getImage({
          variables: {
            input: {
              id: userImages[0].id,
              createdAt: userImages[0].createdAt,
            },
          },
        });
      }
      getBeforePicOnly();
      setBeforePic(selectedUrl);
    }
    if (userImages && userImages.length === 2) {
      async function getAfterPicOnly() {
        await getImage({
          variables: {
            input: {
              id: userImages[1].id,
              createdAt: userImages[1].createdAt,
            },
          },
        });
      }
      getAfterPicOnly();
      setAfterPic(selectedUrl);
    }
  }, [userImages, selectedUrl]);

  const [getImage] = useLazyQuery(ProgressImage, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      setSelectedUrl(res.progressImage.url);
    },
    onError: (err) => console.log(err, '<---get image err'),
  });

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
      position: userImages?.length >= 2 ? undefined : 'absolute',
      bottom: 40,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handleSelectDate(dateItem, imageToSelect) {
    getImage({
      variables: {
        input: {
          id: dateItem.id,
          createdAt: dateItem.createdAt,
        },
      },
    });

    if (selectedUrl && imageToSelect === 'before') {
      setBeforePic(selectedUrl);
    } else if (selectedUrl && imageToSelect === 'after') {
      setAfterPic(selectedUrl);
    }
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
  if (userImages) {
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
          // DateSelectors={() => (
          //   <CustomDateSelectors
          //     onPress={handleSelectDate}
          //     storedImages={userImages}
          //   />
          // )}
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
  return null;
}
