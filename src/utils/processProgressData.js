/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 11:38:11 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {format} from 'date-fns';

export default processProgressData = (data) => {
  return data.map((day) => {
    const today = format(new Date(), 'yyyy-LL-dd');
    const calendarDay = day.date.slice(0, 10);
    if (calendarDay === today) day.type = 'currentDay';
    if (day.type === null) day.type = 'noData';
    if (day.type === 'NEW_WEEK') day.type = 'newWeek';
    if (day.type === 'WORKOUT_COMPLETED') day.type = 'workoutComplete';
    const dateString = new Date(day.date).toString();
    return {[dateString]: day.type};
  });
};
