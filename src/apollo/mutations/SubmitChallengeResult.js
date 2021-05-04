/*
 * Jira Ticket:
 * Created Date: Wed, 25th Nov 2020, 16:10:03 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation SubmitChallengeResult($input: SubmitChallengeResultInput) {
    submitChallengeResult(input: $input) {
      success
    }
  }
`;
