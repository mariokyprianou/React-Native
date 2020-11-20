/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 14:59:40 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import Header from '../Headers/Header';
import EmojiSelection from '../Infographics/EmojiSelection';
import DefaultButton from '../Buttons/DefaultButton';
import SliderProgressView from '../Views/SliderProgressView';
import IconTextView from '../Infographics/IconTextView';
import FadingBottomView from '../Views/FadingBottomView';
import Spacer from '../Utility/Spacer';

export default function WorkoutCompleteModal() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_WorkoutComplete, CardText_HowIntense} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.veryLightPink100,
    },
    scroll: {
      flex: 1,
    },
    imageContainer: {
      height: getHeight(337),
      width: '100%',
      position: 'absolute',
      top: 0,
    },
    image: {
      height: getHeight(337),
      position: 'absolute',
      width: '100%',
      resizeMode: 'cover',
    },
    fadeContainer: {
      height: getHeight(337),
      position: 'absolute',
      width: '100%',
    },
    iconContainer: {
      position: 'absolute',
      top: getHeight(300),
    },
    contentContainer: {
      width: '90%',
      alignSelf: 'center',
      marginTop: getHeight(345),
    },
    question: {
      ...textStyles.regular15_brownishGrey100,
      marginTop: getHeight(20),
      textAlign: 'left',
    },
    sliderContainer: {
      marginTop: getHeight(20),
      marginBottom: getHeight(28),
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: getHeight(30),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleClose() {}

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Header
        title={TitleText_WorkoutComplete}
        right="times"
        rightAction={handleClose}
      />
      <ScrollView style={styles.scroll}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/fakeWorkout.png')}
            style={styles.image}
          />
          <View style={styles.fadeContainer}>
            <FadingBottomView height={337} color="black" />
          </View>
          <View style={styles.iconContainer}>
            <IconTextView
              type="workoutComplete"
              duration={30}
              reps={20}
              sets={17}
              color="white"
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.question}>{CardText_HowIntense}</Text>
          <View style={styles.sliderContainer}>
            <SliderProgressView
              slider={true}
              max={100}
              progress={30}
              height={getHeight(4)}
              rounded={true}
            />
          </View>
          <EmojiSelection />
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton type="done" variant="white" icon="chevron" />
        </View>
        <Spacer height={50} />
      </ScrollView>
    </View>
  );
}
