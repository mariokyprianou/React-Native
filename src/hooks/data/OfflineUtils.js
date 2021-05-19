import AsyncStorage from '@react-native-community/async-storage';

const LOG = 'OFFLINE';

const WORKOUT_COMPLETE_PAYLOAD = '@OFFLINE_WORKOUT_COMPLETE';
const WORKOUT_COMPLETE_FIREBASE_PAYLOAD = '@OFFLINE_WORKOUT_COMPLETE_FIREBASE';
const WORKOUTS_COMPLETED = '@OFFLINE_WORKOUTS_COMPLETED';

async function getWorkoutPayloads() {
  let existing =
    (await AsyncStorage.getItem(WORKOUT_COMPLETE_PAYLOAD).catch((error) =>
      console.log(LOG, error),
    )) || '[]';
  existing = JSON.parse(existing);
  return existing;
}

async function getFirebasePayloads() {
  let existingLogs =
    (await AsyncStorage.getItem(
      WORKOUT_COMPLETE_FIREBASE_PAYLOAD,
    ).catch((error) => console.log(LOG, error))) || '[]';
  existingLogs = JSON.parse(existingLogs);
  return existingLogs;
}

async function getWorkoutsCompleteIncreament() {
  let existingIncrement = await AsyncStorage.getItem(
    WORKOUTS_COMPLETED,
  ).catch((error) => console.log(LOG, error));
  return existingIncrement ? parseInt(existingIncrement) : 0;
}

// Save payloads, increament total workouts,
async function completeWorkout(workoutComplete, firebaseEventPayload) {
  // Update offline workoutComplete array
  let existing = await getWorkoutPayloads();
  existing.push(workoutComplete);
  await AsyncStorage.setItem(
    WORKOUT_COMPLETE_PAYLOAD,
    JSON.stringify(existing),
  ).catch((error) => console.log(LOG, error));

  // Update offline workoutComplete analytics array
  let existingLogs = await getFirebasePayloads();
  existingLogs.push(firebaseEventPayload);
  await AsyncStorage.setItem(
    WORKOUT_COMPLETE_FIREBASE_PAYLOAD,
    JSON.stringify(existingLogs),
  ).catch((error) => console.log(LOG, error));

  // Add increament of total workouts
  let existingIncrement = await getWorkoutsCompleteIncreament();
  existingIncrement = existingIncrement + 1;
  await AsyncStorage.setItem(
    WORKOUTS_COMPLETED,
    JSON.stringify(existingIncrement),
  ).catch((error) => console.log(LOG, error));
}

async function clearOfflineQueue() {
  await AsyncStorage.removeItem(WORKOUT_COMPLETE_PAYLOAD);
  await AsyncStorage.removeItem(WORKOUT_COMPLETE_FIREBASE_PAYLOAD);
  await AsyncStorage.removeItem(WORKOUTS_COMPLETED);
}

async function getOfflineCompletedWorkouts() {
  let existing =
    (await AsyncStorage.getItem(WORKOUT_COMPLETE_PAYLOAD).catch((error) =>
      console.log(LOG, error),
    )) || '[]';
  existing = JSON.parse(existing);
  return existing.map((it) => {
    return {
      id: it.workoutId,
      date: it.date,
    };
  });
}

const OfflineUtils = {
  completeWorkout,
  clearOfflineQueue,
  getOfflineCompletedWorkouts,
  getWorkoutsCompleteIncreament,
  getWorkoutPayloads,
  getFirebasePayloads,
};

export default OfflineUtils;
