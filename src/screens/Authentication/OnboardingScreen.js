/*
 * Jira Ticket:
 * Created Date: Mon, 2nd Nov 2020, 15:01:24 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Animated, Dimensions} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import OnboardingSliderItem from '../../components/Cards/OnboardingSliderItem';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Header from '../../components/Headers/Header';
import isRTL from '../../utils/isRTL';
import useData from '../../hooks/data/UseData';
import useCommonData from '../../hooks/data/useCommonData';
import WalkthoughPaginationDots from '../../components/Views/WalkthroughPaginationDots';

const width = Dimensions.get('window').width;

export default function OnboardingScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const onboardSwiper = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const {dictionary} = useDictionary();
  const {ButtonDict} = dictionary;
  const navigation = useNavigation();

  const {onboarding} = useCommonData();

  const [scrollOffset, setScrollOfset] = useState(new Animated.Value(0));

  navigation.setOptions({
    header: () => <Header title={''} goBack componentRight={() => <Login />} />,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: colors.backgroundWhite100,
      paddingBottom: '10%',
    },
    title: {
      ...textStyles.bold24_black100,
      marginTop: getHeight(36),
    },
    text: {
      ...textStyles.medium15_brownishGrey100,
      marginTop: getHeight(6),
      marginBottom: getHeight(10),
    },
    dot: {
      backgroundColor: colors.paleBlue100,
      height: getHeight(6),
      width: getHeight(6),
      borderRadius: radius(14),
      marginHorizontal: getWidth(3),
    },
    activeDot: {
      backgroundColor: colors.brownishGrey100,
      height: getHeight(6),
      width: getHeight(6),
      borderRadius: radius(14),
      marginHorizontal: getWidth(3),
    },
    loginContainer: {
      width: getWidth(100),
    },
    loginText: {
      ...textStyles.bold15_black100,
      textAlign: 'left',
    },
    buttonWrapper: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      position: 'absolute',
      top: getHeight(-30),
      left: 0,
      flex: 1,
      paddingHorizontal: getWidth(20),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icon: {
      size: fontSize(18),
      color: colors.black100,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const Login = () => {
    return (
      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>{ButtonDict.Login}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function handlePressGetStarted() {
    navigation.navigate('MeetYourIcons', {switchProgramme: false});
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  function onScroll(e) {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.x / scrollSensitivity;
    setScrollOfset(new Animated.Value(offset));
  }

  const position = Animated.divide(scrollOffset, width - getWidth(100));

  return (
    <View style={styles.container}>
      <Swiper
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={onboardSwiper}
        loop={false}
        onIndexChanged={(index) => {
          setActiveIndex(index);
        }}
        showsPagination={false}>
        {onboarding.map(({title, description, image}) => (
          <OnboardingSliderItem
            image={image}
            header={title}
            text={description}
          />
        ))}
      </Swiper>

      <WalkthoughPaginationDots dots={onboarding.length} position={position} />
      <DefaultButton
        type="getStarted"
        icon="chevron"
        variant="white"
        onPress={handlePressGetStarted}
      />
    </View>
  );
}
