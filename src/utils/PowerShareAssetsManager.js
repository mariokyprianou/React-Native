/*
 * Created Date: Thu, 4th Feb 2021, 16:25:20 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {Platform, ActionSheetIOS} from 'react-native';
// import RNFS from 'react-native-fs';

import CustomAssetsGenerator from './CustomAssetsGenerator';
import Share from 'react-native-share';
import ImagesCacheManager from './ImagesCacheManager';
import {SampleBase64, SampleImageUrl, SampleImageUrl2} from './SampleData';

// MARK: - Exposed Share Functions

const shareWeekComplete = async ({
  imageUrl = SampleImageUrl,
  title = "Week 3 complete with\nKatarina's home\nprogramme!",
  // `Week 3 complete with \n${name}'s ${programmeName.toLowerCase()}\n programme!`
  workoutsCompleted = 6,
  totalTimeTrained = '10:90:21',
}) => {
  try {
    let localSharePath = await CustomAssetsGenerator.generateWeekCompleteAsset({
      imageUrl,
      title,
      workoutsCompleted,
      totalTimeTrained,
    });

    return shareDirectlyToInstagramStory(localSharePath);
  } catch (err) {
    throw err;
  }
};

const shareIntAchievemnt = async ({
  imageUrl = SampleImageUrl,
  achievedValue = 12,
  subtitle = 'press-ups in \n 60 seconds',
}) => {
  try {
    let localSharePath = await CustomAssetsGenerator.generateIntAchievementAsset(
      {
        imageUrl,
        achievedValue,
        subtitle,
      },
    );
    return shareDirectlyToInstagramStory(localSharePath);
  } catch (err) {
    throw err;
  }
};

const shareStringAchievement = async ({
  imageUrl = SampleImageUrl,
  achievementValueString = '00:06:31',
  subtitle = '1 mile run',
}) => {
  try {
    let localSharePath = await CustomAssetsGenerator.generateStringAchievementAsset(
      {
        imageUrl,
        achievementValueString,
        subtitle,
      },
    );
    return shareDirectlyToInstagramStory(localSharePath);
  } catch (err) {
    throw err;
  }
};

const shareProgrammeStart = async ({imageUrl = SampleImageUrl, shareTitle}) => {
  try {
    let localSharePath = await CustomAssetsGenerator.generateSimpleShareableAsset(
      imageUrl,
    );
    return shareDirectlyToInstagramStory(localSharePath);
  } catch (err) {
    throw err;
  }
};

const shareProgress = async ({
  beforeImageUrl = SampleImageUrl,
  afterImageUrl = SampleImageUrl2,
}) => {
  try {
    let localSharePath = await CustomAssetsGenerator.generateGifAsset({
      beforeImageUrl,
      afterImageUrl,
    });
    return shareDirectlyToInstagramStory(localSharePath);
  } catch (err) {
    throw err;
  }
};

// MARK: - Private share sub-functions

const shareDirectlyToInstagramStory = async (path) => {
  console.log(path);

  const shareSingleOptions = {
    backgroundImage: path,
    method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
    social: Share.Social.INSTAGRAM_STORIES,
    
    
    ...Platform.select({
      // Necessary due to bug in
      // node_modules/react-native-share/android/src/main/java/cl/json/social/SingleShareIntent.java
      android: {
        forceDialog: true,
      },
    }),
  };

  return Share.shareSingle(shareSingleOptions)
    .then((res) => {
      
      // .then  is called before we actually share  :/
      if (Platform.OS === 'ios') {
          ImagesCacheManager.unlinkFileFromAbsolutePath(path);
      }
      return res;
    })
    .catch((err) => {
      ImagesCacheManager.unlinkFileFromAbsolutePath(path);
      throw err;
    });
};

// WIP for share multiple - depreciated

const shareOpen = (path, title) => {
  const shareOptions = {
    title: title,
    url: path,
    subject: title,
    message: title,
  };

  return Share.open(shareOptions)
    .then((res) => {
      ImagesCacheManager.unlinkFileFromAbsolutePath(path);
      console.log('Share res', res);
      return res;
    })
    .catch((err) => {
      ImagesCacheManager.unlinkFileFromAbsolutePath(path);
      const {message} = err;
      if (message === 'User did not share') {
        console.log('Share cancelled');
        return;
      } else {
        throw err;
      }
    });
};

const PowerShareAssetsManager = {
  shareWeekComplete,
  shareIntAchievemnt,
  shareStringAchievement,
  shareProgrammeStart,
  shareProgress,
};

export default PowerShareAssetsManager;
