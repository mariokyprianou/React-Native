/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 12:52:34 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

const addRestDays = (ddata) => {
  const data = ddata.map((currentDay, index) => {
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

    // data.splice(3, 0, restDay);
    // data.splice(6, 0, restDay);
  } else if (data.length === 4) {
    res.push(data[0]);
    res.push(data[1]);
    res.push(restDay);
    res.push(data[2]);
    res.push(data[3]);
    res.push(restDay);
    res.push(restDay);

    // data.splice(2, 0, restDay);
    // data.splice(5, 0, restDay, restDay);
  } else if (data.length === 3) {
    res.push(data[0]);
    res.push(restDay);
    res.push(data[1]);
    res.push(restDay);
    res.push(data[2]);
    res.push(restDay);
    res.push(restDay);

    // data.splice(1, 0, restDay);
    // data.splice(3, 0, restDay);
    // data.splice(5, 0, restDay, restDay);
  }
  return res;
};

export default addRestDays;
