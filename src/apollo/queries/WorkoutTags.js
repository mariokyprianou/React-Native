/*
 * Created Date: Thu, 6th May 2021, 11:45:08 am
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query {
    workoutTags {
      id
      name
    }
  }
`;
