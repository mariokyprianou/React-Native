/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo} from 'react';
import {useQuery, useMutation, useLazyQuery} from '@apollo/client';
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
  const [suggestedProgramme, setSuggestedProgramme] = useState();

  const [timeZones, setTimeZones] = useState([]);

  useQuery(Onboarding, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        const data = res.onboardingScreens;
        setOnboarding(data);
      }
    },
    onError: (error) => console.log(error),
  });

  useQuery(Trainers, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        setTrainers(res.getTrainers);
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
      const qMap = res.programmeQuestionnaire.map((question) => {
        const answers = [];
        answers.push(
          question.question.answer1,
          question.question.answer2,
          question.question.answer3,
          question.question.answer4,
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
          {answerText: 'Home', key: '1'},
          {answerText: 'Gym', key: '2'},
        ],
        question: {
          language: 'en',
          question: 'How many times a week do you exercise?',
        },
      };

      qMap.unshift(localQuestion);
      setProgrammeQuestionnaire(qMap);
    },
    onError: (error) => console.log(error),
  });

  // const [submitChallengeResult] = useMutation(SubmitChallengeResult, {
  //   fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
  // });

  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = React.useMemo(
    () => ({
      onboarding,
      trainers,
      legals,
      timeZones,
      programmeQuestionnaire,
      suggestedProgramme,
      setSuggestedProgramme,
    }),
    [
      onboarding,
      trainers,
      legals,
      timeZones,
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
