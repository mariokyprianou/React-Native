/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 13:51:23 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input)
  }
`;
