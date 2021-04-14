/*
 * Created Date: Wed, 10th Feb 2021, 15:35:08 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */

import AsyncStorage from '@react-native-community/async-storage';
import {FileManager} from 'the-core-ui-module-tdmediamanager';

const {downloadFilesWithNames} = FileManager;

async function cacheWeekVideos(workouts) {
  const shouldCache = await shouldCacheWeek();

  console.log("shouldCacheWeekVideos", shouldCache);
  if (shouldCache !== true) {
    return;
  }

  // Take out all video urls
  let allVideos = [];
  workouts.map(({exercises}) =>
    exercises.forEach(({exercise}) => {
      let videos = [];
      if (exercise.video) {
        videos.push(exercise.video);
      }
      if (exercise.videoEasy) {
        videos.push(exercise.videoEasy);
      }
      if (exercise.videoEasiest) {
        videos.push(exercise.videoEasiest);
      }
      allVideos = allVideos.concat(videos);
    }),
  );

  // Separate names and urls
  let files = allVideos.map((url) => {
    const filename = url.split('/').pop().split('?').shift();
    return {
      filename: filename,
      url: url,
    };
  });

  // Filter all video files by name so it only caches it once
  const result = [];
  const map = new Map();
  for (const item of files) {
    if (!map.has(item.filename)) {
      map.set(item.filename, true);
      result.push({
        filename: item.filename,
        url: item.url,
      });
    }
  }

  // Download and return files and success
  const res = await downloadFilesWithNames(result);
  console.log('Download result:', res.message);

  // Week was cached, don't download again
  if (res.success) {
    AsyncStorage.setItem('@SHOULD_CACHE_NEW_WEEK', JSON.stringify(false));
  }
}

async function shouldCacheWeek() {
  const SHOULD_CACHE_NEW_WEEK =
    (await AsyncStorage.getItem('@SHOULD_CACHE_NEW_WEEK')) || 'true';
  const cacheWeekEnabled = JSON.parse(SHOULD_CACHE_NEW_WEEK);
  console.log('cacheWeekEnabled', cacheWeekEnabled);

  const DOWNLOAD_ENABLED =
    (await AsyncStorage.getItem('@DOWNLOAD_ENABLED')) || 'false';
  const downloadEnabled = JSON.parse(DOWNLOAD_ENABLED);
  console.log('downloadEnabled', downloadEnabled);

  return cacheWeekEnabled && downloadEnabled;
}

export {cacheWeekVideos};
