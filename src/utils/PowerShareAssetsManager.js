/*
 * Created Date: Thu, 4th Feb 2021, 16:25:20 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {Platform} from 'react-native';
// import RNFS from 'react-native-fs';

import CustomAssetsGenerator from './CustomAssetsGenerator';
import Share from 'react-native-share';
import ImagesCacheManager from './ImagesCacheManager';
import {SampleBase64, SampleImageUrl, SampleImageUrl2} from './SampleData';

// MARK: - Exposed Share Functions

const shareWeekComplete = async ({
  imageUrl = SampleImageUrl,
  title = "Week 3 complete with \nKatarina's home \nprogramme!",
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

    return shareLocalImage(localSharePath);
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
    return shareLocalImage(localSharePath);
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
    return shareLocalImage(localSharePath);
  } catch (err) {
    throw err;
  }
};

const shareProgrammeStart = ({imageUrl = SampleImageUrl}) => {
  shareLocalImage(imageUrl);
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
    return shareLocalImage(localSharePath);
    // return shareLocalImage(localSharePath);
  } catch (err) {
    throw err;
  }
};

// MARK: - Private share sub-functions

const shareLocalImage = (path, title = 'Share from Power App') => {
  const shareOptions = {
    title: title,
    url: path,
    subject: title,
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

// SHARE SINGLE - UNUSED

// const shareToInstagramOnly = (path) => {
//   const shareSingleOptions = {
//     method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
//     backgroundImage: path,
//     social: Share.Social.INSTAGRAM_STORIES,
//   };
//   return Share.shareSingle(shareSingleOptions)
//     .then((res) => {
//       ImagesCacheManager.unlinkFileFromAbsolutePath(path);
//       console.log('Share res', res);
//       return res;
//     })
//     .catch((err) => {
//       ImagesCacheManager.unlinkFileFromAbsolutePath(path);
//       throw err;
//     });
// };

const PowerShareAssetsManager = {
  shareWeekComplete,
  shareIntAchievemnt,
  shareStringAchievement,
  shareProgrammeStart,
  shareProgress,
};

export default PowerShareAssetsManager;
