/*
 * Created Date: Thu, 4th Feb 2021, 17:14:49 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */

import gql from 'graphql-tag';

export default gql`
  query Profile {
    profile {
      canChangeDevice
      deviceUDID
      screenshotsTaken
    }
  }
`;
