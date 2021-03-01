/*
 * Created Date: Sun, 31st Jan 2021, 01:19:11 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */
import React, {useState, useMemo} from 'react';
import {useQuery} from '@apollo/client';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import DataContext from './CommonDataContext';
import Onboarding from '../../apollo/queries/Onboarding';
import Trainers from '../../apollo/queries/Trainers';
import Legals from '../../apollo/queries/Legals';
import ProgrammeQuestionnaire from '../../apollo/queries/ProgrammeQuestionnaire';
import useDictionary from '../localisation/useDictionary';

export default function DataProvider(props) {
  const {isConnected, isInternetReachable} = useNetInfo();

  const {dictionary} = useDictionary();
  const {HelpMeChooseDict} = dictionary;

  const [onboarding, setOnboarding] = useState([]);

  const [trainers, setTrainers] = useState([]);

  const [legals, setLegals] = useState({});

  const [programmeQuestionnaire, setProgrammeQuestionnaire] = useState({});

  const [suggestedProgramme, setSuggestedProgramme] = useState();

  useQuery(Onboarding, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        const data = [];
        res.onboardingScreens.forEach((screen) => {
          data.unshift(screen);
        });
        setOnboarding(data);
      }
    },
    onError: (error) => console.log(error),
  });

  useQuery(Trainers, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        const data = res.getTrainers
          .slice()
          .filter((it) => it.programmes.length > 0);
        setTrainers(data);
      }
    },
    onError: (error) => console.log(error),
  });

  useQuery(Legals, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        setLegals(res.legals);
      }
    },
    onError: (error) => console.log(error),
  });

  useQuery(ProgrammeQuestionnaire, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        const qMap = res.programmeQuestionnaire.map((question) => {
          const answers = [];
          answers.push(
            question.question && question.question.answer1 || "",
            question.question && question.question.answer2 || "",
            question.question && question.question.answer3 || "",
            question.question && question.question.answer4 || "",
          );
          const formattedQuestion = answers.map((val, index) => {
            return {
              key: `${index + 1}`,
              answerText: val,
            };
          });
          return {...question, answers: formattedQuestion};
        });
        const localQuestion = {
          orderIndex: 1,
          answers: [
            {answerText: HelpMeChooseDict.Home, key: '1'},
            {answerText: HelpMeChooseDict.Gym, key: '2'},
          ],
          question: {
            language: HelpMeChooseDict.Locale,
            question: HelpMeChooseDict.EnvironmentQuestion,
          },
        };

        qMap.unshift(localQuestion);
        setProgrammeQuestionnaire(qMap);
      }
    },
    onError: (error) => console.log(error),
  });

  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
      onboarding,
      trainers,
      legals,
      programmeQuestionnaire,
      suggestedProgramme,
      setSuggestedProgramme,
    }),
    [
      onboarding,
      trainers,
      legals,
      programmeQuestionnaire,
      suggestedProgramme,
      setSuggestedProgramme,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
