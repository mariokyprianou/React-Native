/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 11:14:21 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, StatusBar} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import SubmitProgrammeQuestionnaire from '../../apollo/mutations/SubmitProgrammeQuestionnaire';
import {useMutation} from '@apollo/client';
import HelpMeChooseBar from '../../components/Infographics/HelpMeChooseBar';
import Spacer from '../../components/Utility/Spacer';
import Header from '../../components/Headers/Header';
import HelpMeChooseButton from '../../components/Buttons/HelpMeChooseButton';
import displayAlert from '../../utils/DisplayAlert';
import useLoading from '../../hooks/loading/useLoading';

import getResponse from '../../utils/getResponse';
import useCommonData from '../../hooks/data/useCommonData';

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
  const {setLoading} = useLoading();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  navigation.setOptions({
    header: () => (
      <Header title={HelpMeChooseDict.HelpMeChoose} showModalCross />
    ),
  });

  const {
    trainers,
    programmeQuestionnaire,
    setSuggestedProgramme,
  } = useCommonData();

  const [execute] = useMutation(SubmitProgrammeQuestionnaire, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (
      !newAnswer ||
      !newAnswer.answer ||
      storedAnswers.find((it) => it.question === newAnswer.question)
    ) {
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
    setLoading(true);
    const answers = storedAnswers.filter(
      (it) => it.question !== null && it.question !== 'environment',
    );
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
        if (res && res.data) {
          const {programme} = getResponse(res, 'submitProgrammeQuestionnaire');
          setSuggestedProgramme(programme);

          // Get existing image from trainers for this suggested programme
          const existingImage = trainers
            .find((it) => it.id === programme.trainer.id)
            .programmes.find((it) => it.environment === programme.environment)
            .programmeImage;

          navigation.navigate('HelpMeChooseResults', {
            recommendedTrainer: programme.trainer.name,
            programmeImage: existingImage,
          });
        } else {
          if (res.errors.length > 0) {
            showError(null, res.errors[0].message);
          }
        }
      })
      .catch((err) => {
        showError('Server error', 'Unable to return program');
        console.log('submitQuestionnaire', err);
      })
      .finally(() => setLoading(false));
  }

  function showError(title, text) {
    displayAlert({
      title,
      text,
      onPress: () => navigation.pop(),
    });
  }

  const keys = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
  };

  const questionText = programmeQuestionnaire
    ? programmeQuestionnaire[currentQuestion > 0 ? currentQuestion - 1 : 1]
        .question.question
    : '';

  const listData = programmeQuestionnaire
    ? programmeQuestionnaire[currentQuestion > 0 ? currentQuestion - 1 : 1]
        .answers
    : [];

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <HelpMeChooseBar
          currentQuestion={currentQuestion}
          totalQuestions={programmeQuestionnaire.length}
          questionText={questionText}
        />
        <Spacer height={20} />
        <View style={{height: '100%'}}>
          <FlatList
            scrollEnabled={false}
            data={listData}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
            renderItem={({item, index}) => (
              <HelpMeChooseButton
                letter={keys[item.key]}
                text={item.answerText}
                onPress={() => {
                  if (programmeQuestionnaire) {
                    const questionId =
                      programmeQuestionnaire[
                        currentQuestion > 0 ? currentQuestion - 1 : 1
                      ].id;
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
                  }
                }}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}
