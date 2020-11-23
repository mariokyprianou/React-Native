/*
 * Jira Ticket:
 * Created Date: Tue, 3rd Nov 2020, 08:42:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useRef, useState} from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import useMeetYourIcons from '../../hooks/data/useMeetYourIcons';
import TDIcon from 'the-core-ui-component-tdicon';
import Swiper from 'react-native-swiper';
import TrainerCard from '../../components/Cards/TrainerCard';
import WorkoutCard from '../../components/Cards/WorkoutCard';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Spacer from '../../components/Utility/Spacer';
import CantChooseButton from '../../components/Buttons/CantChooseButton';
import ModalCard from '../../components/Modals/ModalCard';
import HelpMeChooseModal from '../../components/Modals/HelpMeChooseModal';
import isRTL from '../../utils/isRTL';
import FadingBottomView from '../../components/Views/FadingBottomView';

const fakeImage = require('../../../assets/fake2.png');

export default function MeetYourIconsScreen({switchProgramme = true}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const iconsSwiper = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const {meetYourIconsData, userProgrammeData} = useMeetYourIcons();
  const {currentTrainer, currentWeek} = userProgrammeData;
  const [showHelpMeChooseModal, setShowHelpMeChooseModal] = useState(false);
  const [trainerOnSlider, setTrainerOnSlider] = useState();
  const [venue, setVenue] = useState('gym');
  const navigation = useNavigation();

  const connected = true; // change to check connection

  const {MeetYourIconsDict} = dictionary;

  const screenWidth = Dimensions.get('screen').width;

  const logo = require('../../../assets/images/logo.png');

  navigation.setOptions({
    header: () => null,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      height: '100%',
      width: '100%',
    },
    headerContainer: {
      width: '100%',
      height: getHeight(70),
      position: 'absolute',
      top: getHeight(30),
      zIndex: 9,
      marginTop: getHeight(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    image: {
      height: getHeight(29),
      width: getWidth(158),
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
      right: 10,
    },
    iconContainer: {
      width: '90%',
      height: getHeight(150),
      position: 'absolute',
      left: screenWidth * 0.05,
      top: getHeight(130),
      zIndex: 9,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingBottom: getHeight(30),
    },
    icon: {
      size: fontSize(18),
      color: colors.white100,
    },
    sliderContainer: {
      flex: 1,
      backgroundColor: colors.paleTurquoise100,
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
      marginTop: getHeight(20),
      textAlign: 'left',
    },
    weeksText: {
      ...textStyles.bold14_white100,
      textAlign: 'left',
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
      marginBottom: getHeight(10),
      alignItems: 'center',
    },
    singleButtonContainer: {
      width: '100%',
      backgroundColor: colors.paleTurquoise100,
      alignItems: 'center',
      position: 'absolute',
      bottom: getHeight(40),
    },
    zeroButtonContainer: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    zeroInfoText: {
      ...textStyles.regular15_white100,
      marginBottom: getHeight(80),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress(direction) {
    if (direction === 'left' && activeIndex !== 0) {
      iconsSwiper.current.scrollTo(activeIndex - 1, true);
      setTrainerOnSlider(meetYourIconsData[activeIndex - 1].name);
    }
    if (direction === 'right' && activeIndex !== meetYourIconsData.length - 1) {
      iconsSwiper.current.scrollTo(activeIndex + 1, true);
      setTrainerOnSlider(meetYourIconsData[activeIndex + 1].name);
    }
  }

  function navigateToWorkoutHome() {
    navigation.navigate('TabContainer');
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  if (!connected) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Image source={logo} style={styles.image} />
            <Text style={styles.selectText}>
              {MeetYourIconsDict.SelectYourProgramme}
            </Text>
          </View>
          <View style={styles.cantChooseContainer}>
            <CantChooseButton
              onPress={() => setShowHelpMeChooseModal(true)}
              navigation={navigation}
            />
          </View>
        </View>
        <Image source={fakeImage} style={styles.zeroImage} />
        <View style={styles.zeroButtonContainer}>
          <Text style={styles.zeroInfoText}>
            {MeetYourIconsDict.ZeroStateText}
          </Text>
          {/* change ^^ to zero state info text */}
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

  return (
    <View style={styles.container}>
      <Swiper
        ref={iconsSwiper}
        loop={false}
        onIndexChanged={(index) => setActiveIndex(index)}
        showsPagination={false}>
        {meetYourIconsData.map(
          ({
            fatLoss,
            fitness,
            buildMuscle,
            name,
            image,
            text,
            liveWeeks,
            firstWeek,
          }) => {
            return (
              <ScrollView style={styles.sliderContainer}>
                <View style={styles.headerContainer}>
                  <View>
                    <Image source={logo} style={styles.image} />
                    <Text style={styles.selectText}>
                      {MeetYourIconsDict.SelectYourProgramme}
                    </Text>
                  </View>
                  <View style={styles.cantChooseContainer}>
                    <CantChooseButton
                      onPress={() => setShowHelpMeChooseModal(true)}
                      navigation={navigation}
                    />
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => handlePress('left')}>
                    <TDIcon
                      input={isRTL() ? 'chevron-right' : 'chevron-left'}
                      inputStyle={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePress('right')}>
                    <TDIcon
                      input={isRTL() ? 'chevron-left' : 'chevron-right'}
                      inputStyle={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                  <TrainerCard
                    fatLoss={fatLoss}
                    fitness={fitness}
                    buildMuscle={buildMuscle}
                    name={name}
                    image={image}
                    onPressGymHome={() => setVenue(venue)}
                  />
                </View>
                <Spacer height={30} />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{text}</Text>
                  <Text
                    style={
                      styles.heading
                    }>{`${MeetYourIconsDict.YourFirstWeek} ${name}`}</Text>
                  <Text
                    style={
                      styles.weeksText
                    }>{`${liveWeeks} ${MeetYourIconsDict.WeeksOfTraining}`}</Text>
                </View>
                <View style={styles.workoutContainer}>
                  {firstWeek.map(({title, day, date, duration, intensity}) => (
                    <WorkoutCard
                      title={title}
                      day={day}
                      date={date}
                      duration={duration}
                      intensity={intensity}
                    />
                  ))}
                </View>
                <Spacer height={180} />
              </ScrollView>
            );
          },
        )}
      </Swiper>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <FadingBottomView color="blue" height={250} />
      </View>
      {switchProgramme === true && trainerOnSlider === currentTrainer ? (
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="restartProgramme"
            icon="chevron"
            variant="gradient"
            trainerName="KATRINA"
            onPress={navigateToWorkoutHome}
          />
          {/* <Spacer height={20} /> */}
          <DefaultButton
            type="continueFromWeek"
            icon="chevron"
            variant="white"
            weekNo={currentWeek}
            onPress={navigateToWorkoutHome}
          />
        </View>
      ) : switchProgramme === true && trainerOnSlider !== currentTrainer ? (
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="start"
            icon="chevron"
            variant="gradient"
            onPress={() => navigation.navigate('Congratulations')} // add params to say which trainer selected
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="startNow"
            icon="chevron"
            variant="gradient"
            onPress={() => navigation.navigate('Registration')}
          />
          {/* <Spacer height={20} /> */}
          <DefaultButton
            type="login"
            variant="grey"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      )}
      <ModalCard isVisible={showHelpMeChooseModal}>
        <HelpMeChooseModal
          onPressClose={() => setShowHelpMeChooseModal(false)}
          onFinish={navigateToWorkoutHome}
        />
      </ModalCard>
    </View>
  );
}
