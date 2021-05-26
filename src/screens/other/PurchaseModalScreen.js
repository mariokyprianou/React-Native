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
  Alert,
  Platform,
  TouchableOpacity,
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
import displayAlert from '../../utils/DisplayAlert';
import Video from 'react-native-video';
import * as R from 'ramda';

import * as RNIap from 'react-native-iap';
import {
  flushFailedPurchasesCachedAsPendingAndroid,
  useIAP,
  requestSubscription,
  initConnection,
  getSubscriptions,
} from 'react-native-iap';
import RegisterGooglePlaySubscription from '../../apollo/mutations/RegisterGooglePlaySubscription';
import RegisterAppStoreSubscription from '../../apollo/mutations/RegisterAppStoreSubscription';
import {useMutation} from '@apollo/client';
import StylisedText from '../../components/text/StylisedText';

const purchaseImage = require('../../../assets/images/powerPurchaseImage.png');
const purchaseModalVideo = require('../../../assets/videos/purchaseModalVideo.m4v');

const productIds = [
  'app.power.subscription.yearly',
  'app.power.subscription.monthly',
];

const PurchaseModalScreen = ({}) => {
  // MARK: - Hooks
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {PurchaseDict} = dictionary;
  const {
    firebaseLogEvent,
    analyticsEvents,
    userData,
    checkUserSubscription,
  } = useUserData();
  const {setLoading} = useLoading();

  // MARK: - Local
  const [currentSubscription, setCurrentSubscription] = useState();
  const [restorePressed, setRestorePressed] = useState(false);

  const [yearlySubscription, setYearlySubscription] = useState({
    productId: 'app.power.subscription.yearly',
    localizedPrice: '£24.00',
    price: 24.0,
  });
  const [monthlySubscription, setMonthlySubscription] = useState({
    productId: 'app.power.subscription.monthly',
    localizedPrice: '£4.00',
    price: 4.0,
  });

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

  navigation.setOptions({
    header: () => <></>,
  });

  // MARK: - Use Effect
  useEffect(() => {
    setLoading(true);

    StatusBar.setBarStyle('dark-content');

    initConnection();
  }, []);

  // On connect successfull, get available Subscriptions
  useEffect(() => {
    if (connected) fetchSubscriptions();
  }, [fetchSubscriptions, connected]);

  // Get available Subscriptions
  const fetchSubscriptions = useCallback(async () => {
    await flushFailedPurchasesCachedAsPendingAndroid();

    getSubscriptions(productIds)
      .then((res) => {
        console.log('Subscriptions', res);
        res.forEach((it) => {
          switch (it.productId) {
            case yearlySubscription.productId:
              setYearlySubscription({
                productId: yearlySubscription.productId,
                localizedPrice: it.localizedPrice,
                price: it.price,
              });
              break;
            case monthlySubscription.productId:
              setMonthlySubscription({
                productId: monthlySubscription.productId,
                localizedPrice: it.localizedPrice,
                price: it.price,
              });
              break;
          }
        });
        setLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [flushFailedPurchasesCachedAsPendingAndroid, getSubscriptions]);

  // Current purchase result
  useEffect(() => {
    const checkCurrentPurchase = async (purchase) => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;
        try {
          if (Platform.OS === 'ios') {
            appleSubscribe({
              variables: {
                input: {
                  receiptData: receipt,
                },
              },
            })
              .then(async (res) => {
                const success = R.path(
                  ['data', 'registerAppStoreSubscription', 'success'],
                  res,
                );
                console.log('Subscribed Success:', success);

                await finishTransaction(purchase);

                firebaseLogEvent(analyticsEvents.newSubscription, {
                  email: userData.email,
                });
              })
              .catch((err) => console.log(err))
              .finally(() => completedPurchase());
          } else {
            const productId = R.path(['productId'], purchase);
            const purchaseToken = R.path(['purchaseToken'], purchase);
            googleSubscribe({
              variables: {
                input: {
                  productId: productId,
                  purchaseToken: purchaseToken,
                },
              },
            })
              .then(async (res) => {
                const success = R.path(
                  ['data', 'registerGooglePlaySubscription', 'success'],
                  res,
                );
                console.log('Subscribed Success:', success);

                await finishTransaction(purchase);

                firebaseLogEvent(analyticsEvents.newSubscription, {
                  email: userData.email,
                });
              })
              .catch((err) => console.log(err))
              .finally(() => completedPurchase());
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
    if (
      currentSubscription &&
      products.includes(currentSubscription.productId)
    ) {
      // todo - do backend restore
    }
  }, [currentSubscription]);

  // Set current subscription state
  useEffect(() => {
    console.log('availablePurchases', availablePurchases);
    if (availablePurchases && availablePurchases.length > 0) {
      availablePurchases.forEach((it) => {
        switch (it.productId) {
          case yearlySubscription.productId:
            setCurrentSubscription(it);
            break;
          case monthlySubscription.productId:
            setCurrentSubscription(it);
            break;
        }
      });

      if (restorePressed === true) {
        setRestorePressed(false);
        displayAlert({
          title: null,
          text: PurchaseDict.PurchaseRestored,
          buttons: [
            {
              text: PurchaseDict.OkayButton,
            },
          ],
        });
      }
    } else {
      if (restorePressed === true) {
        setRestorePressed(false);
        displayAlert({
          title: null,
          text: PurchaseDict.NoPurchasesToRestore,
          buttons: [
            {
              text: PurchaseDict.OkayButton,
            },
          ],
        });
      }
    }
  }, [availablePurchases, setCurrentSubscription]);

  const completedPurchase = async () => {
    await checkUserSubscription();
    navigation.goBack();
  };

  const purchase = (sub) => {
    console.log('Purchase: ', sub);
    requestSubscription(sub.productId);
  };

  // MARK: - Actions
  const onPressYearlySubscription = () => {
    purchase(yearlySubscription);
  };
  const onPressMonthlySubscription = () => {
    purchase(monthlySubscription);
  };
  const onPressRestoreSubscription = () => {
    setRestorePressed(true);
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
    videoViewStyle: {
      width: '100%',
      height: getHeight(317),
      marginBottom: getHeight(24),
    },
    termsTitle: {
      ...textStyles.medium14_brownishGrey100,
      textAlign: 'left',
      marginBottom: getHeight(5),
    },
    infoTitleStyle: {
      ...textStyles.bold22_black100,
      textAlign: 'left',
      marginBottom: getHeight(6),
    },
    termsText: {
      ...textStyles.regular15_brownishGrey100,
      textAlign: 'left',
      marginBottom: getHeight(8),
    },
    needHelpTouchable: {
      width: '50%',
      height: getHeight(50),
      marginBottom: getHeight(20),
    },
    needHelpViewStyle: {
      justifyContent: 'center', //Centered vertically
      alignItems: 'center', // Centered horizontally
      flex: 1,
    },
    needHelpTextStyle: {
      ...textStyles.semiBold16_brownishGrey100,
      color: colors.tealish100,
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
    highlightedStyle: {
      ...textStyles.semiBold16_brownishGrey100,
      fontSize: fontSize(15),
      color: colors.tealish100,
      textDecorationLine: 'underline',
    },
  });

  // MARK: - Render
  let yearlyMonthPrice = (yearlySubscription.price / 12.0).toFixed(2);
  yearlyMonthPrice = String(yearlyMonthPrice).substring(
    0,
    String(yearlyMonthPrice).indexOf('.') + 3,
  );

  const yearlyDiscount = Math.round(
    (yearlyMonthPrice / monthlySubscription.price) * 100,
  );

  const renderNeedHelp = () => (
    <TouchableOpacity
      style={styles.needHelpTouchable}
      onPress={displayMessenger}>
      <View style={styles.needHelpViewStyle}>
        <Text style={styles.needHelpTextStyle}>{PurchaseDict.NeedHelp}</Text>
      </View>
    </TouchableOpacity>
  );

  const policyLinkText = [
    {
      pattern: PurchaseDict.PolicyPattern,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
  ];

  const termsLinkText = [
    {
      pattern: PurchaseDict.TermsPattern,
      onPress: () => navigation.navigate('TermsAndConditions'),
    },
  ];

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Video
          source={purchaseModalVideo}
          resizeMode="cover"
          style={styles.videoViewStyle}
          repeat={true}
          muted={true}
          paused={false}
          controls={null}
          playWhenInactive
        />

        <View style={styles.textContainer}>
          <Text style={styles.infoTitleStyle}>{PurchaseDict.InfoTitle}</Text>

          <Text style={styles.termsText}>{PurchaseDict.Info}</Text>
        </View>
        <DefaultButton
          type={'customText'}
          variant="gradient"
          icon="chevron"
          onPress={onPressYearlySubscription}
          capitalise={false}
          customText={PurchaseDict.YearlyButtonTitle(
            yearlySubscription.localizedPrice.charAt(0) + yearlyMonthPrice,
          )}
          customSubtext={PurchaseDict.YearlyButtonSubTitle(
            yearlySubscription.localizedPrice,
          )}
          promptText={PurchaseDict.SavePrompt(yearlyDiscount)}
        />
        <Spacer height={20} />
        <DefaultButton
          type={'customText'}
          variant="white"
          icon="chevron"
          capitalise={false}
          onPress={onPressMonthlySubscription}
          customText={PurchaseDict.MonthlyButtonTitle(
            monthlySubscription.localizedPrice,
          )}
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
        {renderNeedHelp()}
        <View style={styles.textContainer}>
          <Text style={styles.termsTitle}>
            {PurchaseDict.SubscriptionTermsTitle.toUpperCase()}
          </Text>
          <Text style={styles.termsText}>
            {Platform.OS === 'ios'
              ? PurchaseDict.SubscriptionTermsFirstPoint
              : PurchaseDict.SubscriptionTermsFirstPointAndroid}
          </Text>
          <Text style={styles.termsText}>
            {Platform.OS === 'ios'
              ? PurchaseDict.SubscriptionTermsSecondPoint
              : PurchaseDict.SubscriptionTermsSecondPointAndroid}
          </Text>
          <Text style={styles.termsText}>
            {Platform.OS === 'ios'
              ? PurchaseDict.SubscriptionTermsThirdPoint
              : PurchaseDict.SubscriptionTermsThirdPointAndroid}
          </Text>

          <StylisedText
            {...{
              active: false,
              input: policyLinkText,
              text: PurchaseDict.SubscriptionPrivacyLink,
              textStyle: {
                ...styles.termsText,
              },
              highlightedStyle: {
                ...styles.highlightedStyle,
              },
            }}
          />
          <StylisedText
            {...{
              active: false,
              input: termsLinkText,
              text: PurchaseDict.SubscriptionTermsLink,
              textStyle: {
                ...styles.termsText,
              },
              highlightedStyle: {
                ...styles.highlightedStyle,
              },
            }}
          />

          <Spacer height={30} />
        </View>
      </ScrollView>
      <Header showModalCross black transparent />
    </>
  );
};

export default PurchaseModalScreen;
