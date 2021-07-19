import {TabBarIndicator} from 'react-native-tab-view';

const SharedDict = {
  Cancel: 'रद्द करें',
  Gym: 'जिम',
  Home: 'होम',
  Locale: 'हिंदी',
  GoBack: 'वापस जाएँ',
  Login: 'लॉगइन',
  Progress: 'प्रगति',
  Share: 'शेयर करें',
  Logout: 'लॉगआउट',
  FirstName: 'प्रथम नाम',
  LastName: 'अंतिम नाम',
  Email: 'ईमेल',
  Password: 'पासवर्ड',
  Gender: 'लिंग',
  Dob: 'जन्म की तारीख',
  Country: 'देश',
  Region: 'क्षेत्र',
  Delete: 'मिटाएँ',
  Notifications: 'नोटिफिकेशन्स',
  Sets: 'सेट्स',
  Reps: 'बार',
  Secs: 'सेकेंड्स',
  OldPassword: 'पुराना पासवर्ड',
  NewPassword: 'नया पासवर्ड',
  Analytics: 'एनालिटिक्स',
  ChangeEmail: 'ईमेल बदलें',
  ChangePassword: 'पासवर्ड बदलें',
  VerifyEmail: 'ईमेल की पुष्टि करें',
  Ok: 'ठीक है',
  Female: 'महिला',
  Male: 'पुरूष',
  Other: 'अन्य',
  PreferNotToSay: 'बताना नहीं चाहते',
  Okay: 'ठीक है',
};

const hiIN = {
  AppTitle: 'Power',
  OfflineMessage: 'आप अभी ऑफ़लाइन हैं। कृपया पुन: कनेक्ट करने का प्रयास करें',

  ButtonDict: {
    AddPhoto: 'फोटो जोड़ें',
    AddResult: 'रिजल्ट जोड़ें',
    AddWeight: 'वज़न जोड़ें',
    AllowAnalytics: 'एनालिटिक्स को अनुमति दें',
    AllowNotifications: 'नोटिफिकेशन्स को अनुमति दें',
    Cancel: SharedDict.Cancel.toUpperCase(),
    CantChoose: 'चुन नहीं सकते',
    Challenge: 'चुनौती',
    ChangeDevice: 'डिवाइस बदलें',
    ChangeEmail: SharedDict.ChangeEmail.toUpperCase(),
    ChangePassword: SharedDict.ChangePassword.toUpperCase(),
    Continue: 'जारी रखें',
    ContinueFromWeek: 'सप्ताह से जारी रखें',
    CreateAccount: 'अकाउंट बनाएँ',
    Done: 'पूर्ण हो गया',
    GetStarted: 'शुरू करें',
    GoBack: SharedDict.GoBack.toUpperCase(),
    GoBackLower: SharedDict.GoBack,
    Gym: SharedDict.Gym.toUpperCase(),
    Home: SharedDict.Home.toUpperCase(),
    JumpIn: 'जंप इन',
    Login: SharedDict.Login.toUpperCase(),
    Pause: 'पॉज करें',
    Pluralise: ' का',
    Programme: 'प्रोग्राम',
    Progress: SharedDict.Progress.toUpperCase(),
    QuestionMark: '?',
    RemindMe: 'याद दिलाएं',
    Resend: 'दोबारा भेजें',
    Restart: 'रिस्टार्ट करें',
    RestartProgramme: 'प्रोग्राम रिस्टार्ट करें',
    SendResetRequest: 'रिसेट का अनुरोध भेजें',
    SetLanguage: 'भाषा चुनें',
    Share: SharedDict.Share.toUpperCase(),
    Start: 'शुरू करें',
    StartNow: 'अभी शुरू करें',
    StartWorkout: 'वर्कआउट शुरू करें',
    TryAgain: 'दोबारा प्रयास करें',
    Secs: (time) => `${time}s`,
    Skip: 'छोड़ें',
    NeedHelp: 'मदद चाहिए?',
    SaveChanges: 'परिवर्तनों को सेव करें',
    NeedToSignOut: 'साइन आउट करना है?',
    Logout: SharedDict.Logout,
    Close: 'बंद करे',
    Send: 'ईमेल भेजें',
    VerifyLater: 'ईमेल बाद में सत्यापित करें',
  },

  AuthDict: {
    FormTitle: 'मुफ़्त ट्रायल शुरू करने के लिए अपना अकाउंट बनाएँ!',
    FirstNameLabel: SharedDict.FirstName,
    LastNameLabel: SharedDict.LastName,
    EmailLabel: SharedDict.Email,
    PasswordLabel: SharedDict.Password,
    SexLabel: SharedDict.Sex,
    DobLabel: SharedDict.Dob,
    CountryLabel: SharedDict.Country,
    RegionLabel: SharedDict.Region,
    MarketingText:
      'मुझे POWER की ओर से नई ट्रेनरों, चुनौतियों, मुकाब़लों, मुफ़्त उपहारों और अन्य बातों के बारे में ईमेल से कोई जानकारी नहीं प्राप्त करनी है।',
    TermsAndConditionsText:
      'मुझे Power के नियम और शर्त व निजता नीति स्वीकार है',
    InvalidGivenName: 'कृपया अपना प्रथम नाम दर्ज करें',
    InvalidFamilyName: 'कृपया अपना अंतिम नाम दर्ज करें',
    InvalidEmail: 'कृपया एक वैध ईमेल दर्ज करें',
    InvalidPassword:
      'आपका पासवर्ड कम से कम 8 अक्षरों का होना चाहिए और इसमें कम से कम 1 नंबर शामिल होना चाहिए।',
    InvalidNotNewPassword:
      'उफ़! आपका पासवर्ड कम से कम 8 अक्षरों का होना चाहिए और इसमें कम से कम 1 नंबर शामिल होना चाहिए। कृपया नए पासवर्ड के साथ पुन: प्रयास करें',
    InvalidTsAndCs: 'कृपया नियमों और शर्तों को स्वीकार करें।',
    ChangePasswordFail:
      'ओह! परिवर्तन करने के लिए, यह पक्का करें कि आपने अपने वर्तमान पासवर्ड के साथ नए पासवर्ड को दर्ज किया है।',
    IncorrectEmailOrPassword:
      'ओह! आपका ईमेल या पासवर्ड ग़लत है। कृपया दोबारा प्रयास करें।',
    IncorrectPassword:
      'ओह! आपका वर्तमान पासवर्ड ग़लत है। कृपया दोबारा प्रयास करें।',
    ForgotPasswordButtonText: 'पासवर्ड भूल गए?',
    ForgotPasswordCodeLabel: 'पासवर्ड रिसेट कोड',
    ForgotPasswordLabel: SharedDict.NewPassword,
    InvalidResetCode: 'अवैध कोड',
    ResetPasswordDescriptionText:
      'आपका पासवर्ड रिसेट करने के लिए हमने बस अभी आपको एक कोड ईमेल किया है। यहाँ कोड दर्ज करें, और आपको एक नया पासवर्ड बनाने के लिए कहा जाएगा',
    TermsPattern: /नियम और शर्त/,
    PolicyPattern: /निजता नीति/,
    TermsAndConditionsScreenTitle: 'नियम और शर्त',
    ResetPasswordScreenTitle: 'पासवर्ड भूल गए',
    RegistrationScreenTitle: 'अकाउंट बनाएं',
    RegistrationGendersFemale: SharedDict.Female,
    RegistrationGendersMale: SharedDict.Male,
    RegistrationGendersOther: SharedDict.Other,
    RegistrationGendersPreferNot: SharedDict.PreferNotToSay,
    PrivacyPolicyScreenTitle: 'निजता नीति',
    NotYetLoggedIn:
      'आपने अभी लॉगइन नहीं किया है - कृपया अपने ईमेल ऐड्रेस की पुष्टि करें',
    NotificationsPermissionsScreenTitle: SharedDict.Notifications,
    NotificationsPermissionsText:
      'आपको वर्कआउट के अपडेट्स भेजने के लिए, हमें आपके डिवाइस पर पुश नोटिफिकेशनों को भेजने की अनुमति की ज़रूरत है।',

    AnalyticsPermissionsScreenTitle: SharedDict.Analytics,
    AnalyticsPermissionsText:
      'सबसे बेहतर वर्कआउट प्रोग्राम को बनाने और POWER के अनुभव को लगातार सुधारने के लिए, हमें ऐप से एनालिटिक्स प्राप्त करने के लिए आपकी अनुमति की आवश्यकता है।',

    LoginScreenTitle: SharedDict.Login,

    VerifyEmailTitle: SharedDict.VerifyEmail,
    VerificationLinkSent: 'ईमेल भेजा! कृपया अपना इनबॉक्स जांचें।',
    VerifyEmail:
      'ईमेल भेजें" क्लिक करें और हम आपका ईमेल पता सत्यापित करने के लिए आपको एक लिंक ईमेल करेंगे। अपना POWER खाता सत्यापित करने के लिए बस ईमेल में दिए गए लिंक पर टैप करें।',
    YouWillBeLoggedOut: 'आप लॉग आउट कर जाएंगे - क्या आप जारी रखना चाहते हैं?',
    VerificationNotRecognized:
      'ओह! पुष्टिकरण के कोड की पहचान नहीं हो पाई। कृपया दोबारा प्रयास करें।',
    NetworkRequestFailed: 'नेटवर्क अनुरोध फेल हो गया।',
    EmailAlreadyRegistered: 'यह ईमेल ऐड्रेस पहले से ही रजिस्टर्ड है',
  },

  LanguageDict: {
    English: 'English',
    Hindi: 'हिंदी',
    SelectLanguage: 'भाषा चुनें',
    Urdu: 'उर्दू',
  },

  ChangeDeviceDict: {
    Title: 'डिवाइस बदलें',
    ActiveText:
      'POWER के साथ एक समय में एक ही डिवाइस उपयोग किया जा सकता है। क्या आप इसे अपना POWER डिवाइस बनाना पसंद करेंगे? आप डिवाइस को हर 30 दिनों में एक बार बदल सकते हैं।',
    DisabledText:
      'आपने पिछले तीस दिनों के भीतर अपने डिवाइस को बदला है। आपका Power प्रीमियम आपको एक समय पर केवल एक उपकरण का उपयोग करने की सुविधा देता है',
    ChangeDeviceFailedText:
      'ओह! डिवाइस बदलने में फेल हो गए, कृपया बाद में दोबारा प्रयास करें।',
  },

  PurchaseDict: {
    InfoTitle: 'POWER जॉइन करें',
    Info:
      '24+ सप्ताह के वर्कआउट के साथ सभी पावर प्रोग्राम तक पहुंचें, और अधिक सितारे भी शामिल होंगे! अपनी फिटनेस यात्रा की योजना बनाना और उस पर नज़र रखना इतना आसान कभी नहीं रहा!',

    FreeTrial: '7 दिन का मुफ़्त ट्रायल',

    Monthly: 'महीने के',
    Yearly: 'वार्षिक',
    AfterFreeTrial: 'मुफ़्त ट्रायल के बाद बिल किया जाएगा',
    BilledMonthly: ' बिल मासिक',
    BilledAnnually: 'सालाना बिल',

    YearlyButtonTitle: (price) => `${price}/वर्ष`,
    MonthlyButtonTitle: (price) => `${price}/माह`,
    SavePrompt: (percentage) => `${percentage}% बचाएं`,
    MonthlyButtonSubTitle: 'मासिक बिल',
    RestorePurchaseButton: 'खरीदारी को रिस्टोर करें',
    PurchaseRestored: 'आपकी खरीदारी बहाल कर दी गई है',
    OkayButton: SharedDict.Ok,
    NoPurchasesToRestore:
      'पुनर्स्थापित करने के लिए कोई खरीदारी उपलब्ध नहीं है।',
    SubscriptionTermsTitle: 'सब्सक्रिप्शन की शर्तें',
    SubscriptionTermsFirstPoint:
      '• खरीद की पुष्टि पर आपके ऐप्पल खाते से भुगतान लिया जाएगा और स्वचालित रूप से नवीनीकृत होगा (अवधि/मूल्य चयनित पर) जब तक कि वर्तमान अवधि के अंत से कम से कम 24 घंटे पहले ऑटो-नवीनीकरण बंद न हो जाए',
    SubscriptionTermsSecondPoint:
      '• वर्तमान अवधि के अंत से 24 घंटे के भीतर नामित खाते से नवीनीकरण के लिए शुल्क लिया जाएगा',
    SubscriptionTermsThirdPoint:
      '•सक्रिय सदस्यता अवधि के दौरान वर्तमान सदस्यता रद्द नहीं की जा सकती है; हालाँकि, आप अपनी सदस्यता का प्रबंधन कर सकते हैं या खरीद के बाद अपनी Apple सेटिंग्स पर जाकर ऑटो-नवीनीकरण को बंद कर सकते हैं',

    SubscriptionTermsFirstPointAndroid:
      '•खरीद की पुष्टि पर आपके Google Play खाते से भुगतान लिया जाएगा और स्वचालित रूप से नवीनीकृत हो जाएगा (अवधि/मूल्य चयनित पर) जब तक कि वर्तमान अवधि के अंत से कम से कम 24 घंटे पहले ऑटो-नवीनीकरण बंद न हो जाए',
    SubscriptionTermsSecondPointAndroid:
      '• वर्तमान अवधि के अंत से 24 घंटे के भीतर नामित खाते से नवीनीकरण के लिए शुल्क लिया जाएगा',
    SubscriptionTermsThirdPointAndroid:
      '•सक्रिय सदस्यता अवधि के दौरान वर्तमान सदस्यता रद्द नहीं की जा सकती है; हालांकि, आप अपनी सदस्यता का प्रबंधन कर सकते हैं और खरीद के बाद अपनी Google Play सेटिंग पर जाकर ऑटो-नवीनीकरण बंद कर सकते हैं',

    SubscriptionPrivacyLink: '•गोपनीयता नीति को यहां देखा जा सकता है',
    SubscriptionTermsLink: '•उपयोग की शर्तें यहां देखी जा सकती हैं',
    TermsPattern: /यहाँ/,
    PolicyPattern: /यहाँ/,
    NeedHelp: 'मदद चाहिए?',

    PaymentFailedAlreadyExists:
      'ऐसा लगता है कि आपके पास पहले से ही किसी भिन्न Power खाते की सशुल्क सदस्यता है',
    PaymentFailedGeneric:
      'ऐसा लगता है कि इस समय सदस्यता लेने में कोई समस्या है, कृपया बाद में पुनः प्रयास करें',
  },

  MeetYourIconsDict: {
    YourFirstWeek: 'के साथ आपका पहला सप्ताह',
    WeeksOfTraining: 'सप्ताह अब उपलब्ध है',
    SelectYourProgramme: 'अपना प्रोग्राम चुनें',

    ZeroStateText:
      'अपना प्रोग्राम चुननें और POWER के साथ ट्रेनिंग के लिए इंटरनेट से दोबारा कनेक्ट करें',

    CongratulationsTitle: 'बधाई!',
    StartedProgramme: (name, environment) =>
      `आपने शुरू किया है  ${name} का ${environment} प्रोग्राम.`,

    FatLoss: 'फैट लॉस',
    Fitness: 'फिटनेस',
    Muscle: 'मसल्स बनाना',
    Wellness: 'वेलनेस',
    Customise: 'एक बार शुरू करके आप अपने समय को कस्टमाइज़ करें',
    ChangeProgrammes: 'जब चाहें प्रोग्रामों को बदलें',
    WorkoutsPerWeek: 'वर्कआउट / सप्ताह',
  },

  ProfileDict: {
    ChangeEmailScreenTitle: SharedDict.ChangeEmail,
    ChangeEmailLabel1: SharedDict.OldPassword,
    ChangeEmailLabel2: 'नया ईमेल',
    ChangePasswordScreenTitle: SharedDict.ChangePassword,
    ChangePasswordLabel1: SharedDict.OldPassword,
    ChangePasswordLabel2: SharedDict.NewPassword,
    IncorrectEmail: 'ओह! आपका ईमेल ग़लत है। कृपया दोबारा प्रयास करें',
    VerifyEmailScreenTitle: SharedDict.VerifyEmail,
    VerifyEmailScreenInfo:
      'हमने आपके नए ईमेल ऐड्रेस पर एक कोड भेजा है। कृपया उसे यहाँ दर्ज करें।',
    InvalidChangeEmailCode:
      'ओह! यह कोड सही नहीं है, कृपया अपना ईमेल ऐड्रेस बदलने के लिए सही कोड दर्ज करें।',
    CodeLabel: 'कोड',

    DeleteNotificationButtonTitle: SharedDict.Delete,
    MemberSince: 'सदस्यता शुरू हुई',
    WorkoutsComplete: 'पूरे किए गए वर्कआउट्स',
    NeedToSignOut: 'साइन आउट करना है?',
    NotificationsTitle: SharedDict.Notifications,
    PersonalDetails: 'खाते का विवरण',
    FormLabel1: SharedDict.FirstName,
    FormLabel2: SharedDict.LastName,
    FormLabel3: SharedDict.Email,
    FormLabel4: SharedDict.Gender,
    FormLabel5: SharedDict.Dob,
    FormLabel6: SharedDict.Country,
    FormLabel7: SharedDict.Region,
    FormLabel8: 'पासवर्ड',
    Form8Placeholder: 'पासवर्ड बदलें',
    NeedHelp: 'मदद चाहिए?',
    NotificationDelete: SharedDict.Delete,

    LogoutModalText: 'क्या आपको वाकई अपने अकाउंट से लॉग आउट करना है?',
    LogoutModalButton: SharedDict.Logout,
    YouWillBeLoggedOut:
      'अगर इसे जारी रखते हैं तो आप लॉग आउट हो जाएंगे - कृपया अपने ईमेल ऐड्रेस की पुष्टि करें',
    Ok: SharedDict.Ok,
    CancelButton: SharedDict.Cancel,
    Cancel: SharedDict.Cancel,
    UnableToUpdate: 'सेटिंग्स को अपडेट करने में असमर्थ हैं',
    Refresh: 'रिस्टार्ट',
    RefreshAlert:
      'भाषा परिवर्तन प्रभावी होने के लिए, ऐप को रीफ्रेश करने की आवश्यकता है।',
  },

  ShareDict: {
    ShareProgress: 'अपनी प्रगति अभी शेयर करें!',
    Cancel: SharedDict.Cancel,
    Message: SharedDict.Share,

    WeekCompleteTitle: (weekNumber, name, programmeName) =>
      `सप्ताह ${weekNumber}  पूरे हुए ${name} के ${programmeName.toLowerCase()}n\प्रोग्राम के साथ!`,

    InstaPromptText: 'ऐप को डाउनलोड करके Instagram  पर शेयर करें!',
    UnableToShare: 'इस समय चुनौती शेयर करने में असमर्थ',
    UnableToShareWeekComplete: 'इस समय पूरा हुआ सप्ताह शेयर करने में असमर्थ ',
    UnableToShareProgress: 'इस समय प्रगति शेयर करने में असमर्थ',
  },

  SettingsDict: {
    ScreenTitle: 'सेटिंग्स',
    VersionText: 'Power ऐप -',
    MarketingPreferences: 'मार्केटिंग पसंद',
    AppSettings: 'ऐप सेटिंग्स',
    MarketingPrefEmail: 'ईमेल',
    MarketingPrefNotifications: SharedDict.Notifications,
    DownloadWorkouts: 'वर्कआउट्स को डाउनलोड करें',
    DownloadWorkoutsText:
      'इस सप्ताह के वर्कआउटों को डाउनलोड करें जिससे आप बिना इंटरनेट कनेक्शन के भी ट्रेन हो सकें।',
    DownloadWorkoutsQuality: 'डाउनलोड की क्वालिटी',
    DownloadWorkoutsTimeZone: 'टाइम जोन',
    DownloadQualityHigh: 'हाई (1080p)',
    DownloadQualityLow: 'लो (420p)',
    DataCollection: 'डेटा कलेक्शन',
    DataCollectionText:
      'हम POWER ऐप के उपयोग के आधार पर डेटा प्राप्त करते हैं जिससे हम यह समझ सकें कि हम कैसे बेहतर बन सकते हैं। सभी प्राप्त किया गया डेटा पूरी तरह से अज्ञात रहता है और इससे आपको ट्रेस नहीं किया जा सकता है।',
    ErrorReports: 'एरर रिपोर्ट्स',
    ErrorReportsText:
      'किसी भी समस्या को तेजी से सुलझाने के लिए हम अज्ञात एरर रिपोर्ट्स प्राप्त करते हैं।',
    Analytics: SharedDict.Analytics,
    AnalyticsText:
      'एनालिटिक्स हमारे ट्रेनिंग प्रोग्रामों को बेहतर करने, नए फीचरों को डेवलप और अपडेटों को तैयार करने में मदद करता है जिससे कि POWER ऐप आपके लिए हर संभव रूप से एक बेहतर अनुभव दे।',
    Language: 'भाषा',
    Weight: 'वजन का माप',
    WeightKgs: 'मीट्रिक (किग्रा)',
    WeightLbs: 'इंपीरियल (पाउंड)',
  },

  ProgressDict: {
    YourWorkouts: 'आपका वर्कआउट',
    Your: 'आपका',
    Progress: SharedDict.Progress.toLowerCase(),
    Upload: 'अपलोड',
    TransformationScreenTitle: 'परिवर्तन',
    TransformationCardTitle: 'Transformation',
    ChallengeTime: 'समय',
    ChallengeZeroChart:
      'अपनी प्रगति को यहाँ देखने के लिए चुनौतियों को पूरा करें!',
    FunctionNotAvailable:
      'ओह, लगता है इस समय आपकी गैलरी तक पहुँचना हमारे लिए संभव नहीं है। कृपया यह सुनिश्चित करें किआपकी डिवाइस सेटिंग्स में यह अनुमित हमें दी गई है।',
    NoCamera:
      'ओह, लगता है इस समय आपके कैमरे तक पहुँचना हमारे लिए संभव नहीं है। कृपया यह सुनिश्चित करें कि आपकी डिवाइस सेटिंग्स में यह अनुमित हमें दी गई है।',
    UploadFailed:
      'ओह, लगता है हम इस तस्वीर को अपलोड करने में असमर्थ हैं। कृपया कोई अन्य फ़ोटो चुनें या बाद में दोबारा प्रयास करें।',
    TooLargeSizeImage:
      'यह तस्वीर अपलोड करने के लिए बहुत बड़ी है। कृपया 20MB तक के साइज़ की किसी अन्य फ़ोटो के साथ प्रयास करें।',
    UploadAgainWarning:
      'आज कोई दूसरी फोटो को लेना आपकी मौजूदा फोटो को हटा देगा।',
    ShareNotAvailableWarning:
      'अपने परिवर्तन को शेयर करने के लिए प्रगति से पहले और बाद की तस्वीर की आवश्यकता होती है',
    CompleteChallengeFailedMessage: 'इस समय इस चुनौती को पूरा करने में असमर्थ',
    SubHeader: 'अपने शरीर के परिवर्तन ट्रैक करें',
  },

  TabsTitleDict: {
    Profile: 'प्रोफाइल',
    Workouts: 'प्रोग्राम',
    OnDemand: 'ऑन डिमांड',
    Progress: SharedDict.Progress,
    ScreenShotMessage:
      'Power के उपयोग के दौरान स्क्रीन रेकॉर्डिंग या स्क्रीनशॉटों को लेना नियमों और शर्तों के विरूद्ध है और इससे अकाउंट सस्पेंड हो सकता है। अपनी प्रगति को शेयर करने के लिए पूरे ऐप में हर जगह उपलब्ध शेयर करें के बटनों का उपयोग करें',
    ScreenshotButton: SharedDict.Ok,
  },

  WorkoutDict: {
    SuspendedAccount:
      'Power की सामग्री के स्क्रीनशॉट्स लेने/स्क्रीन रेकॉर्ड करने के कारण आपका अकाउंट सस्पेंड किया गया है, इसलिए आप वर्कआउट पूरा नहीं कर सकते हैं। अधिक जानकारी के लिए कृपया ग्राहक सेवा से संपर्क करें।',

    WeekText: 'सप्ताह',

    exerciseInfoFormatText: (sets, reps) =>
      sets === 1 ? `${sets} सेट || ${reps} बार` : `${sets} सेट || ${reps} बार`,
    exerciseInfoFormatTextSecs: (sets, secs) =>
      sets === 1
        ? `${sets} सेट  || ${secs} सेकेंड्स`
        : `${sets} सेट  || ${secs} सेकेंड्स`,

    WeightText: 'वजन',
    NotesText: 'नोट्स',
    SetsText: SharedDict.Sets,
    EasierSwitchText: 'आसान',
    HarderSwitchText: 'कठिन',

    WeightsSetText: 'सेट',
    WeightsRepsText: SharedDict.Reps,
    WeightsRepsSecsText: SharedDict.Secs,

    WeightsRepsSelector: 'बार',
    WeightsSecsSelector: 'सेकेंड्स',

    RestDay: 'आराम का दिन',
    RestDayLower: 'आराम का दिन',
    Day: 'दिन',

    YourNotes: 'आपके नोट्स',
    Notes: 'नोट्स',

    Low: 'लो',
    Medium: 'मीडियम',
    High: 'हाई',
    Intensity: 'तीव्रता',
    Mins: 'मिनट्स',
    Reps: SharedDict.Reps,
    Sets: SharedDict.Sets,

    GreatJob: 'शानदार! आराम कीजिए',
    GreatJobNoRest: 'शानदार!',
    WhichWeight: 'इस एक्सरसाइज़ के लिए आपने कौन सा वजन इस्तेमाल किया था?',
    HowDoYouFeel: 'कैसा महसूस हो रहा है?',

    HowIntense: 'वर्कआउट कितना तीव्र था?',
    WorkoutComplete: 'वर्कआउट पूरा हुआ',

    AllProgrammes: 'सभी प्रोग्राम',

    CongratulationsTitle: 'बधाई!',
    StartedProgrammeWithVenue: (name, venue) =>
      `आपने  ${name} का ${venue} प्रोग्राम शुरू किया था!`,
    PickAWeight: 'पूरे किए गए सभी सेट देखने के लिए एक दिन पर टैप करें',
    ProgrammeComplete: (name, venue) =>
      `बधाई! आपने POWER पर ${name} का ${venue} प्रोग्राम पूरा कर लिया! हमने ${name} के साथ और वर्कआउटों को जोड़ा है या नहीं यह सबसे पहले जानने के लिए, बस नीचे दिए गए बटन को दबाएँ!`,

    ProgrammeCompleteReminder: (name, venue) =>
      `बधाई हो! आपने POWER पर ${name} का ${venue} कार्यक्रम पूरा कर लिया है! सबसे पहले यह जानने के लिए कि क्या हम ${name} के साथ और कसरतें जोड़ते हैं, बस नीचे दिए गए बटन को दबाएं!`,
    SwitchedByMistake: 'ग़लती से स्विच कर दिया?',

    ReminderTitle: 'एक वर्कआउट रिमाइंडर सेट करें',
    ReminderText:
      'Power आपको अगले सप्ताह अपना वर्कआउट शुरू करने के लिए रिमाइंड कराएगा।',
    Reps_: 'रिपीट्स',
    StayTunedTitle: 'साथ बने रहें',
    StayTuned: (name, date) =>
      'आपने ${name} के साथ इस सप्ताह के वर्कआउट को पूरा किया है। थोड़ा आराम कर लें और इससे आगे के लिए ${date} को वापस आएँ।',

    TakeARestTitle: 'थोड़ा आराम करें',
    TakeARest: (name) =>
      `आपने अभी लगातार तीन वर्कआउटों को पूरा किया है। सामान्य तौर पर, ${name} से आपको अब एक दिन के आराम की सलाह मिलेगी। क्या आपको जारी रखना है?`,

    WeekCompleteTitle: 'सप्ताह पूर्ण',
    WeekComplete: (name, weekNumber) =>
      `बधाई हो! आपने अभी ${name} के साथ सप्ताह ${weekNumber} के साथ सप्ताह!`,

    ChallengeCompleteTitle: 'चुनौती पूर्ण',
    ChallengeComplete: (challengeName, trainerName) =>
      `आपने अभी ${trainerName} के POWER प्रोग्राम के एक हिस्से के तौर पर ${challengeName} को पूरा किया है।!`,

    Today: 'आज',
    WeightsTitle: 'वजन',

    WorkoutCompetedWarningText:
      'ओह! आपने आज का वर्कआउट पहले ही पूरा कर लिया है।',
    WorkoutGoBackWarning:
      'अगर आप वापस गए तो आप अपनी वर्कआउट प्रगति को खो देंगे',
    WorkoutNoWeightsWarning:
      'वजन दर्ज करने के बाद आप इस एक्सरसाइज़ के लिए अपने वजन के इतिहास को देख पाएंगे',
    Rest: 'आराम',
    UpNext: 'अगला',
    YourProgramme: 'आपके प्रोग्राम',
    SubHeader:
      'विशेषज्ञ द्वारा डिज़ाइन रूटीन से अपने लक्ष्यों को तेजी से पूरा करें',
    SomethingWentWrong: 'कुछ गलत हो गया है। बाद में पुन: प्रयास करें',
    DownloadComplete: 'सप्ताह के लिए वर्कआउट डाउनलोड कर लिए गए हैं',
    DownloadWeek:
      'इस सप्ताह के वर्कआउट ऑफ़लाइन एक्सेस करने के लिए वर्कआउट डाउनलोड करें?',
    Download: 'डाउनलोड करें',
    OnDemandInternet:
      'ऑन-डिमांड वर्कआउट देखने के लिए कृपया अपने इंटरनेट कनेक्शन की जांच करें।',

    ContinueWorkout: 'क्या आप अपना वर्क आउट जारी रखने के लिए तैयार हैं?',
    Continue: 'जारी रखें',

    ReviewRequest: 'POWER का आनंद ले रहे हैं? हमें बताऐ!',
    ReviewRequestSkip: 'छोड़ें',
    ReviewRequestReview: 'हमें बताएं',

    CurrentWeek: 'यह\nसप्ताह',
    NewWorkoutsEachWeek: 'हर हफ्ते नए वर्कआउट!',

    FutureWorkoutWarningText:
      'अपना कार्यक्रम जारी रखने के लिए अपना वर्तमान सप्ताह पूरा करें!',
  },

  OnDemandDict: {
    title: 'ऑन डिमांड',
    subtitle: 'किसी भी समय ट्रेन होने के लिए आपके वर्कआउट्स',
    newWorkout: 'नया',
  },

  HelpMeChooseDict: {
    HelpMeChoose: 'चुननें में मेरी मदद करें',
    Of: 'का',
    Question: 'सवाल',
    Result: 'परिणाम',
    SuggestedProgramme: (name) =>
      `आपके जवाबों के आधार पर, हमें लगता है ${name} आपके लिए सबसे बेहतर ट्रेनर हैं।`,
    EnvironmentQuestion: 'क्या आप घर पर या जिम में ट्रेन होना चाहेंगे?',
    Home: 'होम',
    Gym: 'जिम',
    Locale: SharedDict.Locale,
  },

  GenderDict: {
    Female: SharedDict.Female,
    Male: SharedDict.Male,
    Other: SharedDict.Other,
    PreferNotToSay: SharedDict.PreferNotToSay,
  },

  OnboardingDict: {
    fallbackData: [
      {
        title: 'अपना प्रोग्राम चुनें',
        description:
          'फैट लॉस, फिटनेस, स्ट्रेंथ या वेलनेस। घर पर या जिम में। आपके लिए एक रूटीन है!',
      },
      {
        title: 'सितारों के साथ वर्कआउट करें!',
        description:
          'हर एक्सरसाइज़। हर रिपीटिशन। आपके नए वर्कआट दोस्त आपके साथ ही पसीना बहा रहे हैं।',
      },
      {
        title: 'अपनी प्रगति ट्रैक करें',
        description:
          'जैसे-जैसे आप अपने लक्ष्यों को रौंदते जाते हैं अपने शरीर के परिवर्तन को देखें और यह आपकी फिटनेस को नई ऊँचाईयों पर ले जाता है।',
      },
      {
        title: '​स्विच करें',
        description:
          'अपना ख़ुद का वर्कआट बनाने और अपने रूटीन में कुछ नया शामिल करने के लिए ऑन डिमांड पर जाएँ। नियंत्रण आपके हाथ में है।',
      },
    ],
  },
};

export default hiIN;
