/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 16:35:36 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fakeImage = require('../../../assets/fakeCard.png');

const fakeData = {
  currentWeek: [
    {
      title: 'UPPER BODY',
      day: 1,
      duration: 30,
      intensity: 'high',
      image: fakeImage,
    },
    {
      title: 'LOWER BODY',
      day: 2,
      duration: 30,
      intensity: 'high',
      image: fakeImage,
    },
    {
      title: 'ABS',
      day: 3,
      duration: 30,
      intensity: 'high',
      image: fakeImage,
    },
    // {
    //   title: 'CARDIO',
    //   day: 4,
    //   duration: 30,
    //   intensity: 'high',
    //   image: fakeImage,
    // },
    // {
    //   title: 'MOBILITY',
    //   day: 5,
    //   duration: 30,
    //   intensity: 'high',
    //   image: fakeImage,
    // },
  ],
  nextWeek: [
    {
      title: 'LEGS',
      day: 1,
      duration: 30,
      intensity: 'high',
      image: fakeImage,
    },
    {
      title: 'UPPER BODY',
      day: 2,
      duration: 30,
      intensity: 'high',
      image: fakeImage,
    },
    {
      title: 'ABS',
      day: 3,
      duration: 30,
      intensity: 'high',
      image: fakeImage,
    },
    // {
    //   title: 'CARDIO',
    //   day: 4,
    //   duration: 30,
    //   intensity: 'high',
    //   image: fakeImage,
    // },
    // {
    //   title: 'MOBILITY',
    //   day: 5,
    //   duration: 30,
    //   intensity: 'high',
    //   image: fakeImage,
    // },
  ],
};

export default function useWorkoutHome() {
  const [workoutHomeData, setWorkoutHomeData] = useState(fakeData);

  return {workoutHomeData};
}
