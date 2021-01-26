/*
 * Jira Ticket:
 * Created Date: Tue, 26th Jan 2021, 12:10:05 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation UpdateExerciseNote($input: ExerciseNoteInput!) {
    updateExerciseNote(input: $input) {
      note
    }
  }
`;
