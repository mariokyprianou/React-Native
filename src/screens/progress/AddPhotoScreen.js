/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 08:09:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
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
import useProgressData from '../../hooks/data/useProgressData';
import displayAlert from '../../utils/DisplayAlert';

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
  const {loading, setLoading} = useLoading();
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
  const {getImagesSync} = useProgressData();
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => (
      <Header
        title={ProgressDict.Upload}
        goBack
        right="photoSelectIcon"
        rightAction={loading ? ()=> {} : handleSelectPhoto}
      />
    ),
  });

  const [requestUplaodUrl] = useMutation(UploadUrl);
  const [sendFailed] = useMutation(UploadFailed);

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

    if (!loading) {
      setLoading(true);
    }

    const newPath =
      Platform.OS === 'android' ? path : path.replace('file://', 'private');

    const validSize = await RNFetchBlob.fs.stat(newPath)
      .then((stats) => {
        const { size } = stats;
        if (size) {
          console.log("Image size in MB: ", size / 1000000);
          const limit = 1000000 * 20; // 20MB in bytes
          if (size > limit) {
            return false;
          }
          return true;
        }
      })
      .catch((err) => {
        console.log(err, '<---requestUrl err');
        displayAlert({text:ProgressDict.UploadFailed });
        setLoading(false);
        return false;
      })

    if (!validSize) {
      displayAlert({text: ProgressDict.TooLargeSizeImage});
      setLoading(false);
    }

    const uploadUrlRes = await requestUplaodUrl().catch((err) => {
      console.log(err, '<---requestUrl err');
      displayAlert({text:ProgressDict.UploadFailed });
      setLoading(false);
      return;
    });

    if (!uploadUrlRes || !uploadUrlRes.data) return;

    const {url, id} = uploadUrlRes.data.uploadUrl;

    RNFetchBlob.fetch(
      'PUT',
      url,
      {'Content-Type': contentType},
      RNFetchBlob.wrap(newPath),
    )
      .uploadProgress((written, total) => {
        console.log('uploaded', written / total);
      })
      .then(async (res) => {
        let {status} = res.info();

        if (status === 200 || status === 204) {
          console.log('Upload done --- SUCCESS');

          await getImagesSync();
          console.log(
            'getImagesSync -- finished getting updated images and setting 1st and last',
          );

          navigation.goBack();
          setLoading(false);
        } else {
          console.log('Upload failed', res);
          handleAddPhotoError(id);
        }
      })
      .catch((err) => {
        console.log(err, '<---fetch blob err');
        handleAddPhotoError(id);
      });
  }

  async function handleAddPhotoError(id) {
    await sendFailed({variables: {id: id}})
      .then((res) => console.log(res, '<---upload failed res'))
      .catch((err) => console.log(err, '<---upload failed err'))
      .finally(() => {
        displayAlert({text:ProgressDict.UploadFailed });
        setLoading(false);
      });
  }

  function handleSelectPhoto() {

    setLoading(true);

    request(
      Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      }),
    )
      .then((result) => {
        if (result !== RESULTS.GRANTED) {
          setLoading(false);
        }

        if (result === RESULTS.UNAVAILABLE) {
          displayAlert({text:ProgressDict.FunctionNotAvailable });      
        }
        if (result === RESULTS.BLOCKED) {
          displayAlert({text:ProgressDict.NoCamera });    
        }
        if (result === RESULTS.GRANTED) {

          // compression rates tested:
          // Android 0.92 compressed 12.6MB --> 8.8MB  about 70%
          // IOS 0.99 compressed 7.7MB -> 3.6MB about 46%

          ImagePicker.openPicker({
            mediaType: 'photo',
            compressImageQuality: Platform.OS === 'android' ? 0.92 : 0.99,
            forceJpg: true
          }).then((cameraPhoto) => {
            const {path, mime} = cameraPhoto;

            handlePhoto(path, mime);
          }).catch(()=> {
            displayAlert({text:ProgressDict.UploadFailed });
            setLoading(false);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
        setLoading={setLoading}
        cameraEnabled={!loading}
      />
    </View>
  );
}
