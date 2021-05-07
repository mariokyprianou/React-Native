/*
 * Created Date: Fri, 7th May 2021, 14:54:56 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation StartOnDemandWorkout($input: StartOnDemandWorkoutInput!) {
    startOnDemandWorkout(input: $input) {
      success
      workoutsCompleted
    }
  }
`;
