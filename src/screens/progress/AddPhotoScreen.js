/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 08:09:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
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
import useProgressData from '../../hooks/data/useProgressData';

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
  const {getImages, getImagesSync} = useProgressData();
  const navigation = useNavigation();


  useEffect(()=> {
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
  }, [])

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
    console.log('Init uplaod Photo');
    setLoading(true);

    const uploadUrlRes = await requestUplaodUrl()
      .catch((err) =>
        console.log(err, '<---requestUrl err'),
      );
    console.log("uploadUrlRes", uploadUrlRes);
    const { url , id } = uploadUrlRes.data.uploadUrl;
    
    RNFetchBlob.fetch(
      'PUT', url, { 'Content-Type': contentType },
      RNFetchBlob.wrap(path),
    )
    .uploadProgress((written, total) => {
      console.log('uploaded', written / total);
    })
    .then(async (res) => {
        let { status } = res.info();
       

        if (status === 200 || status === 204) {
          console.log('Upload done --- SUCCESS');
        
          const finished = await getImagesSync();
          console.log("getImagesSync -- finished getting updatted images and setting 1st and last")

          navigation.goBack();
          setLoading(false);
        } else {
          console.log("Upload failed", res)
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
      .finally(()=> {
        setLoading(false);
        Alert.alert(ProgressDict.UploadFailed);
      });
  }

  function handleSelectPhoto() {
    request(
      Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      }),
    )
      .then((result) => {
        console.log(result)
        if (result === RESULTS.UNAVAILABLE) {
          Alert.alert(ProgressDict.FunctionNotAvailable);
        }
        if (result === RESULTS.BLOCKED) {
          Alert.alert(ProgressDict.NoCamera);
        }
        if (result === RESULTS.GRANTED) {
          ImagePicker.openPicker({
            mediaType: 'photo',
            compressImageQuality: 0.7,
          }).then((cameraPhoto) => {
            const { path, mime }= cameraPhoto;
            handlePhoto(path, mime);
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
