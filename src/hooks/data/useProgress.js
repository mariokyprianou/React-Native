/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 11:24:05 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const challenges = [
  {
    name: '60-second squats',
  },
  {
    name: '60-second squats',
  },
  {
    name: '60-second squats',
  },
];

export default function useProgress() {
  const [challengeData, setChallengeData] = useState(challenges);

  return {challengeData};
}
