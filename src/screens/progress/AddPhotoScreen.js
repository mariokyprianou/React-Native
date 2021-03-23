/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 08:09:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {View, Platform, Alert} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {TDAddPhoto} from 'the-core-ui-module-tdslideshow';
import useDictionary from '../../hooks/localisation/useDictionary';
import CustomCountdown from '../../components/Buttons/CustomCountdown';
import Header from '../../components/Headers/Header';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import {useMutation} from '@apollo/client';
import UploadUrl from '../../apollo/mutations/UploadUrl';
import UploadFailed from '../../apollo/mutations/UploadFailed';
import RNFetchBlob from 'rn-fetch-blob';
import UseData from '../../hooks/data/UseData';
import useLoading from '../../hooks/loading/useLoading';

const cameraButton = require('../../../assets/icons/cameraButton.png');
const cameraFadedButton = require('../../../assets/images/cameraFadedButton.png');
const overlay = require('../../../assets/images/cameraPerson.png');
const countdown0 = require('../../../assets/images/countdown0s.png');
const countdown5 = require('../../../assets/images/countdown5s.png');
const countdown10 = require('../../../assets/images/countdown10s.png');

export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors} = useTheme();
  const {setLoading} = useLoading();
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
  const {getImages} = UseData();
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => (
      <Header
        title={ProgressDict.Upload}
        goBack
        right="photoSelectIcon"
        rightAction={handleSelectPhoto}
      />
    ),
  });

  const [requestUrl] = useMutation(UploadUrl);
  const [sendFailed] = useMutation(UploadFailed);
  const [urlId, setUrlId] = useState();
  const [time, setTime] = useState(0);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
    },
    overlay: {
      height: '100%',
      width: '100%',
      top: getHeight(-50),
      resizeMode: 'cover',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handlePhoto(path, contentType) {
    console.log('TAKING PHOTO');
    setLoading(true);

    const URL = await requestUrl().catch((err) =>
      console.log(err, '<---requestUrl err'),
    );

    setUrlId(URL.data.uploadUrl.id);

    RNFetchBlob.fetch(
      'PUT',
      URL.data.uploadUrl.url,
      {
        'Content-Type': contentType,
      },
      RNFetchBlob.wrap(path),
    )
      .then((res) => {
        let status = res.info().status;

        if (status === 200 || status === 204) {
          console.log('SUCCESS');
          getImages();
          setLoading(false);
          navigation.goBack();
        } else {
          handleAddPhotoError();
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err, '<---fetch blob err');
        handleAddPhotoError();
      });
  }

  async function handleAddPhotoError() {
    await sendFailed({variables: {id: urlId}})
      .then((res) => console.log(res, '<---upload failed res'))
      .catch((err) => console.log(err, '<---upload failed err'));
  }

  function handleSelectPhoto() {
    request(
      Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
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
          ImagePicker.openPicker({
            mediaType: 'photo',
          }).then((cameraPhoto) => {
            const path = cameraPhoto.path;
            const contentType = cameraPhoto.mime;
            handlePhoto(path, contentType);
          });
        }
      })
      .catch((err) => console.log(err));
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <TDAddPhoto
        setPhoto={handlePhoto}
        overlayImage={overlay}
        overlayStyles={styles.overlay}
        CustomCountdown={() => <CustomCountdown time={time} />}
        CountdownTime={time}
        cameraButtonImage={cameraButton}
        cameraFadedButton={cameraFadedButton}
        backgroundColor={colors.backgroundWhite100}
        countdown0={countdown0}
        countdown5={countdown5}
        countdown10={countdown10}
        setTime={setTime}
      />
    </View>
  );
}
