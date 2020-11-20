/*
 * Created Date: Fri, 20th Nov 2020, 14:53:06 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import {I18nManager} from 'react-native';

const isRTL = () => {
  return I18nManager.isRTL;
};

export default isRTL;
