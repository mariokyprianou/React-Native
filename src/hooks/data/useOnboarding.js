/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 16:28:12 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fake = require('../../../assets/fake.png');

const fakeData = [
  {
    header: 'Pick your programme',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: fake,
  },
  {
    header: 'Plan your workouts',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: fake,
  },
  {
    header: 'Train like the best',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: fake,
  },
];

export default function useOnboarding() {
  const [onboardingData, setOnboardingData] = useState(fakeData);

  return {onboardingData};
}
