/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 15:20:04 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fakeChallengeData = {
  name: '60-second squats',
  description:
    'Start the timer and see how many 4kg squats you can do in 60 seconds!',
  timeLimit: 60,
  answerBoxLabel: 'NUMBER OF SQUATS',
  result: '23 SQUATS',
  trainerName: 'Katrina',
};

const fakeChallengeHistoryData = [
  {date: '10/07', value: 5, unit: 'reps'},
  {date: '11/07', value: 10, unit: 'reps'},
  {date: '12/07', value: 15, unit: 'reps'},
  {date: '13/07', value: 5, unit: 'reps'},
  {date: '14/07', value: 10, unit: 'reps'},
  {date: '15/07', value: 15, unit: 'reps'},
  {date: '16/07', value: 22, unit: 'reps'},
  {date: '17/07', value: 10, unit: 'reps'},
  {date: '18/07', value: 28, unit: 'reps'},
  {date: '19/07', value: 17, unit: 'reps'},
  {date: '20/07', value: 5, unit: 'reps'},
  {date: '21/07', value: 10, unit: 'reps'},
];

const fakeRepsData = fakeChallengeHistoryData
  .map((item) => item.value)
  .filter((value, index, self) => self.indexOf(value) === index)
  .map((item) => {
    return {label: item.toString(), value: item};
  });

export default function useOnboarding() {
  const [challengeData, setChallengeData] = useState(fakeChallengeData);
  const [challengeHistoryData, setChallengeHistoryData] = useState(
    fakeChallengeHistoryData,
  );
  const [repsHistoryData, setRepsHistoryData] = useState(fakeRepsData);

  return {challengeData, challengeHistoryData, repsHistoryData};
}
