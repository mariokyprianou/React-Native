/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 11:19:41 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import Carousel from 'react-native-snap-carousel';
import UseData from '../../hooks/data/UseData';

export default function WeightSelection({lastWeight}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const swiperRef = useRef();
  const {textStyles} = useTheme();
  const [unformattedWeightData, setUnformattedWeightData] = useState();
  const [lastWeightIndex, setLastWeightIndex] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {setSelectedWeight} = UseData();

  useEffect(() => {
    const weightsArray = [];
    for (let i = 1; i < 201; i++) {
      weightsArray.push(i);
    }
    setUnformattedWeightData(weightsArray);

    const findLastWeight = weightsArray.indexOf(Number(lastWeight));
    // console.log(typeof findLastWeight, '<---find last weight');
    // swiperRef.current.snapToItem(findLastWeight, true, true);

    // setLastWeightIndex(findLastWeight);
  }, [lastWeight]);

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
          {`${item}kg`}
        </Text>
      </View>
    );
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Carousel
        ref={swiperRef}
        data={unformattedWeightData}
        renderItem={renderItem}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={getWidth(350)}
        itemWidth={getWidth(75)}
        hasParallaxImages={true}
        onSnapToItem={(index) => {
          setSelectedIndex(index);
          setSelectedWeight(unformattedWeightData[index]);
        }}
        windowSize={1}
        firstItem={19}
      />
    </View>
  );
}
