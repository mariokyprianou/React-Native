/*
 * Created Date: Tue, 19th Jan 2021, 12:27:27 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query ProgrammeSchedule {
    programmeSchedule {
      weeks {
        weekNumber
        startedAt
        workouts {
          name
          orderIndex
          duration
          completedAt
        }
      }
    }
  }
`;
