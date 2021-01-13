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
import {useMutation} from '@apollo/client';
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
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => (
      <Header title={HelpMeChooseDict.HelpMeChoose} showModalCross />
    ),
  });

  const {programmeQuestionnaire} = useData();

  const [execute] = useMutation(SubmitProgrammeQuestionnaire);

  useEffect(() => {
    if (!newAnswer || !newAnswer.answer) {
      return;
    }
    if (
      storedAnswers.find((it) => it.question !== newAnswer.question) !== null
    ) {
      setStoredAnswers((prev) => [...prev, newAnswer]);
      if (currentQuestion < programmeQuestionnaire.length) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  }, [newAnswer]);

  useEffect(() => {
    console.log('storedAnswers', storedAnswers);
    if (storedAnswers.length === programmeQuestionnaire.length) {
      submitQuestionnaire();
    }
  }, [storedAnswers]);

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

  async function submitQuestionnaire() {
    const answers = storedAnswers.filter(
      (it) => it.question !== null && it.question !== 'environment',
    );
    console.log('answers', {
      answers: answers,
      environment:
        storedAnswers.find((it) => it.question === 'environment').answer ===
        'ONE'
          ? 'HOME'
          : 'GYM',
    });
    await execute({
      variables: {
        input: {
          answers: answers,
          environment:
            storedAnswers.find((it) => it.question === 'environment').answer ===
            'ONE'
              ? 'HOME'
              : 'GYM',
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
  }

  const keys = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
  };

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
        <View style={{height: '100%'}}>
          <FlatList
            data={programmeQuestionnaire[currentQuestion - 1].answers}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
            renderItem={({item, index}) => (
              <HelpMeChooseButton
                letter={keys[item.key]}
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
                  setNewAnswer({
                    question: questionId || 'environment',
                    answer: answerTypes[index],
                  });
                  //handlePress(questionId || 'environment', answerTypes[index]);
                }}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}
