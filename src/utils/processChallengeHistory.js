/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 14:32:45 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import {format} from 'date-fns';

export default historyData = (data) =>
  data.map((event) => {
    const formattedDate = format(new Date(event.date), 'dd/LL');
    event.date = formattedDate;
    return event;
  });
