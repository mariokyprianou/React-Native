/*
 * Created Date: Tue, 10th Nov 2020, 12:54:26 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';

import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import Spacer from '../../components/Utility/Spacer';
import useDictionary from '../../hooks/localisation/useDictionary';

const purchaseImage = require('../../../assets/images/powerPurchaseImage.png');

const PurchaseModalScreen = ({}) => {
  // MARK: - Hooks
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {
    PurchaseModal_Info,
    PurchaseModal_YearlyButtonTitle,
    PurchaseModal_YearlyButtonSubTitle,
    PurchaseModal_MonthlyButtonTitle,
    PurchaseModal_MonthlyButtonSubTitle,
    PurchaseModal_RestorePurchaseButton,
    PurchaseModal_SubscriptionTermsTitle = '',
    PurchaseModal_SubscriptionTermsText,
    PurchaseModal_SavePrompt,
  } = dictionary;

  // MARK: - Local
  const [yearlyMonthPrice, setYearlyMonthPrice] = useState(2);
  const [yearlyYearPrice, setYearlyYearPrice] = useState(yearlyMonthPrice * 12);
  const [monthlyMonthPrice, setMonthlyMonthPrice] = useState(4);
  const [savingsPercentage, setSavingsPercentage] = useState(0);

  // MARK: - Use Effect
  useEffect(() => {
    navigation.setOptions({
      header: () => <Header showModalCross white transparent />,
    });
  }, []);

  useEffect(() => {
    if (!yearlyMonthPrice || !monthlyMonthPrice) {
      return;
    }
    const yearYearPrice = yearlyMonthPrice * 12; // 24
    const monthYearPrice = monthlyMonthPrice * 12; //
    setYearlyYearPrice(yearYearPrice);
    const percentage = (yearYearPrice / monthYearPrice) * 100;
    setSavingsPercentage(percentage);
  }, [yearlyMonthPrice, monthlyMonthPrice]);

  // MARK: - Actions
  const onPressFirstButton = () => {
    // TODO
  };
  const onPressSecondButton = () => {
    // TODO
  };
  const onPressThirdButton = () => {
    // TODO
  };

  // MARK: - Style
  const styles = StyleSheet.create({
    constainer: {
      flex: 1,
    },
    contentContainer: {
      alignItems: 'center',
    },
    textContainer: {
      width: '90%',
      flex: 1,
    },
    text: {
      ...textStyles.medium15_brownishGrey100,
      textAlign: 'center',
    },
    imageView: {
      width: getWidth(375),
      height: getHeight(317),
      marginBottom: getHeight(27),
    },
    termsTitle: {
      ...textStyles.medium14_brownishGrey100,
      textAlign: 'left',
      marginBottom: getHeight(5),
    },
    termsText: {
      ...textStyles.regular15_brownishGrey100,
      textAlign: 'left',
      marginBottom: getHeight(30),
    },
  });

  // MARK: - Render
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Image
        style={styles.imageView}
        source={purchaseImage}
        resizeMode={'cover'}
      />
      <View style={styles.textContainer}>
        <Text style={styles.termsText}>{PurchaseModal_Info}</Text>
      </View>
      <DefaultButton
        type={'customText'}
        variant="gradient"
        icon="chevron"
        onPress={onPressFirstButton}
        customText={PurchaseModal_YearlyButtonTitle(yearlyMonthPrice)}
        customSubtext={PurchaseModal_YearlyButtonSubTitle(yearlyYearPrice)}
        promptText={PurchaseModal_SavePrompt(savingsPercentage)}
      />
      <Spacer height={20} />
      <DefaultButton
        type={'customText'}
        variant="white"
        icon="chevron"
        onPress={onPressSecondButton}
        customText={PurchaseModal_MonthlyButtonTitle(monthlyMonthPrice)}
        customSubtext={PurchaseModal_MonthlyButtonSubTitle}
      />
      <Spacer height={15} />
      <DefaultButton
        type={'customText'}
        variant="transparentGreyText"
        onPress={onPressThirdButton}
        customText={PurchaseModal_RestorePurchaseButton}
      />
      <View style={styles.textContainer}>
        <Text style={styles.termsTitle}>
          {PurchaseModal_SubscriptionTermsTitle.toUpperCase()}
        </Text>
        <Text style={styles.termsText}>
          {PurchaseModal_SubscriptionTermsText}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PurchaseModalScreen;
