/*
 * Jira Ticket:
 * Created Date: Thu, 23rd Jul 2020, 08:56:00 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';

import DictionaryContext from './DictionaryContext';

export default () => {
  const context = React.useContext(DictionaryContext);

  if (context === undefined) {
    throw new Error(
      '`DictionaryHook` hook must be used within a `DictionaryProvider` component',
    );
  }
  return context;
};
