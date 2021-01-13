/*
 * Jira Ticket:
 * Created Date: Mon, 14th Dec 2020, 08:30:45 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query ProgrammeQuestionnaire {
    programmeQuestionnaire {
      id
      orderIndex
      question {
        language
        question
        answer1
        answer2
        answer3
        answer4
      }
    }
  }
`;
