/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 11:38:11 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {
  eachDayOfInterval,
  startOfMonth,
  lastDayOfMonth,
  format,
} from 'date-fns';

export default (data) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const formattedData = sortedData.map((sortedDay) => {
    const key = format(new Date(sortedDay.date), 'EEE MMM dd yyyy');
    return {[key]: sortedDay.type, day: key};
  });

  const firstOfMonth = startOfMonth(new Date(sortedData[0].date)).toISOString();
  const lastOfMonth = lastDayOfMonth(
    new Date(sortedData[sortedData.length - 1].date),
  ).toISOString();
  const allDays = eachDayOfInterval({
    start: new Date(firstOfMonth),
    end: new Date(lastOfMonth),
  });

  const emptyDaysArray = allDays.map((day) => {
    const key = format(day, 'EEE MMM dd yyyy');
    const today = format(new Date(), 'EEE MMM dd yyyy');
    let type = 'noData';
    if (key === today) type = 'currentDay';
    return {[key]: type, day: key};
  });

  const completeArray = [...formattedData, ...emptyDaysArray];

  const uniqueArray = completeArray
    .filter((item, index) => {
      return completeArray.findIndex((obj) => obj.day === item.day) === index;
    })
    .sort((a, b) => new Date(Object.keys(a)[0]) - new Date(Object.keys(b)[0]));

  const result = uniqueArray.map((dayObj) => {
    const originalDays = sortedData.filter(
      (x) =>
        Object.keys(dayObj)[0] ===
          format(new Date(x.date), 'EEE MMM dd yyyy') &&
        x.workoutType === 'ON_DEMAND',
    );

    const newDayObj = {...dayObj, showDot: originalDays.length > 0};
    delete newDayObj.day;
    return newDayObj;
  });

  return result;
};
