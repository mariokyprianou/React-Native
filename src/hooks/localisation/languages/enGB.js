const enGB = {
  AppTitle: 'Power',

  ButtonDict: {
    AddPhoto: 'ADD PHOTO',
    AddResult: 'ADD RESULT',
    AddWeight: 'ADD WEIGHT',
    AllowAnalytics: 'ALLOW ANALYTICS',
    AllowNotifications: 'ALLOW NOTIFICATIONS',
    Cancel: 'CANCEL',
    CantChoose: "CAN'T CHOOSE?",
    Challenge: 'CHALLENGE',
    ChangeDevice: 'CHANGE DEVICE',
    ChangeEmail: 'CHANGE EMAIL',
    ChangePassword: 'CHANGE PASSWORD',
    Continue: 'CONTINUE',
    ContinueFromWeek: 'CONTINUE FROM WEEK',
    CreateAccount: 'CREATE ACCOUNT',
    Done: 'DONE',
    GetStarted: 'GET STARTED',
    GoBack: 'GO BACK',
    Gym: 'GYM',
    Home: 'HOME',
    JumpIn: 'JUMP IN',
    Login: 'LOGIN',
    Pluralise: "'S",
    Programme: 'PROGRAMME',
    Progress: 'PROGRESS',
    QuestionMark: '?',
    RemindMe: 'REMIND ME',
    Resend: 'RESEND',
    Restart: 'RESTART',
    RestartProgramme: 'RESTART PROGRAMME',
    SendResetRequest: 'SEND RESET REQUEST',
    SetLanguage: 'SET LANGUAGE',
    Share: 'SHARE',
    Start: 'START',
    StartNow: 'START NOW',
    StartWorkout: 'START WORKOUT',
    TryAgain: 'TRY AGAIN',
    ThreeSecs: '3s',
    Skip: 'Skip',
    NeedHelp: 'Need help?',
    SaveChanges: 'Save changes',
    NeedToSignOut: 'Need to sign out?',
    Logout: 'Logout',
  },

  AuthDict: {
    FormTitle: 'Create your account to start your free trial',
    FirstNameLabel: 'FIRST NAME',
    LastNameLabel: 'LAST NAME',
    EmailLabel: 'EMAIL',
    PasswordLabel: 'PASSWORD',
    GenderLabel: 'GENDER',
    DobLabel: 'DATE OF BIRTH',
    CountryLabel: 'COUNTRY',
    RegionLabel: 'REGION',
    TermsAndConditionsText:
      'I accept Power’s Terms & Conditions and Privacy Policy',
    InvalidEmail: 'Please enter a valid email',
    InvalidPassword:
      'Password must include at least 1 lowercase, 1 uppercase and 1 numeric character and be eight characters or longer.',

    ForgotPasswordButtonText: 'Forgot password?',
    ForgotPasswordCodeLabel: 'PASSWORD RESET CODE',
    ForgotPasswordLabel: 'NEW PASSWORD',
    InvalidResetCode: 'Invalid code',
    ResetPasswordDescriptionText:
      'We’ve just emailed you a code to reset your password. Enter the code here, along with a new password to change it.',
    TermsPattern: /Terms & Conditions/,
    PolicyPattern: /Privacy Policy/,
    TermsAndConditionsScreenTitle: 'Terms & conditions',
    ResetPasswordScreenTitle: 'Forgot password',
    RegistrationScreenTitle: 'Create account',
    PrivacyPolicyScreenTitle: 'Privacy policy',

    NotificationsPermissionsScreenTitle: 'Notifications',
    NotificationsPermissionsText:
      'To send you workout updates, we need permission to send push notifications to your device.',

    AnalyticsPermissionsScreenTitle: 'Analytics',
    AnalyticsPermissionsText:
      'To create the best workout programmes possible and keep improving the POWER experience, we need your permission to collect analytics from the app.',

    LoginScreenTitle: 'Login',

    VerifyEmailTitle: 'Verify email',
    VerifyEmail:
      'We’ve just emailed you a link to verify your email. Tap the link in the email to verify your Power account.',
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

    ZeroStateText: 'Lorem ipsum dolor sit amet, consectetur',

    CongratulationsTitle: 'Congratulations!',
    StartedProgramme: (name) => `You've started ${name}'s programme.`,

    FatLoss: 'FAT LOSS',
    Fitness: 'FITNESS',
    BuildMuscle: 'BUILD MUSCLE',
  },

  ProfileDict: {
    ChangeEmailScreenTitle: 'Change email',
    ChangeEmailLabel1: 'OLD PASSWORD',
    ChangeEmailLabel2: 'NEW EMAIL',
    ChangePasswordScreenTitle: 'Change password',
    ChangePasswordLabel1: 'OLD PASSWORD',
    ChangePasswordLabel2: 'NEW PASSWORD',

    DeleteNotificationButtonTitle: 'Delete',
    MemberSince: 'Member since',
    WorkoutsComplete: 'Workouts complete',
    NeedToSignOut: 'Need to sign out?',
    NotificationsTitle: 'Notifications',
    PersonalDetails: 'Personal details',
    FormLabel1: 'FIRST NAME',
    FormLabel2: 'LAST NAME',
    FormLabel3: 'EMAIL',
    FormLabel4: 'GENDER',
    FormLabel5: 'DATE OF BIRTH',
    FormLabel6: 'COUNTRY',
    FormLabel7: 'REGION',

    NotificationDelete: 'Delete',
  },

  ShareDict: {
    ShareProgress: 'Share your progress now!',
    Cancel: 'Cancel',
    Message: 'Share',
  },

  SettingsDict: {
    ScreenTitle: 'Settings',
    VersionText: 'Power App - Version',
    MarketingPreferences: 'Marketing preferences',
    AppSettings: 'App settings',
    MarketingPrefEmail: 'Email',
    MarketingPrefNotifications: 'Notifications',
    DownloadWorkouts: 'Download workouts',
    DownloadWorkoutsText:
      'Download this week’s workouts so you can train even without an internet connection.',
    DownloadWorkoutsQuality: 'Download quality',
    DownloadWorkoutsTimeZone: 'Time zone',
    DataCollection: 'Data collection',
    DataCollectionText:
      'We collect data on the usage of the POWER app to understand how we can make it better. All the data we collect is completely anonymous and cannot be traced to you.',
    ErrorReports: 'Error reports',
    ErrorReportsText:
      'We collect anonymous error reports to fix any issues quickly.',
    Analytics: 'Analytics',
    AnalyticsText:
      'Analytics help us improve our training programmes, develop new features and create updates so that the POWER app is the best experience possible for you.',
    Language: 'Language',
  },

  ProgressDict: {
    YourWorkouts: 'Your workouts',
    Your: 'Your',
    Progress: 'progress',
    Upload: 'Upload',
    TransformationScreenTitle: 'Your transformation',
    ChallengeTime: 'TIME',
  },

  TabsTitleDict: {
    Profile: 'Profile',
    Workouts: 'Workouts',
    Progress: 'Progress',
  },

  WorkoutDict: {
    WeekText: 'Week',

    exerciseInfoFormatText: (sets, reps) => `${sets} SETS || ${reps} REPS`,
    WeightText: 'WEIGHT',
    NotesText: 'NOTES',
    SetsText: 'sets',
    EasierSwitchText: 'EASIER',
    HarderSwitchText: 'HARDER',

    WeightsSetText: 'Set',
    WeightsRepsText: 'reps',
    WeightsUnitText: 'kg',

    RestDay: 'REST DAY',
    Day: 'Day',

    YourNotes: 'YOUR NOTES',
    Notes: 'Notes',

    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
    Intensity: 'Intensity',
    Mins: 'mins',
    Reps: 'reps',
    Sets: 'sets',

    GreatJob: 'Great job! Have a rest',
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
  },

  HelpMeChooseDict: {
    HelpMeChoose: 'Help me choose',
    Of: 'OF',
    Question: 'QUESTION',
    Result: 'RESULT',
    SuggestedProgramme: (name) =>
      `Based on your answers, we think ${name} would be the best trainer for you.`,
  },
};

export default enGB;
