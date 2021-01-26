/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 14:32:45 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import {format} from 'date-fns';

export default processChallengeHistory = (data) =>
  data.map((event) => {
    const date = format(new Date(event.createdAt), 'dd/LL');
    return {...event, date};
  });
