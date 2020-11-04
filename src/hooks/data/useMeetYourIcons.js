/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 16:44:28 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fakeImage = require('../../../assets/fake2.png');

const fakeData = [
  {
    key: 1,
    name: 'Katrina',
    fatLoss: 70,
    fitness: 50,
    buildMuscle: 30,
    image: fakeImage,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    liveWeeks: 12,
    firstWeek: [
      {
        key: 3,
        title: 'Legs day',
        day: 1,
        date: 'Tuesday 3rd November',
        duration: 30,
        intensity: 'low',
      },
      {
        key: 4,
        title: 'Upper body day',
        day: 2,
        date: 'Thursday 5th November',
        duration: 45,
        intensity: 'medium',
      },
      {
        key: 5,
        title: 'Core day',
        day: 3,
        date: 'Saturday 7th November',
        duration: 60,
        intensity: 'high',
      },
    ],
  },
  {
    key: 2,
    name: 'Sally',
    fatLoss: 30,
    fitness: 60,
    buildMuscle: 90,
    image: fakeImage,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    liveWeeks: 10,
    firstWeek: [
      {
        key: 6,
        title: 'Core day',
        day: 1,
        date: 'Tuesday 3rd November',
        duration: 45,
        intensity: 'medium',
      },
      {
        key: 7,
        title: 'Upper body day',
        day: 2,
        date: 'Thursday 5th November',
        duration: 60,
        intensity: 'medium',
      },
      {
        key: 8,
        title: 'Legs day',
        day: 3,
        date: 'Saturday 7th November',
        duration: 90,
        intensity: 'high',
      },
    ],
  },
];

export default function useMeetYourIcons() {
  const [meetYourIconsData, setMeetYourIconsData] = useState(fakeData);

  return {meetYourIconsData};
}
