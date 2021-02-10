/*
 * Jira Ticket:
 * Created Date: Wed, 10th Feb 2021, 10:38:16 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation StartProgramme($input: ProgrammeSwitchInput!) {
    startProgramme(input: $input)
  }
`;
