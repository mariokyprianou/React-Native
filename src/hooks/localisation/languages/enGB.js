const SharedDict = {
  Cancel: 'Cancel',
  Gym: 'Gym',
  Home: 'Home',
  Locale: 'en',
  GoBack: 'Go back',
  Login: 'Login',
  Progress: 'Progress',
  Share: 'Share',
  Logout: 'Logout',
  FirstName: 'FIRST NAME',
  LastName: 'LAST NAME',
  Email: 'EMAIL',
  Password: 'PASSWORD',
  Gender: 'SEX',
  Dob: 'DATE OF BIRTH',
  Country: 'COUNTRY',
  Region: 'REGION',
  Delete: 'Delete',
  Notifications: 'Notifications',
  Sets: 'sets',
  Reps: 'reps',
  Secs: 'secs',
  OldPassword: 'CURRENT PASSWORD',
  NewPassword: 'NEW PASSWORD',
  Analytics: 'Analytics',
  ChangeEmail: 'Change Email',
  ChangePassword: 'Change password',
  VerifyEmail: 'Verify email',
  Ok: 'OK',
  Female: 'Female',
  Male: 'Male',
  Other: 'Other',
  PreferNotToSay: 'Prefer not to say',
  Okay: 'Okay',
};

const enGB = {
  AppTitle: 'Power',
  OfflineMessage: 'You are currently offline. Please reconnect and try again.',

  ButtonDict: {
    AddPhoto: 'ADD PHOTO',
    AddResult: 'ADD RESULT',
    AddWeight: 'ADD WEIGHT',
    AllowAnalytics: 'ALLOW ANALYTICS',
    AllowNotifications: 'ALLOW NOTIFICATIONS',
    Cancel: SharedDict.Cancel.toUpperCase(),
    CantChoose: "CAN'T CHOOSE",
    Challenge: 'CHALLENGE',
    ChangeDevice: 'CHANGE DEVICE',
    ChangeEmail: SharedDict.ChangeEmail.toUpperCase(),
    ChangePassword: SharedDict.ChangePassword.toUpperCase(),
    Continue: 'CONTINUE',
    ContinueFromWeek: 'CONTINUE FROM WEEK',
    CreateAccount: 'CREATE ACCOUNT',
    Done: 'DONE',
    GetStarted: 'GET STARTED',
    GoBack: SharedDict.GoBack.toUpperCase(),
    GoBackLower: SharedDict.GoBack,
    Gym: SharedDict.Gym.toUpperCase(),
    Home: SharedDict.Home.toUpperCase(),
    JumpIn: 'JUMP IN',
    Login: SharedDict.Login.toUpperCase(),
    Pause: 'PAUSE',
    Pluralise: "'S",
    Programme: 'PROGRAMME',
    Progress: SharedDict.Progress.toUpperCase(),
    QuestionMark: '?',
    RemindMe: 'REMIND ME',
    Resend: 'RESEND',
    Restart: 'RESTART',
    RestartProgramme: 'RESTART PROGRAMME',
    SendResetRequest: 'SEND RESET REQUEST',
    SetLanguage: 'SET LANGUAGE',
    Share: SharedDict.Share.toUpperCase(),
    Start: 'START',
    StartNow: 'START NOW',
    StartWorkout: 'START WORKOUT',
    TryAgain: 'TRY AGAIN',
    Secs: (time) => `${time}s`,
    Skip: 'Skip',
    NeedHelp: 'Need help?',
    SaveChanges: 'Save changes',
    NeedToSignOut: 'Need to sign out?',
    Logout: SharedDict.Logout,
    Close: 'CLOSE',
    Send: 'SEND',
    VerifyLater: 'Verify email later',
  },

  AuthDict: {
    FormTitle: 'Create your account to start your free trial!',
    FirstNameLabel: SharedDict.FirstName,
    LastNameLabel: SharedDict.LastName,
    EmailLabel: SharedDict.Email,
    PasswordLabel: SharedDict.Password,
    SexLabel: SharedDict.Gender,
    DobLabel: SharedDict.Dob,
    CountryLabel: SharedDict.Country,
    RegionLabel: SharedDict.Region,
    MarketingText:
      'I do not wish to hear from POWER by email about new trainers, challenges, competitions, giveaways and more',
    TermsAndConditionsText:
      'I accept Power’s Terms & Conditions and Privacy Policy',
    InvalidGivenName: 'Please enter your first name',
    InvalidFamilyName: 'Please enter your last name',
    InvalidEmail: 'Please enter a valid email',
    InvalidPassword:
      'Your password must be at least 8 characters long and include at least 1 number.',
    InvalidNotNewPassword:
      'Oops! Your password must be at least 8 characters long and include at least 1 number. Please try again with a new password.',
    InvalidTsAndCs: 'Please accept the terms and conditions.',
    ChangePasswordFail:
      'Oops! Ensure you have entered your current password, along with your new password, in order to make the change.',
    IncorrectEmailOrPassword:
      'Oops! Your email or password is incorrect. Please try again.',
    IncorrectPassword:
      'Oops! Your current password is incorrect. Please try again.',
    ForgotPasswordButtonText: 'Forgot password?',
    ForgotPasswordCodeLabel: 'PASSWORD RESET CODE',
    ForgotPasswordLabel: SharedDict.NewPassword,
    InvalidResetCode: 'Invalid code',
    ResetPasswordDescriptionText:
      'We’ve just emailed you a code to reset your password. Enter the code here, along with a new password to change it.',
    TermsPattern: /Terms & Conditions/,
    PolicyPattern: /Privacy Policy/,
    TermsAndConditionsScreenTitle: 'Terms & conditions',
    ResetPasswordScreenTitle: 'Forgot password',
    RegistrationScreenTitle: 'Create account',
    RegistrationGendersFemale: SharedDict.Female,
    RegistrationGendersMale: SharedDict.Male,
    RegistrationGendersOther: SharedDict.Other,
    RegistrationGendersPreferNot: SharedDict.PreferNotToSay,
    PrivacyPolicyScreenTitle: 'Privacy policy',
    NotYetLoggedIn:
      'You are not yet logged in - please verify your email address',
    NotificationsPermissionsScreenTitle: SharedDict.Notifications,
    NotificationsPermissionsText:
      'Workout reminders are proven to increase your chances of staying on track with a fitness routine',

    AnalyticsPermissionsScreenTitle: SharedDict.Analytics,
    AnalyticsPermissionsText:
      'To create the best workout programmes and improve the POWER experience, we need your permission to collect analytics from the app.',

    LoginScreenTitle: SharedDict.Login,

    VerifyEmailTitle: SharedDict.VerifyEmail,
    VerificationLinkSent: 'Email sent! Please check your inbox.',
    VerifyEmail:
      'Verify your POWER account by clicking the link we have just emailed you. If you haven’t received an email from us in 5 minutes, hit RESEND below.',
    YouWillBeLoggedOut: 'You will be logged out - do you wish to continue?',
    VerificationNotRecognized:
      'Oops! Verification code not recognised. Please try again.',
    NetworkRequestFailed: 'Network request failed.',
    EmailAlreadyRegistered: 'This email address has already been registered',
  },

  LanguageDict: {
    English: 'English',
    Hindi: 'हिंदी',
    SelectLanguage: 'SELECT LANGUAGE',
    Urdu: 'Urdu',
  },

  ChangeDeviceDict: {
    Title: 'Change device',
    ActiveText:
      'Only one device can be used with POWER at a time. Would you like to make this your new POWER device? You can only change devices once every 30 days.',
    DisabledText:
      'You’ve already changed device once in the past thirty days. Your Power premium only gives you access to use one device at a time.',
    ChangeDeviceFailedText: 'Oops! Failed to change device, try again later.',
  },

  PurchaseDict: {
    InfoTitle: 'Join POWER.',
    Info:
      'Access all POWER Programmes, each with 24+ weeks of workouts, and more stars joining! Planning and tracking your fitness journey has never been so easy!',

    FreeTrial: '7-day FREE trial',
    Monthly: 'MONTHLY',
    Yearly: 'YEARLY',
    AfterFreeTrial: 'billed after free trial',
    BilledMonthly: 'billed monthly',
    BilledAnnually: 'billed annually',

    YearlyButtonTitle: (price) => `${price}/year`,
    MonthlyButtonTitle: (price) => `${price}/month`,
    SavePrompt: (percentage) => `SAVE ${percentage}%`,
    MonthlyButtonSubTitle: 'billed monthly',
    RestorePurchaseButton: 'Restore purchases',
    PurchaseRestored: 'Your Purchases have been Restored.',
    OkayButton: SharedDict.Ok,
    NoPurchasesToRestore: 'No Purchases available to restore.',
    SubscriptionTermsTitle: 'Subscription terms',
    SubscriptionTermsFirstPoint:
      '• Payment will be charged to your Apple Account at confirmation of purchase and will automatically renew (at the duration/price selected) unless auto-renew is turned off at least 24 hrs before the end of the current period',
    SubscriptionTermsSecondPoint:
      '• The designated account will be charged for renewal within 24-hours prior to the end of the current period',
    SubscriptionTermsThirdPoint:
      '• Current subscription may not be cancelled during the active subscription period; however, you can manage your subscription and/or turn off auto-renewal by visiting your Apple Account Settings after purchase',

    SubscriptionTermsFirstPointAndroid:
      '• Payment will be charged to your Google Play Account at confirmation of purchase and will automatically renew (at the duration/price selected) unless auto-renew is turned off at least 24 hrs before the end of the current period',
    SubscriptionTermsSecondPointAndroid:
      '• The designated account will be charged for renewal within 24-hours prior to the end of the current period',
    SubscriptionTermsThirdPointAndroid:
      '• Current subscription may not be cancelled during the active subscription period; however, you can manage your subscription and/or turn off auto-renewal by visiting your Google Play Account Settings after purchase',

    SubscriptionPrivacyLink: '• The Privacy Policy can be accessed here',
    SubscriptionTermsLink: '• The Terms of Use can be accessed here',
    TermsPattern: /here/,
    PolicyPattern: /here/,
    NeedHelp: 'Need help?',

    PaymentFailedAlreadyExists:
      'Oops! Looks like you already have a paid subscription for a different Power account',
    PaymentFailedGeneric:
      'Oops! Looks like there is an issue subscribing at the moment, please try again later',
  },

  MeetYourIconsDict: {
    YourFirstWeek: 'Your first week with',
    WeeksOfTraining: 'WEEKS NOW LIVE',
    SelectYourProgramme: 'Select your programme',

    ZeroStateText:
      'Reconnect to the internet to pick your programme and train with POWER',

    CongratulationsTitle: 'Congratulations!',
    StartedProgramme: (name, environment) =>
      `You've started ${name}'s ${environment} programme.`,

    FatLoss: 'FAT LOSS',
    Fitness: 'FITNESS',
    Muscle: 'MUSCLE',
    Wellness: 'WELLNESS',
    Customise: 'Customise your schedule once you start',
    ChangeProgrammes: 'Change programmes whenever you like',
    WorkoutsPerWeek: 'WORKOUTS / WEEK',
  },

  ProfileDict: {
    ChangeEmailScreenTitle: SharedDict.ChangeEmail,
    ChangeEmailLabel1: SharedDict.OldPassword,
    ChangeEmailLabel2: 'NEW EMAIL',
    ChangePasswordScreenTitle: SharedDict.ChangePassword,
    ChangePasswordLabel1: SharedDict.OldPassword,
    ChangePasswordLabel2: SharedDict.NewPassword,
    IncorrectEmail: 'Oops! Your email is incorrect. Please try again',
    VerifyEmailScreenTitle: SharedDict.VerifyEmail,
    VerifyEmailScreenInfo:
      'We’ve sent a code to your new email address. Please enter it here.',
    InvalidChangeEmailCode:
      'Oops! This code is not recognised; please enter the correct code to change your email address.',
    CodeLabel: 'CODE',

    DeleteNotificationButtonTitle: SharedDict.Delete,
    MemberSince: 'Member since',
    WorkoutsComplete: 'Workouts complete',
    NeedToSignOut: 'Need to sign out?',
    NotificationsTitle: SharedDict.Notifications,
    PersonalDetails: 'Account Details',
    FormLabel1: SharedDict.FirstName,
    FormLabel2: SharedDict.LastName,
    FormLabel3: SharedDict.Email,
    FormLabel4: SharedDict.Gender,
    FormLabel5: SharedDict.Dob,
    FormLabel6: SharedDict.Country,
    FormLabel7: SharedDict.Region,
    FormLabel8: 'PASSWORD',
    Form8Placeholder: 'Change password',
    NeedHelp: 'NEED HELP?',
    NotificationDelete: SharedDict.Delete,

    LogoutModalText: 'Are you sure you wish to log out of your account?',
    LogoutModalButton: SharedDict.Logout,
    YouWillBeLoggedOut:
      'If you continue you will be logged out - please verify your email address',
    Ok: SharedDict.Ok,
    CancelButton: SharedDict.Cancel,
    Cancel: SharedDict.Cancel,
    UnableToUpdate: 'Unable to update settings',
    Refresh: 'Refresh',
    RefreshAlert:
      'For the language change to take effect, the app needs to refresh.',
  },

  ShareDict: {
    ShareProgress: 'Share your progress now!',
    Cancel: SharedDict.Cancel,
    Message: SharedDict.Share,

    WeekCompleteTitle: (weekNumber, name, programmeName) =>
      `Week ${weekNumber} complete with\n${name}'s ${programmeName.toLowerCase()}\nprogramme!`,

    InstaPromptText: 'Share to Instagram by downloading the app!',
    UnableToShare: 'Oops! Unable to share challenge at this time.',
    UnableToShareWeekComplete:
      'Oops! Unable to share week complete at this time.',
    UnableToShareProgress: 'Oops! Unable to share progress at this time.',
  },

  SettingsDict: {
    ScreenTitle: 'Settings',
    VersionText: 'Power App - Version',
    MarketingPreferences: 'Marketing preferences',
    AppSettings: 'App settings',
    MarketingPrefEmail: 'Email',
    MarketingPrefNotifications: SharedDict.Notifications,
    DownloadWorkouts: 'Download workouts',
    DownloadWorkoutsText:
      'Download this week’s workouts so you can train even without an internet connection.',
    DownloadWorkoutsQuality: 'DOWNLOAD QUALITY',
    DownloadWorkoutsTimeZone: 'TIME ZONE',
    DownloadQualityHigh: 'High (1080p)',
    DownloadQualityLow: 'Low (420p)',
    DataCollection: 'Data collection',
    DataCollectionText:
      'We collect data on the usage of the POWER app to understand how we can make it better. All the data we collect is completely anonymous and cannot be traced to you.',
    ErrorReports: 'Error reports',
    ErrorReportsText:
      'We collect anonymous error reports to fix any issues quickly.',
    Analytics: SharedDict.Analytics,
    AnalyticsText:
      'Analytics help us improve our training programmes, develop new features and create updates so that the POWER app is the best experience possible for you.',
    Language: 'LANGUAGE',
    Weight: 'WEIGHT MEASUREMENT',
    WeightKgs: 'Metric (kg)',
    WeightLbs: 'Imperial (lb)',
  },

  ProgressDict: {
    YourWorkouts: 'Your workouts',
    Your: 'Your',
    Progress: SharedDict.Progress.toLowerCase(),
    Upload: 'Upload',
    TransformationScreenTitle: 'Your transformation',
    TransformationCardTitle: 'Transformation',
    ChallengeTime: 'TIME',
    ChallengeZeroChart: 'Complete challenges to see your progress here!',
    FunctionNotAvailable:
      "Oops, looks like we're not able to access your gallery right now. Please ensure this permission is granted in your device settings.",
    NoCamera:
      "Oops, looks like we're not able to access your camera right now. Please ensure this permission is granted in your device settings.",
    UploadFailed:
      "Oops, looks like we're not able to upload the specific image. Please try a different one or try again later.",
    TooLargeSizeImage:
      'This image is too large to upload. Please try again with file size under 20MB.',
    UploadAgainWarning:
      'Taking another photo today will replace the existing one.',
    ShareNotAvailableWarning:
      'Sharing your transformation requires a before and an after progress photo.',
    CompleteChallengeFailedMessage:
      'Oops! Unable to complete this challenge at this time.',
    SubHeader: 'Track your transformation!',
  },

  TabsTitleDict: {
    Profile: 'Profile',
    Workouts: 'Programme',
    OnDemand: 'On Demand',
    Progress: SharedDict.Progress,
    ScreenShotMessage:
      'Screen recording or taking screenshots whilst using Power goes against the Terms of Use and can lead to account suspension. Please use the Share buttons found throughout the app to share your progress!',
    ScreenshotButton: SharedDict.Ok,
  },

  WorkoutDict: {
    SuspendedAccount:
      'Your account has been suspended due to taking screenshots/screen recordings of Power content, therefore you cannot complete any workouts for the time being. Please reach out to customer service for more information.',

    WeekText: 'Week',

    exerciseInfoFormatText: (sets, reps) =>
      sets === 1
        ? `${sets} SET || ${reps} REPS`
        : `${sets} SETS || ${reps} REPS`,
    exerciseInfoFormatTextSecs: (sets, secs) =>
      sets === 1
        ? `${sets} SET || ${secs} SECS`
        : `${sets} SETS || ${secs} SECS`,

    WeightText: 'WEIGHT',
    NotesText: 'NOTES',
    SetsText: SharedDict.Sets,
    EasierSwitchText: 'EASIER',
    HarderSwitchText: 'HARDER',

    WeightsSetText: 'Set',
    WeightsRepsText: SharedDict.Reps,
    WeightsRepsSecsText: SharedDict.Secs,

    WeightsRepsSelector: 'Reps',
    WeightsSecsSelector: 'Secs',

    RestDay: 'REST DAY',
    RestDayLower: 'Rest day',
    Day: 'Day',

    YourNotes: 'YOUR NOTES',
    Notes: 'Notes',

    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
    Intensity: 'Intensity',
    Mins: 'mins',
    Reps: SharedDict.Reps,
    Sets: SharedDict.Sets,

    GreatJob: 'Great job! Have a rest',
    GreatJobNoRest: 'Great job!',
    WhichWeight: 'Which weight did you use for this exercise?',
    HowDoYouFeel: 'How do you feel?',

    HowIntense: 'How intense was the workout?',
    WorkoutComplete: 'Workout complete',

    AllProgrammes: 'ALL PROGRAMMES',

    CongratulationsTitle: 'Congratulations!',
    StartedProgrammeWithVenue: (name, venue) =>
      `You’ve started ${name}’s ${venue} programme!`,
    PickAWeight: 'Tap on a day to view all sets completed',
    ProgrammeComplete: (name, venue) =>
      `Congratulations! You’ve completed ${name}’s ${venue} programme on POWER!`,

    ProgrammeCompleteReminder: (name, venue) =>
      `Congratulations! You’ve completed ${name}’s ${venue} programme on POWER! To be the first to know if we add more workouts with ${name}, just hit the button below!`,
    SwitchedByMistake: 'Switched by mistake?',

    ReminderTitle: 'Set a workout reminder',
    ReminderText: 'Power will remind you to kickstart your workout next week.',
    Reps_: 'Reps',
    StayTunedTitle: 'Stay tuned',
    StayTuned: (name, date) =>
      `You’ve completed this week’s workouts with ${name}. Get some rest and come back on ${date} for more.`,

    TakeARestTitle: 'Take a rest',
    TakeARest: (name) =>
      `You’ve just completed three workouts back-to-back. Typically, ${name} would recommend a rest day here. Do you want to carry on?`,

    WeekCompleteTitle: 'Week complete',
    WeekComplete: (name, weekNumber) =>
      `Congratulations! You just finished week ${weekNumber} with ${name}!`,

    ChallengeCompleteTitle: 'Challenge complete',
    ChallengeComplete: (challengeName, trainerName) =>
      `You just completed ${challengeName} as part of ${trainerName}'s POWER programme!`,

    Today: 'TODAY',
    WeightsTitle: 'Weights',

    WorkoutCompetedWarningText:
      'Oops! You have already completed a workout for today.',
    WorkoutGoBackWarning: 'If you go back you will lose your workout progress',
    WorkoutNoWeightsWarning:
      'Once you have added a weight you will be able to view your weight history for this exercise',
    Rest: 'REST',
    UpNext: 'UP NEXT',
    YourProgramme: 'Your Programme',
    SubHeader: 'Get to your goals faster with an expertly designed routine',
    SomethingWentWrong: 'Oops! Something went wrong. Try again later.',
    DownloadComplete: 'Downloading workouts for week completed.',
    DownloadWeek: 'Download this week’s workouts to access offline?',
    Download: 'Download',

    OnDemandInternet:
      'Oops! Please check your internet connection to view On Demand workouts.',

    ContinueWorkout: 'Are you ready to continue your workout?',
    Continue: 'Continue',

    ReviewRequest: 'Enjoying POWER? Let us know!',
    ReviewRequestSkip: 'Skip',
    ReviewRequestReview: 'Review',

    CurrentWeek: 'CURRENT\nWEEK',
    NewWorkoutsEachWeek: 'New workouts each week!',

    FutureWorkoutWarningText:
      'Complete your current week to progress through your Programme!',
  },

  OnDemandDict: {
    title: 'On Demand',
    subtitle: 'Workouts for you to train with anytime',
    newWorkout: 'NEW',
  },

  HelpMeChooseDict: {
    HelpMeChoose: 'Help me choose',
    Of: 'OF',
    Question: 'QUESTION',
    Result: 'RESULT',
    SuggestedProgramme: (name) =>
      `Based on your answers, we think ${name} would be the best trainer for you.`,
    EnvironmentQuestion: 'Would you rather train at home or in the gym?',
    Home: SharedDict.Home,
    Gym: SharedDict.Gym,
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
        title: 'Pick your Programme',
        description:
          "Fat loss, fitness, strength or wellness. At home or at the gym. There's a routine for you!",
      },
      {
        title: 'Workout with the stars!',
        description:
          'Every single exercise. Every single rep. Your new workout buddies are sweating alongside you.',
      },
      {
        title: 'Track your progress',
        description:
          'Watch your body transform as you crush your goals and take your fitness to new levels.',
      },
      {
        title: '​Switch it up',
        description:
          "​Head to On Demand to build your own workouts and mix up your routine. You're in control.",
      },
    ],
  },
};

export default enGB;
