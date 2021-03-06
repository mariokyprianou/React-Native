/*
 * Created Date: Wed, 3rd Feb 2021, 15:55:10 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import * as R from 'ramda';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import uuid from 'react-native-uuid';

const localFolderName = 'imageCache';
let identifier = uuid.v1();


// MARK: - Private file name & path functions

const checkLocalResForCachedImagesExists = async (clearFolder = false) => {
  const {dirs} = RNFetchBlob.fs;
  const towerTypesImagesDir = `${dirs.DocumentDir}/${localFolderName}`;
  const exists = await RNFetchBlob.fs.exists(towerTypesImagesDir);
  if (!exists) {
    await RNFetchBlob.fs.mkdir(towerTypesImagesDir);
  } else if (clearFolder) {
    await RNFetchBlob.fs.unlink(towerTypesImagesDir);
    await RNFetchBlob.fs.mkdir(towerTypesImagesDir);
  }
};

const fileTypeFrom = (url) => {
  const urlPath = url.split('?')[0];
  const urlSeparated = urlPath.split('.');
  const fileType = urlSeparated[urlSeparated.length - 1];
  return "png"; //fileType;
};

const pathFromDocumentsDirForImageFrom = (url, identifier) => {
  return `/${localFolderName}/${identifier}.${fileTypeFrom(url)}`;
};

const localPathForImageFrom = (url, identifier) => {
  const {dirs} = RNFetchBlob.fs;
  const path = `${dirs.DocumentDir}${pathFromDocumentsDirForImageFrom(
    url,
    identifier,
  )}`;
  return path;
};

const localPathForNewPNGAsset = () => {
  const {dirs} = RNFetchBlob.fs;
  //let identifier = uuid.v1();
  const path = `${dirs.DocumentDir}/${localFolderName}/${identifier}.png`;
  return path;
};

// MARK: - Exposed Functions for Writing & Deleting
// Added identifier param so we can store files with specific names 
const cacheImageFromUrl = async (url, identifier = uuid.v1()) => {
  if (!url) {
    throw new Error('Saving image Error: missing URL');
  }
  //let identifier = uuid.v1();
  await checkLocalResForCachedImagesExists();
  let path = localPathForImageFrom(url, identifier);
  let pathFromDocumentsDir = pathFromDocumentsDirForImageFrom(url, identifier);

  return RNFetchBlob.config({
    fileCache: true,
    path: path,
  })
    .fetch('GET', url, {})
    .then(() => {
      console.log("Saved file on: ", path);
      return pathFromDocumentsDir;
    })
    .catch((errorMessage, statusCode) => {
      throw new Error('Unable to save file from url');
    });
};

const cacheBase64ImagePng = async (base64data) => {
  let path = localPathForNewPNGAsset();
  return RNFetchBlob.fs
    .writeFile(path, base64data, 'base64')
    .then((res) => {
      return path;
    })
    .catch((errorMessage, statusCode) => {
      throw new Error('Unable to save base64 image');
    });
};

const unlinkFileFromAbsolutePath = async (path) => {
  if (!path) {
    throw new Error('Deleting image Error: missing path');
  }
  const {dirs} = RNFetchBlob.fs;
  await RNFetchBlob.fs.unlink(path);
};

const unlinkFileFromRelevantPath = async (path) => {
  if (!path) {
    throw new Error('Deleting image Error: missing path');
  }
  const {dirs} = RNFetchBlob.fs;
  let completePath = `${dirs.DocumentDir}/${path}`;
  await RNFetchBlob.fs.unlink(completePath);
};

const unlinkCacheDir = async () => {
  const {dirs} = RNFetchBlob.fs;
  const completePath = `${dirs.DocumentDir}/${localFolderName}`;
  await RNFetchBlob.fs.unlink(completePath);
};

// const saveBase

const ImagesCacheManager = {
  cacheImageFromUrl,
  cacheBase64ImagePng,
  unlinkFileFromRelevantPath,
  unlinkFileFromAbsolutePath,
  unlinkCacheDir,
};

export default ImagesCacheManager;
