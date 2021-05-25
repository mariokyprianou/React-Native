/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 12:52:34 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

const addRestDays = (workoutsData = []) => {
  const data = workoutsData.map((currentDay, index) => {
    return {
      ...currentDay,
      day: index + 1,
    };
  });

  const restDay = {
    workout: {name: 'REST DAY', duration: 0, intensity: 0, isRestDay: true},
  };

  const res = [];

  if (data.length === 5) {
    res.push(data[0]);
    res.push(data[1]);
    res.push(data[2]);
    res.push(restDay);
    res.push(data[3]);
    res.push(data[4]);
    res.push(restDay);
  } else if (data.length === 4) {
    res.push(data[0]);
    res.push(data[1]);
    res.push(restDay);
    res.push(data[2]);
    res.push(data[3]);
    res.push(restDay);
    res.push(restDay);
  } else if (data.length === 3) {
    res.push(data[0]);
    res.push(restDay);
    res.push(data[1]);
    res.push(restDay);
    res.push(data[2]);
    res.push(restDay);
    res.push(restDay);
  } else {
    data.map((workoutDay) => {
      res.push(workoutDay);
    });

    const restdaysNeeded = 7 - res.length;

    for (let i = 0; i <= restdaysNeeded; i++) {
      res.push(restDay);
    }
  }

  return res;
};

export default addRestDays;
