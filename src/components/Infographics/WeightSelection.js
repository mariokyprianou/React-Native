/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 11:19:41 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import Carousel from 'react-native-snap-carousel';

const fakeWeights = [
  '1kg',
  '2kg',
  '3kg',
  '4kg',
  '5kg',
  '6kg',
  '7kg',
  '8kg',
  '9kg',
  '10kg',
];

export default function DefaultScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const swiperRef = useRef();
  const {colors, textStyles} = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: getHeight(69),
      alignItems: 'center',
    },
    card: {
      width: getWidth(80),
      height: getHeight(60),
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...textStyles.bold34_black100,
    },
    inactiveText: {
      ...textStyles.bold24_black40,
    },
    veryInactiveText: {
      ...textStyles.bold14_black20,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function renderItem({item, index}) {
    return (
      <View style={styles.card}>
        <Text
          style={
            index === selectedIndex
              ? styles.text
              : index === selectedIndex - 1
              ? styles.inactiveText
              : index === selectedIndex + 1
              ? styles.inactiveText
              : index === selectedIndex - 2
              ? styles.veryInactiveText
              : index === selectedIndex + 2 && styles.veryInactiveText
          }>
          {item}
        </Text>
      </View>
    );
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Carousel
        ref={swiperRef}
        data={fakeWeights}
        renderItem={renderItem}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={getWidth(370)}
        itemWidth={getWidth(80)}
        hasParallaxImages={true}
        onSnapToItem={(index) => setSelectedIndex(index)}
        windowSize={1}
      />
    </View>
  );
}
