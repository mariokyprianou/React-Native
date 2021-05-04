/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 16:51:08 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useStopwatch} from 'the-core-ui-module-tdcountdown';

export default function handleTimer() {
  const {elapsedMS, toggle, reset} = useStopwatch();

  return {elapsedMS, toggle, reset};
}
