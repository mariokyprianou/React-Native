/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 08:42:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import Swiper from 'react-native-swiper';
import TrainerCard from '../../components/Cards/TrainerCard';
import WorkoutCard from '../../components/Cards/WorkoutCard';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Spacer from '../../components/Utility/Spacer';
import CantChooseButton from '../../components/Buttons/CantChooseButton';
import isRTL from '../../utils/isRTL';
import FadingBottomView from '../../components/Views/FadingBottomView';
import isIphoneX from '../../utils/isIphoneX';
import {useRoute} from '@react-navigation/core';
import addRestDays from '../../utils/addRestDays';
import addWorkoutDates from '../../utils/addWorkoutDates';
import {useNetInfo} from '@react-native-community/netinfo';
import useCommonData from '../../hooks/data/useCommonData';
import UseData from '../../hooks/data/UseData';
import useLoading from '../../hooks/loading/useLoading';

const zeroState = require('../../../assets/images/zeroState.jpeg');
const logo = require('../../../assets/images/logo.png');

export default function MeetYourIconsScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  navigation.setOptions({
    header: () => null,
  });

  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {MeetYourIconsDict} = dictionary;
  const iconsSwiper = useRef();
  const {
    params: {switchProgramme},
  } = useRoute();
  //const switchProgramme = true;

  const {trainers, suggestedProgramme, setSuggestedProgramme} = useCommonData();
  const {setProgrammeModalImage} = UseData();
  const [selectedTrainer, setSelectedTrainer] = useState();
  const [selectedProgram, setSelectedProgram] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [safeArea, setSafeArea] = useState(false);
  const {isConnected, isInternetReachable} = useNetInfo();
  const {setLoading} = useLoading();

  // old fake data
  const currentTrainerId = 'Katrina'; // to be changed to getProgramme data
  const currentWeek = 4; // to be changed to getProgramme data

  useEffect(() => {
    setLoading(true);
    StatusBar.setBarStyle('light-content');
  }, []);

  useEffect(() => {
    if (activeIndex < 0) {
      setActiveIndex(0);
      return;
    }

    if (!trainers || trainers.length === 0) {
      return;
    }
    setLoading(false);

    const trainer = trainers[activeIndex];
    let programme = trainer.programmes[0];

    if (suggestedProgramme) {
      programme = trainer.programmes.find(
        (it) => it.environment === suggestedProgramme.environment,
      );
    }
    setSelectedTrainer(trainer);
    setSelectedProgram(programme);
  }, [trainers, activeIndex, suggestedProgramme]);

  useEffect(() => {
    if (!suggestedProgramme || !trainers || trainers.length === 0) {
      return;
    }

    const trainer = trainers.find(
      (it) => it.name === suggestedProgramme.trainer.name,
    );

    if (
      trainer &&
      trainer.programmes.find(
        (it) => it.environment === suggestedProgramme.environment,
      )
    ) {
      let index = trainers.indexOf(trainer);
      if (index < 0) {
        index = 0;
      } else if (index >= trainers.length) {
        index = trainers.length - 1;
      }

      setActiveIndex(index);
      iconsSwiper.current.scrollTo(index, true);
    }
  }, [trainers, suggestedProgramme]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      height: '100%',
      width: '100%',
    },
    safeArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      height: getHeight(
        Platform.OS === 'android'
          ? StatusBar.currentHeight
          : isIphoneX()
          ? 30
          : 20,
      ),
      width: '100%',
      backgroundColor: colors.powderBlue100,
    },
    headerContainer: {
      width: '100%',
      height: getHeight(85),
      position: 'absolute',
      top: getHeight(40),
      zIndex: 9,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    image: {
      marginLeft: getWidth(18),
    },
    zeroImage: {
      width: '100%',
      height: '100%',
    },
    selectText: {
      ...textStyles.semiBold16_white90,
      marginLeft: getWidth(24),
    },
    cantChooseContainer: {
      alignSelf: 'flex-start',
      position: 'absolute',
      right: getWidth(15),
      height: getHeight(28),
      alignItems: 'center',
    },
    leftIconContainer: {
      width: getWidth(50),
      position: 'absolute',
      left: 0,
      top: getHeight(225),
      zIndex: 9,
    },
    rightIconContainer: {
      width: getWidth(50),
      position: 'absolute',
      right: 0,
      top: getHeight(225),
      zIndex: 9,
    },
    arrowsTouchableStyle: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      padding: getWidth(18),
    },
    icon: {
      size: fontSize(18),
      color: colors.white100,
    },
    sliderContainer: {
      flex: 1,
      backgroundColor: colors.powderBlue100,
    },
    cardContainer: {
      height: getHeight(410),
      width: '100%',
    },
    textContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    text: {
      ...textStyles.medium15_white100,
      marginTop: getHeight(5),
      textAlign: 'left',
    },
    heading: {
      ...textStyles.bold24_white100,
      marginTop: getHeight(15),
      textAlign: 'left',
    },
    weeksText: {
      ...textStyles.bold14_white100,
      textAlign: 'left',
      marginBottom: getHeight(15),
    },
    workoutContainer: {
      width: '100%',
      alignItems: 'center',
    },
    buttonContainer: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      marginTop: getHeight(30),
      paddingBottom: getHeight(25),
      alignItems: 'center',
      backgroundColor: colors.powderBlue100,
    },
    singleButtonContainer: {
      width: '100%',
      backgroundColor: colors.powderBlue100,
      alignItems: 'center',
      position: 'absolute',
      bottom: getHeight(25),
    },
    zeroButtonContainer: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    zeroTextContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    zeroInfoText: {
      ...textStyles.regular15_white100,
      marginBottom: getHeight(80),
      textAlign: 'center',
    },
    fadeContainer: {
      position: 'absolute',
      bottom: 70,
      left: 0,
      right: 0,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress(direction) {
    if (direction === 'left' && activeIndex !== 0) {
      iconsSwiper.current.scrollTo(activeIndex - 1, true);
    }
    if (direction === 'right' && activeIndex !== trainers.length - 1) {
      iconsSwiper.current.scrollTo(activeIndex + 1, true);
    }
  }

  function switchProgram() {
    if (selectedTrainer.programmes.length === 1) {
      return;
    }
    const newProgramme = selectedTrainer.programmes.find(
      (it) => it.id !== selectedProgram.id,
    );

    setSelectedProgram(newProgramme);
  }

  function navigateToWorkoutHome() {
    navigation.navigate('TabContainer');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  if (!isConnected && !isInternetReachable) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Image source={logo} style={styles.image} />
            <Text style={styles.selectText}>
              {MeetYourIconsDict.SelectYourProgramme}
            </Text>
          </View>
        </View>
        <Image source={zeroState} style={styles.zeroImage} />
        <View style={styles.zeroButtonContainer}>
          <View style={styles.zeroTextContainer}>
            <Text style={styles.zeroInfoText}>
              {MeetYourIconsDict.ZeroStateText}
            </Text>
          </View>
          <DefaultButton
            type="tryAgain"
            icon="chevron"
            variant="white"
            onPress={() => console.log('try again')}
          />
          <Spacer height={30} />
        </View>
      </View>
    );
  }

  const onScroll = (e) => {
    const offset = e.nativeEvent.contentOffset.y;
    if (offset > 0 && !safeArea) {
      setSafeArea(true);
    } else if (offset <= 0 && safeArea) {
      setSafeArea(false);
    }
  };

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View style={styles.container}>
      {safeArea && <View style={styles.safeArea} />}

      <Swiper
        ref={iconsSwiper}
        loop={false}
        showsPagination={false}
        onIndexChanged={(index) => {
          // reset suggested programme to prevent conflict between suggested && selected programme
          setSuggestedProgramme(null);
          setActiveIndex(index);
        }}>
        {trainers.map((trainer) => {
          let currentProgram =
            (selectedProgram &&
              trainer.programmes.find((it) => it.id === selectedProgram.id)) ||
            trainer.programmes[0];

          const {numberOfWeeks, description, firstWeek} = currentProgram;
          const extendedWeek = addWorkoutDates(addRestDays(firstWeek));

          return (
            <ScrollView
              style={styles.sliderContainer}
              onScroll={onScroll}
              scrollEventThrottle={10}
              showsVerticalScrollIndicator={false}
              bounces={false}>
              <View style={styles.cardContainer}>
                <TrainerCard
                  trainer={trainer}
                  onPressGymHome={switchProgram}
                  currentProgram={currentProgram}
                  suggestedEnv={currentProgram?.environment || null}
                />
              </View>

              <Spacer height={90} />

              <View style={styles.textContainer}>
                <Text style={styles.text}>{description}</Text>
                <Text
                  style={
                    styles.heading
                  }>{`${MeetYourIconsDict.YourFirstWeek} ${trainer.name}`}</Text>
                <Text
                  style={
                    styles.weeksText
                  }>{`${numberOfWeeks} ${MeetYourIconsDict.WeeksOfTraining}`}</Text>
              </View>
              <View style={styles.workoutContainer}>
                {extendedWeek.map(({date, duration, intensity, name, day}) => {
                  return (
                    <WorkoutCard
                      title={name}
                      day={day}
                      date={date}
                      duration={duration}
                      intensity={intensity}
                      onPressCard={() => null}
                    />
                  );
                })}
              </View>
              <Spacer height={180} />

              <View style={styles.headerContainer}>
                <View>
                  <Image source={logo} style={styles.image} />
                  <Text style={styles.selectText}>
                    {MeetYourIconsDict.SelectYourProgramme}
                  </Text>
                </View>
              </View>
            </ScrollView>
          );
        })}
      </Swiper>

      <View style={styles.headerContainer}>
        <View style={styles.cantChooseContainer}>
          <CantChooseButton
            onPress={() => navigation.navigate('HelpMeChoose')}
            navigation={navigation}
          />
        </View>
      </View>

      <View style={styles.leftIconContainer}>
        <TouchableOpacity
          style={styles.arrowsTouchableStyle}
          onPress={() => handlePress('left')}
          disabled={activeIndex === 0 ? true : false}>
          <TDIcon
            input={isRTL() ? 'chevron-right' : 'chevron-left'}
            inputStyle={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.rightIconContainer}>
        <TouchableOpacity
          style={styles.arrowsTouchableStyle}
          onPress={() => handlePress('right')}
          disabled={activeIndex === trainers.length - 1 ? true : false}>
          <TDIcon
            input={isRTL() ? 'chevron-left' : 'chevron-right'}
            inputStyle={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.fadeContainer} pointerEvents="none">
        <FadingBottomView color="blue" height={100} />
      </View>
      {switchProgramme === true && selectedTrainer.id === currentTrainerId ? (
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="restartProgramme"
            icon="chevron"
            variant="gradient"
            trainerName="KATRINA"
            onPress={navigateToWorkoutHome}
          />
          <Spacer height={20} />
          <DefaultButton
            type="continueFromWeek"
            icon="chevron"
            variant="white"
            weekNo={currentWeek}
            onPress={navigateToWorkoutHome}
          />
        </View>
      ) : switchProgramme === true &&
        selectedTrainer.id !== currentTrainerId ? (
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="startNow"
            icon="chevron"
            variant="gradient"
            onPress={() => {
              setProgrammeModalImage(selectedProgram.programmeImage);
              navigation.navigate('Congratulations', {
                switchProgramme: true,
                newTrainer: selectedTrainer.name,
                environment: selectedProgram.environment,
              });
            }}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="startNow"
            icon="chevron"
            variant="gradient"
            onPress={() => {
              setProgrammeModalImage(selectedProgram.programmeImage);
              navigation.navigate('Congratulations', {
                switchProgramme: false,
                newTrainer: selectedTrainer.name,
                environment: selectedProgram.environment,
                programmeId: selectedProgram.id,
              });
            }}
          />
          <DefaultButton
            type="login"
            variant="transparentWhiteText"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      )}
    </View>
  );
}
