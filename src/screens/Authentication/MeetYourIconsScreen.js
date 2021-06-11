/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 08:42:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';

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
import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

const zeroState = require('../../../assets/images/zeroState.jpeg');
const logo = require('../../../assets/images/logoDark.png');

export default function MeetYourIconsScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  navigation.setOptions({
    header: () => null,
  });

  const {
    getHeight,
    getWidth,
    getScaledHeight,
    getScaledWidth,
    fontSize,
    radius,
    scaledRadius,
  } = ScaleHook();
  const {colors, textStyles, Constants} = useTheme();
  const {dictionary} = useDictionary();
  const {MeetYourIconsDict} = dictionary;
  const iconsSwiper = useRef();
  const [arrowsDisabled, setArrowsDisabled] = useState(false);

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

  // Handling re fetch trainers based on focus is messing up the suggested programme functionality
  const isFocused = useIsFocused();

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');

    if (!trainers || trainers.length === 0) {
      setLoading(true);
    }
    console.log('Focused Trainers Screen: need refetch');
    getTrainers();
  }, []);

  // Newly suggestedProgramme handle
  useEffect(() => {
    if (!trainers || trainers.length === 0) {
      return;
    }

    if (suggestedProgramme && suggestedProgramme.trainer) {
      const index = trainers.findIndex(
        (it) => suggestedProgramme.trainer.id === it.id,
      );
      console.log('suggestedTrainerIndex', index);

      if (index === -1) {
        return;
      }

      // Swipe UI and set state to trigger selectedProgramme change
      if (index !== activeIndex) {
        // Scroll to triggers active index change
        scrollTo(index);
      } else {
        // If index is already to suggested trainer index go directly to set selected programme
        setSelected();
      }
    }
  }, [trainers, iconsSwiper, suggestedProgramme]);

  // Index change handle
  useEffect(() => {
    if (activeIndex < 0) {
      setActiveIndex(0);
      return;
    }
    setSelected();

    setLoading(false);
  }, [trainers, activeIndex]);

  function setSelected() {
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
    if (suggestedProgramme) {
      setSuggestedProgramme(null);
      console.log('Resetting Suggested Programme');
    }

    setLoading(false);
  }

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
    },
    logoContainer: {
      position: 'absolute',
      top: getScaledHeight(40),
      left: getScaledWidth(12),
      zIndex: 9,
    },
    zeroImage: {
      width: '100%',
      height: '100%',
    },
    selectText: {
      ...textStyles.semiBold16_black100,
      marginLeft: getWidth(9),
      overflow: 'visible',
      transform: [{translateY: -getHeight(8)}],
    },
    cantChooseContainer: {
      position: 'absolute',
      top: getScaledHeight(40),
      height: getScaledHeight(28),
      width: '100%',
      zIndex: 9,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    cantChooseStyle: {
      alignSelf: 'flex-start',
      position: 'absolute',
      right: getScaledWidth(18),
      height: getScaledHeight(28),
      alignItems: 'center',
    },
    leftIconContainer: {
      width: getWidth(50),
      aspectRatio: 1,
      position: 'absolute',
      alignSelf: 'flex-start',
      top: Constants.SCREEN_HEIGHT / 2 - getWidth(50),
      zIndex: 9,
    },
    rightIconContainer: {
      width: getWidth(50),
      aspectRatio: 1,
      position: 'absolute',
      alignSelf: 'flex-end',
      top: Constants.SCREEN_HEIGHT / 2 - getWidth(50),
      zIndex: 9,
    },
    arrowsTouchableStyle: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
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
      height: Constants.SCREEN_HEIGHT,
      width: '100%',
    },
    textContainer: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: colors.white100,
      borderRadius: scaledRadius(12),
      overflow: 'hidden',
      paddingBottom: getHeight(10),
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

    buttonContainer: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      marginTop: getHeight(30),
      paddingBottom: getHeight(30),
      alignItems: 'center',
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
      bottom: 0,
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
  const handlePress = useCallback(
    (direction) => {
      if (direction === 'left' && activeIndex !== 0) {
        scrollTo(activeIndex - 1);
      }
      if (direction === 'right' && activeIndex !== trainers.length - 1) {
        scrollTo(activeIndex + 1);
      }
    },
    [activeIndex],
  );

  function scrollTo(index) {
    if (iconsSwiper && iconsSwiper.current) {
      iconsSwiper.current.scrollTo(index, true);
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
  if (!isConnected) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
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

  // ** ** ** ** ** RENDER ** ** ** ** **
  const programmeWithProgressView = (weekNumber) => (
    <View style={{paddingBottom: getHeight(15 + insets.bottom / 2)}}>
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

  const renderTrainer = (trainer) => {
    let currentProgram =
      (selectedProgram &&
        trainer.programmes.find((it) => it.id === selectedProgram.id)) ||
      trainer.programmes[0];
    const {numberOfWeeks, description, firstWeek} = currentProgram;

    const extendedWeek = addWorkoutDates(addRestDays(firstWeek), new Date());

    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          alignSelf: 'center',
        }}>
        <Animated.ScrollView
          style={styles.sliderContainer}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: yOffset,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={20}
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

          <View
            style={{
              transform: [{translateY: -getHeight(120 + insets.bottom / 2)}],
            }}>
            {description && (
              <>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.text}>{description}</Text>
                </View>
                <Spacer height={27} />
              </>
            )}

            <View style={styles.textContainer}>
              <Text style={styles.upperTextBold}>{`${
                firstWeek ? firstWeek.length : 0
              } ${MeetYourIconsDict.WorkoutsPerWeek}`}</Text>
              <Text style={styles.upperText}>
                {MeetYourIconsDict.Customise}
              </Text>

              <Text
                style={
                  styles.heading
                }>{`${MeetYourIconsDict.YourFirstWeek} ${trainer.name}`}</Text>
              <Spacer height={20} />
              {extendedWeek &&
                extendedWeek.map(({duration, intensity, name, day}, index) => {
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
                })}
            </View>
            <Text
              style={
                styles.weeksText
              }>{`${numberOfWeeks} ${MeetYourIconsDict.WeeksOfTraining}`}</Text>
            <Text style={{...styles.upperText, textAlign: 'center'}}>
              {MeetYourIconsDict.ChangeProgrammes}
            </Text>
            <Spacer height={80} />
          </View>
        </Animated.ScrollView>
      </View>
    );
  };

  const renderHeaderItems = () => (
    <>
      <View style={styles.logoContainer}>
        <Animated.Image
          source={logo}
          style={{
            ...styles.image,
            opacity: headerOpacity,
          }}
        />
        <Animated.Text
          style={{
            ...styles.selectText,
            opacity: headerOpacity,
          }}>
          {MeetYourIconsDict.SelectYourProgramme}
        </Animated.Text>
      </View>

      <Animated.View
        style={{
          ...styles.cantChooseContainer,
          opacity: headerOpacity,
        }}>
        <View style={styles.cantChooseStyle}>
          <CantChooseButton
            onPress={() => navigation.navigate('HelpMeChoose')}
            navigation={navigation}
          />
        </View>
      </Animated.View>
    </>
  );

  const renderArrows = () => (
    <>
      <Animated.View
        style={{
          ...styles.leftIconContainer,
          opacity: headerOpacity,
        }}>
        <TouchableOpacity
          style={styles.arrowsTouchableStyle}
          onPress={() => handlePress('left')}
          disabled={
            activeIndex === 0 || arrowsDisabled === true ? true : false
          }>
          <TDIcon
            input={isRTL() ? 'chevron-right' : 'chevron-left'}
            inputStyle={styles.icon}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{
          ...styles.rightIconContainer,
          opacity: headerOpacity,
        }}>
        <TouchableOpacity
          style={styles.arrowsTouchableStyle}
          onPress={() => handlePress('right')}
          disabled={
            activeIndex === trainers.length - 1 || arrowsDisabled === true
              ? true
              : false
          }>
          <TDIcon
            input={isRTL() ? 'chevron-left' : 'chevron-right'}
            inputStyle={styles.icon}
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );

  const renderFadeView = () => (
    <>
      <View style={styles.fadeContainer} pointerEvents="none">
        <FadingBottomView
          color="customArray"
          height={200}
          customArray={[
            colors.white0,
            colors.white95,
            colors.veryLightPinkTwo100,
          ]}
        />
      </View>
    </>
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
        {trainers.map((trainer) => renderTrainer(trainer))}
      </Swiper>

      {renderHeaderItems()}
      {renderArrows()}
      {renderFadeView()}

      <View
        style={{
          width: '100%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'flex-end',
          bottom: 0,
        }}>
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
          <View style={{paddingBottom: getHeight(5 + insets.bottom / 2)}}>
            <DefaultButton
              type="startNow"
              icon="chevron"
              variant="gradient"
              onPress={() => {
                if (!selectedProgram) {
                  return;
                }

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
            <View style={{marginTop: getHeight(5), alignItems: 'center'}}>
              <DefaultButton
                type="login"
                variant="transparentBlackBoldText"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
