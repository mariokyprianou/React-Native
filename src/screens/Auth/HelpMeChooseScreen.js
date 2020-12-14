/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 11:14:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import useData from '../../hooks/data/UseData';
import SubmitProgrammeQuestionnaire from '../../apollo/mutations/SubmitProgrammeQuestionnaire';
import {useMutation} from 'react-apollo';
import HelpMeChooseBar from '../../components/Infographics/HelpMeChooseBar';
import Spacer from '../../components/Utility/Spacer';
import Header from '../../components/Headers/Header';
import HelpMeChooseButton from '../../components/Buttons/HelpMeChooseButton';

export default function HelpMeChooseScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [storedAnswers, setStoredAnswers] = useState();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {HelpMeChooseDict} = dictionary;
  const {programmeQuestionnaire} = useData();
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => (
      <Header title={HelpMeChooseDict.HelpMeChoose} showModalCross />
    ),
  });

  const [execute] = useMutation(SubmitProgrammeQuestionnaire, {
    onError: ({networkError, graphQLErrors}) => {
      console.log('graphQLErrors', graphQLErrors);
      console.log('networkError', networkError);
    },
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgroundWhite100,
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
    },
    columnWrapperStyle: {
      justifyContent: 'space-between',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function fetchData() {
    await execute({
      variables: {
        input: {
          answers: [
            {question: '1abf23f6-99a1-4de9-98fb-cb2738eee5bd', answer: 'ONE'},
          ],
        },
      },
    })
      .then((res) => {
        console.log(res, '<---result');
        // setStoredAnswers(res);
      })
      .catch((err) => console.log(err));
  }

  function handlePress() {
    if (currentQuestion === programmeQuestionnaire.length) {
      fetchData();
      navigation.navigate('HelpMeChooseResults');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <HelpMeChooseBar
          currentQuestion={currentQuestion}
          totalQuestions={programmeQuestionnaire.length}
          questionText={
            programmeQuestionnaire[currentQuestion - 1].question.question
          }
        />
        <Spacer height={20} />
        <FlatList
          data={programmeQuestionnaire[currentQuestion - 1].answers}
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
