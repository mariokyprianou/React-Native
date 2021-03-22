/*
 * Jira Ticket:
 * Created Date: Mon, 9th Nov 2020, 15:49:43 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import DropDownPicker from 'react-native-dropdown-picker';
import useTheme from '../../hooks/theme/UseTheme';
import isRTL from '../../utils/isRTL';

const arrowDown = require('../../../assets/icons/sortDown.png');
const arrowUp = require('../../../assets/icons/sortUp.png');

const CustomDateSelectors = ({onPress, storedImages}) => {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    dropdown: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      position: 'absolute',
      top: getHeight(20),
      left: getWidth(20),
      zIndex: 9,
    },
    dropdownContainer: {
      height: getHeight(30),
      width: getWidth(130),
    },
    dropdownBox: {
      backgroundColor: colors.white80,
      borderTopLeftRadius: radius(18),
      borderTopRightRadius: radius(18),
      borderBottomLeftRadius: radius(18),
      borderBottomRightRadius: radius(18),
    },
    dropdownArrow: {
      // position: 'absolute',
      top: getHeight(-3),
    },
    arrowStyle: {
      height: getHeight(18),
      width: getWidth(18),
      resizeMode: 'contain',
    },
    label: {
      ...textStyles.semiBold14_brownishGrey100,
      lineHeight: fontSize(18),
    },
    dropdownList: {
      backgroundColor: colors.white80,
    },
    item: {
      justifyContent: 'flex-start',
      marginLeft: getWidth(6),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const customUp = () => <Image source={arrowUp} style={styles.arrowStyle} />;

  const customDown = () => (
    <Image source={arrowDown} style={styles.arrowStyle} />
  );

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.dropdown}>
      <DropDownPicker
        items={storedImages}
        defaultValue={storedImages[0].value}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdownBox}
        dropDownStyle={styles.dropdownList}
        onChangeItem={(item) => onPress(item, 'before')}
        arrowStyle={styles.dropdownArrow}
        labelStyle={styles.label}
        itemStyle={styles.item}
        customArrowDown={customDown}
        customArrowUp={customUp}
      />
      <DropDownPicker
        items={storedImages}
        defaultValue={storedImages[storedImages.length - 1].value}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdownBox}
        dropDownStyle={styles.dropdownList}
        onChangeItem={(item) => onPress(item, 'after')}
        arrowStyle={styles.dropdownArrow}
        labelStyle={styles.label}
        itemStyle={styles.item}
        customArrowDown={customDown}
        customArrowUp={customUp}
      />
    </View>
  );
};

export default CustomDateSelectors;
