/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 15:45:25 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import FastImage from 'react-native-fast-image';


export default function TransformationChallenge({type, title, image, imageUrl, onPress}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {ButtonDict} = dictionary;


  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    box: {
      aspectRatio: 1,
      width: '48%',
      marginBottom: '4%',
    },
    challengeBox: {
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    textContainer: {
      paddingHorizontal: getHeight(10),
      position: 'absolute',
      bottom: getHeight(10),
    },
    progressTitle: {
      ...textStyles.bold12_white100,
      textAlign: 'left',
    },
    progressText: {
      ...textStyles.bold15_white100,
      letterSpacing: 0,
      textAlign: 'left',
    },
    challengeTitle: {
      ...textStyles.bold12_brownishGrey100,
      textAlign: 'left',
    },
    challengeText: {
      ...textStyles.bold15_black100,
      letterSpacing: 0,
      textAlign: 'left',
    },
    photoImage: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
      justifyContent: 'flex-end',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: colors.black40,
    },
    challengeImage: {
      position:'absolute',
      width: '90%',
      height: '50%',
      alignSelf: 'center',

      marginVertical: getHeight(5),
    },
    iconContainer: {
      position: 'absolute',
      top: getHeight(10),
      left: getWidth(10),
    },
    icon: {
      color: colors.white100,
      solid: true,
      size: fontSize(17),
    },
  };
  const [urlLoaded, setUrlLoaded] = useState();
console.log(urlLoaded)
  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={{...styles.box, ...styles.challengeBox}}>
      <TouchableOpacity style={{flex: 1}} onPress={onPress}>

        <SafeFastImage imageUrl={imageUrl} fallback={image} staticStyle={type === 'progress' ? styles.photoImage : styles.challengeImage}
          dynamicStyle={styles.photoImage} overlay={type === 'progress' || urlLoaded} callbackSetLoaded={setUrlLoaded} />
      
        {type === 'progress' && (
          <View style={styles.iconContainer}>
          <TDIcon input={'camera'} inputStyle={styles.icon} />
        </View>
        )}
        <View style={styles.textContainer}>
          <Text style={type === 'progress' || urlLoaded ? styles.progressTitle : styles.challengeTitle}>{type === 'progress' ?  ButtonDict.Progress : ButtonDict.Challenge}</Text>
          <Text style={type === 'progress' || urlLoaded ? styles.progressText : styles.challengeText} numberOfLines={type === 'progress' ? 1 : 2}>{title}</Text>
        </View>

      </TouchableOpacity>
    </View>
  );
}


function SafeFastImage({imageUrl, fallback, staticStyle, dynamicStyle, overlay = false, callbackSetLoaded }) {
  const {colors} = useTheme();
  const [urlLoaded, setUrlLoaded] = useState();

  const overlayStyle = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: colors.black40,
  };

  return (
    <>
    {!imageUrl ? <Image style={staticStyle} source={fallback}/> : 
      <>
      <Image style={staticStyle} source={fallback}/>
      <FastImage style={dynamicStyle} source={{uri: imageUrl}} fallback={true}
      onLoadEnd={() => {
        callbackSetLoaded && callbackSetLoaded(true);
        setUrlLoaded(true);
      }} 
      onError={() => {
        callbackSetLoaded && callbackSetLoaded(false);
        setUrlLoaded(false);
        }}/>
        </>}
        
     {overlay &&  <View style={overlayStyle} />}
      </>
  )

}