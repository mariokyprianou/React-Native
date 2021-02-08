/*
 * Created Date: Thu, 4th Feb 2021, 09:54:11 am
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {NativeModules} from 'react-native';
import * as R from 'ramda';
import {Platform} from 'react-native';
import ImagesCacheManager from './ImagesCacheManager';

const {iOSAssetCreator} = NativeModules;

const generateWeekCompleteAsset = async ({
  imageUrl,
  title,
  workoutsCompleted,
  totalTimeTrained,
}) => {
  try {
    let pathToBgImageFromDocumentsDir = await ImagesCacheManager.cacheImageFrom(
      imageUrl,
    );
    let base64EncodedImage = iOSAssetCreator.createBase64ImageForWorkoutComplete(
      pathToBgImageFromDocumentsDir,
      title,
      workoutsCompleted,
      totalTimeTrained,
    );
    await ImagesCacheManager.unlinkFileFromRelevantPath(
      pathToBgImageFromDocumentsDir,
    );
    console.log('Asset generated!');
    return base64EncodedImage;
  } catch (err) {
    throw err;
  }
};

const generateIntAchievementAsset = async ({
  imageUrl,
  achievedValue,
  subtitle,
}) => {
  try {
    let pathToBgImageFromDocumentsDir = await ImagesCacheManager.cacheImageFrom(
      imageUrl,
      true,
    );
    let base64EncodedImage = iOSAssetCreator.createBase64ImageForIntAchievement(
      pathToBgImageFromDocumentsDir,
      achievedValue,
      subtitle,
    );
    await ImagesCacheManager.unlinkFileFromRelevantPath(
      pathToBgImageFromDocumentsDir,
    );
    console.log('Asset generated!');
    return base64EncodedImage;
  } catch (err) {
    throw err;
  }
};

const generateStringAchievementAsset = async ({
  imageUrl,
  achievemntValueString,
  subtitle,
}) => {
  try {
    let pathToBgImageFromDocumentsDir = await ImagesCacheManager.cacheImageFrom(
      imageUrl,
      true,
    );
    let base64EncodedImage = iOSAssetCreator.createBase64ImageForStringAchievement(
      pathToBgImageFromDocumentsDir,
      achievemntValueString,
      subtitle,
    );
    await ImagesCacheManager.unlinkFileFromRelevantPath(
      pathToBgImageFromDocumentsDir,
    );
    console.log('Asset generated!');
    return base64EncodedImage;
  } catch (err) {
    throw err;
  }
};

const generateAssetFromImage = () => {};

const CustomAssetsGenerator = {
  generateWeekCompleteAsset,
  generateIntAchievementAsset,
  generateStringAchievementAsset,
};

export default CustomAssetsGenerator;
