/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 08:09:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState, useRef} from 'react';
import {View, Platform, Text} from 'react-native';
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
import UploadProgressImage from '../../apollo/mutations/UploadProgressImage';
import RNFetchBlob from 'rn-fetch-blob';
import useLoading from '../../hooks/loading/useLoading';
import useProgressData from '../../hooks/data/useProgressData';
import displayAlert from '../../utils/DisplayAlert';
import useInterval from '../../utils/useInterval';
import format from 'date-fns/format';

const cameraButton = require('../../../assets/icons/cameraButton.png');
const cameraFadedButton = require('../../../assets/images/cameraFadedButton.png');
const overlay = require('../../../assets/images/cameraPerson.png');
const countdown0 = require('../../../assets/images/countdown0s.png');
const countdown5 = require('../../../assets/images/countdown5s.png');
const countdown10 = require('../../../assets/images/countdown10s.png');



export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {loading, setLoading} = useLoading();
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
  const {getImages} = useProgressData();
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

  const [requestUplaodUrl] = useMutation(UploadProgressImage);

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
    countDownStyle: {
      ...textStyles.bold30_white100,
      fontSize: fontSize(55),
      lineHeight: fontSize(60),
    }
  };


  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handlePhoto(path, contentType) {

    if (!loading) {
      setLoading(true);
    }

    const newPath =
      Platform.OS === 'android' ? path : path.replace('file://', 'private');

    // Check file size
    const validSize = await RNFetchBlob.fs.stat(newPath)
      .then((stats) => {
        const { size } = stats;
        if (size) {
          console.log("Image size in MB: ", size / 1000000);
          const limit = 1000000 * 20; // 20MB in bytes 
          return size <= limit;
        }
      })
      .catch((err) => {
        console.log(err, '<---requestUrl err');
        displayAlert({text:ProgressDict.UploadFailed });
        setLoading(false);
        return false;
      })

    if (!validSize) {
      console.log("Image size exceeds limit");
      displayAlert({text: ProgressDict.TooLargeSizeImage});
      setLoading(false);
      return;
    }


    // Request upload url
    const requestInput = {
      "contentType": contentType,
      "takenOn": format(new Date().setHours(0,0,0,0), 'yyyy-MM-dd')
    }

    const uploadUrlRes = await requestUplaodUrl({
      variables: {
        input: requestInput
      },
  }).catch((err) => {
      console.log(err, '<---requestUrl err');
      displayAlert({text:ProgressDict.UploadFailed });
      setLoading(false);
      return;
    });

    if (!uploadUrlRes || !uploadUrlRes.data || !uploadUrlRes.data.uploadProgressImage) return;
    const {uploadUrl} = uploadUrlRes.data.uploadProgressImage;

    // Initialize upload
    RNFetchBlob.fetch(
      'PUT',
      uploadUrl,
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

          await getImages();
          console.log(
            'getImages -- finished getting updated images',
          );

          navigation.goBack();
          setLoading(false);
        } else {
          console.log('Upload failed', res);
          handleAddPhotoError();
        }
      })
      .catch((err) => {
        console.log(err, '<---fetch blob err');
        handleAddPhotoError();
      });
  }

  async function handleAddPhotoError() {
    displayAlert({text:ProgressDict.UploadFailed });
    setLoading(false);
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
        countDownStyle={styles.countDownStyle}
        CountDownView={() => <CountDownView time={ time > 0 ? time / 1000 : 0 } countDownStyle={styles.countDownStyle} /> }
      />      
    </View>
  );
}


function CountDownView({time, countDownStyle}) {

  const [seconds, setSeconds] = useState(time);

  useInterval(() => {
    if(seconds > 0) {
      setSeconds(seconds - 1);
    }
  }, 1000);

  return <>
    {seconds > 0 && 
   <View style={{ height: '100%', position: 'absolute',alignSelf: 'center', justifyContent: 'center' }}><Text style={countDownStyle}>{seconds}</Text></View>
    }
   </>
}
