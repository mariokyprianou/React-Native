/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 11:14:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect, useCallback} from 'react';
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
  const [newAnswer, setNewAnswer] = useState({});
  const [storedAnswers, setStoredAnswers] = useState([]);
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

  const [execute] = useMutation(SubmitProgrammeQuestionnaire);

  useEffect(() => {
    setStoredAnswers((prev) => [...prev, newAnswer]);
  }, [newAnswer]);

  console.log(storedAnswers, '<---stored');

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

  async function handlePress(questionId, answerType) {
    setNewAnswer({question: questionId, answer: answerType});

    if (currentQuestion === programmeQuestionnaire.length) {
      await execute({
        variables: {
          input: {
            answers: [{question: questionId, answer: answerType}],
          },
        },
      })
        .then((res) => {
          navigation.navigate('HelpMeChooseResults', {
            recommendedEnvironment:
              res.data.submitProgrammeQuestionnaire.programme.environment,
            recommendedTrainer:
              res.data.submitProgrammeQuestionnaire.programme.trainer.name,
          });
        })
        .catch((err) => console.log(err));
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
              onPress={() => {
                const questionId =
                  programmeQuestionnaire[currentQuestion - 1].id;
                const answerTypes = {
                  0: 'ONE',
                  1: 'TWO',
                  2: 'THREE',
                  3: 'FOUR',
                };

                return handlePress(questionId, answerTypes[index]);
              }}
            />
          )}
        />
      </View>
    </View>
  );
}
