/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 12:38:07 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import LinearGradient from 'react-native-linear-gradient';
import DefaultButton from '../components/Buttons/DefaultButton';
import FadingBottomView from '../components/Views/FadingBottomView';

const fakeImage = require('../../assets/fake2.png');

export default function DefaultScreen({name = 'Katrina'}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {
    TitleText_Result,
    InfoText_SuggestedProgramme1,
    InfoText_SuggestedProgramme2,
  } = dictionary;

  const capitalizedName = name.toUpperCase();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
    },
    title: {
      ...textStyles.semiBold14_black100,
      marginBottom: getHeight(5),
    },
    barContainer: {
      width: '100%',
      height: getHeight(4),
    },
    bar: {
      flex: 1,
    },
    imageContainer: {
      width: '100%',
      height: getHeight(450),
      position: 'absolute',
      top: getHeight(50),
    },
    image: {
      width: '100%',
      height: getHeight(450),
      resizeMode: 'cover',
      position: 'absolute',
      top: 0,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: getHeight(510),
    },
    name: {
      ...textStyles.bold18_white100,
      marginTop: getHeight(360),
    },
    result: {
      ...textStyles.regular15_white100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress() {
    console.log('selected!');
    // navigate to programme
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={fakeImage} style={styles.image} />
        <FadingBottomView color="black" height="full" />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{TitleText_Result}</Text>
        <View style={styles.barContainer}>
          <LinearGradient
            style={styles.bar}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.tiffanyBlue100, colors.tealish100]}
          />
        </View>
        <Text style={styles.name}>{capitalizedName}</Text>
        <Text
          style={
            styles.result
          }>{`${InfoText_SuggestedProgramme1} ${name} ${InfoText_SuggestedProgramme2}`}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="programme"
          trainerName={capitalizedName}
          icon="chevron"
          variant="white"
          onPress={handlePress}
        />
      </View>
    </View>
  );
}
