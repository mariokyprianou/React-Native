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
    semiBold20_black100: {
      // fontFamily: 'Poppins-SemiBold',
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
      ...textStyles.semiBold20_black100,
    },
    iconTintColor: colors.black100,
    style: {
      ...textStyles.semiBold20_black100,
      flex: 1,
      marginHorizontal: getWidth(15),
      paddingTop: 0,
      paddingBottom: 0,
    },
    inputContainerStyle: {
      width: '100%',
      padding: 0,
      margin: 0,
      paddingRight: getWidth(12),
      backgroundColor: colors.brownishGrey100,
      borderRadius: radius(10),
      borderColor: colors.brownishGrey100,
      borderWidth: 1,
      height: getHeight(40),
    },
    inputStyle: {
      flex: 1,
      paddingHorizontal: 0,
      margin: 0,
      marginLeft: getWidth(15),
      // fontFamily: 'Poppins-Regular',
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
    },
    dividerStyle: {},
  };

  const cellFormConfig = {
    editedColor: colors.black100,
    inactiveColor: colors.black100,
    activeColor: colors.black100,
    turnOffQuickPicker: true,
    formContainerStyle: {},
    validatePerCell: true,
  };

  const dropdownStyle = {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.brownishGrey100,
      paddingVertical: getHeight(10),
      paddingHorizontal: getWidth(4),
      width: getWidth(300),
      borderRadius: radius(10),
    },
    buttonContainer: {
      backgroundColor: colors.brownishGrey100,
      marginTop: getHeight(15),
      marginBottom: getHeight(15),
      padding: getWidth(15),
      borderRadius: radius(9),
      width: getWidth(150),
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonTextStyle: {
      ...textStyles.semiBold20_black100,
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
