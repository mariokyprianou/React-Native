/*
 * Jira Ticket:
 * Created Date: Fri, 23rd Apr 2021, 11:47:09 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query LookupCountry {
    lookupCountry {
      id
      name
      code
    }
  }
`;
