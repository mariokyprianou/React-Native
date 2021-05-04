/*
 * Created Date: Thu, 28th Jan 2021, 23:21:22 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */

import React, {useState} from 'react';
import LoadingContext from './LoadingContext';

export default function DataProvider(props) {
  const [loading, setLoading] = useState(false);

  // ** ** ** ** ** Memoize ** ** ** ** **
  const values = React.useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading, setLoading],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <LoadingContext.Provider value={values}>
      {props.children}
    </LoadingContext.Provider>
  );
}
