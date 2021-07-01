/*
 * Created Date: Tue, 19th Jan 2021, 12:27:27 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query Programme {
    getProgramme {
      id
      trainer {
        id
        name
        programmes {
          environment
          numberOfWeeks
        }
      }
      environment
      programmeImage
      programmeImageThumbnail
      isComplete
      currentWeek {
        startedAt
        weekNumber
        workouts {
          id
          orderIndex
          name
          overviewImage
          intensity
          isContinuous
          duration
          completedAt
          exercises {
            id
            orderIndex
            exercise {
              id
              name
              coachingTips
              video
              videoEasy
              videoEasiest
              weight
            }
            sets {
              setNumber
              quantity
              restTime
            }
            setType
            notes
          }
        }
      }
      nextWeek {
        weekNumber
        workouts {
          id
          orderIndex
          name
          overviewImage
          intensity
          isContinuous
          duration
          completedAt
          exercises {
            id
            orderIndex
            exercise {
              id
              name
              coachingTips
              video
              videoEasy
              videoEasiest
              weight
            }
            sets {
              setNumber
              quantity
              restTime
            }
            setType
            notes
          }
        }
      }
    }
  }
`;
