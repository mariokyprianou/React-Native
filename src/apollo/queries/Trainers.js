/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 15:55:58 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query Trainers {
    getTrainers {
      id
      name
      programmes {
        numberOfWeeks
        programmeImage
        environment
        fatLoss
        fitness
        muscle
        description
        firstWeek {
          orderIndex
          workout {
            intensity
            duration
            name
          }
        }
      }
    }
  }
`;
