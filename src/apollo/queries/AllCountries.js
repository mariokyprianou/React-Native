/*
 * Jira Ticket:
 * Created Date: Mon, 14th Dec 2020, 14:58:04 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query AllCountries {
    allCountries {
      id
      country
      regions {
        id
        region
      }
    }
  }
`;
