/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 08:09:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
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
import {useQuery, useMutation} from '@apollo/client';
import UploadUrl from '../../apollo/mutations/UploadUrl';

const cameraButton = require('../../../assets/icons/cameraButton.png');
const overlay = require('../../../assets/images/cameraPerson.png');

export default function TransformationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {ProgressDict} = dictionary;
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
  async function handlePhoto(url) {
    console.log(url, '<---photo taken uri');
    // send to back end with today's date, format ProgressImage

    await requestUrl()
      .then((res) => console.log(res, '<---requestUrl res'))
      .catch((err) => console.log(err, '<---requestUrl err'));
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
          Alert.alert('This function is not available on this device');
        }
        if (result === RESULTS.BLOCKED) {
          Alert.alert('Unable to access camera');
        }
        if (result === RESULTS.GRANTED) {
          ImagePicker.openPicker({
            mediaType: 'photo',
          }).then((cameraPhoto) => {
            console.log(cameraPhoto, '<---camera photo');
            // send to backend
          });
        }
      })
      .catch((err) => console.log(err));
  }

  function handleCountdownStart() {
    console.log('counting down');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <TDAddPhoto
        setPhoto={handlePhoto}
        overlayImage={overlay}
        overlayStyles={styles.overlay}
        CustomCountdown={() => (
          <CustomCountdown onPress={handleCountdownStart} />
        )}
        cameraButtonImage={cameraButton}
        backgroundColor={colors.backgroundWhite100}
      />
    </View>
  );
}
