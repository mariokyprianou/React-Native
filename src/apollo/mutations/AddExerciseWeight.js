/*
 * Jira Ticket:
 * Created Date: Mon, 25th Jan 2021, 15:38:17 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation AddExerciseWeight($input: ExerciseWeightInput!) {
    addExerciseWeight(input: $input) {
      id
      exerciseId
      weight
      reps
      setNumber
      createdAt
    }
  }
`;
