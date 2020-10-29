/*
 * Created Date: Fri, 27th Dec 2019, 20:55:53 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

const translateDictionary = {
  'en-GB': {
    App: {
      InitialBuildScreen: {
        Description: 'Default Template Screen',
      },
    },
  },
  'fr-FR': {
    App: {
      InitialBuildScreen: {
        Description: 'Default Template Screen',
      },
    },
  },
};

// Fetch locale variable. Here it is hard coded.
const locale = 'en-GB';
// export dictionary but only the locale version
const Dictionary = translateDictionary[locale];

export default Dictionary;
