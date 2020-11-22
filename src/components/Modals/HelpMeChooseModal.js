/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 11:14:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import useHelpMeChoose from '../../hooks/data/useHelpMeChoose';
import HelpMeChooseBar from '../Infographics/HelpMeChooseBar';
import Spacer from '../Utility/Spacer';
import Header from '../Headers/Header';
import HelpMeChooseButton from '../Buttons/HelpMeChooseButton';
import HelpMeChooseResultsModal from './HelpMeChooseResultsModal';

export default function HelpMeChooseModal({onPressClose, onFinish}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const {helpMeChooseData} = useHelpMeChoose();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {HelpMeChooseDict} = dictionary;
  const [showResultScreen, setShowResultScreen] = useState(false);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.veryLightPink100,
    },
    container: {
      width: '90%',
      alignSelf: 'center',
      paddingTop: getHeight(20),
    },
    answersContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      height: getHeight(500),
      backgroundColor: 'pink',
    },
    columnWrapperStyle: {
      justifyContent: 'space-between',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress() {
    if (currentQuestion === helpMeChooseData.length) {
      setShowResultScreen(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handleCloseResults() {
    setShowResultScreen(false);
    onPressClose();
  }

  function handleSelectProgramme() {
    setShowResultScreen(false);
    onPressClose();
    onFinish();
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  if (showResultScreen === true) {
    return (
      <HelpMeChooseResultsModal
        onPressClose={handleCloseResults}
        onSelectProgramme={handleSelectProgramme}
      />
    );
  }

  return (
    <View style={styles.card}>
      <Header
        title={HelpMeChooseDict.HelpMeChoose}
        right="times"
        rightAction={onPressClose}
      />
      <View style={styles.container}>
        <HelpMeChooseBar
          currentQuestion={currentQuestion}
          totalQuestions={helpMeChooseData.length}
          questionText={helpMeChooseData[currentQuestion - 1].questionText}
        />
        <Spacer height={20} />
        <FlatList
          data={helpMeChooseData[currentQuestion - 1].answers}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={({item, index}) => (
            <HelpMeChooseButton
              letter={item.answerLetter}
              text={item.answerText}
              onPress={handlePress}
            />
          )}
        />
      </View>
    </View>
  );
}
