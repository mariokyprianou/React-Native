/*
 * Jira Ticket:
 * Created Date: Thu, 7th Jan 2021, 14:29:02 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query Preferences {
    preferences {
      notifications
      emails
      errorReports
      analytics
      downloadQuality
    }
  }
`;
