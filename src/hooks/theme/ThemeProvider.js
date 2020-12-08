/* eslint-disable react-hooks/exhaustive-deps */
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
import isRTL from '../../utils/isRTL';
import ThemeContext from './ThemeContext';

export default function ThemeProvider({children}) {
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const colors = {
    ...Colors,
  };

  const fonts = {
    bold: 'proximanova-bold',
    semiBold: 'proximanova-semibold',
    regular: 'proximanova-regular',
    medium: 'proximanova-medium',
    light: 'proximanova-light',
  };

  const textStyles = {
    bold10_brownGrey100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(10),
      lineHeight: fontSize(30),
      color: colors.brownGrey100,
    },
    bold12_brownishGrey100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    bold12_white100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    bold14_black20: {
      fontFamily: fonts.bold,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.black20,
    },
    bold14_brownishGrey100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    bold14_white100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    bold15_black100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      letterSpacing: 0.75,
      color: colors.black100,
    },
    bold15_brownishGrey80: {
      fontFamily: fonts.bold,
      fontSize: fontSize(15),
      lineHeight: fontSize(22),
      color: colors.brownishGrey80,
    },
    bold15_brownishGrey100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(15),
      lineHeight: fontSize(23),
      color: colors.brownishGrey100,
    },
    bold15_white100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      letterSpacing: 0.75,
      color: colors.white100,
    },
    bold16_brownishGrey100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(16),
      lineHeight: fontSize(16),
      color: colors.brownishGrey100,
    },
    bold16_white100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(16),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    bold18_brownishGrey100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(18),
      lineHeight: fontSize(16),
      color: colors.brownishGrey100,
    },
    bold18_white100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(18),
      lineHeight: fontSize(35),
      color: colors.white100,
    },
    bold20_black100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(20),
      lineHeight: fontSize(23),
      color: colors.black100,
    },
    bold21_black100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(21),
      lineHeight: fontSize(35),
      color: colors.black100,
    },
    bold22_black100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(22),
      lineHeight: fontSize(35),
      color: colors.black100,
    },
    bold22_white100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(22),
      lineHeight: fontSize(28),
      color: colors.white100,
    },
    bold24_aquamarine100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(24),
      lineHeight: fontSize(35),
      color: colors.aquamarine100,
    },
    bold24_black40: {
      fontFamily: fonts.bold,
      fontSize: fontSize(24),
      lineHeight: fontSize(35),
      color: colors.black40,
    },
    bold24_black100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(24),
      lineHeight: fontSize(35),
      color: colors.black100,
    },
    bold24_white100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(24),
      lineHeight: fontSize(35),
      color: colors.white100,
    },
    bold30_white100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(30),
      lineHeight: fontSize(35),
      color: colors.white100,
    },
    bold30_black100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(30),
      lineHeight: fontSize(36),
      color: colors.black100,
    },
    bold34_aquamarine100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(34),
      lineHeight: fontSize(36),
      color: colors.aquamarine100,
    },
    bold34_black100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(34),
      lineHeight: fontSize(36),
      color: colors.black100,
    },
    bold76_black100: {
      fontFamily: fonts.bold,
      fontSize: fontSize(76),
      lineHeight: fontSize(68),
      color: colors.black100,
    },
    light15_black100: {
      fontFamily: fonts.light,
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    medium10_brownishGrey100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(10),
      lineHeight: fontSize(12),
      color: colors.brownishGrey100,
    },
    medium12_brownishGrey100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    medium14_aquamarine100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.aquamarine100,
    },
    medium14_black100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    medium14_brownishGrey100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    medium14_brownishGreyTwo100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.brownishGreyTwo100,
    },
    medium14_white100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    medium15_black100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(15),
      lineHeight: fontSize(18),
      color: colors.black100,
    },
    medium15_brownishGrey100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    medium15_brownishGreyTwo100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.brownishGreyTwo100,
    },
    medium15_white100: {
      fontFamily: fonts.medium,
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    regular10_black80: {
      fontFamily: fonts.regular,
      fontSize: fontSize(10),
      lineHeight: fontSize(30),
      color: colors.black80,
    },
    regular14_black100: {
      fontFamily: fonts.regular,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    regular14_white100: {
      fontFamily: fonts.regular,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    regular15_brownishGrey80: {
      fontFamily: fonts.regular,
      fontSize: fontSize(15),
      lineHeight: fontSize(18),
      color: colors.brownishGrey80,
    },
    regular15_brownishGrey100: {
      fontFamily: fonts.regular,
      fontSize: fontSize(15),
      lineHeight: fontSize(18),
      color: colors.brownishGrey100,
    },
    regular15_white100: {
      fontFamily: fonts.regular,
      fontSize: fontSize(15),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    regular16_black100: {
      fontFamily: fonts.regular,
      fontSize: fontSize(16),
      lineHeight: fontSize(30),
      color: colors.black100,
    },
    regular16_brownishGrey100: {
      fontFamily: fonts.regular,
      fontSize: fontSize(16),
      lineHeight: fontSize(30),
      color: colors.brownishGrey100,
    },
    semiBold10_brownGrey100: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(10),
      lineHeight: fontSize(30),
      color: colors.brownGrey100,
    },
    semiBold12_black30: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.black30,
    },
    semiBold12_black100: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(12),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    semiBold14_aquamarine100: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.aquamarine100,
    },
    semiBold14_black100: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.black100,
    },
    semiBold14_brownishGrey100: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(14),
      lineHeight: fontSize(23),
      color: colors.brownishGrey100,
    },
    semiBold14_white100: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(14),
      lineHeight: fontSize(20),
      color: colors.white100,
    },
    semiBold16_brownishGrey100: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(16),
      lineHeight: fontSize(20),
      color: colors.brownishGrey100,
    },
    semiBold16_white90: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(16),
      lineHeight: fontSize(20),
      color: colors.white90,
    },
    semiBold20_black100: {
      fontFamily: fonts.semiBold,
      fontSize: fontSize(20),
      lineHeight: fontSize(29),
      color: colors.black100,
    },
  };

  const calendarPillStyles = {
    pillNewWeek: {
      backgroundColor: '#00d6d6', // change to gradient
    },
    pillWorkoutComplete: {
      backgroundColor: colors.aquamarine15,
    },
    pillCurrentDay: {
      borderColor: colors.aquamarine100,
      borderWidth: getWidth(2),
    },
    noData: {
      backgroundColor: 'transparent',
    },
  };

  const calendarTextStyles = {
    textNewWeek: {
      ...textStyles.bold14_white100,
    },
    textWorkoutComplete: {
      ...textStyles.semiBold14_black100,
    },
    textCurrentDay: {
      ...textStyles.semiBold14_aquamarine100,
    },
    noData: {
      ...textStyles.semiBold14_black100,
    },
  };

  const singleCalendarStyles = {
    days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    daysContainerStyles: {
      marginBottom: getHeight(14),
      width: '100%',
      alignSelf: 'center',
    },
    daysTextStyles: {...textStyles.bold10_brownGrey100},
    dateCellStyles: {
      width: getWidth(30),
      height: getWidth(30),
      borderRadius: radius(14),
    },
    pillWidth: {
      width: getWidth(45),
    },
    lookupStyleTable: {
      newWeek: {
        pill: calendarPillStyles.pillNewWeek,
        text: calendarTextStyles.textNewWeek,
      },
      newWeekNewProgramme: {
        pill: calendarPillStyles.pillNewWeek,
        text: calendarTextStyles.textNewWeek,
      },
      workoutComplete: {
        pill: calendarPillStyles.pillWorkoutComplete,
        text: calendarTextStyles.textWorkoutComplete,
      },
      currentDay: {
        pill: calendarPillStyles.pillCurrentDay,
        text: calendarTextStyles.textCurrentDay,
      },
      noData: {
        pill: calendarPillStyles.noData,
        text: calendarTextStyles.noData,
      },
    },
  };

  const cellFormStyles = {
    labelContainerStyle: {
      width: '100%',
      marginTop: getHeight(18),
    },
    labelTextStyle: {
      ...textStyles.medium14_brownishGrey100,
      textAlign: 'left',
    },
    iconTintColor: colors.black100,
    style: {
      ...textStyles.medium14_brownishGrey100,
      flex: 1,
    },
    inputContainerStyle: {
      padding: 0,
      margin: 0,
      paddingHorizontal: getWidth(6),
    },
    inputStyle: {
      ...textStyles.regular16_black100,
      flex: 1,
      paddingHorizontal: 0,
      margin: 0,
      textAlign: 'left',
    },
    writingDirection: isRTL() ? 'rtl' : 'ltr',
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
      backgroundColor: colors.tealish100,
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

  const exerciseViewStyle = {
    contentStyle: {},
    titleContainerStyle: {
      marginTop: getWidth(20),
      marginHorizontal: getWidth(20),
      flexDirection: 'row',
      justifyContent: 'space-between',

      alignItems: 'center',
    },
    exerciseTitleStyle: {
      ...textStyles.bold21_black100,
      textAlign: 'left',
    },
    exerciseDescriptionStyle: {
      marginTop: getHeight(10),
      marginHorizontal: getWidth(20),
      ...textStyles.regular15_brownishGrey100,
      textAlign: 'left',
    },
    competedSetsTitleStyle: {
      ...textStyles.bold18_brownishGrey100,
      lineHeight: getHeight(20),
      textAlign: 'left',
    },
    competedSetsTextStyle: {
      ...textStyles.bold16_brownishGrey100,
      textAlign: 'left',
    },
    checkIconStyle: {
      tintColor: colors.brownishGrey100,
      position: 'absolute',
      alignSelf: 'center',
      margin: getWidth(4),
    },
    setsContainerStyle: {
      marginHorizontal: getWidth(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    extraTextStyle: {
      ...textStyles.semiBold14_black100,
      marginStart: getWidth(6),
    },
    extraContainerStyle: {
      flexDirection: 'row',
      marginTop: getHeight(16),
      marginBottom: getHeight(20),
      marginHorizontal: getWidth(20),
    },
    weightTouchStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    setsCompletedContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    repsContainerStyle: {
      flexDirection: 'row',
      flex: 1,
      marginStart: getWidth(10),
      justifyContent: 'space-evenly',
    },
    timerContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: colors.white90,
      justifyContent: 'center',
    },
    timerTextStyle: {
      ...textStyles.bold76_black100,
      alignSelf: 'center',
      lineHeight: getHeight(80),
    },
  };

  const publicMethods = React.useMemo(
    () => ({
      colors,
      textStyles,
      singleCalendarStyles,
      cellFormStyles,
      cellFormConfig,
      dropdownStyle,
      headerButtonConfig,
      exerciseViewStyle,
    }),
    [
      colors,
      textStyles,
      singleCalendarStyles,
      cellFormStyles,
      cellFormConfig,
      dropdownStyle,
      headerButtonConfig,
      exerciseViewStyle,
    ],
  );

  return (
    <ThemeContext.Provider value={{...publicMethods}}>
      {children}
    </ThemeContext.Provider>
  );
}
