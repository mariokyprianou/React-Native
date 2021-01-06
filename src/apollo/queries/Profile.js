/*
 * Jira Ticket:
 * Created Date: Wed, 6th Jan 2021, 15:10:11 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query Profile {
    profile {
      givenName
      familyName
      email
      gender
      dateOfBirth
      country
      region
      canChangeDevice
      timeZone
      deviceUDID
      createdAt
      updatedAt
    }
  }
`;
