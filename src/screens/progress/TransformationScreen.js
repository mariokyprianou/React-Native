/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 14:35:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect, useCallback} from 'react';
import {View, Dimensions, Platform, Alert} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import Share from 'react-native-share';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {TDSlideshow} from 'the-core-ui-module-tdslideshow';
import useDictionary from '../../hooks/localisation/useDictionary';
import CustomDateSelectors from '../../components/Buttons/CustomDateSelectors';
import Header from '../../components/Headers/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import useUserData from '../../hooks/data/useUserData';
import {useLazyQuery, useApolloClient} from '@apollo/client';
import ProgressImage from '../../apollo/queries/ProgressImage';
import UseData from '../../hooks/data/UseData';
import useLoading from '../../hooks/loading/useLoading';
import useProgressData from '../../hooks/data/useProgressData';
import PowerShareAssetsManager from '../../utils/PowerShareAssetsManager';
import useShare from '../../hooks/share/useShare';
import ImagesCacheManager from '../../utils/ImagesCacheManager';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import {differenceInDays} from 'date-fns';
import displayAlert from '../../utils/DisplayAlert';
import {isSameDay} from '../../utils/dateTimeUtils';

const sliderThumb = require('../../../assets/icons/photoSlider.png');
const overlay = require('../../../assets/images/progressZero.png');

export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const client = useApolloClient();
  const {colors} = useTheme();
  const {
    userImages,
    setUserImages,
    getImages,
    beforePic,
    setBeforePic,
    afterPic,
    setAfterPic,
    getImageUrl,
    imageUrls,
  } = useProgressData();
  const screenWidth = Dimensions.get('screen').width;
  const {dictionary} = useDictionary();
  const {ProgressDict, ShareDict, ProfileDict} = dictionary;
  const {setLoading} = useLoading();
  const navigation = useNavigation();

  const {firebaseLogEvent, analyticsEvents} = useUserData();
  const {ShareMediaType, getShareData} = useShare();

  const [selectedBeforeDate, setSelectedBeforeDate] = useState(
    userImages[0] && userImages[0].value,
  );
  const [selectedAfterDate, setSelectedAfterDate] = useState(
    userImages[userImages.length - 1] &&
      userImages[userImages.length - 1].value,
  );

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
    } else {
      url = await getImageUrl(dateItem);
    }

    if (imageToSelect === 'before') {
      setSelectedBeforeDate(dateItem.value);
      setBeforePic(url);
    } else if (imageToSelect === 'after') {
      setSelectedAfterDate(dateItem.value);
      setAfterPic(url);
    }
    setLoading(false);
  }

  function handleNavigateAddPhoto() {
    const today = new Date();
    const alreadyExists = userImages.find(
      (it) => it.createdAt && isSameDay(today, parseISO(it.createdAt)),
    );

    if (alreadyExists) {
      displayAlert({
        title: null,
        text: ProgressDict.UploadAgainWarning,
        buttons: [
          {
            text: ProfileDict.Cancel,
            style: 'cancel',
          },
          {
            text: ProfileDict.Ok,
            onPress: async () => {
              navigateAddPhoto();
            },
          },
        ],
      });
    } else {
      navigateAddPhoto();
    }
  }

  function navigateAddPhoto() {
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
      .catch((err) => console.log('Error add photo: ', err));
  }

  const handleShare = useCallback(async () => {
    const isInstaAvailable = await PowerShareAssetsManager.isInstagramAvailable();

    if (!isInstaAvailable) {
      displayAlert({
        title: null,
        text: ShareDict.InstaPromptText,
        buttons: [
          {
            text: ProfileDict.Cancel,
            style: 'cancel',
          },
          {
            text: ProfileDict.Ok,
            onPress: async () => {
              PowerShareAssetsManager.promptIsntagramAppDownload();
            },
          },
        ],
      });

      return;
    }

    setLoading(true);
    const {colour, url} = await getShareData(ShareMediaType.progress);

    try {
      let beforeDate = parseISO(selectedBeforeDate);
      beforeDate = isSameDay(new Date(), beforeDate)
        ? 'TODAY'
        : format(beforeDate, 'dd/LL/yyyy');

      let afterDate = parseISO(selectedAfterDate);
      afterDate = isSameDay(new Date(), afterDate)
        ? 'TODAY'
        : format(afterDate, 'dd/LL/yyyy');

      let res = await PowerShareAssetsManager.shareProgress({
        backgroundImageUrl: url,
        beforeImageUrl: beforePic,
        afterImageUrl: afterPic,
        colour: colour,
        beforeDate: beforeDate,
        afterDate: afterDate,
      });
      firebaseLogEvent(analyticsEvents.shareTransformation, {});
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }, [
    beforePic,
    afterPic,
    selectedBeforeDate,
    selectedAfterDate,
    getShareData,
  ]);

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
                  setSelectedBeforeDate={setSelectedBeforeDate}
                  setSelectedAfterDate={setSelectedAfterDate}
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
