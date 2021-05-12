/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import DataContext from './ProgressDataContext';
import Progress from '../../apollo/queries/Progress';
import ChallengeHistory from '../../apollo/queries/ChallengeHistory';
import Challenges from '../../apollo/queries/Challenges';
import ProgressImages from '../../apollo/queries/ProgressImages';
import formatProgressImages from '../../utils/formatProgressImages'

import useCustomQuery from '../../hooks/customQuery/useCustomQuery';

import {
  format,
} from 'date-fns';

import {Auth, Hub} from 'aws-amplify';
import FastImage from 'react-native-fast-image';

import { cacheImages } from './VideoCacheUtils';


export default function DataProvider(props) {

  const {isConnected, isInternetReachable} = useNetInfo();
  const {runQuery} = useCustomQuery();


  // Get progress data
  const [progress, setProgress] = useState();

  const getProgress = useCallback(async () => {
    const res = await runQuery({
      query: Progress,
      key: 'progress',
      setValue: async (data) => {
        setProgress(data);
        return data;
      },
    });

  }, [runQuery]);



  // Get challenge history data
  const [history, setHistory] = useState();


  const getHistory = useCallback(async () => {
    const res = await runQuery({
      query: ChallengeHistory,
      key: 'challengeHistory',
      setValue: async (data) => {
        setHistory(data);
        return data;
      },
    });

  }, [runQuery]);


  // Get progress images
  const [userImages, setUserImages] = useState([]);



  const getImages = useCallback(async () => {
    const res = await runQuery({
      query: ProgressImages,
      key: 'progressImages',
      setValue: async (res) => {
        const today = new Date();
        const formattedToday = format(today, 'dd/LL/yyyy');
        const emptyListObject = {value: today, label: formattedToday};
        if (res.length === 0) {
          setUserImages([emptyListObject]);
          return [];
        } else {
          const formattedImages = formatProgressImages(res);
          setUserImages(formattedImages);
          return formattedImages;
        }
      },
    });

  }, [runQuery]);



  const [challenges, setChallenges] = useState();

  
  const initCacheImages = useCallback(
    async (list) => {
      if (isConnected) {
        cacheImages(list);
        FastImage.preload(list.map(it =>{ return { uri: it }}));
      }
    },
    [isConnected],
  );


  const getChallenges = useCallback(async () => {
    const res = await runQuery({
      query: Challenges,
      key: 'challenges',
      setValue: async (data) => {

          // const images = data.map(it => {
          //   return it.imageUrl
          //  })
          // initCacheImages(images);

          setChallenges(data);
          return data;
      },
    });

  }, [runQuery, isConnected, isInternetReachable]);

  

  useEffect(() => {
    async function checkAuth() {
      await Auth.currentAuthenticatedUser()
        .then((_res) => {
          getProgress();
          getHistory();
          getImages();

          getChallenges();
        })
        .catch((err) => {
          console.log('UserDataProvider - checkAuth', err);
        });
    }

    Hub.listen("auth", (data) => {
      const { payload } = data;
      console.log("new event has happend ", data);
      if (payload.event === "signIn") {
        console.log("user has signed in");
        checkAuth();
      }
      if (payload.event === "signOut") {
        console.log("user has signed out");
      }
    });

    checkAuth();
  }, []);


  const [beforePic, setBeforePic] = useState();
  const [afterPic, setAfterPic] = useState();


  async function checkImages(images) {
    console.log(images[0])
    if (images.length === 1) {
      setBeforePic(images[0]);
    }
    else {
      setAfterPic(images[0]);
      setBeforePic(images[images.length - 1]);  
    }
    return true;
  }

  useEffect(() => {   

    if (userImages) {
      const images = userImages.filter((it) => it.id);
      if (images && images.length > 0) {
        checkImages(images);
      }
    }
  }, [userImages, setBeforePic, setAfterPic]);


  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
      progress,
      getProgress,
      history,
      getHistory,
      userImages,
      setUserImages,
      getImages,
      challenges,
      getChallenges,
      beforePic,
      setBeforePic,
      afterPic,
      setAfterPic,
    }),
    [
      progress,
      getProgress,
      history,
      getHistory,
      userImages,
      setUserImages,
      getImages,
      challenges,
      getChallenges,
      beforePic,
      setBeforePic,
      afterPic,
      setAfterPic,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
