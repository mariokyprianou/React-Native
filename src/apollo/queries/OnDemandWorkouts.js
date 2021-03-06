/*
 * Created Date: Thu, 6th May 2021, 12:49:55 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query onDemandWorkouts($tagIds: [ID!]!) {
    onDemandWorkouts(tagIds: $tagIds) {
      nodes {
        id
        isNew
        name
        overviewImage
        overviewImageThumbnail
        intensity
        isContinuous
        duration
        tags {
          id
          name
        }
        exercises {
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
        programme {
          environment
          trainer {
            name
          }
        }
      }
    }
  }
`;
