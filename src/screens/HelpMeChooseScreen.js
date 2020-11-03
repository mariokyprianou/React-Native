/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 11:14:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import HelpMeChooseBar from '../components/Infographics/HelpMeChooseBar';
import Spacer from '../components/Utility/Spacer';
import HelpMeChooseButton from '../components/Buttons/HelpMeChooseButton';

const fakeData = [
  {
    key: '1',
    questionText: 'This is the first question.',
    answers: [
      {
        key: '11',
        answerLetter: 'A',
        answerText: 'Answer one',
      },
      {
        key: '12',
        answerLetter: 'B',
        answerText: 'Answer two',
      },
      {
        key: '13',
        answerLetter: 'C',
        answerText: 'Answer three',
      },
      {
        key: '14',
        answerLetter: 'D',
        answerText: 'Answer four',
      },
    ],
  },
  {
    key: '2',
    questionText: 'This is the second question.',
    answers: [
      {
        key: '15',
        answerLetter: 'A',
        answerText: 'Answer one',
      },
      {
        key: '16',
        answerLetter: 'B',
        answerText: 'Answer two',
      },
      {
        key: '17',
        answerLetter: 'C',
        answerText: 'Answer three',
      },
      {
        key: '18',
        answerLetter: 'D',
        answerText: 'Answer four',
      },
    ],
  },
  {
    key: '3',
    questionText: 'Would you rather train at home or in the gym?',
    answers: [
      {
        key: '11',
        answerLetter: 'A',
        answerText: 'Home',
      },
      {
        key: '12',
        answerLetter: 'B',
        answerText: 'Gym',
      },
    ],
  },
];

export default function HelpMeChooseScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
    },
    answersContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      height: 500,
      backgroundColor: 'pink',
    },
    columnWrapperStyle: {
      justifyContent: 'space-between',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress() {
    if (currentQuestion === fakeData.length) {
      console.log('done!');
      // navigate to results page (after a short delay to appreciate the gradient?)
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Spacer height={20} />
      <HelpMeChooseBar
        currentQuestion={currentQuestion}
        totalQuestions={fakeData.length}
        questionText={fakeData[currentQuestion - 1].questionText}
      />
      <Spacer height={20} />
      <FlatList
        data={fakeData[currentQuestion - 1].answers}
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
  );
}
