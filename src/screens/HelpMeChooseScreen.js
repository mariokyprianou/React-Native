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
import useHelpMeChoose from '../hooks/data/useHelpMeChoose';
import HelpMeChooseBar from '../components/Infographics/HelpMeChooseBar';
import Spacer from '../components/Utility/Spacer';
import HelpMeChooseButton from '../components/Buttons/HelpMeChooseButton';

export default function HelpMeChooseScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const {helpMeChooseData} = useHelpMeChoose();

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
      height: getHeight(500),
      backgroundColor: 'pink',
    },
    columnWrapperStyle: {
      justifyContent: 'space-between',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress() {
    if (currentQuestion === helpMeChooseData.length) {
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
  );
}
