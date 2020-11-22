/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 15:42:23 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import DefaultButton from '../../components/Buttons/DefaultButton';
import FadingBottomView from '../../components/Views/FadingBottomView';

const fakeImage = require('../../../assets/fake2.png');

export default function CongratulationsScreen({name = 'Katrina'}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {MeetYourIconsDict} = dictionary;
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => null,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
      position: 'absolute',
      top: 0,
    },
    textContainer: {
      width: '90%',
      height: '100%',
      alignSelf: 'center',
      paddingTop: getHeight(75),
    },
    title: {
      ...textStyles.bold30_white100,
      marginBottom: getHeight(4),
      textAlign: 'left',
    },
    text: {
      ...textStyles.semiBold16_white90,
      marginBottom: getHeight(400),
      textAlign: 'left',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: 30,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePressShare() {}

  function handlePressStart() {
    navigation.reset({
      index: 0,
      routes: [{name: 'TabContainer'}],
    });
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={fakeImage} style={styles.image} />
        <FadingBottomView color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {MeetYourIconsDict.CongratulationsTitle}
        </Text>
        <Text style={styles.text}>
          {MeetYourIconsDict.StartedProgramme(name)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="share"
          icon="share"
          variant="white"
          onPress={handlePressShare}
        />
        <DefaultButton
          type="getStarted"
          variant="transparentWhiteText"
          onPress={handlePressStart}
        />
      </View>
    </View>
  );
}
