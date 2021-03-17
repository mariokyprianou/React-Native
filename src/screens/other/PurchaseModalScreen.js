/*
 * Created Date: Tue, 10th Nov 2020, 12:54:26 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import Intercom from 'react-native-intercom';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import Spacer from '../../components/Utility/Spacer';
import useDictionary from '../../hooks/localisation/useDictionary';
import useUserData from '../../hooks/data/useUserData';
import useLoading from '../../hooks/loading/useLoading';

import * as RNIap from 'react-native-iap'; 
import {
  purchaseErrorListener,
  purchaseUpdatedListener,
  flushFailedPurchasesCachedAsPendingAndroid,
  useIAP,
  requestSubscription,
} from 'react-native-iap';



const purchaseImage = require('../../../assets/images/powerPurchaseImage.png');

const products = ['app.power.subscription.yearly', 'app.power.subscription.monthly'];



const PurchaseModalScreen = ({}) => {
  // MARK: - Hooks
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {PurchaseDict} = dictionary;
  const {firebaseLogEvent, analyticsEvents} = useUserData();
  const {setLoading} = useLoading();

  // MARK: - Local
  const [subscribedProductId, setSubscribedProdutId] = useState();

  const [yearlySubscription, setYearlySubscription] = useState({productId: 'app.power.subscription.yearly', price: 24 });
  const [monthlySubscription, setMonthlySubscription] = useState({productId: 'app.power.subscription.monthly', price: 4 });

  const {
    connected,
    products,
    subscriptions,
    getSubscriptions,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  // MARK: - Use Effect
  useEffect(() => {
    setLoading(true);
    navigation.setOptions({
      header: () => <Header showModalCross white transparent />,
    });
    StatusBar.setBarStyle('light-content');

    RNIap.initConnection();
    
  }, []);


  // On connect successfull, get available Subscriptions
  useEffect(() => {
    if (connected) fetchSubscriptions();
  }, [fetchSubscriptions, connected]);

  // Get available Subscriptions
  const fetchSubscriptions = useCallback(async () => {
    await flushFailedPurchasesCachedAsPendingAndroid();
    
    const IAPProducts = (await getSubscriptions(products)) || [];

    console.log("IAPProducts",IAPProducts)
    IAPProducts.forEach(it => {
      switch (it.productId) {
      case yearlySubscription.productId:
        setYearlySubscription({productId: yearlySubscription.productId, price: it.localizedPrice });
        break
      case monthlySubscription.productId:
        setMonthlySubscription({productId: monthlySubscription.productId, price: it.localizedPrice });
        break
      }
    });

    await getSubcribedProuduct();

    setLoading(false);
   
  },  [getSubscriptions]);

  const getSubcribedProuduct = useCallback(async () => {
    //setSubscribedProdutId(await getActiveSubscriptionId());
  }, []);


  useEffect(() => {
    if (currentPurchaseError)
      Alert.alert(
        'purchase error',
        JSON.stringify(currentPurchaseError?.message),
      );
  }, [currentPurchaseError, currentPurchaseError?.message]);


  const purchase = (item) => {
    requestSubscription(item.productId);
  };


  // MARK: - Actions
  const onPressYearlySubscription = () => {
    purchase(yearlySubscription.productId);

  };
  const onPressMonthlySubscription = () => {
    purchase(monthlySubscription.productId);
  };
  const onPressRestoreSubscription = () => {
    // TODO
  };

  const displayMessenger = () => {
    // to open intercom
    firebaseLogEvent(analyticsEvents.accessedIntercom, {});

    Intercom.displayMessenger();
  };

  // MARK: - Style
  const styles = StyleSheet.create({
    constainer: {
      flex: 1,
    },
    contentContainer: {
      alignItems: 'center',
      backgroundColor: colors.backgroundWhite100,
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
        <Text style={styles.termsText}>{PurchaseDict.Info}</Text>
      </View>
      <DefaultButton
        type={'customText'}
        variant="gradient"
        icon="chevron"
        onPress={onPressYearlySubscription}
        capitalise={false}
        customText={PurchaseDict.YearlyButtonTitle(yearlySubscription.price / 12)}
        customSubtext={PurchaseDict.YearlyButtonSubTitle(yearlySubscription.price)}
        promptText={PurchaseDict.SavePrompt(50)}
      />
      <Spacer height={20} />
      <DefaultButton
        type={'customText'}
        variant="white"
        icon="chevron"
        capitalise={false}
        onPress={onPressMonthlySubscription}
        customText={PurchaseDict.MonthlyButtonTitle(monthlySubscription.price)}
        customSubtext={PurchaseDict.MonthlyButtonSubTitle}
      />
      <Spacer height={15} />
      <DefaultButton
        type={'customText'}
        variant="transparentGreyText"
        onPress={onPressRestoreSubscription}
        capitalise={false}
        customText={PurchaseDict.RestorePurchaseButton}
      />
      <View style={styles.textContainer}>
        <Text style={styles.termsTitle}>
          {PurchaseDict.SubscriptionTermsTitle.toUpperCase()}
        </Text>
        <Text style={styles.termsText}>
          {PurchaseDict.SubscriptionTermsText}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PurchaseModalScreen;
