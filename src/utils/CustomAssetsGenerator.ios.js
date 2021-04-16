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
import RNFetchBlob from 'rn-fetch-blob';
import ImagesCacheManager from './ImagesCacheManager';
import {SampleBase64, SampleImageUrl, SampleImageUrl2} from './SampleData';

const {iOSAssetCreator, GIFManager} = NativeModules;

const nativeAssetCreator = iOSAssetCreator;

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

const generateGifAsset = async ({
  backgroundImageUrl,
  beforeImageUrl,
  afterImageUrl,
  colour,
  beforeDate,
  afterDate,
}) => {
  try {
    let localPathToBackground = await ImagesCacheManager.cacheImageFromUrl(
      backgroundImageUrl,
      'back',
    );
    let localPathToBeforeImage = await ImagesCacheManager.cacheImageFromUrl(
      beforeImageUrl,
      'before',
    );
    let localPathToAfterImage = await ImagesCacheManager.cacheImageFromUrl(
      afterImageUrl,
      'after',
    );

    const data = {
      url: localPathToBackground,
      beforeUrl: localPathToBeforeImage,
      afterUrl: localPathToAfterImage,
      colour,
      beforeDate,
      afterDate,
    };

    const localGifPath = await GIFManager.createVideoFile(data);

    console.log('Video created!');
    const localSharePath = localGifPath;
    return localSharePath;
  } catch (err) {
    throw err;
  }
};

const generateSimpleShareableAsset = async (url) => {
  try {
    let pathFromDocumentsDir = await ImagesCacheManager.cacheImageFromUrl(url);
    const {dirs} = RNFetchBlob.fs;
    let completePath = `${dirs.DocumentDir}/${pathFromDocumentsDir}`;
    return completePath;
  } catch (err) {
    throw err;
  }
};

const CustomAssetsGenerator = {
  generateWeekCompleteAsset,
  generateIntAchievementAsset,
  generateStringAchievementAsset,
  generateGifAsset,
  generateSimpleShareableAsset,
};

export default CustomAssetsGenerator;
