/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 16:39:37 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import {useTimer} from 'the-core-ui-module-tdcountdown';

export default function handleTimer(formattedSeconds) {
  const {remainingMS, toggle, reset} = useTimer({
    timer: formattedSeconds,
  });

  return {remainingMS, toggle, reset};
}
