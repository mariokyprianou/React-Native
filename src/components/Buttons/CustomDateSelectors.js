/*
 * Jira Ticket:
 * Created Date: Mon, 9th Nov 2020, 15:49:43 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import DropDownPicker from 'react-native-dropdown-picker';
import useTheme from '../../hooks/theme/UseTheme';
import useTransformation from '../../hooks/data/useTransformation';
import isRTL from '../../utils/isRTL';

const CustomDateSelectors = ({onPress}) => {
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors} = useTheme();
  const {transformationImages} = useTransformation();

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
      width: getWidth(125),
    },
    dropdownBox: {
      backgroundColor: colors.white80,
      borderTopLeftRadius: radius(18),
      borderTopRightRadius: radius(18),
      borderBottomLeftRadius: radius(18),
      borderBottomRightRadius: radius(18),
    },
    dropdownList: {
      backgroundColor: colors.white80,
    },
    dropdownArrow: {
      position: 'absolute',
      top: 0,
      right: isRTL() ? 90 : 0,
    },
  };

  return (
    <View style={styles.dropdown}>
      <DropDownPicker
        items={transformationImages}
        defaultValue={transformationImages[0].value}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdownBox}
        dropDownStyle={styles.dropdownList}
        onChangeItem={(item) => onPress(item, 'before')}
        arrowStyle={styles.dropdownArrow}
      />
      <DropDownPicker
        items={transformationImages}
        defaultValue={transformationImages[0].value}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdownBox}
        dropDownStyle={styles.dropdownList}
        onChangeItem={(item) => onPress(item, 'after')}
        arrowStyle={styles.dropdownArrow}
      />
    </View>
  );
};

export default CustomDateSelectors;
