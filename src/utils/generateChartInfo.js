/*
 * Jira Ticket:
 * Created Date: Mon, 15th Mar 2021, 09:00:48 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */
import processChallengeHistory from './processChallengeHistory';

export default generateChartInfo = (
  history,
  id,
  weightPreference,
  unitType,
  type,
) => {
  let processedHistory = [];
  let chartLabel = '';

  const challengeHistory = history.filter((obj) => obj.challenge.id === id);

  if (challengeHistory.length > 0) {
    const processed = processChallengeHistory(
      challengeHistory[0].history,
      weightPreference,
      unitType,
      type,
    );
    while (processed.length > 12) {
      processed.shift();
    }
    processedHistory = [...processed];
  }

  const dataPoints = processedHistory.map((event, index) => {
    let y = '';
    if (type === 'STOPWATCH') {
      y = (Number(event.value) / 1000).toString();
    } else {
      y = event.value;
    }
    return {x: index + 1, y: y};
  });

  const highestDataPoint = Math.max(...dataPoints.map((point) => point.y));
  const highestValue =
    highestDataPoint > 10
      ? Math.ceil(highestDataPoint / 10) * 10
      : highestDataPoint;
  const intervals = [1, 2, 5, 10, 20, 30, 40, 50];
  let interval;
  let ticks;
  intervals.forEach((interv) => {
    let value = highestValue / interv;
    if (value >= 3 && value <= 5) {
      interval = interv;
      ticks = Math.ceil(value);
    }
  });

  if (type === 'STOPWATCH') {
    chartLabel = 'secs';
  } else {
    if (unitType === 'WEIGHT') {
      chartLabel = weightPreference;
    } else if (unitType === 'REPS') {
      chartLabel = 'reps';
    } else if (unitType === 'DISTANCE' && weightPreference === 'lb') {
      chartLabel = 'm';
    } else if (unitType === 'DISTANCE' && weightPreference === 'kg') {
      chartLabel = 'km';
    }
  }

  console.log(
    {
      processedHistory: processedHistory,
      dataPoints: dataPoints,
      interval: interval,
      ticks: ticks,
      chartLabel: chartLabel,
    },
    '<----IS THIS GOOD',
  );

  return {
    processedHistory: processedHistory,
    dataPoints: dataPoints,
    interval: interval,
    ticks: ticks,
    chartLabel: chartLabel,
  };
};
