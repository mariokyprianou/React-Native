/*
 * Jira Ticket:
 * Created Date: Thu, 7th Jan 2021, 16:36:02 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation UpdatePreference($input: UpdatePreferenceInput!) {
    updatePreference(input: $input) {
      notifications
      emails
      errorReports
      analytics
      downloadQuality
    }
  }
`;
