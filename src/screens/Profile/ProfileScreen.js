/*
 * Created Date: Wed, 11th Nov 2020, 11:13:40 am
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {FormHook} from 'the-core-ui-module-tdforms';
import ProfileScreenUI from './ProfileScreenUI';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import IntercomModal from '../../components/Modals/IntercomModal';

export default function ProfileScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {cleanErrors, getValues, updateError} = FormHook();
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const onSaveChanges = () => {
    const {
      profile_firstName,
      profile_lastName,
      profile_email,
      profile_gender,
      profile_dateOfBirth,
      profile_country,
      profile_region,
    } = getValues();
    // TODO: - Verify Values
  };

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    view: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onPressNeedHelp = () => {
    setShareModalVisible(true);
  };

  const handleCancel = () => {
    setShareModalVisible(false);
  };

  const onPressLogout = () => {
    console.log('TODO: - onPressLogout');

    navigation.navigate('Onboarding');
  };

  const onPressNeedToSignOut = () => {
    console.log('TODO: - onPressNeedToSignOut');
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <>
      <ProfileScreenUI
        onSaveChange={onSaveChanges}
        onPressNeedHelp={onPressNeedHelp}
        onPressLogout={onPressLogout}
      />
      <Modal
        style={styles.view}
        isVisible={shareModalVisible}
        onBackdropPress={handleCancel}
        onBackButtonPress={handleCancel}
        backdropOpacity={0.5}>
        <IntercomModal />
      </Modal>
    </>
  );
}
