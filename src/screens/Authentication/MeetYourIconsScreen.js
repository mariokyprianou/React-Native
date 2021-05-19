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

import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import Swiper from 'react-native-swiper';
import TrainerCard from '../../components/Cards/TrainerCard';
import CarouselWorkoutCard from '../../components/Cards/CarouselWorkoutCard';
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
import useUserData from '../../hooks/data/useUserData';
import {getArgumentValues} from 'graphql/execution/values';

const zeroState = require('../../../assets/images/zeroState.jpeg');
const logo = require('../../../assets/images/logoDark.png');

export default function MeetYourIconsScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  navigation.setOptions({
    header: () => null,
  });

  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {MeetYourIconsDict} = dictionary;
  const iconsSwiper = useRef();
  const {
    params: {switchProgramme},
  } = useRoute();
  const {
    trainers,
    getTrainers,
    suggestedProgramme,
    setSuggestedProgramme,
  } = useCommonData();
  const {setProgrammeModalImage, programme, completedFreeWorkouts} = UseData();
  const {isSubscriptionActive} = useUserData();

  const {isConnected, isInternetReachable} = useNetInfo();

  const [selectedTrainer, setSelectedTrainer] = useState();
  const [selectedProgram, setSelectedProgram] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [safeArea, setSafeArea] = useState(false);
  const {setLoading} = useLoading();

  useEffect(() => {
    if (isConnected) {
      setLoading(true);
    }
    getTrainers();
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  // Newelly suggestedProgramme handle
  useEffect(() => {
    if (!trainers || trainers.length === 0) {
      return;
    }

    if (suggestedProgramme) {
      const index = trainers.findIndex(
        (it) => suggestedProgramme.trainer.id === it.id,
      );
      console.log('suggestedTrainerIndex', index);

      if (index === -1) {
        return;
      }

      // Swipe UI and set state to trigger selectedProgramme change
      iconsSwiper.current.scrollTo(index, true);
      setActiveIndex(index);
    }
  }, [trainers, iconsSwiper, suggestedProgramme]);

  // Index change handle
  useEffect(() => {
    if (activeIndex < 0) {
      setActiveIndex(0);
      return;
    }
    if (!trainers || trainers.length === 0) {
      return;
    }

    const selected = suggestedProgramme
      ? trainers[activeIndex].programmes.find(
          (it) => it.environment === suggestedProgramme.environment,
        )
      : trainers[activeIndex].programmes[0];

    console.log('Index, selected', activeIndex, selected.environment);
    setSelectedTrainer(trainers[activeIndex]);
    setSelectedProgram(selected);

    // reset suggested programme to prevent conflict between suggested && selected programme
    if (suggestedProgramme) setSuggestedProgramme(null);

    setLoading(false);
  }, [trainers, activeIndex]);

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
      //backgroundColor: colors.white100,
    },

    logoContainer: {
      position: 'absolute',
      top: getHeight(40),
      left: 0,
      zIndex: 9,
    },
    image: {
      marginLeft: getWidth(18),
    },
    zeroImage: {
      width: '100%',
      height: '100%',
    },
    selectText: {
      ...textStyles.semiBold16_black100,
      marginLeft: getWidth(24),
    },
    cantChooseContainer: {
      position: 'absolute',
      top: getHeight(40),
      height: getHeight(28),
      width: '100%',
      zIndex: 9,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    cantChooseStyle: {
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
      color: colors.black100,
    },
    sliderContainer: {
      flex: 1,
      backgroundColor: colors.veryLightPinkTwo100,
    },
    cardContainer: {
      height: getHeight(450),
      width: '100%',
    },
    textContainer: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: colors.white100,
      borderRadius: radius(12),
    },
    descriptionContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    upperText: {
      ...textStyles.regular15_brownishGrey100,
      marginLeft: '5%',
      marginTop: getHeight(1),
    },
    upperTextBold: {
      ...textStyles.semiBold15_brownishGrey100,
      marginLeft: '5%',
      marginTop: getHeight(10),
    },
    text: {
      ...textStyles.regular16_brownishGrey100,
      color: colors.brownishGreyTwo100,
      lineHeight: 21,
      marginTop: getHeight(5),
      textAlign: 'left',
    },
    heading: {
      ...textStyles.bold24_black100,
      marginTop: getHeight(7),
      marginLeft: '5%',
      textAlign: 'left',
    },
    weeksText: {
      ...textStyles.semiBold15_aquamarine100,
      textAlign: 'center',
      marginTop: getHeight(20),
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
      paddingBottom: getHeight(40),
      alignItems: 'center',
      backgroundColor: colors.veryLightPinkTwo100,
    },
    singleButtonContainer: {
      width: '100%',
      backgroundColor: colors.veryLightPinkTwo100,
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
      color: 'black',
      marginBottom: getHeight(80),
      textAlign: 'center',
    },
    fadeContainer: {
      position: 'absolute',
      bottom: getHeight(90),
      left: 0,
      right: 0,
    },
    line: {
      height: getHeight(1),
      width: '95%',
      backgroundColor: colors.brownishGrey20,
      marginLeft: '5%',
    },
    innerLine: {
      height: getHeight(1),
      width: '88%',
      backgroundColor: colors.brownishGrey20,
      marginLeft: '12%',
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

  // Same trainer, switch between programmes
  function switchProgram() {
    if (selectedTrainer.programmes.length === 1) {
      return;
    }

    const newProgramme = selectedTrainer.programmes.find(
      (it) => it.id !== selectedProgram.id,
    );

    setSelectedProgram(newProgramme);
  }

  function changedAssignedProgramme(type) {
    if (type === 'continue') {
      if (selectedProgram.userProgress.isActive) {
        navigation.navigate('TabContainer');
        return;
      }
    }

    if (completedFreeWorkouts && !isSubscriptionActive) {
      navigation.navigate('PurchaseModal');
      return;
    }
    setProgrammeModalImage(selectedProgram.programmeImage);

    navigation.navigate('Congratulations', {
      switchProgramme: true,
      currentProgramme: programme,
      newProgramme: selectedProgram,
      trainerId: selectedTrainer.id,
      newTrainer: selectedTrainer.name,
      environment: selectedProgram.environment,
      programmeId: selectedProgram.id,
      type: type,
    });
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  if (!isConnected && !isInternetReachable) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.selectText}>
            {MeetYourIconsDict.SelectYourProgramme}
          </Text>
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
            onPress={() => {
              getTrainers();
            }}
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

  const programmeWithProgressView = (weekNumber) => (
    <View style={styles.buttonContainer}>
      <DefaultButton
        type="restartProgramme"
        icon="chevron"
        variant="gradient"
        onPress={() => changedAssignedProgramme('restart')}
      />
      <Spacer height={15} />
      <DefaultButton
        type="continueFromWeek"
        icon="chevron"
        variant="white"
        weekNo={weekNumber || 1}
        onPress={() => changedAssignedProgramme('continue')}
      />
    </View>
  );

  const newProgrammeView = () => (
    <View style={styles.buttonContainer}>
      <DefaultButton
        type="startNow"
        icon="chevron"
        variant="gradient"
        onPress={() => changedAssignedProgramme('start')}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {safeArea && <View style={styles.safeArea} />}

      <Swiper
        ref={iconsSwiper}
        loop={false}
        showsPagination={false}
        onIndexChanged={(index) => {
          // Handle selected programme change
          setActiveIndex(index);
        }}>
        {trainers.map((trainer) => {
          let currentProgram =
            (selectedProgram &&
              trainer.programmes.find((it) => it.id === selectedProgram.id)) ||
            trainer.programmes[0];
          const {numberOfWeeks, description, firstWeek} = currentProgram;

          const extendedWeek = addWorkoutDates(
            addRestDays(firstWeek),
            new Date(),
          );

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
              <View style={styles.descriptionContainer}>
                <Text style={styles.text}>{description}</Text>
              </View>
              <Spacer height={27} />
              <View style={styles.textContainer}>
                <Text
                  style={
                    styles.upperTextBold
                  }>{`${firstWeek.length} ${MeetYourIconsDict.WorkoutsPerWeek}`}</Text>
                <Text style={styles.upperText}>
                  {MeetYourIconsDict.Customise}
                </Text>

                <Text
                  style={
                    styles.heading
                  }>{`${MeetYourIconsDict.YourFirstWeek} ${trainer.name}`}</Text>
                <Spacer height={20} />
                {extendedWeek &&
                  extendedWeek.map(
                    ({duration, intensity, name, day}, index) => {
                      return (
                        <>
                          <View
                            style={index === 0 ? styles.line : styles.innerLine}
                          />
                          <CarouselWorkoutCard
                            title={name}
                            day={day}
                            duration={duration}
                            intensity={intensity}
                          />
                        </>
                      );
                    },
                  )}
              </View>
              <Text
                style={
                  styles.weeksText
                }>{`${numberOfWeeks} ${MeetYourIconsDict.WeeksOfTraining}`}</Text>
              <Text style={{...styles.upperText, textAlign: 'center'}}>
                {MeetYourIconsDict.ChangeProgrammes}
              </Text>
              <Spacer height={170} />

              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.image} />
                <Text style={styles.selectText}>
                  {MeetYourIconsDict.SelectYourProgramme}
                </Text>
              </View>
            </ScrollView>
          );
        })}
      </Swiper>

      <View style={styles.cantChooseContainer}>
        <View style={styles.cantChooseStyle}>
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
        <FadingBottomView
          color="custom"
          height={180}
          customStart={colors.veryLightPinkTwo0}
          customEnd={colors.veryLightPinkTwo100}
        />
      </View>

      {switchProgramme === true ? (
        // Check if selected programme already has user progress
        selectedProgram &&
        selectedProgram.userProgress &&
        selectedProgram.userProgress.latestWeek > 0 ? (
          programmeWithProgressView(selectedProgram.userProgress.latestWeek)
        ) : (
          newProgrammeView()
        )
      ) : (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            marginTop: getHeight(30),
            paddingBottom: getHeight(20),
            alignItems: 'center',
            backgroundColor: colors.veryLightPinkTwo100,
          }}>
          <DefaultButton
            type="startNow"
            icon="chevron"
            variant="gradient"
            onPress={() => {
              if (!selectedProgram) return;

              setProgrammeModalImage(selectedProgram.programmeImage);
              navigation.navigate('Congratulations', {
                switchProgramme: false,
                newProgramme: selectedProgram,
                trainerId: selectedTrainer.id,
                newTrainer: selectedTrainer.name,
                environment: selectedProgram.environment,
                programmeId: selectedProgram.id,
              });
            }}
          />
          <View style={{marginTop: getHeight(10)}}>
            <DefaultButton
              type="login"
              variant="transparentBlackBoldText"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      )}
    </View>
  );
}
