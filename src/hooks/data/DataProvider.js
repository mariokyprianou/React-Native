/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo} from 'react';
import {useQuery, useMutation, useLazyQuery} from 'react-apollo';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import DataContext from './DataContext';
import Onboarding from '../../apollo/queries/Onboarding';
import Trainers from '../../apollo/queries/Trainers';
import Legals from '../../apollo/queries/Legals';
import ProgrammeQuestionnaire from '../../apollo/queries/ProgrammeQuestionnaire';

export default function DataProvider(props) {
  const {isConnected, isInternetReachable} = useNetInfo();

  const [onboarding, setOnboarding] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [legals, setLegals] = useState({});
  const [programmeQuestionnaire, setProgrammeQuestionnaire] = useState({});

  useQuery(Onboarding, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      const data = res.onboardingScreens.reverse();
      setOnboarding(data);
    },
    onError: (error) => console.log(error),
  });

  useQuery(Trainers, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      setTrainers(res.getTrainers);
    },
    onError: (error) => console.log(error),
  });

  useQuery(Legals, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      setLegals(res.legals);
    },
    onError: (error) => console.log(error),
  });

  useQuery(ProgrammeQuestionnaire, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      res.programmeQuestionnaire.map((question) => {
        question.answers = [];
        question.answers.push(
          question.question.answer1,
          question.question.answer2,
          question.question.answer3,
          question.question.answer4,
        );
        const newQuestion = question.answers.map((question, index) => {
          const keys = {
            1: 'A',
            2: 'B',
            3: 'C',
            4: 'D',
          };
          return {
            key: `${index + 1}`,
            answerLetter: keys[index + 1],
            answerText: question,
          };
        });
        question.answers = newQuestion;
        return question;
      });
      setProgrammeQuestionnaire(res.programmeQuestionnaire);
    },
    onError: (error) => console.log(error),
  });

  // const [submitChallengeResult] = useMutation(SubmitChallengeResult, {
  //   fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
  // });

  // ** ** ** ** ** Memoize ** ** ** ** **
  const values = useMemo(
    () => ({
      onboarding,
      trainers,
      legals,
      programmeQuestionnaire,
    }),
    [onboarding, trainers, legals, programmeQuestionnaire],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
