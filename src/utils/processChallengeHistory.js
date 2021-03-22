/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 14:32:45 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import {format} from 'date-fns';

export default processChallengeHistory = (
  data,
  weightPreference,
  unitType,
  type,
) => {
  return data.map((event) => {
    const newEvent = {...event};

    if (unitType === 'WEIGHT' && weightPreference === 'lb') {
      const convertedWeight = Math.round(newEvent.value * 2.20462262185);
      newEvent.value = convertedWeight;
    }

    if (unitType === 'DISTANCE' && weightPreference === 'lb') {
      const convertedDistance = newEvent.value * 0.621371;
      newEvent.value = convertedDistance;
    }

    newEvent.date = format(new Date(event.createdAt), 'dd/LL');

    return newEvent;
  });
};
