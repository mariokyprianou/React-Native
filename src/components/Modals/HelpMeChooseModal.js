/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 11:14:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import TDIcon from 'the-core-ui-component-tdicon';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import useHelpMeChoose from '../../hooks/data/useHelpMeChoose';
import HelpMeChooseBar from '../Infographics/HelpMeChooseBar';
import Spacer from '../Utility/Spacer';
import HelpMeChooseButton from '../Buttons/HelpMeChooseButton';
import HelpMeChooseResultsModal from './HelpMeChooseResultsModal';

export default function HelpMeChooseModal({onPressClose}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const {helpMeChooseData} = useHelpMeChoose();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_HelpMeChoose} = dictionary;
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
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      top: getHeight(35),
    },
    title: {
      ...textStyles.bold22_black100,
    },
    iconContainer: {
      position: 'absolute',
      right: getWidth(20),
      alignItems: 'center',
    },
    icon: {
      size: fontSize(22),
      color: colors.black100,
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

  // ** ** ** ** ** RENDER ** ** ** ** **
  if (showResultScreen === true) {
    return <HelpMeChooseResultsModal onPressClose={onPressClose} />;
  }

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{TitleText_HelpMeChoose}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={onPressClose}>
            <TDIcon input={'times'} inputStyle={styles.icon} />
          </TouchableOpacity>
        </View>
        <Spacer height={90} />
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
