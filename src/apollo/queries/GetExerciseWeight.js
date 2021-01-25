/*
 * Jira Ticket:
 * Created Date: Mon, 25th Jan 2021, 16:19:52 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query GetExerciseWeight($exercise: ID!) {
    getExerciseWeight(exercise: $exercise) {
      weight
    }
  }
`;
