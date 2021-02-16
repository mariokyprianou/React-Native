/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 11:38:11 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {eachDayOfInterval, startOfMonth, lastDayOfMonth} from 'date-fns';

export default processProgressData = (data) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const formattedData = sortedData.map((sortedDay) => {
    const dayString = sortedDay.date.slice(0, 10);
    return {[sortedDay.date]: sortedDay.type, day: dayString};
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
    const dateString = day.toISOString();
    const dayString = dateString.slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    let type = 'noData';
    if (dayString === today) type = 'currentDay';
    return {[dateString]: type, day: dayString};
  });

  const completeArray = [...formattedData, ...emptyDaysArray];

  const uniqueArray = completeArray
    .filter((item, index) => {
      return completeArray.findIndex((obj) => obj.day === item.day) === index;
    })
    .sort((a, b) => new Date(Object.keys(a)[0]) - new Date(Object.keys(b)[0]));

  return uniqueArray;
};
