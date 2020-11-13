/*
 * Jira Ticket:
 * Created Date: Fri, 13th Nov 2020, 12:15:48 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const weightHistory = [
  {setNumber: 1, reps: 10, weight: 5},
  {setNumber: 2, reps: 5, weight: 5},
  {setNumber: 3, reps: 15, weight: 5},
  {setNumber: 4, reps: 5, weight: 5},
  {setNumber: 5, reps: 20, weight: 5},
  {setNumber: 6, reps: 10, weight: 5},
  {setNumber: 7, reps: 15, weight: 5},
  {setNumber: 8, reps: 20, weight: 5},
  {setNumber: 9, reps: 15, weight: 5},
  {setNumber: 10, reps: 5, weight: 5},
  {setNumber: 11, reps: 10, weight: 5},
];

export default function useProgress() {
  const [weightHistoryData, setWeightHistoryData] = useState(weightHistory);

  return {weightHistoryData};
}
