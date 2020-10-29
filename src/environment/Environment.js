/*
 * Created Date: Fri, 27th Dec 2019, 20:50:36 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

const selectEnv = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  } else if (process.env.NODE_ENV === 'development') {
    return 'development';
  }

  return 'staging';
};

const Environment = selectEnv();

export default Environment;
