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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
  flushFailedPurchasesCachedAsPendingAndroid,
  useIAP,
  requestSubscription,
  initConnection,
  getSubscriptions
} from 'react-native-iap';
import RegisterGooglePlaySubscription from '../../apollo/mutations/RegisterGooglePlaySubscription';
import RegisterAppStoreSubscription from '../../apollo/mutations/RegisterAppStoreSubscription';
import { Platform } from 'react-native';
import { useMutation } from '@apollo/client';



const purchaseImage = require('../../../assets/images/powerPurchaseImage.png');

const productIds = ['app.power.subscription.yearly', 'app.power.subscription.monthly'];



const PurchaseModalScreen = ({}) => {
  // MARK: - Hooks
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {PurchaseDict} = dictionary;
  const {firebaseLogEvent, analyticsEvents, userData} = useUserData();
  const {setLoading} = useLoading();

  // MARK: - Local
  const [currentSubscription, setCurrentSubscription] = useState();

  const [yearlySubscription, setYearlySubscription] = useState({productId: 'app.power.subscription.yearly', localizedPrice:"£24.00", price: 24 });
  const [monthlySubscription, setMonthlySubscription] = useState({productId: 'app.power.subscription.monthly', localizedPrice: "£4.00", price: 4 });

  const {
    connected,
    products,
    availablePurchases,
    getAvailablePurchases,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const [googleSubscribe] = useMutation(RegisterGooglePlaySubscription);
  const [appleSubscribe] = useMutation(RegisterAppStoreSubscription);

  // MARK: - Use Effect
  useEffect(() => {
    setLoading(true);
    navigation.setOptions({
      header: () => <Header showModalCross white transparent />,
    });
    StatusBar.setBarStyle('light-content');

    initConnection();
    
    return () => {
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  // On connect successfull, get available Subscriptions
  useEffect(() => {
    if (connected) fetchSubscriptions();
  }, [fetchSubscriptions, connected]);

  // Get available Subscriptions
  const fetchSubscriptions = useCallback(async () => {
   
    await flushFailedPurchasesCachedAsPendingAndroid();
   
    getSubscriptions(productIds).then(res=> {

      console.log("subscriptions", res.length);
      res.forEach(it => {
        switch (it.productId) {
        case yearlySubscription.productId:
          setYearlySubscription({productId: yearlySubscription.productId, localizedPrice: it.localizedPrice, price: it.price });
          break
        case monthlySubscription.productId:
          setMonthlySubscription({productId: monthlySubscription.productId, localizedPrice: it.localizedPrice, price: it.price });
          break
        }
      });
      setLoading(false);

    });
  },  [flushFailedPurchasesCachedAsPendingAndroid, getSubscriptions]);


  // Current purchase result
  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
    if (purchase) {
      const receipt = purchase.transactionReceipt;
      if (receipt)
        try {
          if (Platform.OS === 'ios') {
           
            appleSubscribe({
              variables: {
                input: {
                  receiptData: receipt
                },
              },
            }).then(async (res) => {
                const success = R.path(['registerAppStoreSubscription'], res);
                console.log('appleSubscribeRes', success);
  
                const ackResult = await finishTransaction(purchase);
                console.log('ackResult', ackResult);
              }).catch((err) => console.log(err));
          }
          else {
          
            googleSubscribe({
              variables: {
                input: {
                  receiptData: receipt
                },
              },
            }).then(async (res) => {
                const success = R.path(['registerGooglePlaySubscription'], res);
                console.log('googleSubscribeRes', success);
  
                const ackResult = await finishTransaction(purchase);
                console.log('ackResult', ackResult);
               
                firebaseLogEvent(analyticsEvents.newSubscription, {email: userData.email});

              }).catch((err) => console.log(err));
          }
           
        } catch (ackErr) {
          console.warn('ackErr', ackErr);
        }
      }
    };

    checkCurrentPurchase(currentPurchase);

  }, [currentPurchase, finishTransaction]);


   // Current purchase error
  useEffect(() => {
    if (currentPurchaseError)
      Alert.alert(
        'purchase error',
        JSON.stringify(currentPurchaseError?.message),
      );
  }, [currentPurchaseError, currentPurchaseError?.message]);


  // Restore 
  useEffect(() => {
    
    // We already have subscription and is valid
    if (currentSubscription && products.includes(currentSubscription.productId)) {
      // todo - do backend restore
    }
  }, [currentSubscription]);


  // Set current subscription state
  useEffect(() => {
    console.log("availablePurchases",availablePurchases)
    if (availablePurchases && availablePurchases.length > 0) {
     
      availablePurchases.forEach(it => {
        switch (it.productId) {
        case yearlySubscription.productId:
          setCurrentSubscription(it);
          break
        case monthlySubscription.productId:
          setCurrentSubscription(it);
          break
        }
      });
    }
    
  }, [availablePurchases, setCurrentSubscription]);


  const purchase = (item) => {
    console.log(item)
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
    getAvailablePurchases();
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

  const yearlyMonthPrice = yearlySubscription.price / 12.00;
  const yearlyDiscount = yearlyMonthPrice / monthlySubscription.price * 100;

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
        customText={PurchaseDict.YearlyButtonTitle(yearlySubscription.localizedPrice.charAt(0) + yearlyMonthPrice)}
        customSubtext={PurchaseDict.YearlyButtonSubTitle(yearlySubscription.localizedPrice)}
        promptText={PurchaseDict.SavePrompt(yearlyDiscount)}
      />
      <Spacer height={20} />
      <DefaultButton
        type={'customText'}
        variant="white"
        icon="chevron"
        capitalise={false}
        onPress={onPressMonthlySubscription}
        customText={PurchaseDict.MonthlyButtonTitle(monthlySubscription.localizedPrice)}
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
