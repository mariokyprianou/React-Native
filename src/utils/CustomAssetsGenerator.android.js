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

const {AndroidAssetCreator, GIFManager} = NativeModules;

const nativeAssetCreator = AndroidAssetCreator;

const generateWeekCompleteAsset = async ({
  imageUrl,
  title,
  workoutsCompleted,
  totalTimeTrained,
  workoutsCompletedText = 'Workouts',
  totalTimeText = 'Total time',
  colour,
}) => {
  try {
    // Download background image
    let pathToBgImageFromDocumentsDir = await ImagesCacheManager.cacheImageFromUrl(
      imageUrl,
    );

    const data = {
      url: pathToBgImageFromDocumentsDir,
      title: title,
      workoutsCompleted: `${workoutsCompleted}`,
      totalTimeTrained: `${totalTimeTrained}`,
      workoutsCompletedText,
      totalTimeText,
      colour,
    };

    // Modify background image
    let modifiedImagePath = await nativeAssetCreator.createBase64ImageForWorkoutComplete(
      data,
    );

    // PAth of modified image
    const localSharePath = 'file:/' + modifiedImagePath;

    return localSharePath;
  } catch (err) {
    throw err;
  }
};

const generateIntAchievementAsset = async ({
  imageUrl,
  achievedValue,
  subtitle,
  colour,
}) => {
  try {
    let pathToBgImageFromDocumentsDir = await ImagesCacheManager.cacheImageFromUrl(
      imageUrl,
    );

    const data = {
      url: pathToBgImageFromDocumentsDir,
      achievedValue: `${achievedValue}`,
      subtitle: subtitle,
      colour,
    };

    let modifiedImagePath = await nativeAssetCreator.createBase64ImageForIntAchievement(
      data,
    );

    const localSharePath = 'file:/' + modifiedImagePath;
    return localSharePath;
  } catch (err) {
    throw err;
  }
};

const generateStringAchievementAsset = async ({
  imageUrl,
  achievementValueString,
  subtitle,
  colour,
}) => {
  try {
    let pathToBgImageFromDocumentsDir = await ImagesCacheManager.cacheImageFromUrl(
      imageUrl,
    );

    const data = {
      url: pathToBgImageFromDocumentsDir,
      achievedValue: achievementValueString,
      subtitle: subtitle,
      colour,
    };

    let modifiedImagePath = await nativeAssetCreator.createBase64ImageForStringAchievement(
      data,
    );

    const localSharePath = 'file:/' + modifiedImagePath;
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

    console.log('Gif created!');
    // await ImagesCacheManager.unlinkFileFromRelevantPath(localPathToBackground);
    // await ImagesCacheManager.unlinkFileFromRelevantPath(localPathToBeforeImage);
    // await ImagesCacheManager.unlinkFileFromRelevantPath(localPathToAfterImage);
    const localSharePath = 'file:/' + localGifPath;
    return localSharePath;
  } catch (err) {
    throw err;
  }
};

const generateSimpleShareableAsset = async (url) => {
  try {
    let pathFromDocumentsDir = await ImagesCacheManager.cacheImageFromUrl(url);
    const {dirs} = RNFetchBlob.fs;
    let completePath = `${dirs.DocumentDir}${pathFromDocumentsDir}`;

    const localSharePath = 'file:/' + completePath;

    return localSharePath;
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
