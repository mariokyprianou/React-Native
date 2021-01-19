/*
 * Jira Ticket:
 * Created Date: Tue, 19th Jan 2021, 10:28:05 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation UpdateEmail($email: String!) {
    updateEmail(email: $email)
  }
`;
