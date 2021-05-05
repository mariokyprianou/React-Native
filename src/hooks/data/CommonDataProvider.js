/*
 * Created Date: Sun, 31st Jan 2021, 01:19:11 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */
import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {useLazyQuery, useQuery} from '@apollo/client';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import DataContext from './CommonDataContext';
import Onboarding from '../../apollo/queries/Onboarding';
import Trainers from '../../apollo/queries/Trainers';
import Legals from '../../apollo/queries/Legals';
import ProgrammeQuestionnaire from '../../apollo/queries/ProgrammeQuestionnaire';
import useDictionary from '../localisation/useDictionary';
import isRTL from '../../utils/isRTL';
import useCustomQuery from '../customQuery/useCustomQuery';

export default function DataProvider(props) {
  const {runQuery} = useCustomQuery();

  const {isConnected, isInternetReachable} = useNetInfo();

  const {dictionary} = useDictionary();
  const {HelpMeChooseDict, OnboardingDict} = dictionary;

  const [onboarding, setOnboarding] = useState(isRTL() ? OnboardingDict.fallbackData.reverse() : OnboardingDict.fallbackData);

  const [trainers, setTrainers] = useState([]);

  const [legals, setLegals] = useState({});

  const [programmeQuestionnaire, setProgrammeQuestionnaire] = useState({});

  const [suggestedProgramme, setSuggestedProgramme] = useState();

  useEffect(() => {
    console.log("CommondataProvider: useEffect");
    getOnboarding();
    getTrainers();
  }, []);


  const getOnboarding = useCallback(async () => {
    const res = await runQuery({
      query: Onboarding,
      key: 'onboardingScreens',
      setValue: (res) => {
        if (res) {
          const data = [];
          res.forEach((screen) => {
            const isRightToLeft = isRTL();
            if (isRightToLeft === true) {
              data.unshift(screen);
            } else {
              data.push(screen);
            }
          });
          setOnboarding(data);
          return data;
        }
      },
    });

    console.log("getOnboarding Processed Res:", res.success)

  }, []);



  const getTrainers = useCallback(async () => {
    const res = await runQuery({
      query: Trainers,
      key: 'getTrainers',
      setValue: (res) => {
        if (res) {
          const data = res.slice().filter((it) => it.programmes.length > 0);
          setTrainers(data);
        
          return data;
        }
      },
    });

    console.log("getTrainers Processed Res:", res.success)

  }, []);



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
            (question.question && question.question.answer1) || '',
            (question.question && question.question.answer2) || '',
            (question.question && question.question.answer3) || '',
            (question.question && question.question.answer4) || '',
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
      getOnboarding,
      trainers,
      getTrainers,
      legals,
      programmeQuestionnaire,
      suggestedProgramme,
      setSuggestedProgramme,
    }),
    [
      onboarding,
      getOnboarding,
      trainers,
      getTrainers,
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
