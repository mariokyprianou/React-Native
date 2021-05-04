/*
 * Jira Ticket:
 * Created Date: Wed, 17th Feb 2021, 11:16:10 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation CompleteChallenge($input: ChallengeResponseInput!) {
    completeChallenge(input: $input)
  }
`;
