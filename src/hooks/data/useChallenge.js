/*
 * Jira Ticket: 
 * Created Date: Tue, 10th Nov 2020, 15:20:04 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fakeChallengeData =
  {
    name: '60-second squats',
    description:
    'Start the timer and see how many 4kg squats you can do in 60 seconds!',
  timeLimit: 60,
  answerBoxLabel: 'NUMBER OF SQUATS',
  result: '23 SQUATS',
    trainerName: 'Katrina',
  };

export default function useOnboarding() {
  const [challengeData, setChallengeData] = useState(fakeChallengeData);

  return {challengeData};
}
