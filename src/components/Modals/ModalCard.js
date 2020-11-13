/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 08:30:46 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import Modal from 'react-native-modal';
import CardContainer from '../Cards/CardContainer';

export default function ModalCard({isVisible, children, containerStyle}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      margin: 0,
      ...containerStyle,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <Modal isVisible={isVisible} style={styles.container}>
      <CardContainer>{children}</CardContainer>
    </Modal>
  );
}
