/*
 * Created Date: Thu, 4th Feb 2021, 16:25:20 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {Platform} from 'react-native';
import * as R from 'ramda';
import RNFetchBlob from 'rn-fetch-blob';
import CustomAssetsGenerator from './CustomAssetsGenerator';
import Share from 'react-native-share';

// `Week 3 complete with \n${name}'s ${programmeName.toLowerCase()}\n programme!`
let sampleUrl =
  'https://i.pinimg.com/originals/bc/72/50/bc72507bed9387ba8c763ce084e78c05.jpg';

// WIP: Share Logic

const shareWeekComplete = async ({
  imageUrl = sampleUrl,
  title = "Week 3 complete with \nKatarina's home \nprogramme!",
  workoutsCompleted = 6,
  totalTimeTrained = '10:90:21',
}) => {
  try {
    let base64EncodedImage = await CustomAssetsGenerator.generateWeekCompleteAsset(
      {
        imageUrl,
        title,
        workoutsCompleted,
        totalTimeTrained,
      },
    );

    let base64ImageResToShare =
      Platform.OS === 'ios'
        ? base64EncodedImage
        : `data:image/png;base64,${base64EncodedImage}`;
    const type = Platform.OS === 'android' ? 'image/png' : 'plain';
    const options = {
      type,
      url: base64ImageResToShare,
      title: 'Share Title',
      subject: 'Share Subject',
      failOnCancel: false,
      filename: 'filename',
      message:
        Platform.OS === 'android'
          ? 'Android Email Message'
          : 'iOS Email Message',
    };
    return Share.open(options);
  } catch (err) {}
};

const shareIntAchievemnt = ({
  imageUrl = sampleUrl,
  achievedValue = 12,
  subtitle = 'press-ups in \n60 seconds',
}) => {};

const shareStringAchievement = ({
  imageUrl = sampleUrl,
  achievemntValueString = '00:06:31',
  subtitle = '1 mile run',
}) => {};

const shareProgrammeStart = ({imageUrl = sampleUrl}) => {};

const PowerShareAssetsManager = {
  shareWeekComplete,
  shareIntAchievemnt,
  shareStringAchievement,
  shareProgrammeStart,
};

export default PowerShareAssetsManager;
