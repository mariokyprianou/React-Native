/*
 * Created Date: Wed, 27th Jan 2021, 14:05:23 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */
import {differenceInDays, addDays, format, parse, parseISO} from 'date-fns';

const initializeRestDays = (numberOfWorkouts) => {
  const now = new Date();

  const restDay = function rest(index) {
    return {
      id: 'restDay',
      date: addDays(now, index),
      exactDate: addDays(now, index),
    };
  };

  let storedDays = [];
  if (numberOfWorkouts === 5) {
    storedDays.push(restDay(3));
    storedDays.push(restDay(6));
  } else if (numberOfWorkouts === 4) {
    storedDays.push(restDay(2));
    storedDays.push(restDay(5));
    storedDays.push(restDay(6));
  }
  if (numberOfWorkouts === 3) {
    storedDays.push(restDay(1));
    storedDays.push(restDay(3));
    storedDays.push(restDay(5));
    storedDays.push(restDay(6));
  }

  return storedDays;
};

const dateBeforeDate = (first, second) => 
  first.setHours(0, 0, 0, 0) < second.setHours(0, 0, 0, 0)



const getStoredPastRestDays = (storedDays) => {
  const now = new Date();

  let pastRestDays = storedDays.filter(
    (it) => dateBeforeDate(it.exactDate, now),
  );

  pastRestDays = pastRestDays.map((it) => {
    const formattedDate = format(it.exactDate, 'iiii, do LLL');
    return {
      ...it,
      name: 'REST DAY',
      isRestDay: true,
      date: formattedDate,
      exactDate: it.exactDate,
    };
  });
  return pastRestDays;
};

const getStoredFutureRestDays = (storedDays) => {
  const now = new Date();

  const futureRestDays = storedDays
    .filter((it) => differenceInDays(it.exactDate, now) >= 0)
    .map((it) => {
      const formattedDate = format(it.exactDate, 'iiii, do LLL');

      return {
        ...it,
        name: 'REST DAY',
        isRestDay: true,
        date: formattedDate,
        exactDate: it.exactDate,
      };
    });
  return futureRestDays;
};

const getWeekArrayWithPastDays = (pastWorkouts, pastRestDays) => {
  let week = [];

  // Sort and add past dates
  let past = pastWorkouts.concat(pastRestDays);
  past = past.sort((a, b) => a.exactDate > b.exactDate);
  past.map((it) => {
    week.push(it);
  });
  return week;
};

export {initializeRestDays};
export {getStoredPastRestDays};
export {getStoredFutureRestDays};
export {getWeekArrayWithPastDays};
