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

const sliderThumb = require('../../../assets/icons/photoSlider.png');
const overlay = require('../../../assets/images/progressZero.png');

export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const client = useApolloClient();
  const {colors} = useTheme();
  const {userImages, getImages} = UseData();
  const screenWidth = Dimensions.get('screen').width;
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
  const {setLoading} = useLoading();
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

  useEffect(() => {
    // Only request images if we don't have them already
    if (!userImages) {
      setLoading(true);
      console.log(' useEffect - calls getImages');
      getImages();
    } else {
      setLoading(false);
    }
  }, [userImages]);

  async function getPic(image) {
    client
      .query({
        query: ProgressImage,
        fetchPolicy: 'no-cache',
        variables: {
          input: {
            id: image.id,
            createdAt: image.createdAt,
          },
        },
      })
      .then((res) => {
        if (beforePic === undefined) {
          setBeforePic(res.data.progressImage.url);
        } else if (afterPic === undefined) {
          setAfterPic(res.data.progressImage.url);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err, 'getPic error'));
  }

  // Got images get first pic
  useEffect(() => {
    if (userImages && !beforePic && userImages[0].createdAt) {
      console.log('userImages useEffect - calls getPic(0)');
      setLoading(true);

      getPic(userImages[0]);
    }
  }, [userImages]);

  // Before pic was set, go for after pic if available
  useEffect(() => {
    if (beforePic && !afterPic && userImages.length > 1) {
      console.log('beforePic useEffect - calls getPic(last)');
      setLoading(true);
      getPic(userImages[userImages.length - 1]);
    }
  }, [beforePic]);

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
    if (!dateItem.id) return;
    setLoading(true);

    client
      .query({
        query: ProgressImage,
        fetchPolicy: 'no-cache',
        variables: {
          input: {
            id: dateItem.id,
            createdAt: dateItem.createdAt,
          },
        },
      })
      .then((res) => {
        let url = res.data.progressImage.url;

        if (imageToSelect === 'before') {
          setBeforePic(url);
        } else if (imageToSelect === 'after') {
          setAfterPic(url);
        }
      })
      .catch((err) => console.log(err, 'getPic error'))
      .finally(() => setLoading(false));
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
      .catch((err) => console.log(err));
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
