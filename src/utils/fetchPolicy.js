/*
 * Jira Ticket:
 * Created Date: Wed, 25th Nov 2020, 16:14:42 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

export default function fetchPolicy(isConnected, isInternetReachable) {
  return isConnected && isInternetReachable ? 'network-only' : 'cache-only';
}
