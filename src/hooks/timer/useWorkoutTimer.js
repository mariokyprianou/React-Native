
import React from 'react';

import DataContext from './WorkoutTimerContext';

export default () => {
  const context = React.useContext(DataContext);

  if (context === undefined) {
    throw new Error(
      '`DataHook` hook must be used within a `DataProvider` component',
    );
  }
  return context;
};
