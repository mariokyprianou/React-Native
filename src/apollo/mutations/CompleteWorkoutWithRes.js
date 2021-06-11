



import gql from 'graphql-tag';

export default gql`
  mutation CompleteWorkout($input: CompleteWorkoutInput!) {
    completeWorkout(input: $input) {
        success
        programme {
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
  }
`;



