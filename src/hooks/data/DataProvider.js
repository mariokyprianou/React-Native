/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState} from 'react';
import {useQuery, useMutation} from 'react-apollo';
import ProgressImages from '../../apollo/queries/ProgressImages';
import Challenges from '../../apollo/queries/Challenges';
import ChallengeHistory from '../../apollo/queries/ChallengeHistory';
import ProgressHistory from '../../apollo/queries/ProgressHistory';
import Progress from '../../apollo/queries/Progress';
import SubmitChallengeResult from '../../apollo/mutations/SubmitChallengeResult';
import UploadProgressImage from '../../apollo/mutations/UploadProgressImage';
import CreateProgressImage from '../../apollo/mutations/CreateProgressImage';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';

export default function DataProvider({children}) {
  const {isConnected, isInternetReachable} = useNetInfo();

  const [progressImages, setProgressImages] = useState();
  const [challenges, setChallenges] = useState();
  const [challengeHistory, setChallengeHistory] = useState();
  const [progressHistory, setProgressHistory] = useState();
  const [progress, setProgress] = useState();

  const [getProgressImages] = useQuery(ProgressImages, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (newData) => setProgressImages(newData),
  });

  const [getChallenges] = useQuery(Challenges, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (newData) => setChallenges(newData),
  });

  const [getChallengeHistory] = useQuery(ChallengeHistory, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (newData) => setChallengeHistory(newData),
  });

  const [getProgressHistory] = useQuery(ProgressHistory, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (newData) => setProgressHistory(newData),
  });

  const [getProgress] = useQuery(Progress, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (newData) => setProgress(newData),
  });

  const [submitChallengeResult] = useMutation(SubmitChallengeResult, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
  });

  const [uploadProgressImage] = useMutation(UploadProgressImage, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
  });

  const [createProgressImage] = useMutation(CreateProgressImage, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
  });

  // ** ** ** ** ** Memoize ** ** ** ** **
  const values = useMemo(
    () => ({
      progressImages,
      challenges,
      challengeHistory,
      progressHistory,
      progress,
      getProgressImages,
      getChallenges,
      getChallengeHistory,
      getProgressHistory,
      getProgress,
      submitChallengeResult,
      uploadProgressImage,
      createProgressImage,
    }),
    [
      progressImages,
      challenges,
      challengeHistory,
      progressHistory,
      progress,
      getProgressImages,
      getChallenges,
      getChallengeHistory,
      getProgressHistory,
      getProgress,
      submitChallengeResult,
      uploadProgressImage,
      createProgressImage,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}