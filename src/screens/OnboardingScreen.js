/*
 * Jira Ticket:
 * Created Date: Mon, 2nd Nov 2020, 15:01:24 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useOnboarding from '../hooks/data/useOnboarding';
import Swiper from 'react-native-swiper';
import OnboardingSliderItem from '../components/Cards/OnboardingSliderItem';
import DefaultButton from '../components/Buttons/DefaultButton';

export default function OnboardingScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const onboardSwiper = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const {onboardingData} = useOnboarding();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '90%',
      alignItems: 'center',
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
      height: getHeight(8),
      width: getHeight(8),
      borderRadius: radius(14),
      marginHorizontal: getWidth(3),
    },
    activeDot: {
      backgroundColor: colors.brownishGrey100,
      height: getHeight(8),
      width: getHeight(8),
      borderRadius: radius(14),
      marginHorizontal: getWidth(3),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress(direction) {
    if (direction === 'left' && activeIndex !== 0) {
      onboardSwiper.current.scrollTo(activeIndex - 1, true);
    }
    if (direction === 'right' && activeIndex !== onboardingData.length - 1) {
      onboardSwiper.current.scrollTo(activeIndex + 1, true);
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Swiper
        ref={onboardSwiper}
        loop={false}
        onIndexChanged={(index) => setActiveIndex(index)}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>
        {onboardingData.map(({header, text, image}) => (
          <OnboardingSliderItem
            image={image}
            header={header}
            text={text}
            handlePress={handlePress}
          />
        ))}
      </Swiper>
      <DefaultButton type="getStarted" icon="chevron" variant="white" />
    </View>
  );
}
