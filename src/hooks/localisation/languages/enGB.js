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
  Gender: 'GENDER',
  Dob: 'DATE OF BIRTH',
  Country: 'COUNTRY',
  Region: 'REGION',
  Delete: 'Delete',
  Notifications: 'Notifications',
  Sets: 'sets',
  Reps: 'reps',
  OldPassword: 'OLD PASSWORD',
  NewPassword: 'NEW PASSWORD',
  Analytics: 'Analytics',
  ChangeEmail: 'Change Email',
  ChangePassword: 'Change password',
  VerifyEmail: 'Verify email',
};

const enGB = {
  AppTitle: 'Power',

  ButtonDict: {
    AddPhoto: 'ADD PHOTO',
    AddResult: 'ADD RESULT',
    AddWeight: 'ADD WEIGHT',
    AllowAnalytics: 'ALLOW ANALYTICS',
    AllowNotifications: 'ALLOW NOTIFICATIONS',
    Cancel: SharedDict.Cancel.toUpperCase(),
    CantChoose: "CAN'T CHOOSE?",
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
    ThreeSecs: '3s',
    Skip: 'Skip',
    NeedHelp: 'Need help?',
    SaveChanges: 'Save changes',
    NeedToSignOut: 'Need to sign out?',
    Logout: SharedDict.Logout,
  },

  AuthDict: {
    FormTitle: 'Create your account to start your free trial',
    FirstNameLabel: SharedDict.FirstName,
    LastNameLabel: SharedDict.LastName,
    EmailLabel: SharedDict.Email,
    PasswordLabel: SharedDict.Password,
    GenderLabel: SharedDict.Gender,
    DobLabel: SharedDict.Dob,
    CountryLabel: SharedDict.Country,
    RegionLabel: SharedDict.Region,
    TermsAndConditionsText:
      'I accept Power’s Terms & Conditions and Privacy Policy',
    InvalidGivenName: 'Please enter your first name',
    InvalidFamilyName: 'Please enter your last name',
    InvalidEmail: 'Please enter a valid email',
    InvalidPassword:
      'Password must include at least 1 lowercase, 1 uppercase, 1 numeric and 1 special character, and be eight characters or longer.',
    InvalidNotNewPassword:
      'Oops! Your password must consist of at least 8 alphanumeric, mixed-case characters. Please try again with a new password.',
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
    RegistrationGendersFemale: 'Female',
    RegistrationGendersMale: 'Male',
    RegistrationGendersOther: 'Other',
    RegistrationGendersPreferNot: 'Prefer not to say',
    PrivacyPolicyScreenTitle: 'Privacy policy',
    NotYetLoggedIn:
      'You are not yet logged in - please verify your email address',
    NotificationsPermissionsScreenTitle: SharedDict.Notifications,
    NotificationsPermissionsText:
      'To send you workout updates, we need permission to send push notifications to your device.',

    AnalyticsPermissionsScreenTitle: SharedDict.Analytics,
    AnalyticsPermissionsText:
      'To create the best workout programmes possible and keep improving the POWER experience, we need your permission to collect analytics from the app.',

    LoginScreenTitle: SharedDict.Login,

    VerifyEmailTitle: SharedDict.VerifyEmail,
    VerificationLinkSent: 'Verification link sent',
    VerifyEmail:
      'We’ve just emailed you a link to verify your email. Tap the link in the email to verify your Power account.',
    YouWillBeLoggedOut: 'You will be logged out - do you wish to continue?',
    VerificationNotRecognized:
      'Oops! Verification code not recognised. Please try again.',
    NetworkRequestFailed: 'Network request failed.',
    EmailAlreadyRegistered: 'This email address has already been registered',
  },

  LanguageDict: {
    English: 'English',
    Hindi: 'Hindi',
    SelectLanguage: 'SELECT LANGUAGE',
    Urdu: 'Urdu',
  },

  ChangeDeviceDict: {
    Title: 'Change device',
    ActiveText:
      'Only one device can be used with POWER at a time. Would you like to make this your POWER device? You can only change devices once every 30 days.',
    DisabledText:
      'You’ve already changed device once in the past thirty days. Your Power premium only gives you access to use one device at a time.',
  },

  PurchaseDict: {
    Info:
      'Get unlimited access to all the programmes on POWER, track your progress & share your results! ',
    YearlyButtonTitle: (price) => `YEARLY \u2022 £${price} / month`,
    YearlyButtonSubTitle: (price) => `£${price} / year billed annually`,
    MonthlyButtonTitle: (price) => `MONTHLY \u2022 £${price} / month`,
    SavePrompt: (percentage) => `Save ${percentage}%`,
    MonthlyButtonSubTitle: 'billed monthly',
    RestorePurchaseButton: 'Restore purchases',
    SubscriptionTermsTitle: 'Subscription terms',
    SubscriptionTermsText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },

  MeetYourIconsDict: {
    YourFirstWeek: 'Your first week with',
    WeeksOfTraining: 'WEEKS OF TRAINING NOW LIVE',
    SelectYourProgramme: 'Select your programme',

    ZeroStateText:
      'Reconnect to the internet to pick your programme and train with POWER',

    CongratulationsTitle: 'Congratulations!',
    StartedProgramme: (name, environment) =>
      `You've started ${name}'s ${environment} programme.`,

    FatLoss: 'FAT LOSS',
    Fitness: 'FITNESS',
    BuildMuscle: 'BUILD MUSCLE',
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
    InvalidChangeEmailCode:
      'Oops! This code is not recognised; please enter the correct code to change your email address.',
    CodeLabel: 'CODE',

    DeleteNotificationButtonTitle: SharedDict.Delete,
    MemberSince: 'Member since',
    WorkoutsComplete: 'Workouts complete',
    NeedToSignOut: 'Need to sign out?',
    NotificationsTitle: SharedDict.Notifications,
    PersonalDetails: 'Personal details',
    FormLabel1: SharedDict.FirstName,
    FormLabel2: SharedDict.LastName,
    FormLabel3: SharedDict.Email,
    FormLabel4: SharedDict.Gender,
    FormLabel5: SharedDict.Dob,
    FormLabel6: SharedDict.Country,
    FormLabel7: SharedDict.Region,

    NotificationDelete: SharedDict.Delete,

    LogoutModalText: 'Are you sure you wish to log out of your account?',
    LogoutModalButton: SharedDict.Logout,
    YouWillBeLoggedOut:
      'If you continue you will be logged out - please verify your email address',
    Ok: 'Ok',
    Cancel: SharedDict.Cancel,
    UnableToUpdate: 'Unable to update settings',
  },

  ShareDict: {
    ShareProgress: 'Share your progress now!',
    Cancel: SharedDict.Cancel,
    Message: SharedDict.Share,
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
    ChallengeTime: 'TIME',
    ChallengeZeroChart: 'Complete challenges to see your progress here!',
    FunctionNotAvailable:
      "Oops, looks like we're not able to access your gallery right now. Please ensure this permission is granted in your device settings.",
    NoCamera:
      "Oops, looks like we're not able to access your camera right now. Please ensure this permission is granted in your device settings.",
  },

  TabsTitleDict: {
    Profile: 'Profile',
    Workouts: 'Workouts',
    Progress: SharedDict.Progress,
  },

  WorkoutDict: {
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

    RestDay: 'REST DAY',
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
    PickAWeight: 'Pick a weight that lorem ipsum dolor',
    ProgrammeComplete: (name, venue) =>
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
};

export default enGB;
