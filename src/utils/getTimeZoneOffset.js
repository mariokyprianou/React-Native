/*
 * Created Date: Thu, 14th Jan 2021, 19:10:39 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';

const offset = () => {
  const deviceTimeZone = RNLocalize.getTimeZone();

  // Make moment of right now, using the device timezone
  const today = moment().tz(deviceTimeZone);

  // Get the UTC offset in hours
  const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

  return `GMT${currentTimeZoneOffsetInHours}`;
};

export default offset;
