/*
 * Jira Ticket:
 * Created Date: Mon, 15th Feb 2021, 10:29:37 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation UploadFailed($id: ID!) {
    uploadFailed(id: $id)
  }
`;
