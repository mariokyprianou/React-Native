/*
 * Created Date: Thu, 14th Jan 2021, 16:39:29 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';

import UserDataContext from './UserDataContext';

export default () => {
  const context = React.useContext(UserDataContext);

  if (context === undefined) {
    throw new Error(
      '`DataHook` hook must be used within a `DataProvider` component',
    );
  }
  return context;
};
