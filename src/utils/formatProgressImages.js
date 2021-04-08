/*
 * Jira Ticket:
 * Created Date: Mon, 15th Feb 2021, 14:01:27 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import {format} from 'date-fns';

export default function formatProgressImages(images) {
  return images.map((image) => {
    const label = format(new Date(image.createdAt), 'dd/LL/y');
    const value = image.createdAt;
    return {...image, label, value};
  });
}
