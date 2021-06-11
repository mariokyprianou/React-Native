/*
 * Created Date: Thu, 28th Jan 2021, 23:21:30 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';

import LoadingContext from './LoadingContext';

export default () => {
  const context = React.useContext(LoadingContext);

  if (context === undefined) {
    throw new Error(
      '`DataHook` hook must be used within a `DataProvider` component',
    );
  }
  return context;
};
