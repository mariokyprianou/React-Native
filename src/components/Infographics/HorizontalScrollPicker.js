import React, {useEffect, useRef, useState} from 'react';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {View, Text, Animated, FlatList, I18nManager} from 'react-native';
import UseData from '../../hooks/data/UseData';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HorizontalScrollPicker = ({
  weightPreference,
  selected = 20,
  weightAdded,
}) => {
  const {getWidth, getHeight, radius, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {weightData, selectedWeight, setSelectedWeight} = UseData();
  let data = weightData.slice(0, 51);

  const itemSize = getWidth(70);
  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
  const scrollListener = useRef(null);
  const active = useRef(0);
  data = [-1, -1, ...data, -1, -1];

  useEffect(() => {
    scrollListener.current && clearInterval(scrollListener.current);
    scrollListener.current = scrollAnimatedValue.addListener(
      ({value}) => (active.current = value),
    );

    return () => {
      clearInterval(scrollListener.current);
    };
  }, [scrollAnimatedValue]);

  const listRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (listRef && listRef.current) {
        listRef.current.scrollToIndex({animated: true, index: selected});
      }
    }, 200);
  }, [selected]);

  const style = {
    container: {
      alignSelf: 'center',
      width: '100%',
    },
    listItem: {
      height: getHeight(60),
      alignItems: 'center',
      justifyContent: 'center',
    },
    listItemText: {
      ...textStyles.bold34_black100,
      fontSize: fontSize(22),
    },
  };

  const renderItem = ({item, index}) => {
    const makeAnimated = (a, b, c) => {
      return {
        inputRange: [...data.map((_, i) => i * itemSize)],
        outputRange: [
          ...data.map((_, i) => {
            const center = i + 2;
            if (center === index) {
              return a;
            } else if (center + 1 === index || center - 1 === index) {
              return b;
            } else {
              return c;
            }
          }),
        ],
      };
    };

    return (
      <View
        style={{
          ...style.listItem,
        }}>
        <Animated.View
          style={[
            {
              alignItems: 'center',
              width: itemSize,
              opacity: scrollAnimatedValue.interpolate(
                makeAnimated(1, 0.4, 0.2),
              ),
              transform: [
                {
                  scale: scrollAnimatedValue.interpolate(
                    makeAnimated(1, 0.7, 0.6),
                  ),
                },
                {
                  scaleX: I18nManager.isRTL ? -1 : 1,
                },
              ],
            },
          ]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={style.listItemText}>
            {item >= 0 ? `${item}${weightPreference}` : ''}
          </Text>
        </Animated.View>
      </View>
    );
  };

  const getItemLayout = (data, index) => ({
    length: data.length,
    offset: itemSize * index,
    index,
  });

  return (
    <View style={style.container}>
      <AnimatedFlatList
        ref={listRef}
        // initialNumToRender={200}
        // getItemLayout={this.getItemLayout}
        scrollEnabled={!weightAdded}
        getItemLayout={getItemLayout}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollToOverflowEnabled={true}
        horizontal
        snapToInterval={itemSize}
        decelerationRate={'fast'}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollAnimatedValue}}}],
          {
            useNativeDriver: true,
          },
        )}
        data={I18nManager.isRTL ? data.reverse() : data}
        onMomentumScrollEnd={() => {
          const index = Math.round(active.current / itemSize);
          console.log('onMomentumScrollEnd', index);
          setSelectedWeight(data[index + 2]);
        }}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        inverted={I18nManager.isRTL}
        contentContainerStyle={
          I18nManager.isRTL && {
            transform: [
              {
                scaleX: -1,
              },
            ],
          }
        }
      />
    </View>
  );
};

export default HorizontalScrollPicker;
