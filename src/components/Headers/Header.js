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

export default function SearchText({
  title,
  noSearch,
  showBurger = true,
  goBack,
  showModalCross = false,
  searchInputChanged
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getWidth, fontSize} = ScaleHook();
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
      textAlign: 'center' ,
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
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  const renderIcon = (icon) => (
    <TDIcon input={icon} inputStyle={styles.iconStyle} />
  );

  const renderDefaultHeader = () => (
    <View style={styles.container}>
      {showBurger ? (
        <View style={styles.leftIconContainer}>{renderIcon('bars')}</View>
      ) : goBack ? (
        <View style={styles.leftIconContainer}>{renderIcon('arrow-left')}</View>
      ) : (
        <View style={styles.leftIconContainer} />
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>

      {showModalCross ? (
        <View style={styles.rightIconContainer}>{renderIcon('times')}</View>
      ) : !noSearch ? (
        <View style={styles.rightIconContainer}>{renderIcon('search')}</View>
      ) : (
        <View style={styles.rightIconContainer} />
      )}
    </View>
  );

  const renderSearchHeader = () => (
    <View style={styles.container}>
      <View style={styles.leftIconContainer}>{renderIcon('arrow-left')}</View>
      {renderSearchInput()}
    </View>
  );

  const renderSearchInput = () => (
    <>
      <Input
        containerStyle={styles.searchInputContainer}
        inputContainerStyle={styles.searchInputContainerInput}
        inputStyle={styles.searchInputTextStyle}
        placeholder={"Search.."}
        value={searchText}
        onChangeText={(e) => {
          setSearchText(e);
          if (searchInputChanged) {
            searchInputChanged(e);
          }
        }}
      />
      <View style={styles.rightIconContainer}>
        {searchText === null ? null : renderIcon('times')}
      </View>
    </>
  );

  return (
    <>
      {isSearching ? renderSearchHeader() : renderDefaultHeader()}

      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={
          !showBurger
            ? showModalCross
              ? () => null
              : () => navigation.goBack()
            : isSearching
            ? () => setIsSearching(false)
            : () => navigation.toggleDrawer()
        }
      />

      {showModalCross ? (
        <TouchableOpacity
          style={styles.rightButtonContainer}
          onPress={() => navigation.goBack()}
        />
      ) : !noSearch ? (
        <TouchableOpacity
          style={styles.rightButtonContainer}
          onPress={
            isSearching
              ? () => {
                  setSearchText(null);
                  if (searchInputChanged) {
                    searchInputChanged(null);
                  }
                }
              : () => setIsSearching(true)
          }
        />
      ) : (
        <View style={styles.rightButtonContainer} />
      )}
    </>
  );
}
