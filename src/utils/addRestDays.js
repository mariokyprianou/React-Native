/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 12:52:34 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import {addDays, format} from 'date-fns';

const addRestDays = (data) => {
  const restDay = {
    title: 'REST DAY',
  };
  if (data.length === 5) {
    data.splice(3, 0, restDay);
    data.splice(6, 0, restDay);
  } else if (data.length === 4) {
    data.splice(2, 0, restDay);
    data.splice(5, 0, restDay, restDay);
  } else if (data.length === 3) {
    data.splice(1, 0, restDay);
    data.splice(3, 0, restDay);
    data.splice(5, 0, restDay, restDay);
  }

  const firstDayOfWeek = data[0].startDay;

  const dataWithDates = data.map((day, index) => {
    if (!day.date) {
      const daysToAdd = index;
      const date = addDays(firstDayOfWeek, daysToAdd);
      const formattedDate = format(date, 'iiii, do LLL');
      day.date = formattedDate;
    }
    return day;
  });
  return dataWithDates;
};

export default addRestDays;
