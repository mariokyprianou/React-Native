/*
 * Jira Ticket:
 * Created Date: Thu, 5th Nov 2020, 09:46:44 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {useNavigation} from '@react-navigation/native';
import useDictionary from '../../hooks/localisation/useDictionary';
import FadingBottomView from '../../components/Views/FadingBottomView';
import DefaultButton from '../../components/Buttons/DefaultButton';
import IconTextView from '../../components/Infographics/IconTextView';
import Header from '../../components/Headers/Header';
import PowerShareAssetsManager from '../../utils/PowerShareAssetsManager';
import {SampleImageUrl} from '../../utils/SampleData';

const fakeImage = require('../../../assets/fake2.png');

export default function WeekCompleteScreen({
  name = 'Katrina',
  programmeName = 'home',
  weekNumber = 4,
  totalDuration = 100,
  totalReps = 150,
  totalSets = 40,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => (
      <Header
        title={WorkoutDict.WeekCompleteTitle}
        showModalCross
        white
        transparent
      />
    ),
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    infoTextContainer: {
      position: 'absolute',
      top: getHeight(90),
      width: '90%',
      alignSelf: 'center',
    },
    infoText: {
      ...textStyles.semiBold16_white90,
      textAlign: 'left',
    },
    infoIconsContainer: {
      marginBottom: getHeight(34),
      alignSelf: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: getHeight(30),
      width: '100%',
      alignItems: 'center',
    },
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handleShare() {
    try {
      const trainerName = 'Katrina';
      const programmeName = 'home';
      // TODO: - Hook up relevant values
      // TODO: -  Display loading
      let res = await PowerShareAssetsManager.shareWeekComplete({
        imageUrl: SampleImageUrl,
        title: `Week 3 complete with \n${name}'s ${programmeName.toLowerCase()}\n programme!`,
        workoutsCompleted: 6,
        totalTimeTrained: '10:90:21',
      });
    } catch (err) {
      console.log('SHARE ERR: ', err);
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <ImageBackground source={fakeImage} style={styles.image}>
        <FadingBottomView color="black" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>
            {WorkoutDict.WeekComplete(name, weekNumber)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.infoIconsContainer}>
            <IconTextView
              type="workoutComplete"
              duration={totalDuration}
              reps={totalReps}
              sets={totalSets}
              color="white"
            />
          </View>
          <DefaultButton
            type="share"
            icon="share"
            variant="white"
            onPress={handleShare}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
