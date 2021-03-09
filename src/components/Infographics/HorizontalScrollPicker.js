
import React, {useEffect, useRef, useState} from 'react';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {
  View,
  Text,
  Animated,
  FlatList,
  I18nManager,
} from 'react-native';
import UseData from '../../hooks/data/UseData';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const  HorizontalScrollPicker = ({weightPreference}) => {

    const {getWidth, getHeight, radius, fontSize} = ScaleHook();
    const {colors, textStyles} = useTheme();
    const { weightData, setSelectedWeight} = UseData();
    let data = weightData.slice(0,50);

  const itemSize = getWidth(70);
  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
  const scrollListener = useRef(null);
  const active = useRef(0);
  data = ['', '', ...data, '', ''];

  useEffect(() => {
    scrollListener.current && clearInterval(scrollListener.current);
    scrollListener.current = scrollAnimatedValue.addListener(({value}) => (active.current = value));

    return () => {
      clearInterval(scrollListener.current);
    };
  }, [scrollAnimatedValue]);


  const listRef = useRef();

  useEffect(() => {
    //cant scroll after 50 ??
    // setTimeout(function(){
    //     listRef?.current?.scrollToIndex({animated: true, index: 150});
        //listRef?.current?.scrollToEnd();
        //listRef?.current?.scrollToOffset({ offset:120 * itemSize });
        //  }, 2000);
  }, []);

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
        fontSize: fontSize(22)
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
            opacity: scrollAnimatedValue.interpolate(makeAnimated(1, 0.4, 0.2)),
            transform: [
              {
                scale: scrollAnimatedValue.interpolate(makeAnimated(1, 0.7, 0.6)),
              },
              {
                scaleX: I18nManager.isRTL ? -1 : 1,
              },
            ],
          },
        ]}>
        <Text numberOfLines={1} ellipsizeMode='clip' style={style.listItemText}>
          {item ? `${item}${weightPreference}` : ''}
        </Text>
        </Animated.View>
      </View>
    );
  };

//   getItemLayout = (data, index) => (
//     { length: 204, offset: itemSize * (index-2), index }
//   )

  

  return (
      <View style={style.container}>
      
      <AnimatedFlatList
      ref={listRef} 
        // initialNumToRender={200}
        // getItemLayout={this.getItemLayout}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollToOverflowEnabled={true}
        horizontal
        snapToInterval={itemSize}
        decelerationRate={'fast'}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollAnimatedValue}}}], {
          useNativeDriver: true,
        })}
        data={I18nManager.isRTL ? data.reverse() : data}
        onMomentumScrollEnd={() => {
          const index = Math.round(active.current / itemSize);
          setSelectedWeight(index - 2);
          //onChange(data[index + 2]);
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
