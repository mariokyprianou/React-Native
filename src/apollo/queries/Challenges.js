/*
 * Jira Ticket:
 * Created Date: Wed, 25th Nov 2020, 15:25:41 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query Challenges {
    challenges {
      id
      timerType
      name
      description
      answerBoxLabel
      timeLimit
    }
  }
`;
