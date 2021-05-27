/*
 * Jira Ticket:
 * Created Date: Fri, 30th Oct 2020, 11:02:01 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import LinearGradient from 'react-native-linear-gradient';
import TDIcon from 'the-core-ui-component-tdicon';
import isRTL from '../../utils/isRTL';

export default function DefaultButton({
  type,
  icon,
  variant,
  weekNo,
  trainerName,
  onPress,
  disabled,
  capitalise,
  customText = '',
  customSubtext,
  promptText,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const reminderIcon = require('../../../assets/icons/reminder.png');
  const shareIcon = require('../../../assets/icons/share.png');
  const playIcon = require('../../../assets/icons/play.png');
  const pauseIcon = require('../../../assets/icons/pauseIcon.png');

  const [pressed, setPressed] = useState(false);

  const {ButtonDict} = dictionary;

  const buttonVariant = {
    white: {
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 3,
    },
    gradient: {
      shadowColor: colors.black20,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 4,
    },
    transparentWhiteText: {
      backgroundColor: 'transparent',
    },
    transparentGreyText: {
      backgroundColor: 'transparent',
    },
    transparentBlackBoldText: {
      backgroundColor: 'transparent',
    },
    grey: {
      backgroundColor: colors.paleTurquoise100,
    },
  };

  const buttonTextVariant = {
    white: {
      ...textStyles.bold15_black100,
      color: disabled ? colors.black40 : colors.black100,
      letterSpacing: 0.75,
    },
    gradient: {
      ...textStyles.bold15_white100,
      letterSpacing: 0.75,
    },
    transparentWhiteText: {
      ...textStyles.bold15_white100,
    },
    transparentGreyText: {
      ...textStyles.semiBold16_brownishGrey100,
    },
    transparentBlackBoldText: {
      ...textStyles.bold15_black100,
      letterSpacing: 0.75,
    },
    grey: {
      ...textStyles.bold15_white100,
    },
  };

  const buttonSubtextVariant = {
    white: {
      ...textStyles.regular14_black100,
      color: disabled ? colors.black40 : colors.black100,
      letterSpacing: 0.75,
    },
    gradient: {
      ...textStyles.regular14_white100,
      letterSpacing: 0.75,
    },
    transparentWhiteText: {
      ...textStyles.regular14_white100,
    },
    transparentGreyText: {
      ...textStyles.regular14_white100,
      color: colors.brownishGrey100,
    },
    transparentBlackBoldText: {
      ...textStyles.regular14_black100,
      letterSpacing: 0.75,
    },
  };

  const buttonText = {
    addPhoto: ButtonDict.AddPhoto,
    addResult: ButtonDict.AddResult,
    addWeight: ButtonDict.AddWeight,
    allowAnalytics: ButtonDict.AllowAnalytics,
    allowNotifications: ButtonDict.AllowNotifications,
    cancel: ButtonDict.Cancel,
    changeDevice: ButtonDict.ChangeDevice,
    changeEmail: ButtonDict.ChangeEmail,
    changePassword: ButtonDict.ChangePassword,
    continue: ButtonDict.Continue,
    continueFromWeek: ButtonDict.ContinueFromWeek,
    createAccount: ButtonDict.CreateAccount,
    done: ButtonDict.Done,
    getStarted: ButtonDict.GetStarted,
    goBack: ButtonDict.GoBackCaps,
    goBackLower: ButtonDict.GoBack,
    jumpIn: ButtonDict.JumpIn,
    login: ButtonDict.Login,
    pause: ButtonDict.Pause,
    programme: ButtonDict.Programme,
    remindMe: ButtonDict.RemindMe,
    resend: ButtonDict.Resend,
    restart: ButtonDict.Restart,
    restartProgramme: ButtonDict.RestartProgramme,
    resetRequest: ButtonDict.SendResetRequest,
    setLanguage: ButtonDict.SetLanguage,
    share: ButtonDict.Share,
    start: ButtonDict.Start,
    startNow: ButtonDict.StartNow,
    startWorkout: ButtonDict.StartWorkout,
    tryAgain: ButtonDict.TryAgain,
    skip: ButtonDict.Skip,
    needHelp: ButtonDict.NeedHelp,
    saveChanges: ButtonDict.SaveChanges,
    needToSignOut: ButtonDict.NeedToSignOut,
    logout: ButtonDict.Logout,
    close: ButtonDict.Close,
  };

  const iconType = {
    share: shareIcon,
    reminder: reminderIcon,
    play: playIcon,
    pause: pauseIcon,
    chevron: isRTL() ? 'chevron-left' : 'chevron-right',
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
    play: {
      height: getHeight(12),
      width: getWidth(10),
    },
    pause: {
      height: getHeight(12),
      width: getWidth(10),
    },
    imageProps: {
      resizeMode: 'contain',
    },
  };

  const iconVariant = {
    white: {
      color: disabled === true ? colors.black30 : colors.black100,
    },
    gradient: {
      color: colors.white100,
    },
  };

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      width: '90%',
      height: getHeight(customSubtext ? 75 : 50),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      ...buttonVariant[variant],
    },
    touch: {
      flex: 1,
      justifyContent: 'center',
      alignItems: customSubtext ? undefined : 'center',
      height: getHeight(customSubtext ? 75 : 50),
    },
    gradient: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: customSubtext ? undefined : 'center',
      height: getHeight(customSubtext ? 75 : 50),
      flexDirection: 'row',
    },
    text: {
      ...buttonTextVariant[variant],
      textAlign: 'left',
    },
    iconContainer: {
      position: 'absolute',
      right: getWidth(15),
    },
    textContainer: {
      flex: 1,
      marginLeft: getWidth(20),
      marginRight: getWidth(icon ? 40 : 20),
      justifyContent: 'center',
    },
    subText: {
      ...buttonSubtextVariant[variant],
      textAlign: 'left',
    },
    promptContainer: {
      backgroundColor: colors.blueGreen100,
      position: 'absolute',
      height: getHeight(24),
      right: getWidth(15),
      paddingHorizontal: getWidth(12),
      top: -getHeight(12),
      justifyContent: 'center',
    },
    promptTextStyle: {
      ...textStyles.medium14_white100,
      textAlign: 'left',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **

  const text = buttonText[type] || customText;
  let finalText =
    capitalise === false
      ? text
      : variant === 'white' ||
        variant === 'gradient' ||
        variant === 'transparentBlackBoldText' ||
        capitalise
      ? text.toUpperCase()
      : text;

  useEffect(() => {
    if (pressed) {
      setTimeout(() => setPressed(false), 1000);
    }
  }, [pressed]);

  const handlePress = () => {
    setPressed(true);
    onPress();
  };

  const renderButtonText = () => {
    if (customSubtext) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{finalText}</Text>
          <Text style={styles.subText}>{customSubtext}</Text>
        </View>
      );
    }
    return <Text style={styles.text}>{finalText}</Text>;
  };

  const renderPrompt = () => {
    return (
      <View style={styles.promptContainer}>
        <Text style={styles.promptTextStyle}>{promptText}</Text>
      </View>
    );
  };

  if (variant === 'gradient') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={pressed ? null : handlePress}
          style={styles.touch}>
          <LinearGradient
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.tealish100, colors.tiffanyBlue100]}>
            {renderButtonText()}
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
          {promptText && renderPrompt()}
        </TouchableOpacity>
      </View>
    );
  }

  if (type === 'continueFromWeek') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={pressed ? null : handlePress}
          style={styles.touch}>
          <Text style={styles.text}>{`${buttonText[type]} ${weekNo}`}</Text>
          <View style={styles.iconContainer}>
            <TDIcon
              input={iconType[icon]}
              inputStyle={{...iconStyles[icon], ...iconVariant[variant]}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  if (type === 'programme') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={pressed ? null : handlePress}
          style={styles.touch}>
          <Text
            style={
              styles.text
            }>{`${trainerName}${ButtonDict.Pluralise} ${buttonText[type]}`}</Text>
          <View style={styles.iconContainer}>
            <TDIcon
              input={iconType[icon]}
              inputStyle={{...iconStyles[icon], ...iconVariant[variant]}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  // This ^^ will need different options for pluralising names in Hindi and Urdu

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pressed ? null : handlePress}
        style={styles.touch}
        disabled={disabled}>
        {renderButtonText()}
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
      </TouchableOpacity>
    </View>
  );
}
