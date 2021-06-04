/*
 * Created Date: Tue, 19th Jan 2021, 12:58:42 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation UpdateOrder($input: [WorkoutOrderInput]) {
    updateOrder(input: $input)
  }
`;
