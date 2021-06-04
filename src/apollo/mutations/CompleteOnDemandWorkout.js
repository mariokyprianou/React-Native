/*
 * Created Date: Thu, 6th May 2021, 16:33:41 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation($input: CompleteOnDemandWorkoutInput!) {
    completeOnDemandWorkout(input: $input) {
      success
    }
  }
`;
