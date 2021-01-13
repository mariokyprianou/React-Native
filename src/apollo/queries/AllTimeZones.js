/*
 * Jira Ticket:
 * Created Date: Mon, 14th Dec 2020, 15:02:15 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query AllTimeZones {
    allTimeZones {
      id
      timeZone
    }
  }
`;
