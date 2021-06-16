/*
 * Jira Ticket:
 * Created Date: Tue, 10th Nov 2020, 11:46:15 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import DefaultButton from '../../components/Buttons/DefaultButton';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import TDIcon from 'the-core-ui-component-tdicon';
import Video from 'react-native-video';
import useCommonData from '../../hooks/data/useCommonData';
import useLoading from '../../hooks/loading/useLoading';

const splashVideo = require('../../../assets/videos/splashScreen.mp4');

export default function LanguageSelectionScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getScaledWidth, getScaledHeight, fontSize} = ScaleHook();
  const {
    cellFormStyles,
    cellFormConfig,
    colors,
    textStyles,
    dropdownStyle,
  } = useTheme();

  const {commonDataProviderSyncronousUpdate} = useCommonData();
  const {dictionary, setLanguage, getLanguage} = useDictionary();
  const {LanguageDict} = dictionary;

  const screenHeight = Dimensions.get('screen').height;

  const dropdownData = [LanguageDict.English, LanguageDict.Hindi];

  const navigation = useNavigation();
  const {getValues} = FormHook();

  const {setLoading, loading} = useLoading();

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
      marginBottom: getScaledHeight(40),
      height: getScaledHeight(150),
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
    formContainerStyle: {
      width: getScaledWidth(325),
      flex: 1,
      alignItems: 'center',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Video
        source={splashVideo}
        resizeMode="cover"
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        repeat={true}
        muted={true}
        paused={false}
        controls={null}
        playWhenInactive
      />

      <View style={styles.buttonContainer}>
        <Form {...{cells, config}} />
        <DefaultButton
          type="setLanguage"
          variant="white"
          disabled={loading}
          onPress={async () => {
            const prevLang = getLanguage();
            const language = getValues().language || getLanguage();

            await setLanguage(language);

            const navigate = () => {
              setLoading(false);
              navigation.navigate('Onboarding');
            };

            if (language !== prevLang) {
              setLoading(true);
              await commonDataProviderSyncronousUpdate();

              setTimeout(() => {
                navigate();
              }, 1000);
            } else {
              navigate();
            }

            // const navigate = await languageRestart(
            //   language === LanguageDict.Urdu ? 'rtl' : 'ltr',
            // );

            // if (navigate === true) {
            //   navigation.navigate('Onboarding');
            // }
          }}
        />
      </View>
    </View>
  );
}
