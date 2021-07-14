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
  IAPErrorCode,
} from 'react-native-iap';
import RegisterGooglePlaySubscription from '../../apollo/mutations/RegisterGooglePlaySubscription';
import RegisterAppStoreSubscription from '../../apollo/mutations/RegisterAppStoreSubscription';
import {useMutation} from '@apollo/client';
import StylisedText from '../../components/text/StylisedText';
import LinearGradient from 'react-native-linear-gradient';

const purchaseImage = require('../../../assets/images/powerPurchaseImage.png');
const purchaseModalVideo = require('../../../assets/videos/purchaseModalVideo.mp4');

const productIds = [
  'app.power.subscription.yearly',
  'app.power.subscription.monthly',
  'app.power.subscription.with.trial.monthly',
];

const PurchaseModalScreen = ({}) => {
  // MARK: - Hooks
  const {
    getHeight,
    getWidth,
    getScaledHeight,
    getScaledWidth,
    fontSize,
  } = ScaleHook();
  const {colors, textStyles, fonts} = useTheme();
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
    trial: true,
  });
  const [monthlySubscription, setMonthlySubscription] = useState({
    productId: 'app.power.subscription.monthly',
    localizedPrice: '£4.00',
    price: 4.0,
    trial: true,
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
        console.log('Subscriptions', res.length);
        res.forEach((it) => {
          switch (it.productId) {
            case yearlySubscription.productId:
              setYearlySubscription({
                productId: yearlySubscription.productId,
                localizedPrice: it.localizedPrice,
                price: it.price,
                trial:
                  Platform.OS === 'ios'
                    ? it.introductoryPricePaymentModeIOS === 'FREETRIAL'
                    : !!it.freeTrialPeriodAndroid,
              });
              break;
            case monthlySubscription.productId:
              setMonthlySubscription({
                productId: monthlySubscription.productId,
                localizedPrice: it.localizedPrice,
                price: it.price,
                trial:
                  Platform.OS === 'ios'
                    ? it.introductoryPricePaymentModeIOS === 'FREETRIAL'
                    : !!it.freeTrialPeriodAndroid,
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
    if (currentPurchaseError) {
      if (currentPurchaseError?.code === IAPErrorCode.E_USER_CANCELLED) {
        return;
      }

      displayAlert({
        text:
          currentPurchaseError?.code === IAPErrorCode.E_ALREADY_OWNED
            ? PurchaseDict.PaymentFailedAlreadyExists
            : PurchaseDict.PaymentFailedGeneric,
      });
    }
  }, [currentPurchaseError, currentPurchaseError?.message]);

  // Restore
  useEffect(() => {
    // We already have subscription and is valid
    if (restorePressed && currentSubscription) {
      setRestorePressed(false);

      const receipt = currentSubscription.transactionReceipt;
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

              const title = success
                ? PurchaseDict.PurchaseRestored
                : PurchaseDict.NoPurchasesToRestore;
              displayAlert({
                title: null,
                text: title,
                buttons: [
                  {
                    text: PurchaseDict.OkayButton,
                  },
                ],
              });

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

              const title = success
                ? PurchaseDict.PurchaseRestored
                : PurchaseDict.NoPurchasesToRestore;
              displayAlert({
                title: null,
                text: title,
                buttons: [
                  {
                    text: PurchaseDict.OkayButton,
                  },
                ],
              });

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
  }, [currentSubscription]);

  // Set current subscription state
  useEffect(() => {
    console.log('availablePurchases count: ', availablePurchases.length);
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
    } else {
      setRestorePressed(false);
      if (restorePressed === true) {
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
      height: getScaledHeight(317),
      marginBottom: getHeight(20),
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
    infoText: {
      fontFamily: fonts.regular,
      color: colors.brownishGrey100,
      textAlign: 'left',
      marginBottom: getHeight(8),
      fontSize: fontSize(14),
    },
    termsText: {
      fontFamily: fonts.regular,
      color: colors.brownishGrey100,
      textAlign: 'left',
      marginBottom: getHeight(8),
      fontSize: fontSize(12),
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
      fontSize: fontSize(12),
      color: colors.tealish100,
      textDecorationLine: 'underline',
    },

    buttonsContainer: {
      height: getHeight(180),
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingStart: getWidth(20),
      paddingEnd: getWidth(20),
      marginTop: getHeight(10),
    },
    buttonCardStyle: {
      width: '47%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      shadowColor: colors.black20,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 4,
    },

    buttonTextContainer: {
      width: '90%',
      flex: 1,
      marginTop: getHeight(22),
      marginBottom: getHeight(6),
      justifyContent: 'space-between',
    },

    promptContainer: {
      backgroundColor: colors.blueGreen100,
      position: 'absolute',
      height: getHeight(24),
      right: getWidth(7),
      paddingHorizontal: getWidth(12),
      transform: [{translateY: -12}],
      justifyContent: 'center',
    },
    promptTextStyle: {
      ...textStyles.medium14_white100,
      textAlign: 'left',
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

  const buttonTextVariant = {
    monthly: {
      color: colors.black100,
    },
    annually: {
      color: colors.white100,
    },
  };

  const renderText = ({type}) => {
    const trial =
      type === 'monthly' ? monthlySubscription.trial : yearlySubscription.trial;

    return (
      <View style={styles.buttonTextContainer}>
        {trial && (
          <Text
            style={{
              ...textStyles.bold16_brownishGrey100,
              ...buttonTextVariant[type],
            }}>
            {PurchaseDict.FreeTrial}
          </Text>
        )}

        <View style={{marginTop: trial ? 0 : getHeight(22)}}>
          <Text
            style={{
              ...textStyles.bold16_brownishGrey100,
              ...buttonTextVariant[type],
              marginBottom: getHeight(2),
            }}>
            {type === 'monthly' ? PurchaseDict.Monthly : PurchaseDict.Yearly}
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize(18),
              ...buttonTextVariant[type],
              marginBottom: type === 'monthly' ? getHeight(14) : 0,
            }}>
            {type === 'monthly'
              ? PurchaseDict.MonthlyButtonTitle(
                  monthlySubscription.localizedPrice,
                )
              : PurchaseDict.YearlyButtonTitle(
                  yearlySubscription.localizedPrice,
                )}
          </Text>
          {type === 'annually' && (
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: fontSize(14),
                ...buttonTextVariant[type],
              }}>
              {`(${PurchaseDict.MonthlyButtonTitle(yearlyMonthPrice)})`}
            </Text>
          )}
        </View>
        <Text
          style={{
            ...textStyles.regular14_black100,
            ...buttonTextVariant[type],
          }}>
          {trial
            ? PurchaseDict.AfterFreeTrial
            : type === 'monthly'
            ? PurchaseDict.BilledMonthly
            : PurchaseDict.BilledAnnually}
        </Text>
      </View>
    );
  };

  const renderPrompt = () => {
    return (
      <View style={styles.promptContainer}>
        <Text style={styles.promptTextStyle}>
          {PurchaseDict.SavePrompt(yearlyDiscount)}
        </Text>
      </View>
    );
  };

  function RenderButton({type, onPress}) {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: getHeight(166),
          ...styles.buttonCardStyle,
        }}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.6}
          style={{
            flex: 1,
            ...styles.buttonCardStyle,
            backgroundColor: colors.black20,
          }}>
          {type === 'monthly' ? (
            <View
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                backgroundColor: colors.white100,
              }}>
              {renderText({type})}
            </View>
          ) : (
            <>
              <LinearGradient
                style={{height: '100%', width: '100%', alignItems: 'center'}}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.tealish100, colors.tiffanyBlue100]}>
                {renderText({type})}
              </LinearGradient>
              {renderPrompt()}
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  }

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

          <Text style={styles.infoText}>{PurchaseDict.Info}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <RenderButton type={'monthly'} onPress={onPressMonthlySubscription} />
          <RenderButton type={'annually'} onPress={onPressYearlySubscription} />
        </View>

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
