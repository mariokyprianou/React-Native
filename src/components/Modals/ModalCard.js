/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 08:30:46 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import Modal from 'react-native-modal';

export default function ModalCard({isVisible, children}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      margin: 0,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <Modal isVisible={isVisible} style={styles.container}>
      <View style={{flex: 1}}>{children}</View>
    </Modal>
  );
}
