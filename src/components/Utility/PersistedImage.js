import React, {Component, useState} from 'react';
import {View, Image} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native';
import SafeFastImage from './SafeFastImage';

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
        source={{uri: imageUrl, priority: FastImage.priority.high}}
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
