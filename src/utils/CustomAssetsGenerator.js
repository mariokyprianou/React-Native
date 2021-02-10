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
import {SampleBase64} from './SampleData';

const {iOSAssetCreator} = NativeModules;

const mockAndroidCreator = {
  createBase64ImageForWorkoutComplete: () => SampleBase64,
  createBase64ImageForIntAchievement: () => SampleBase64,
  createBase64ImageForStringAchievement: () => SampleBase64,
};

const nativeAssetCreator =
  Platform.OS === 'ios' ? iOSAssetCreator : mockAndroidCreator;

const generateWeekCompleteAsset = async ({
  imageUrl,
  title,
  workoutsCompleted,
  totalTimeTrained,
}) => {
  try {
    let pathToBgImageFromDocumentsDir = await ImagesCacheManager.cacheImageFromUrl(
      imageUrl,
    );
    let base64EncodedImage = nativeAssetCreator.createBase64ImageForWorkoutComplete(
      pathToBgImageFromDocumentsDir,
      title,
      workoutsCompleted,
      totalTimeTrained,
    );
    await ImagesCacheManager.unlinkFileFromRelevantPath(
      pathToBgImageFromDocumentsDir,
    );
    const localImageToSharePath = await ImagesCacheManager.cacheBase64ImagePng(
      base64EncodedImage,
    );
    const localSharePath = 'file://' + localImageToSharePath;
    return localSharePath;
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
    let pathToBgImageFromDocumentsDir = await ImagesCacheManager.cacheImageFromUrl(
      imageUrl,
    );
    let base64EncodedImage = nativeAssetCreator.createBase64ImageForIntAchievement(
      pathToBgImageFromDocumentsDir,
      achievedValue,
      subtitle,
    );
    await ImagesCacheManager.unlinkFileFromRelevantPath(
      pathToBgImageFromDocumentsDir,
    );
    console.log('Asset generated!');
    const localImageToSharePath = await ImagesCacheManager.cacheBase64ImagePng(
      base64EncodedImage,
    );
    const localSharePath = 'file://' + localImageToSharePath;
    return localSharePath;
  } catch (err) {
    throw err;
  }
};

const generateStringAchievementAsset = async ({
  imageUrl,
  achievementValueString,
  subtitle,
}) => {
  try {
    let pathToBgImageFromDocumentsDir = await ImagesCacheManager.cacheImageFromUrl(
      imageUrl,
    );
    let base64EncodedImage = nativeAssetCreator.createBase64ImageForStringAchievement(
      pathToBgImageFromDocumentsDir,
      achievementValueString,
      subtitle,
    );
    await ImagesCacheManager.unlinkFileFromRelevantPath(
      pathToBgImageFromDocumentsDir,
    );
    console.log('Asset generated!');
    const localImageToSharePath = await ImagesCacheManager.cacheBase64ImagePng(
      base64EncodedImage,
    );
    const localSharePath = 'file://' + localImageToSharePath;
    return localSharePath;
  } catch (err) {
    throw err;
  }
};

const CustomAssetsGenerator = {
  generateWeekCompleteAsset,
  generateIntAchievementAsset,
  generateStringAchievementAsset,
};

export default CustomAssetsGenerator;
