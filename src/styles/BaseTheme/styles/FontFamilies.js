/*
 * Created Date: Fri, 3rd Jan 2020, 13:53:44 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {Platform} from 'react-native';

const FontFamilies = {
  ...Platform.select({
    ios: {
      ff1: undefined,
    },
    android: {
      ff1: 'sans-serif-light',
    },
    web: {
      ff1: 'sans-serif-light',
    },
  }),
};

export default FontFamilies;
