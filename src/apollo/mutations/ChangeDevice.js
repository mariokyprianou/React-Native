/*
 * Created Date: Thu, 4th Feb 2021, 17:28:45 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  mutation ChangeDevice($input: ChangeDeviceInput!) {
    changeDevice(input: $input)
  }
`;
