/*
 * Jira Ticket:
 * Created Date: Mon, 14th Dec 2020, 10:46:03 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation SubmitProgrammeQuestionnaire(
    $input: SubmitProgrammeQuestionnaireInput!
  ) {
    submitProgrammeQuestionnaire(input: $input) {
      programme {
        trainer {
          name
        }
        environment
      }
    }
  }
`;
