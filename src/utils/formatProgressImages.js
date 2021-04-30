/*
 * Jira Ticket:
 * Created Date: Mon, 15th Feb 2021, 14:01:27 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import {format, parse} from 'date-fns';

export default function formatProgressImages(images) {
  return images.sort((a,b) => new Date(Date.parse(a.takenOn)) < new Date(Date.parse(b.takenOn))).map((image) => {
    const idealDate = new Date(Date.parse(image.takenOn));
    const label = format(idealDate, 'dd/LL/y');
    const value = idealDate;
    return {...image, label, value: image.createdAt};
  });
}
