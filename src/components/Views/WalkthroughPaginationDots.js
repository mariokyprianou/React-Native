import React, {useEffect, useState, useContext} from 'react';
import {View, Animated, Image, ImageBackground, StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';
import isIphoneX from '../../utils/isIphoneX';
import {ScaleHook} from 'react-native-design-to-component';
import isRTL from '../../utils/isRTL';

export default function ({dots, position}) {
  const {getHeight, getWidth, radius} = ScaleHook();

  let data = [];
  for (let i = 0; i < dots; i++) {
    data.push({id: `{i}`});
  }

  let styles = {
    paginationDotsContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: getHeight(135),
    },
  };

  return (
    <View style={styles.paginationDotsContainer}>
      {data.map((_, i) => {
        let opacity = position.interpolate({
          inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
          outputRange: [0.2, 1, 0.2], // when position is not i, the opacity of the dot will animate to 0.2
          extrapolate: 'clamp', // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.4)
        });
        return (
          <Animated.View
            key={i}
            style={{
              opacity,
              backgroundColor: Colors.brownishGrey100,
              height: getHeight(6),
              width: getHeight(6),
              borderRadius: radius(14),
              marginHorizontal: getWidth(3),
            }}
          />
        );
      })}
    </View>
  );
}
