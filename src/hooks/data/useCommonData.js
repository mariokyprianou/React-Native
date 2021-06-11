/*
 * Created Date: Sun, 31st Jan 2021, 01:19:20 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';

import DataContext from './CommonDataContext';

export default () => {
  const context = React.useContext(DataContext);

  if (context === undefined) {
    throw new Error(
      '`DataHook` hook must be used within a `DataProvider` component',
    );
  }
  return context;
};
