/*
 * Created Date: Fri, 20th Nov 2020, 11:00:38 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */
import RNRestart from 'react-native-restart';

import {I18nManager} from 'react-native';

export const languageRestart = async (locale) => {
  //changing language based on what was chosen
  if (locale === 'rtl') {
    if (!I18nManager.isRTL) {
      await I18nManager.forceRTL(true);
    } else {
      return true;
    }
  } else {
    if (I18nManager.isRTL) {
      await I18nManager.forceRTL(false);
    } else {
      return true;
    }
  }
  RNRestart.Restart()
    .then()
    .catch((err) => {});
};
