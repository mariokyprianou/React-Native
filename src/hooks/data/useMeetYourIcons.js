/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 16:44:28 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fakeImage = require('../../../assets/images/trainerCarousel.png');

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
        title: 'LEGS DAY',
        day: 1,
        date: '2020-11-03T10:54:50.221Z',
        duration: 30,
        intensity: 'low',
      },
      {
        key: 4,
        title: 'UPPER BODY DAY',
        day: 2,
        date: '2020-11-05T10:54:50.221Z',
        duration: 45,
        intensity: 'medium',
      },
      {
        key: 5,
        title: 'CORE DAY',
        day: 3,
        date: '2020-11-07T10:54:50.221Z',
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
        title: 'CORE DAY',
        day: 1,
        date: '2020-11-03T10:54:50.221Z',
        duration: 45,
        intensity: 'medium',
      },
      {
        key: 7,
        title: 'UPPER BODY DAY',
        day: 2,
        date: '2020-11-05T10:54:50.221Z',
        duration: 60,
        intensity: 'medium',
      },
      {
        key: 8,
        title: 'LEGS DAY',
        day: 3,
        date: '2020-11-07T10:54:50.221Z',
        duration: 90,
        intensity: 'high',
      },
    ],
  },
];

const fakeUserData = {
  currentTrainer: 'Katrina',
  currentWeek: 7,
};

export default function useMeetYourIcons() {
  const [meetYourIconsData, setMeetYourIconsData] = useState(fakeData);
  const [userProgrammeData, setUserProgrammeData] = useState(fakeUserData);

  return {meetYourIconsData, userProgrammeData};
}
