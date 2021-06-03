/*
 * Jira Ticket:
 * Created Date: Mon, 2nd Nov 2020, 11:04:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import FadingBottomView from '../Views/FadingBottomView';
import GymHomeSelector from '../Buttons/GymHomeSelector';
import TrainerIconCard from '../Cards/TrainerIconCard';
import PersistedImage from '../Utility/PersistedImage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function TrainerCard({
  trainer,
  currentProgram,
  onPressGymHome,
  suggestedEnv,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const insets = useSafeAreaInsets();

  const {textStyles, colors, Constants} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    imagesContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
    },
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      resizeMode: 'cover',
    },
    overlay: {
      width: '100%',
      position: 'absolute',
      bottom: getHeight(140 + insets.bottom / 2),
      alignItems: 'center',
    },
    titleContainer: {
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: getWidth(20),
      marginBottom: getHeight(5),
    },
    nameText: {
      ...textStyles.bold30_black100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <PersistedImage
          imageUrl={currentProgram.programmeImage}
          style={styles.image}
          fallback={null}
          showLoading={true}
          placeholder={false}
          overlayStyle={null}
        />

        <FadingBottomView
          color="customArray"
          customArray={[
            colors.veryLightPinkTwo0,
            colors.veryLightPinkTwo90,
            colors.veryLightPinkTwo95,
            colors.veryLightPinkTwo95,
            colors.veryLightPinkTwo100,
            colors.veryLightPinkTwo100,
            colors.veryLightPinkTwo100,
            colors.veryLightPinkTwo100,
          ]}
          height={Constants.SCREEN_HEIGHT / 4}
        />
      </View>
      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
          <Text style={styles.nameText}>{trainer.name}</Text>
          <GymHomeSelector
            onPress={onPressGymHome}
            text={suggestedEnv ? suggestedEnv : currentProgram.environment}
            singleProgramme={trainer.programmes.length === 1 ? true : false}
          />
        </View>
        <TrainerIconCard
          fatLossPercentage={currentProgram.fatLoss}
          fitnessPercentage={currentProgram.fitness}
          musclePercentage={currentProgram.muscle}
          wellnessPercentage={currentProgram.wellness}
        />
      </View>
    </View>
  );
}
