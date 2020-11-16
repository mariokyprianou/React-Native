/*
 * Created Date: Mon, 9th Nov 2020, 10:38:06 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import {useState} from 'react';

const data = {
  id: '111',
  name: 'Upper body',
  date: new Date(),
  orderIndex: 0,
  isCompleted: false,
  image: undefined,
  time: '30',
  intensity: 'MEDIUM',
  exercises: [
    {
      id: '1',
      exercise: {
        id: '1',
        name: 'WALKING LUNGES',
        coachingTips: '',
        notes: '',
        videos: [{id: '1', url: '', difficulty: 'MEDIUM'}],
      },
      setType: 'REPETITIONS',
      sets: [{amount: '5', restTime: undefined}],
      additionalInfo: '',
    },
    {
      id: '2',
      exercise: {
        id: '1',
        name: 'WALKING LUNGES',
        coachingTips: '',
        notes: '',
        videos: [{id: '1', url: '', difficulty: 'MEDIUM'}],
      },
      setType: 'REPETITIONS',
      sets: [{amount: '5', restTime: undefined}],
      additionalInfo: '',
    },
  ],
};

export default function useWorkoutData() {
  const [workout, setWorkout] = useState(data);

  return {workout, setWorkout};
}
