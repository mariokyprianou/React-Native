/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 09:02:20 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import AuthStack from '../navigation';

export default function AuthContainer(props) {
  return (
    <AuthStack.Navigator>
      {/* <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      /> */}
    </AuthStack.Navigator>
  );
}
