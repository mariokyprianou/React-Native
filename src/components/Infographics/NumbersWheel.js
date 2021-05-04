/*
 * Created Date: Mon, 1st Feb 2021, 22:04:03 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */

import React, {useRef, useEffect} from 'react';
import {View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import UseData from '../../hooks/data/UseData';
import useTheme from '../../hooks/theme/UseTheme';
import SmoothPicker from 'react-native-smooth-picker';

const NumbersWheel = ({weightPreference}) => {
  function handleChange(index) {
    setSelectedWeight(index);
  }

  const refPicker = useRef(null);
  const {weightData, selectedWeight, setSelectedWeight} = UseData();
  const {getWidth, fontSize} = ScaleHook();
  const {textStyles} = useTheme();

  useEffect(() => {
    setTimeout(function () {
      setSelectedWeight(selectedWeight);
      refPicker.current.scrollToIndex({
        animated: true,
        index: selectedWeight,
        viewOffset: -getWidth(50),
      });
    }, 600);
    setTimeout(function () {
      setSelectedWeight(selectedWeight);
      refPicker.current.scrollToIndex({
        animated: true,
        index: selectedWeight,
        viewOffset: -getWidth(50),
      });
    }, 1000);
  }, [selectedWeight]);

  const ItemToRender = (
    {item, index},
    indexSelected,
    vertical,
    weightPreference,
  ) => {
    const selected = index === indexSelected;
    const gap = Math.abs(index - indexSelected);

    let opacity = opacities[gap];
    if (gap > 3) {
      opacity = opacities[4];
    }
    let size = sizeText[gap];
    if (gap > 1) {
      size = sizeText[2];
    }
    const textStyle = {
      ...textStyles.bold34_black100,
      opacity: opacity || 0.2,
      fontSize: size ? fontSize(size) : fontSize(14),
    };

    return (
      <Item
        selected={selected}
        textStyle={textStyle}
        width={getWidth(100)}
        name={`${item}${weightPreference}`}
      />
    );
  };

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <SmoothPicker
        refFlatList={refPicker}
        // initialScrollToIndex={lastWeight}
        onScrollToIndexFailed={() => {}}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={weightData}
        scrollAnimation
        onSelected={({item, index}) => handleChange(index)}
        renderItem={(option) =>
          ItemToRender(option, selectedWeight, false, weightPreference)
        }
        selectOnPress={true}
        magnet={false}
      />
    </View>
  );
};

const opacities = {
  0: 1,
  1: 0.4,
  2: 0.2,
  3: 0.2,
  4: 0.2,
};
const sizeText = {
  0: 34,
  1: 24,
  2: 14,
};

const Item = React.memo(({selected, width, textStyle, name}) => {
  return (
    <View
      style={{
        width: width,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{...textStyle}}>{name}</Text>
    </View>
  );
});

export default NumbersWheel;
