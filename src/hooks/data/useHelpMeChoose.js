/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 16:40:34 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fakeData = [
  {
    key: '1',
    questionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    answers: [
      {
        key: '11',
        answerLetter: 'A',
        answerText: 'Lorem ipsum dolor sit amet',
      },
      {
        key: '12',
        answerLetter: 'B',
        answerText: 'Lorem ipsum dolor sit amet',
      },
      {
        key: '13',
        answerLetter: 'C',
        answerText: 'Lorem ipsum dolor sit amet',
      },
      {
        key: '14',
        answerLetter: 'D',
        answerText: 'Lorem ipsum dolor sit amet',
      },
    ],
  },
  {
    key: '2',
    questionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    answers: [
      {
        key: '15',
        answerLetter: 'A',
        answerText: 'Lorem ipsum dolor sit amet',
      },
      {
        key: '16',
        answerLetter: 'B',
        answerText: 'Lorem ipsum dolor sit amet',
      },
      {
        key: '17',
        answerLetter: 'C',
        answerText: 'Lorem ipsum dolor sit amet',
      },
      {
        key: '18',
        answerLetter: 'D',
        answerText: 'Lorem ipsum dolor sit amet',
      },
    ],
  },
  {
    key: '3',
    questionText: 'Would you rather train at home or in the gym?',
    answers: [
      {
        key: '11',
        answerLetter: 'A',
        answerText: 'Home',
      },
      {
        key: '12',
        answerLetter: 'B',
        answerText: 'Gym',
      },
    ],
  },
];

export default function useHelpMeChoose() {
  const [helpMeChooseData, setHelpMeChooseData] = useState(fakeData);

  return {helpMeChooseData};
}
