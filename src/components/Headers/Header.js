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

const arrowBackIcon = require('../../../assets/icons/headerBackArrow.png');
const closeIcon = require('../../../assets/icons/headerClose.png');
const shareIcon = require('../../../assets/icons/share.png');

export default function SearchText({
  title,
  goBack,
  showModalCross = false,
  left,
  leftAction,
  right,
  rightAction,
  customTitle,
  componentRight,
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
      backgroundColor: colors.offWhite100,
      width: '100%',
    },
    titleContainer: {
      height: height - insets.top,
      justifyContent: 'center',
      width: '70%',
    },
    titleStyle: {
      ...textStyles.bold22_black100,
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
      solid: true,
      size: fontSize(20),
      color: colors.black100,
    },
    shareIconStyle: {
      height: getHeight(18),
      width: getWidth(18),
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
    return <TDIcon input={icon} inputStyle={styles.iconStyle} />;
  };

  const renderDefaultHeader = () => (
    <View style={styles.container}>
      {left && leftAction ? (
        <View style={styles.leftIconContainer}>{renderIcon(left)}</View>
      ) : goBack ? (
        <View style={styles.leftIconContainer}>
          {renderIcon(arrowBackIcon)}
        </View>
      ) : (
        <View style={styles.leftIconContainer} />
      )}

      {customTitle || (
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      )}

      {right && rightAction ? (
        <View style={styles.rightIconContainer}>{renderIcon(right)}</View>
      ) : showModalCross ? (
        <View style={styles.rightIconContainer}>{renderIcon(closeIcon)}</View>
      ) : (
        <View style={styles.rightIconContainer} />
      )}

      {componentRight && rightAction && (
        <View style={styles.rightIconContainer}>
          <Text>Hello</Text>
        </View>
      )}
    </View>
  );

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

      {(right && rightAction) ||
      (componentRight && rightAction) ||
      showModalCross ? (
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
