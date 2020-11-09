/*
 * Jira Ticket:
 * Created Date: Thu, 29th Oct 2020, 11:51:42 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {ScaleHook} from 'react-native-design-to-component';

import Colors from '../../styles/Colors';
import ThemeContext from './ThemeContext';

export default function ThemeProvider({children}) {
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const colors = {
    ...Colors,
  };

  const textStyles = {
    bold12_brownishGrey100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    bold12_white100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    bold14_black20: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.black20,
    },
    bold14_white100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    bold15_black100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    bold15_brownishGrey80: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(15),
      lineHeight: fontSize(22),
      color: colors.brownishGrey80,
    },
    bold15_brownishGrey100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(15),
      lineHeight: fontSize(23),
      color: colors.brownishGrey100,
    },
    bold15_white100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    bold16_brownishGrey100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(16),
      lineHeight: fontSize(16),
      color: colors.brownishGrey100,
    },
    bold16_white100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(16),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    bold18_brownishGrey100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(18),
      lineHeight: fontSize(16),
      color: colors.brownishGrey100,
    },
    bold18_white100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(18),
      lineHeight: fontSize(35),
      color: colors.white100,
    },
    bold20_black100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(20),
      lineHeight: fontSize(23),
      color: colors.black100,
    },
    bold21_black100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(21),
      lineHeight: fontSize(35),
      color: colors.black100,
    },
    bold22_black100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(22),
      lineHeight: fontSize(35),
      color: colors.black100,
    },
    bold22_white100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(22),
      lineHeight: fontSize(28),
      color: colors.white100,
    },
    bold24_aquamarine100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(24),
      lineHeight: fontSize(35),
      color: colors.aquamarine100,
    },
    bold24_black40: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(24),
      lineHeight: fontSize(35),
      color: colors.black40,
    },
    bold24_black100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(24),
      lineHeight: fontSize(35),
      color: colors.black100,
    },
    bold24_white100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(24),
      lineHeight: fontSize(35),
      color: colors.white100,
    },
    bold30_white100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(30),
      lineHeight: fontSize(35),
      color: colors.white100,
    },
    bold34_aquamarine100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(34),
      lineHeight: fontSize(36),
      color: colors.aquamarine100,
    },
    bold34_black100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(34),
      lineHeight: fontSize(36),
      color: colors.black100,
    },
    bold76_black100: {
      // fontFamily: 'ProximaNova-Bold',
      fontSize: fontSize(76),
      lineHeight: fontSize(68),
      color: colors.black100,
    },
    light15_black100: {
      // fontFamily: 'ProximaNova-Light',
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    medium12_brownishGrey100: {
      // fontFamily: 'ProximaNova-Medium',
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    medium14_aquamarine100: {
      // fontFamily: 'ProximaNova-Medium',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.aquamarine100,
    },
    medium14_black100: {
      // fontFamily: 'ProximaNova-Medium',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    medium14_brownishGrey100: {
      // fontFamily: 'ProximaNova-Medium',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    medium14_brownishGreyTwo100: {
      // fontFamily: 'ProximaNova-Medium',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.brownishGreyTwo100,
    },
    medium14_white100: {
      // fontFamily: 'ProximaNova-Medium',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    medium15_black100: {
      // fontFamily: 'ProximaNova-Medium',
      fontSize: fontSize(15),
      lineHeight: fontSize(18),
      color: colors.black100,
    },
    medium15_brownishGrey100: {
      // fontFamily: 'ProximaNova-Medium',
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    medium15_white100: {
      // fontFamily: 'ProximaNova-Medium',
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    regular10_black80: {
      // fontFamily: 'ProximaNova-Regular',
      fontSize: fontSize(10),
      lineHeight: fontSize(30),
      color: colors.black80,
    },
    regular14_black100: {
      // fontFamily: 'ProximaNova-Regular',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    regular14_white100: {
      // fontFamily: 'ProximaNova-Regular',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    regular15_brownishGrey80: {
      // fontFamily: 'ProximaNova-Regular',
      fontSize: fontSize(15),
      lineHeight: fontSize(18),
      color: colors.brownishGrey80,
    },
    regular15_brownishGrey100: {
      // fontFamily: 'ProximaNova-Regular',
      fontSize: fontSize(15),
      lineHeight: fontSize(18),
      color: colors.brownishGrey100,
    },
    regular15_white100: {
      // fontFamily: 'ProximaNova-Regular',
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    regular16_black100: {
      // fontFamily: 'ProximaNova-Regular',
      fontSize: fontSize(16),
      lineHeight: fontSize(30),
      color: colors.black100,
    },
    regular16_brownishGrey100: {
      // fontFamily: 'ProximaNova-Regular',
      fontSize: fontSize(16),
      lineHeight: fontSize(30),
      color: colors.brownishGrey100,
    },
    semiBold10_brownGrey100: {
      // fontFamily: 'ProximaNova-Semibold',
      fontSize: fontSize(10),
      lineHeight: fontSize(30),
      color: colors.brownGrey100,
    },
    semiBold12_black30: {
      // fontFamily: 'ProximaNova-Semibold',
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.black30,
    },
    semiBold12_black100: {
      // fontFamily: 'ProximaNova-Semibold',
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    semiBold14_black100: {
      // fontFamily: 'ProximaNova-Semibold',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    semiBold14_brownishGrey100: {
      // fontFamily: 'ProximaNova-Semibold',
      fontSize: fontSize(14),
      lineHeight: fontSize(23),
      color: colors.brownishGrey100,
    },
    semiBold14_white100: {
      // fontFamily: 'ProximaNova-Semibold',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    semiBold16_brownishGrey100: {
      // fontFamily: 'ProximaNova-Semibold',
      fontSize: fontSize(16),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    semiBold16_white90: {
      // fontFamily: 'ProximaNova-Semibold',
      fontSize: fontSize(16),
      lineHeight: fontSize(20),
      color: colors.white90,
    },
    semiBold20_black100: {
      // fontFamily: 'ProximaNova-Semibold',
      fontSize: fontSize(20),
      lineHeight: fontSize(29),
      color: colors.black100,
    },
  };

  const cellFormStyles = {
    labelContainerStyle: {
      width: '100%',
      marginTop: getHeight(18),
    },
    labelTextStyle: {
      ...textStyles.medium14_brownishGrey100,
    },
    iconTintColor: colors.black100,
    style: {
    ...textStyles.medium14_brownishGrey100,
      flex: 1,
    },
    inputContainerStyle: {
      padding: 0,
      margin: 0,
      paddingRight: getWidth(6),
    },
    inputStyle: {
      ...textStyles.regular16_black100,
      flex: 1,
      paddingHorizontal: 0,
      margin: 0,
    },
  };

  const cellFormConfig = {
    editedColor: colors.black100,
    inactiveColor: colors.black30,
    activeColor: colors.black100,
    turnOffQuickPicker: true,
    formContainerStyle: {},
    validatePerCell: true,
  };

  const dropdownStyle = {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white100,
      paddingVertical: getHeight(10),
      paddingHorizontal: getWidth(4),
      width: getWidth(300),
    },
    buttonContainer: {
      backgroundColor: colors.skyBlue100,
      marginTop: getHeight(15),
      marginBottom: getHeight(15),
      padding: getWidth(15),
      borderRadius: radius(10),
      width: getWidth(150),
      justifyContent: 'center',
      alignItems: 'center',
    },
    wheelpickerStyle: {
      marginTop: getHeight(15),
      width: getWidth(280),
      height: getHeight(125),
    },
  };

  const headerButtonConfig = {
    headerTitleAlign: 'left',
    headerBackTitleVisible: false,
    headerTintColor: colors.black100,
    headerTitleStyle: {
      ...textStyles.semiBold20_black100,
    },
    headerTitleContainerStyle: {
      left: getWidth(60),
    },
    headerLeftContainerStyle: {
      paddingLeft: getWidth(15),
    },
    headerBackTitle: '',
  };

  const publicMethods = React.useMemo(
    () => ({
      colors,
      textStyles,
      cellFormStyles,
      cellFormConfig,
      dropdownStyle,
      headerButtonConfig,
    }),
    [
      colors,
      textStyles,
      cellFormStyles,
      cellFormConfig,
      dropdownStyle,
      headerButtonConfig,
    ],
  );

  return (
    <ThemeContext.Provider value={{...publicMethods}}>
      {children}
    </ThemeContext.Provider>
  );
}
