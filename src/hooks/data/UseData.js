/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 09:16:11 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';

import DataContext from './DataContext';

export default function useData() {
  const context = React.useContext(DataContext);

  if (context === undefined) {
    throw new Error(
      '`DataHook` hook must be used within a `DataProvider` component',
    );
  }
  return context;
}
