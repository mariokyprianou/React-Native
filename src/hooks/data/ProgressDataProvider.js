/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {useLazyQuery, useApolloClient} from '@apollo/client';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import DataContext from './ProgressDataContext';
import Progress from '../../apollo/queries/Progress';
import ChallengeHistory from '../../apollo/queries/ChallengeHistory';
import Challenges from '../../apollo/queries/Challenges';
import ProgressImages from '../../apollo/queries/ProgressImages';
import formatProgressImages from '../../utils/formatProgressImages';
import AsyncStorage from '@react-native-community/async-storage';
import ProgressImage from '../../apollo/queries/ProgressImage';


import {
  differenceInDays,
  differenceInCalendarDays,
  addDays,
  format,
  parseISO,
} from 'date-fns';

import {Auth} from 'aws-amplify';


export default function DataProvider(props) {
  const {isConnected, isInternetReachable} = useNetInfo();
  const client = useApolloClient();


  // Get progress data
  const [progress, setProgress] = useState();

  const [getProgress] = useLazyQuery(Progress, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      setProgress(res.progress);
    },
    onError: (error) => console.log(error, '<---progress query error'),
  });

  // Get challenge history data
  const [history, setHistory] = useState();

  const [getHistory] = useLazyQuery(ChallengeHistory, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      setHistory(res.challengeHistory);
    },
    onError: (err) => console.log(err, '<---progress images err'),
  });

  // Get progress images
  const [userImages, setUserImages] = useState([]);

  const [getImages] = useLazyQuery(ProgressImages, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      const today = new Date();
      const formattedToday = format(today, 'dd/LL/yyyy');
      const emptyListObject = {value: today, label: formattedToday};
      if (res.progressImages.length === 0) {
        setUserImages([emptyListObject]);
      } else {
        const formattedImages = formatProgressImages(res.progressImages);
        setUserImages(formattedImages);
      }
    },
    onError: (err) => console.log(err, '<---progress images err'),
  });

  


  const [challenges, setChallenges] = useState();

  const [getChallenges] = useLazyQuery(Challenges, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      setChallenges(res.challenges);
    },
    onError: (err) => console.log(err, '<---progress images err'),
  });


  useEffect(()=> {
    async function checkAuth() {
      await Auth.currentAuthenticatedUser()
        .then((_res) => {
          getProgress();
          getHistory();
          getImages();

          getChallenges();
          
        })
        .catch(err => {
          console.log("UserDataProvider - checkAuth", err);
        });
      }
   
    checkAuth();
    
  }, [Auth.currentAuthenticatedUser])  



  const [beforePic, setBeforePic] = useState();
  const [afterPic, setAfterPic] = useState();


  const [imageUrls, setImageUrls] = useState([]);

  const getImageUrl = useCallback(async (image) => {

    return client.query({
      query: ProgressImage,
      fetchPolicy: 'no-cache',
      variables: {
        input: {
          id: image.id,
          createdAt: image.createdAt,
        },
      },
    })
    .then((res) => {
      const { url , id} = res.data.progressImage;
      setImageUrls([
        ...imageUrls,
        { id: id, url: url}
      ]);

      return url;
    })
    .catch((err) => console.log(err, 'getImageUrl error'));
  },  [imageUrls]);


  async function checkImages(images) {
    console.log("userImages", images.length);

    const url = await getImageUrl(images[0]);
    setBeforePic(url);
    console.log("setBeforePic --- done");


  
    if (images.length > 1) {
      const url2 = await getImageUrl(images[images.length - 1]);
      setAfterPic(url2);
      console.log("setAfterPic --- done");


    }
    return true;
  }

  useEffect(() => {
   
    if (userImages) {
      const images = userImages.filter(it => it.id);
      if (images && images.length > 0) {
        checkImages(images);
      }
    }


  }, [userImages, setBeforePic, setAfterPic]);


  const getImagesSync = useCallback(async () => {

    return client.query({
      query: ProgressImages,
      fetchPolicy: 'no-cache',
    })
    .then(async (res) => {
      const today = new Date();
      const formattedToday = format(today, 'dd/LL/yyyy');
      const emptyListObject = {value: today, label: formattedToday};
      if (res.data.progressImages.length === 0) {
        setUserImages([emptyListObject]);
      } else {
        const formattedImages = formatProgressImages(res.data.progressImages);
        setUserImages(formattedImages);
        return await checkImages(formattedImages);
      }

    })
    .catch((err) => console.log(err, 'getImageUrl error'));
  },  []);

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
      getImageUrl,
      imageUrls,
      getImagesSync
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
      getImageUrl,
      imageUrls,
      getImagesSync
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
