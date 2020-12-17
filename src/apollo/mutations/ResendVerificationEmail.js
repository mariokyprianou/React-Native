/*
 * Jira Ticket:
 * Created Date: Thu, 17th Dec 2020, 16:30:30 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation ResendVerificationEmail($email: String!) {
    resendVerificationEmail(email: $email)
  }
`;
