/*
 * Jira Ticket:
 * Created Date: Mon, 15th Feb 2021, 13:50:42 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query ProgressImage($input: ProgressImageInput!) {
    progressImage(input: $input) {
      id
      url
      createdAt
    }
  }
`;
