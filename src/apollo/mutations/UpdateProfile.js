/*
 * Jira Ticket:
 * Created Date: Thu, 7th Jan 2021, 09:04:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      givenName
      familyName
      gender
      dateOfBirth
      country
      region
    }
  }
`;
