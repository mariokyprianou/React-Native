/*
 * Created Date: Sat, 28th Dec 2019, 14:56:46 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import gql from 'graphql-tag';

const OnboardingResponse = gql`
  type Onboarding {
    orderIndex: Int!
    title: String!
    description: String!
    image: String!
  }
`;

const TypeDefs = [OnboardingResponse];

export default TypeDefs;
