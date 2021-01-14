/*
 * Created Date: Thu, 14th Jan 2021, 15:36:01 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */

import * as R from 'ramda';

const getResponse = (res, key) => {
  // MARK: - Localisation
  return R.path(['data', key], res);
};

export default getResponse;
