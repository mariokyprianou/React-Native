/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 11:02:01 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import LinearGradient from 'react-native-linear-gradient';
import TDIcon from 'the-core-ui-component-tdicon';

// possible type - addPhoto, addResult, addWeight, allowAnalytics, allowNotifications, changeDevice, changeEmail,
// changePassword, continue, continueFromWeek, createAccount, done, getStarted, goBack, login, programme, remindMe,
// restart, sendResetRequest, setLanguage, share, startNow, startWorkout, tryAgain, pluralise

// possible icon - share, reminder, chevron

// possible variant - white, gradient, transparent

export default function DefaultButton({
  type,
  icon,
  variant,
  weekNo,
  trainerName,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const reminderIcon = require('../../../assets/icons/reminder.png');
  const shareIcon = require('../../../assets/icons/share.png');

  const {
    ButtonText_AddPhoto,
    ButtonText_AddResult,
    ButtonText_AddWeight,
    ButtonText_AllowAnalytics,
    ButtonText_AllowNotifications,
    ButtonText_ChangeDevice,
    ButtonText_ChangeEmail,
    ButtonText_ChangePassword,
    ButtonText_Continue,
    ButtonText_ContinueFromWeek,
    ButtonText_CreateAccount,
    ButtonText_Done,
    ButtonText_GetStarted,
    ButtonText_GoBack,
    ButtonText_Login,
    ButtonText_Programme,
    ButtonText_RemindMe,
    ButtonText_Restart,
    ButtonText_SendResetRequest,
    ButtonText_SetLanguage,
    ButtonText_Share,
    ButtonText_StartNow,
    ButtonText_StartWorkout,
    ButtonText_TryAgain,
    ButtonText_Pluralise,
  } = dictionary;

  const buttonVariant = {
    white: {
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    gradient: {
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
    },
    transparentWhiteText: {
      backgroundColor: 'transparent',
    },
    transparentGreyText: {
      backgroundColor: 'transparent',
    },
  };

  const buttonTextVariant = {
    white: {
      ...textStyles.bold15_black100,
    },
    gradient: {
      ...textStyles.bold15_white100,
    },
    transparentWhiteText: {
      ...textStyles.bold15_white100,
    },
    transparentGreyText: {
      ...textStyles.semiBold16_brownishGrey100,
    },
  };

  const buttonText = {
    addPhoto: ButtonText_AddPhoto,
    addResult: ButtonText_AddResult,
    addWeight: ButtonText_AddWeight,
    allowAnalytics: ButtonText_AllowAnalytics,
    allowNotifications: ButtonText_AllowNotifications,
    changeDevice: ButtonText_ChangeDevice,
    changeEmail: ButtonText_ChangeEmail,
    changePassword: ButtonText_ChangePassword,
    continue: ButtonText_Continue,
    continueFromWeek: ButtonText_ContinueFromWeek,
    createAccount: ButtonText_CreateAccount,
    done: ButtonText_Done,
    getStarted: ButtonText_GetStarted,
    goBack: ButtonText_GoBack,
    login: ButtonText_Login,
    programme: ButtonText_Programme,
    remindMe: ButtonText_RemindMe,
    restart: ButtonText_Restart,
    resetRequest: ButtonText_SendResetRequest,
    setLanguage: ButtonText_SetLanguage,
    share: ButtonText_Share,
    startNow: ButtonText_StartNow,
    startWorkout: ButtonText_StartWorkout,
    tryAgain: ButtonText_TryAgain,
  };

  const iconType = {
    share: shareIcon,
    reminder: reminderIcon,
    chevron: 'chevron-right',
  };

  const iconStyles = {
    share: {
      height: getHeight(18),
      width: getWidth(18),
      tintColor: variant === 'gradient' ? colors.white100 : colors.black100,
    },
    chevron: {
      size: fontSize(12),
      solid: true,
      justifySelf: 'flex-end',
      tintColor: variant === 'gradient' ? colors.white100 : colors.black100,
    },
    reminder: {
      height: getHeight(18),
      width: getWidth(18),
      tintColor: variant === 'gradient' ? colors.white100 : colors.black100,
    },
    imageProps: {
      resizeMode: 'contain',
    },
  };

  const iconVariant = {
    white: {
      color: colors.black100,
    },
    gradient: {
      color: colors.white100,
    },
  };

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      width: '90%',
      height: getHeight(50),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      ...buttonVariant[variant],
    },
    gradient: {
      flex: 1,
      height: getHeight(50),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      ...buttonTextVariant[variant],
    },
    iconContainer: {
      position: 'absolute',
      right: getWidth(15),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  if (variant === 'gradient') {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.tealish100, colors.tiffanyBlue100]}>
          <Text style={styles.text}>{buttonText[type]}</Text>
          {icon && (
            <View style={styles.iconContainer}>
              <TDIcon
                input={iconType[icon]}
                inputStyle={
                  icon === 'chevron'
                    ? {...iconStyles[icon], ...iconVariant[variant]}
                    : {style: iconStyles[icon], ...iconStyles.imageProps}
                }
              />
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }

  if (type === 'continueFromWeek') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`${buttonText[type]} ${weekNo}`}</Text>
        <View style={styles.iconContainer}>
          <TDIcon
            input={'chevron-right'}
            inputStyle={{...iconStyles[icon], ...iconVariant[variant]}}
          />
        </View>
      </View>
    );
  }

  if (type === 'programme') {
    return (
      <View style={styles.container}>
        <Text
          style={
            styles.text
          }>{`${trainerName}${ButtonText_Pluralise} ${buttonText[type]}`}</Text>
        <View style={styles.iconContainer}>
          <TDIcon
            input={'chevron-right'}
            inputStyle={{...iconStyles[icon], ...iconVariant[variant]}}
          />
        </View>
      </View>
    );
  }
  // This ^^ will need different options for pluralising names in Hindi and Urdu

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{buttonText[type]}</Text>
      {icon && (
        <View style={styles.iconContainer}>
          <TDIcon
            input={iconType[icon]}
            inputStyle={
              icon === 'chevron'
                ? {...iconStyles[icon], ...iconVariant[variant]}
                : {style: iconStyles[icon], ...iconStyles.imageProps}
            }
          />
        </View>
      )}
    </View>
  );
}
