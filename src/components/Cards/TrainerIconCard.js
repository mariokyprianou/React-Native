/*
 * Jira Ticket:
 * Created Date: Tue, 27th Apr 2021, 08:35:32 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import TrainerIcon from '../Infographics/TrainerIcon';
import useDictionary from '../../hooks/localisation/useDictionary';

export default function TrainerIconCard({
  fatLossPercentage,
  fitnessPercentage,
  musclePercentage,
  wellnessPercentage,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors} = useTheme();
  const {dictionary} = useDictionary();
  const {MeetYourIconsDict} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      width: getWidth(335),
      height: getHeight(107),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: radius(12),
      backgroundColor: colors.white80,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <TrainerIcon
        text={MeetYourIconsDict.FatLoss}
        percentage={fatLossPercentage}
      />
      <TrainerIcon
        text={MeetYourIconsDict.Fitness}
        percentage={fitnessPercentage}
      />
      <TrainerIcon
        text={MeetYourIconsDict.Muscle}
        percentage={musclePercentage}
      />
      <TrainerIcon
        text={MeetYourIconsDict.Wellness}
        percentage={wellnessPercentage}
      />
    </View>
  );
}
