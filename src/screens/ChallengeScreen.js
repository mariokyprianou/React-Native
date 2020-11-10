/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 10:17:26 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useChallenge from '../hooks/data/useChallenge';
import { useTimer } from 'the-core-ui-module-tdcountdown';
import DefaultButton from '../components/Buttons/DefaultButton';
import Spacer from '../components/Utility/Spacer';

export default function ChallengeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const { challengeData } = useChallenge();
  const { name, description, timeLimit } = challengeData;
  
  const formattedSeconds = new Date(timeLimit * 1000).toISOString().substr(11, 8);
  const { remaining, remainingMS, toggle, active, reset } = useTimer({ timer: formattedSeconds });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    card: {
      backgroundColor: colors.white100,
      height: getHeight(200),
      width: getWidth(335),
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
      marginBottom: getHeight(20),
    },
    descriptionContainer: {
      width: '90%',
      marginBottom: getHeight(43),
    },
    description: {
      ...textStyles.regular15_brownishGrey100,
    },
    timerText: {
      ...textStyles.bold34_black100,
    },
    buttonContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      bottom: getHeight(40),
    }
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePressStart() { }
  
  function handlePressDone() {}

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={ styles.container }>
      <View style={styles.card}>
        <Text>Component here</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{ description}</Text>
      </View>
      <Text style={ styles.timerText }>{ remaining }</Text>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="start"
          icon="chevron"
          variant="gradient"
          onPress={handlePressStart}
        />
        <Spacer height={20} />
        <DefaultButton
          type="done"
          icon="chevron"
          variant="white"
          onPress={handlePressDone}
        />
      </View>
      
    </View>
  );
}
