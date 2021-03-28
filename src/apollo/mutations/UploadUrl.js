/*
 * Jira Ticket:
 * Created Date: Thu, 11th Feb 2021, 14:45:34 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation UploadUrl {
    uploadUrl {
      id
      url
    }
  }
`;
