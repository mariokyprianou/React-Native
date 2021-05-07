/*
 * Created Date: Thu, 6th May 2021, 15:11:26 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import {format} from 'date-fns';
import IconTextView from '../Infographics/IconTextView';
import isRTL from '../../utils/isRTL';

const homeIcon = require('../../../assets/icons/homeWorkout.png');
const gymIcon = require('../../../assets/icons/gymIcon.png');
const newStarIcon = require('../../../assets/icons/newStar.png');

export default function OnDemandWorkoutCard({
  workout,
  title,
  duration,
  intensity,
  image,
  onPressCard,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const {WorkoutDict, ButtonDict} = dictionary;
  const trainerName = workout.programme.trainer.name.toUpperCase();
  const programmeEnvironment = workout.programme.environment;
  const environmentName =
    programmeEnvironment === 'GYM' ? ButtonDict.Gym : ButtonDict.Home;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: getWidth(335),
      height: getHeight(100),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white100,
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
      marginBottom: getHeight(15),
    },
    touch: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: getWidth(119),
      height: getHeight(100),
      resizeMode: 'cover',
    },
    iconContainer: {
      marginRight: getWidth(10),
    },
    icon: {
      solid: true,
      color: colors.black100,
      size: fontSize(12),
    },
    completeIconContainer: {
      marginRight: getWidth(7),
    },
    completeIcon: {
      color: colors.brownGrey100,
    },
    textContainer: {
      flexDirection: 'column',
      width: getWidth(190),
    },
    trainerName: {
      ...textStyles.semiBold10_brownGrey100,
      letterSpacing: 1.0,
      height: getHeight(14),
      lineHeight: getHeight(14),
      textAlign: 'left',
    },
    nameContainer: {
      flexDirection: 'row',
      marginBottom: getHeight(17),
    },
    workoutName: {
      ...textStyles.semiBold14_black100,
      textAlign: 'left',
    },
    detailContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
    },
    iconTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dotContainer: {
      backgroundColor: colors.brownGrey100,
      height: 3,
      width: 3,
      alignItems: 'center',
      marginLeft: getWidth(8),
      marginRight: getWidth(8),
    },
    newContainer: {
      position: 'absolute',
      width: '100%',
      paddingTop: getHeight(12),
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    newStar: {
      marginLeft: 4,
      marginRight: 12,
    },
    newStarText: {
      ...textStyles.bold12_newWorkoutBlue100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touch}
        onPress={() => onPressCard(workout)}>
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode={'cover'}
        />

        {workout.isNew && (
          <View style={styles.newContainer}>
            <Text style={styles.newStarText}>NEW</Text>
            <TDIcon
              input={newStarIcon}
              inputStyle={{style: {...styles.newStar}}}
            />
          </View>
        )}

        <View style={{padding: getWidth(20)}}>
          <View style={styles.textContainer}>
            <Text style={styles.trainerName}>{trainerName}</Text>
            <View style={styles.nameContainer}>
              <Text style={styles.workoutName}>{title}</Text>
            </View>

            <View style={styles.detailContainer}>
              <View
                style={{
                  ...styles.iconTextContainer,
                  ...styles.leftIconContainer,
                }}>
                <View style={styles.iconContainer}>
                  <TDIcon
                    input={homeIcon}
                    inputStyle={{style: {...styles.icon, ...styles.iconColor}}}
                  />
                </View>
                <Text style={styles.greyText}>{environmentName}</Text>
              </View>
              <View style={styles.dotContainer} />
              <View style={styles.iconTextContainer}>
                <Text style={styles.greyText}>{`${duration}`}</Text>
                <Text style={styles.greyText}>
                  {` ${WorkoutDict.Mins}`.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
