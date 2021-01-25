/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 11:46:15 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {View, Image, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import TDIcon from 'the-core-ui-component-tdicon';
import {languageRestart} from '../../utils/languageRestart';

const splashImage = require('../../../assets/images/splash.png');

export default function LanguageSelectionScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, fontSize} = ScaleHook();
  const {
    cellFormStyles,
    cellFormConfig,
    colors,
    textStyles,
    dropdownStyle,
  } = useTheme();
  const {dictionary, setLanguage, getLanguage} = useDictionary();
  const {LanguageDict} = dictionary;

  const screenHeight = Dimensions.get('screen').height;

  const dropdownData = [
    LanguageDict.English,
    LanguageDict.Hindi,
    LanguageDict.Urdu,
  ];
  const navigation = useNavigation();
  const {getValues} = FormHook();

  navigation.setOptions({
    header: () => null,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'flex-end',
      backgroundColor: colors.backgroundWhite100,
    },
    image: {
      position: 'absolute',
      top: screenHeight / 2 - 26,
    },
    buttonContainer: {
      marginBottom: getHeight(40),
      height: getHeight(150),
      width: '100%',
      alignItems: 'center',
    },
    iconStyle: {
      size: fontSize(12),
      solid: true,
    },
    labelText: {
      ...textStyles.medium14_brownishGrey100,
    },
  };
  const cells = [
    {
      name: 'language',
      type: 'dropdown',
      label: LanguageDict.SelectLanguage,
      labelTextStyle: styles.labelText,
      placeholder: getLanguage() || dropdownData[0],
      data: dropdownData,
      rightAccessory: () => (
        <View>
          <TDIcon input="chevron-down" inputStyle={styles.iconStyle} />
        </View>
      ),
      iconTintColor: colors.black100,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingHorizontal: 0,
      },
      inputStyle: {
        ...textStyles.regular16_brownishGrey100,
      },
    },
  ];
  const config = {
    turnOffQuickPicker: true,
    editedColor: colors.brownishGrey100,
    inactiveColor: colors.brownishGrey100,
    activeColor: colors.brownishGrey100,
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Form {...{cells, config}} />
        <DefaultButton
          type="setLanguage"
          variant="white"
          onPress={async () => {
            const language = getValues().language || getLanguage();

            setLanguage(language);

            const navigate = await languageRestart(
              language === LanguageDict.Urdu ? 'rtl' : 'ltr',
            );

            if (navigate === true) {
              navigation.navigate('Onboarding');
            }
          }}
        />
      </View>
    </View>
  );
}
