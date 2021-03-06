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
import PersistentImage from '../Utility/PersistedImage';

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
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, fonts, textStyles} = useTheme();
  const {dictionary} = useDictionary();

  const {OnDemandDict, ButtonDict, WorkoutDict} = dictionary;
  const trainerName = workout.programme.trainer.name.toUpperCase();
  const programmeEnvironment = workout.programme.environment;

  const environmentName =
    programmeEnvironment === 'GYM' ? ButtonDict.Gym : ButtonDict.Home;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      width: '100%',
      height: getHeight(85),
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
      height: getHeight(85),
      resizeMode: 'cover',
    },
    iconContainer: {
      marginRight: getWidth(6),
    },
    icon: {
      resizeMode: 'contain',
      tintColor: colors.brownishGrey100,
      width: getWidth(12),
      solid: true,
      size: fontSize(22),
    },
    completeIconContainer: {
      marginRight: getWidth(7),
    },
    completeIcon: {
      color: colors.brownGrey100,
    },
    textContainer: {
      padding: getWidth(15),
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    trainerName: {
      ...textStyles.semiBold10_brownGrey100,
      color: colors.paleGrey100,
      letterSpacing: 1.0,
      lineHeight: getHeight(10),
      textAlign: 'left',
    },
    nameContainer: {},
    workoutName: {
      fontFamily: fonts.semiBold,
      color: colors.black100,
      fontSize: fontSize(15),
      letterSpacing: -0.22,
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
      height: getWidth(2),
      width: getWidth(2),
      borderRadius: radius(1),
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
    greyText: {
      ...textStyles.medium10_brownishGrey100,
      lineHeight: fontSize(16),
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
        {image ? (
          <PersistentImage
            imageUrl={image}
            style={styles.image}
            showLoading={true}
            //fallback={fallback}
            //placeholder={true}
            //overlayStyle={overlayStyle}
            //customOverlay={() => <></>}
            //callbackSetLoaded={() => {}}
          />
        ) : (
          <View style={styles.image} />
        )}

        {workout.isNew && (
          <View style={styles.newContainer}>
            <Text style={styles.newStarText}>{OnDemandDict.newWorkout}</Text>
            <TDIcon
              input={newStarIcon}
              inputStyle={{style: {...styles.newStar}}}
            />
          </View>
        )}

        <View style={{}}>
          <View style={styles.textContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.trainerName}>{trainerName}</Text>
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
                    input={programmeEnvironment === 'HOME' ? homeIcon : gymIcon}
                    inputStyle={{
                      style: {
                        ...styles.icon,
                      },
                    }}
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
