/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 09:14:23 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fakeData = false;

export default function useWorkoutHome() {
  const [takeRestData, setTakeRestData] = useState(fakeData);

  return {takeRestData};
}
