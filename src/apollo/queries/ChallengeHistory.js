/*
 * Jira Ticket:
 * Created Date: Wed, 25th Nov 2020, 14:53:49 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query ChallengeHistory {
    challengeHistory {
      challenge {
        id
        timerType
        name
        description
        answerBoxLabel
        timeLimit
      }
      history {
        id
        week
        value
        unit
      }
    }
  }
`;
