



import gql from 'graphql-tag';

export default gql`
 mutation ScreenshotsTaken {
    screenshotTaken {
        success
      	screenshotsTaken
    }
  }
  `;