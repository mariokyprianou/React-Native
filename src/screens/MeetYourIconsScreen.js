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
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import TDIcon from 'the-core-ui-component-tdicon';
import Swiper from 'react-native-swiper';
import TrainerCard from '../components/Cards/TrainerCard';
import WorkoutCard from '../components/Cards/WorkoutCard';
import DefaultButton from '../components/Buttons/DefaultButton';
import Spacer from '../components/Utility/Spacer';
import CantChooseButton from '../components/Buttons/CantChooseButton';

const fakeImage = require('../../assets/fake2.png');

const fakeData = [
  {
    key: 1,
    name: 'Katrina',
    fatLoss: 70,
    fitness: 50,
    buildMuscle: 30,
    image: fakeImage,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    liveWeeks: 12,
    firstWeek: [
      {
        key: 3,
        title: 'Legs day',
        day: 1,
        date: 'Tuesday 3rd November',
        duration: 30,
        intensity: 'low',
      },
      {
        key: 4,
        title: 'Upper body day',
        day: 2,
        date: 'Thursday 5th November',
        duration: 45,
        intensity: 'medium',
      },
      {
        key: 5,
        title: 'Core day',
        day: 3,
        date: 'Saturday 7th November',
        duration: 60,
        intensity: 'high',
      },
    ],
  },
  {
    key: 2,
    name: 'Sally',
    fatLoss: 30,
    fitness: 60,
    buildMuscle: 90,
    image: fakeImage,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    liveWeeks: 10,
    firstWeek: [
      {
        key: 6,
        title: 'Core day',
        day: 1,
        date: 'Tuesday 3rd November',
        duration: 45,
        intensity: 'medium',
      },
      {
        key: 7,
        title: 'Upper body day',
        day: 2,
        date: 'Thursday 5th November',
        duration: 60,
        intensity: 'medium',
      },
      {
        key: 8,
        title: 'Legs day',
        day: 3,
        date: 'Saturday 7th November',
        duration: 90,
        intensity: 'high',
      },
    ],
  },
];

export default function MeetYourIconsScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const iconsSwiper = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const connected = true; // change to check connection

  const {
    TitleText_YourFirstWeek,
    InfoText_WeeksOfTraining,
    InfoText_SelectYourProgramme,
  } = dictionary;

  const screenWidth = Dimensions.get('screen').width;

  const logo = require('../../assets/images/logo.png');

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
      top: 0,
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
    },
    heading: {
      ...textStyles.bold24_white100,
      marginTop: getHeight(20),
    },
    weeksText: {
      ...textStyles.bold14_white100,
    },
    workoutContainer: {
      width: '100%',
      alignItems: 'center',
      paddingBottom: getHeight(50),
    },
    buttonContainer: {
      width: '100%',
      backgroundColor: 'transparent',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
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
    }
    if (direction === 'right' && activeIndex !== fakeData.length - 1) {
      iconsSwiper.current.scrollTo(activeIndex + 1, true);
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  if (!connected) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Image source={logo} style={styles.image} />
            <Text style={styles.selectText}>
              {InfoText_SelectYourProgramme}
            </Text>
          </View>
          <View style={styles.cantChooseContainer}>
            <CantChooseButton />
          </View>
        </View>
        <Image source={fakeImage} style={styles.zeroImage} />
        <View style={styles.zeroButtonContainer}>
          <Text style={styles.zeroInfoText}>
            Lorem ipsum dolor sit amet, consectetur
          </Text>
          {/* change ^^ to zero state info text */}
          <DefaultButton type="tryAgain" icon="chevron" variant="white" />
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
        {fakeData.map(
          ({
            fatLoss,
            fitness,
            buildMuscle,
            name,
            image,
            text,
            liveWeeks,
            firstWeek,
          }) => (
            <ScrollView style={styles.sliderContainer}>
              <View style={styles.headerContainer}>
                <View>
                  <Image source={logo} style={styles.image} />
                  <Text style={styles.selectText}>
                    {InfoText_SelectYourProgramme}
                  </Text>
                </View>
                <View style={styles.cantChooseContainer}>
                  <CantChooseButton />
                </View>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handlePress('left')}>
                  <TDIcon input={'chevron-left'} inputStyle={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('right')}>
                  <TDIcon input={'chevron-right'} inputStyle={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContainer}>
                <TrainerCard
                  fatLoss={fatLoss}
                  fitness={fitness}
                  buildMuscle={buildMuscle}
                  name={name}
                  image={image}
                />
              </View>
              <Spacer height={30} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
                <Text
                  style={
                    styles.heading
                  }>{`${TitleText_YourFirstWeek} ${name}`}</Text>
                <Text
                  style={
                    styles.weeksText
                  }>{`${liveWeeks} ${InfoText_WeeksOfTraining}`}</Text>
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
              <Spacer height={90} />
            </ScrollView>
          ),
        )}
      </Swiper>
      <View style={styles.buttonContainer}>
        <DefaultButton type="startNow" icon="chevron" variant="gradient" />
        <Spacer height={10} />
        <DefaultButton type="login" variant="transparentGreyText" />
        <Spacer height={10} />
      </View>
    </View>
  );
}
