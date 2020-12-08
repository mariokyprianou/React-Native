/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 16:28:12 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const onboardingImage = require('../../../assets/images/onboardingImage.png');

const fakeData = [
  {
    header: 'Transform your life',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: onboardingImage,
    orderIndex: 0,
  },
  {
    header: 'Train like the best',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: onboardingImage,
    orderIndex: 1,
  },
  {
    header: 'Plan your workouts',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: onboardingImage,
    orderIndex: 2,
  },
  {
    header: 'Pick your programme',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: onboardingImage,
    orderIndex: 3,
  },
];

export default function useOnboarding() {
  const [onboardingData, setOnboardingData] = useState(fakeData);

  return {onboardingData};
}
