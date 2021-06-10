import React, {Component, useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native';
import SafeFastImage from './SafeFastImage';

import {FileManager} from 'the-core-ui-module-tdmediamanager';

const {getLocalFileByNameFromDirectory, imagesDirectoryPath} = FileManager;

// USAGE
/* 
    <PersistedImage
        imageUrl={url}
        style={style}
        fallback={fallback}
        showLoading={true}
        placeholder={true}
        overlayStyle={overlayStyle}
        customOverlay={() => <></>}
        callbackSetLoaded={() => {}}
    />; 
*/

const PersistentImage = ({
  imageUrl,
  style,
  fallback,
  placeholder,
  showLoading,
  overlayStyle,
  customOverlay,
  callbackSetLoaded,
}) => {
  const [urlLoaded, setUrlLoaded] = useState();

  // const [imageSource, setImageSource] = useState();

  // const checkLocal = async (imageUrl) => {
  //   console.log('Image', imageUrl);
  //   const imageName = imageUrl.split('/').pop().split('?').shift();

  //   const res = await getLocalFileByNameFromDirectory(
  //     imageName,
  //     imagesDirectoryPath,
  //   );

  //   console.log('Local image found: ', res.success);
  //   if (res.success) {
  //     setImageSource({
  //       uri: 'file://' + res.path,
  //     });
  //   } else {
  //     setImageSource({uri: image});
  //   }
  // };

  // useEffect(() => {
  //   if (imageSource) return;
  //   if (imageUrl) {
  //     checkLocal(imageUrl);
  //   }
  // }, [imageUrl]);

  return (
    <View style={{...style}}>
      {/* No url to load only static image */}
      {!imageUrl && <Image style={style} source={fallback} />}

      {/* Fallback image if url fails to load */}
      {fallback && urlLoaded === false && (
        <Image style={style} source={fallback} />
      )}

      {/* Placeholder image until url loads */}
      {placeholder && urlLoaded === undefined && (
        <Image style={style} source={fallback} />
      )}

      {/* Main url image load */}
      <SafeFastImage
        source={{
          uri: imageUrl,
          priority: FastImage.priority.high,
        }}
        imageUrl={imageUrl}
        style={style}
        onLoadEnd={() => {
          callbackSetLoaded && callbackSetLoaded(true);
          setUrlLoaded(true);
        }}
        onError={() => {
          callbackSetLoaded && callbackSetLoaded(false);
          setUrlLoaded(false);
        }}
      />

      {/* Optional overlay */}
      {overlayStyle && urlLoaded !== undefined && (
        <View style={{...style, ...overlayStyle}} />
      )}

      {/* Optional custom overlay, something like gradient if needed */}
      {customOverlay && urlLoaded !== undefined && customOverlay()}

      {/* Loading till url loads */}
      {showLoading && urlLoaded === undefined && (
        <View
          style={{...style, position: 'absolute', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default PersistentImage;
