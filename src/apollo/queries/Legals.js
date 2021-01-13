/*
 * Jira Ticket:
 * Created Date: Thu, 10th Dec 2020, 14:57:02 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query Legals {
    legals {
      termsAndConditions
      privacyPolicy
    }
  }
`;
