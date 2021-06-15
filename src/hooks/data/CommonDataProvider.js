/*
 * Created Date: Sun, 31st Jan 2021, 01:19:11 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {useQuery} from '@apollo/client';
import fetchPolicy from '../../utils/fetchPolicy';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import DataContext from './CommonDataContext';
import Onboarding from '../../apollo/queries/Onboarding';
import Trainers from '../../apollo/queries/Trainers';
import Legals from '../../apollo/queries/Legals';
import ProgrammeQuestionnaire from '../../apollo/queries/ProgrammeQuestionnaire';
import useDictionary from '../localisation/useDictionary';
import isRTL from '../../utils/isRTL';
import useCustomQuery from '../customQuery/useCustomQuery';
import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen';
import {cacheImages} from './VideoCacheUtils';

export default function DataProvider(props) {
  const {runQuery} = useCustomQuery();

  const {isConnected, isInternetReachable} = useNetInfo();

  const {dictionary, locale} = useDictionary();
  const {HelpMeChooseDict, OnboardingDict} = dictionary;

  const [onboarding, setOnboarding] = useState();

  const fallbackData = [
    {
      ...OnboardingDict.fallbackData[0],
      image: require('../../../assets/onboarding/onboarding1.png'),
      local: true,
    },
    {
      ...OnboardingDict.fallbackData[1],
      image: require('../../../assets/onboarding/onboarding2.png'),
      local: true,
    },
    {
      ...OnboardingDict.fallbackData[2],
      image: require('../../../assets/onboarding/onboarding3.png'),
      local: true,
    },
    {
      ...OnboardingDict.fallbackData[3],
      image: require('../../../assets/onboarding/onboarding4.png'),
      local: true,
    },
  ];

  const [trainers, setTrainers] = useState([]);

  const [legals, setLegals] = useState({});

  const [programmeQuestionnaire, setProgrammeQuestionnaire] = useState({});

  const [suggestedProgramme, setSuggestedProgramme] = useState();

  useEffect(() => {
    console.log('CommondataProvider: useEffect');
    getOnboarding();
    getTrainers();
    getProgrammeQuestionnaire();
    getLegals();
  }, []);

  const syncronousUpdate = useCallback(async () => {
    await Promise.all([
      getOnboarding(),
      getTrainers(),
      getProgrammeQuestionnaire(),
      getLegals(),
    ]);
  }, []);

  // useEffect(() => {
  //   console.log('Locale Changed so updating data: ', locale);
  //   getOnboarding();
  //   getTrainers();
  //   getProgrammeQuestionnaire();
  //   getLegals();
  // }, [locale]);

  async function isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected; //&& response.isInternetReachable;
  }

  useEffect(() => {
    if (onboarding) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
  }, [onboarding]);

  const getOnboarding = useCallback(async () => {
    const available = await isNetworkAvailable();
    if (available) {
      const res = await runQuery({
        query: Onboarding,
        key: 'onboardingScreens',
        setValue: async (res) => {
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

            if (data && data.length > 0) {
              // Preload all onboarding images
              const images = data.map((it) => {
                return {uri: it.image};
              });
              FastImage.preload(images);

              // const images = data.map((it) => it.image);
              // await cacheImages(images);

              setOnboarding(data);
            } else {
              setOnboarding(isRTL() ? fallbackData.reverse() : fallbackData);
            }
          }
        },
      });
    } else {
      setOnboarding(isRTL() ? fallbackData.reverse() : fallbackData);
    }
  }, [runQuery, isConnected, isInternetReachable, onboarding]);

  const getTrainers = useCallback(async () => {
    const res = await runQuery({
      query: Trainers,
      key: 'getTrainers',
      setValue: async (res) => {
        if (res) {
          const data = res.slice().filter((it) => it.programmes.length > 0);

          // Preload all programmeImages

          const available = await isNetworkAvailable();
          if (available) {
            const images = [];
            data.map((trainer) => {
              trainer.programmes.map((it) => {
                images.push({uri: it.programmeImage});
              });
            });
            FastImage.preload(images);

            // const images = [];
            // data.map((trainer) => {
            //   trainer.programmes.map((it) => {
            //     images.push(it.programmeImage);
            //   });
            // });
            // await cacheImages(images);
          }

          setTrainers(data);
        }
      },
    });
  }, [runQuery]);

  const getLegals = useCallback(async () => {
    const res = await runQuery({
      query: Legals,
      key: 'legals',
      setValue: async (res) => {
        setLegals(res);
      },
    });
  }, [runQuery]);

  const getProgrammeQuestionnaire = useCallback(async () => {
    const res = await runQuery({
      query: ProgrammeQuestionnaire,
      key: 'programmeQuestionnaire',
      setValue: async (res) => {
        if (res) {
          const qMap = res.map((question) => {
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
    });
  }, [runQuery, HelpMeChooseDict]);

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
      syncronousUpdate,
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
      syncronousUpdate,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
