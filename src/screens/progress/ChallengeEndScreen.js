/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 15:44:55 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useChallenge from '../../hooks/data/useChallenge';
import DefaultButton from '../../components/Buttons/DefaultButton';
import ModalCard from '../../components/Modals/ModalCard';
import ChallengeCompletionModal from '../../components/Modals/ChallengeCompletionModal';
import ProgressChart from '../../components/Infographics/ProgressChart';
import Header from '../../components/Headers/Header';

export default function ChallengeEndScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {challengeData, challengeHistoryData} = useChallenge();
  const {
    name,
    description,
    answerBoxLabel,
    result,
    trainerName,
  } = challengeData;
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => <Header title={name} goBack />,
  });

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
      marginBottom: getHeight(40),
    },
    description: {
      ...textStyles.regular15_brownishGrey100,
      textAlign: 'left',
    },
    timerText: {
      ...textStyles.bold34_black100,
    },
    answerBoxContainer: {
      width: '90%',
      alignItems: 'flex-start',
    },
    answerLabel: {
      ...textStyles.medium14_brownishGrey100,
      marginBottom: getHeight(6),
    },
    result: {
      ...textStyles.regular16_black100,
      marginBottom: getHeight(10),
    },
    line: {
      width: '100%',
      height: getHeight(1),
      backgroundColor: colors.black30,
    },
    buttonContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      bottom: getHeight(40),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleAddResult() {
    setShowCompletionModal(true);
  }

  function handleCloseCompletionModal() {
    setShowCompletionModal(false);
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ProgressChart data={challengeHistoryData} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.answerBoxContainer}>
        <Text style={styles.answerLabel}>{answerBoxLabel}</Text>
        <Text style={styles.result}>{result}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="addResult"
          icon="chevron"
          variant="white"
          onPress={handleAddResult}
        />
      </View>
      <ModalCard isVisible={showCompletionModal}>
        <ChallengeCompletionModal
          onPressClose={handleCloseCompletionModal}
          result={result}
          challengeName={name}
          trainerName={trainerName}
          data={challengeHistoryData}
        />
      </ModalCard>
    </View>
  );
}
