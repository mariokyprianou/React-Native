/*
 * Created Date: Thu, 4th Feb 2021, 16:25:20 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {Platform, ActionSheetIOS} from 'react-native';

import CustomAssetsGenerator from './CustomAssetsGenerator';
import Share from 'react-native-share';
import ImagesCacheManager from './ImagesCacheManager';
import {SampleBase64, SampleImageUrl, SampleImageUrl2} from './SampleData';

// MARK: - Exposed Share Functions

const shareWeekComplete = async ({
  imageUrl = SampleImageUrl,
  title = "Week 3 complete with\nKatarina's home\nprogramme!",
  workoutsCompleted = 6,
  totalTimeTrained = '10:90:21',
  colour = "WHITE"
}) => {
  try {
    let localSharePath = await CustomAssetsGenerator.generateWeekCompleteAsset({
      imageUrl,
      title,
      workoutsCompleted,
      totalTimeTrained,
      colour
    });

    return shareDirectlyToInstagramStory(localSharePath);
  } catch (err) {
    throw err;
  }
};

const shareIntAchievemnt = async ({
  imageUrl = SampleImageUrl,
  achievedValue = 12,
  subtitle = 'press-ups in\n60 seconds',
  colour = "WHITE"
}) => {
  try {
    let localSharePath = await CustomAssetsGenerator.generateIntAchievementAsset(
      {
        imageUrl,
        achievedValue,
        subtitle,
        colour
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
  colour = "WHITE"
}) => {
  try {
    let localSharePath = await CustomAssetsGenerator.generateStringAchievementAsset(
      {
        imageUrl,
        achievementValueString,
        subtitle,
        colour
      },
    );
    return shareDirectlyToInstagramStory(localSharePath);
  } catch (err) {
    throw err;
  }
};

const shareProgrammeStart = async ({imageUrl = SampleImageUrl}) => {
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
  backgroundImageUrl = SampleImageUrl,
  beforeImageUrl = SampleImageUrl,
  afterImageUrl = SampleImageUrl2,
  colour = "WHITE",
  beforeDate,
  afterDate,
}) => {
  try {
    let localSharePath = await CustomAssetsGenerator.generateGifAsset({
      backgroundImageUrl,
      beforeImageUrl,
      afterImageUrl,
      colour,
      beforeDate,
      afterDate,
    });
    return shareDirectlyToInstagramStory(localSharePath);
  } catch (err) {
    throw err;
  }
};

// MARK: - Private share sub-functions

const shareDirectlyToInstagramStory = async (path) => {
  console.log("shareDirectlyToInstagramStory", path);

  // Path should always be this for Android
  // file://data/user/0/com.powerdigitallimited.power/files/imageCache/temp.png

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
      console.log("Err", err);
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
