/*
 * Created Date: Thu, 5th Nov 2020, 18:22:16 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {Input} from 'react-native-elements';
import {ScaleHook} from 'react-native-design-to-component';
import TDIcon from 'the-core-ui-component-tdicon';
import {useNavigation} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';

import useDictionary from '../../hooks/localisation/useDictionary';
import useTheme from '../../hooks/theme/UseTheme';
import isRTL from '../../utils/isRTL';

const arrowBackIcon = require('../../../assets/icons/headerBackArrow.png');
const closeIcon = require('../../../assets/icons/headerClose.png');
const shareIcon = require('../../../assets/icons/share.png');
const closeIconWhite = require('../../../assets/icons/closeWhite.png');
const photoSelectIcon = require('../../../assets/icons/photoSelect.png');

export default function Header({
  title,
  goBack,
  showModalCross = false,
  left,
  leftAction,
  right,
  rightAction,
  customTitle,
  customLeft,
  componentRight,
  white,
  transparent,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getWidth, fontSize, getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {} = dictionary;
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState(null);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const insets = useSafeArea();
  const height = 64 + insets.top;

  const styles = {
    container: {
      height,
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: transparent ? undefined : colors.backgroundWhite100,
      width: '100%',
      position: transparent ? 'absolute' : undefined,
    },
    titleContainer: {
      height: height - insets.top,
      justifyContent: 'center',
      width: '70%',
    },
    titleStyle: {
      ...textStyles.bold22_black100,
      color: white ? colors.white100 : colors.black100,
      textAlign: 'center',
    },
    leftButtonContainer: {
      height,
      width: getWidth(50),
      position: 'absolute',
    },
    leftIconContainer: {
      height: height - insets.top,
      justifyContent: 'center',
      marginRight: Platform.OS === 'ios' ? 0 : 5,
      width: '15%',
      alignItems: 'center',
    },
    noBurgerContainer: {
      width: getWidth(25),
    },
    rightButtonContainer: {
      height,
      width: getWidth(50),
      position: 'absolute',
      right: 0,
    },
    rightIconContainer: {
      height: height - insets.top,
      justifyContent: 'center',
      width: '15%',
      alignItems: 'center',
      paddingBottom: right === 'shareIcon' ? 5 : 0,
    },
    searchInputContainer: {
      height: height - insets.top,
      justifyContent: 'center',
      width: '70%',
    },
    searchInputContainerInput: {
      height: height - insets.top,
      justifyContent: 'center',
      borderBottomWidth: 0,
    },
    searchInputTextStyle: {
      ...textStyles.medium20white,
    },
    iconStyle: {
      size: fontSize(20),
      color: white ? colors.white100 : colors.black100,
      tintColor: white ? colors.white100 : colors.black100,
      transform: [{scaleX: isRTL() ? -1 : 1}],
    },
    shareIconStyle: {
      height: getHeight(20),
      width: getWidth(20),
      tintColor: colors.black100,
      resizeMode: 'contain',
    },
    crossIconStyle: {
      height: getHeight(15),
      width: getWidth(15),
      tintColor: white ? colors.white100 : colors.black100,
      resizeMode: 'contain',
    },
    photoIconStyle: {
      height: getHeight(28),
      width: getWidth(28),
      tintColor: colors.black100,
      resizeMode: 'contain',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  const renderIcon = (icon) => {
    if (icon === 'shareIcon') {
      return (
        <TDIcon input={shareIcon} inputStyle={{style: styles.shareIconStyle}} />
      );
    }
    if (icon === 'crossIcon') {
      return (
        <TDIcon input={closeIcon} inputStyle={{style: styles.crossIconStyle}} />
      );
    }
    if (icon === 'photoSelectIcon') {
      return (
        <TDIcon
          input={photoSelectIcon}
          inputStyle={{style: styles.photoIconStyle}}
        />
      );
    }
    return <TDIcon input={icon} inputStyle={styles.iconStyle} />;
  };

  const renderDefaultHeader = () => {
    return (
      <View style={styles.container}>
        <View style={styles.leftIconContainer}>
          {customLeft ? (
            customLeft()
          ) : left && leftAction ? (
            renderIcon(left)
          ) : goBack ? (
            renderIcon(arrowBackIcon)
          ) : (
            <></>
          )}
        </View>

        <View style={styles.titleContainer}>
          {customTitle ? (
            customTitle()
          ) : (
            <Text style={styles.titleStyle}>{title}</Text>
          )}
        </View>

        <View style={styles.rightIconContainer}>
          {componentRight ? (
            componentRight()
          ) : right && rightAction ? (
            renderIcon(right)
          ) : showModalCross ? (
            renderIcon(white ? closeIconWhite : closeIcon)
          ) : (
            <></>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      {renderDefaultHeader()}

      {(left && leftAction) || goBack ? (
        <TouchableOpacity
          style={styles.leftButtonContainer}
          onPress={
            leftAction
              ? () => leftAction()
              : goBack
              ? () => navigation.goBack()
              : () => null
          }
        />
      ) : (
        <View style={styles.leftButtonContainer} />
      )}

      {(right && rightAction) || showModalCross ? (
        <TouchableOpacity
          style={styles.rightButtonContainer}
          onPress={
            rightAction
              ? () => rightAction()
              : showModalCross
              ? () => navigation.goBack()
              : () => null
          }
        />
      ) : (
        <View style={styles.rightButtonContainer} />
      )}
    </>
  );
}
