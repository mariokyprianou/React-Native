/*
 * Jira Ticket:
 * Created Date: Thu, 23rd Jul 2020, 09:01:21 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

const enGB = {
  RegistrationDict: {
    formTitle: 'Create your account to start your free trial',
    firstNameLabel: 'FIRST NAME',
    lastNameLabel: 'LAST NAME',
    emailLabel: 'EMAIL',
    passwordLabel: 'PASSWORD',
    genderLabel: 'GENDER',
    dobLabel: 'DATE OF BIRTH',
    countryLabel: 'COUNTRY',
    regionLabel: 'REGION',
    termsAndConditionsText:
      'I accept Power’s Terms & Conditions and Privacy Policy',
    invalidEmail: 'Please enter a valid email',
    invalidPassword:
      'Password must include at least 1 lowercase, 1 uppercase and 1 numeric character and be eight characters or longer.',
    forgotPasswordButtonText: 'Forgot Password?',
    forgotPasswordCodeLabel: 'PASSWORD RESET CODE',
    forgotPasswordLabel: 'NEW PASSWORD',
    invalidResetCode: 'Invalid code',
    resetPasswordDescriptionText:
      'We’ve just emailed you a code to reset your password. Enter the code here, along with a new password to change it.',
    termsPattern: /Terms & Conditions/,
    policyPattern: /Privacy Policy/,
  },
  WorkoutDict: {
    exerciseInfoFormatText: (sets, reps) => `${sets} SETS || ${reps} REPS`,
  },
  AppTitle: 'Power',
  ButtonText_AddPhoto: 'ADD PHOTO',
  ButtonText_AddResult: 'ADD RESULT',
  ButtonText_AddWeight: 'ADD WEIGHT',
  ButtonText_AllowAnalytics: 'ALLOW ANALYTICS',
  ButtonText_AllowNotifications: 'ALLOW NOTIFICATIONS',
  ButtonText_CantChoose: "CAN'T CHOOSE?",
  ButtonText_ChangeDevice: 'CHANGE DEVICE',
  ButtonText_ChangeEmail: 'CHANGE EMAIL',
  ButtonText_ChangePassword: 'CHANGE PASSWORD',
  ButtonText_Continue: 'CONTINUE',
  ButtonText_ContinueFromWeek: 'CONTINUE FROM WEEK',
  ButtonText_CreateAccount: 'CREATE ACCOUNT',
  ButtonText_Done: 'DONE',
  ButtonText_GetStarted: 'GET STARTED',
  ButtonText_GoBack: 'GO BACK',
  ButtonText_Gym: 'GYM',
  ButtonText_Home: 'HOME',
  ButtonText_Login: 'LOGIN',
  ButtonText_Programme: 'PROGRAMME',
  ButtonText_QuestionMark: '?',
  ButtonText_RemindMe: 'REMIND ME',
  ButtonText_Restart: 'RESTART',
  ButtonText_SendResetRequest: 'SEND RESET REQUEST',
  ButtonText_SetLanguage: 'SET LANGUAGE',
  ButtonText_Share: 'SHARE',
  ButtonText_StartNow: 'START NOW',
  ButtonText_StartWorkout: 'START WORKOUT',
  ButtonText_TryAgain: 'TRY AGAIN',
  ButtonText_Pluralise: "'S",
  ButtonText_Skip: 'Skip',
  ButtonText_NeedHelp: 'Need help?',
  ButtonText_SaveChanges: 'Save changes',
  ButtonText_NeedToSignOut: 'Need to sign out?',
  ButtonText_Logout: 'Logout',
  CardText_Low: 'Low',
  CardText_Medium: 'Medium',
  CardText_High: 'High',
  CardText_Intensity: 'intensity',
  CardText_Mins: 'mins',
  CardText_Reps: 'reps',
  CardText_Sets: 'sets',
  CardText_Day: 'DAY',
  CardText_FatLoss: 'FAT LOSS',
  CardText_Fitness: 'FITNESS',
  CardText_BuildMuscle: 'BUILD MUSCLE',
  HeaderText_AllProgrammes: 'ALL PROGRAMMES',
  InfoText_Pluralise: "'s",
  InfoText_SelectYourProgramme: 'Select your programme',
  InfoText_SuggestedProgramme: (name) =>
    `Based on your answers, we think ${name} would be the best trainer for you.`,
  InfoText_StartedProgramme: (name) => `You've started ${name}'s programme.`,
  InfoText_WeeksOfTraining: 'WEEKS OF TRAINING NOW LIVE',
  TabTitle_Profile: 'Profile',
  TabTitle_Progress: 'Progress',
  TabTitle_Workouts: 'Workouts',
  TitleText_Congratulations: 'Congratulations!',
  TitleText_Of: 'OF',
  TitleText_Question: 'QUESTION',
  TitleText_Result: 'RESULT',
  TitleText_Week: 'Week',
  TitleText_YourFirstWeek: 'Your first week with',
  WorkoutText_RestDay: 'REST DAY',
  AnalyticsPermissions_Title: 'Analytics',
  AnalyticsPermissions_Text:
    'To create the best workout programmes possible and keep improving the POWER experience, we need your permission to collect analytics from the app.',
  NotificationsPermissions_Title: 'Notifications',
  NotificationsPermissions_Text:
    'To send you workout updates, we need permission to send push notifications to your device.',
  ChangeEmail_ScreenTitle: 'Change email',
  ChangeEmail_Label1: 'Old password',
  ChangeEmail_Label2: 'New Email',
  ChangePassword_ScreenTitle: 'Change password',
  ChangePassword_Label1: 'Old password',
  ChangePassword_Label2: 'New password',
  ChangeDevice_Title: 'Change Device',
  ChangeDevice_Text:
    'Only one device can be used with POWER at a time. Would you like to make this your POWER device? You can only change devices once every 30 days.',
  ChangeDevice_TextDisabled:
    'You’ve already changed device once in the past thirty days. Your Power premium only gives you access to use one device at a time.',
  Profile_MemberSince: 'Member since',
  Profile_WorkoutsComplete: 'Workouts complete',
  Profile_NotificationsTitle: 'Notifications',
  Profile_PersonalDetails: 'Personal Details',
  Profile_FormLabel1: 'FIRST NAME',
  Profile_FormLabel2: 'LAST NAME',
  Profile_FormLabel3: 'EMAIL',
  Profile_FormLabel4: 'GENDER',
  Profile_FormLabel5: 'DATE OF BIRTH',
  Profile_FormLabel6: 'COUNTRY',
  Profile_FormLabel7: 'REGION',
  Profile_DeleteNotificationButtonTitle: 'Delete',
  Settings_ScreenTitle: 'Settings',
  Settings_VersionText: 'Power App - Version',
  Settings_MarketingPreferences: 'Marketing preferences',
  Settings_AppSettings: 'App Settings',
  Settings_MarketingPrefEmail: 'Email',
  Settings_MarketingPrefNotifications: 'Notifications',
  Settings_DownloadWorkouts: 'Download workouts',
  Settings_DownloadWorkoutsText:
    'Download this week’s workouts so you can train even without an internet connection.',
  Settings_DownloadWorkoutsQuality: 'Download quality',
  Settings_DownloadWorkoutsTimeZone: 'Time zone',
  Settings_DataCollection: 'Data collection',
  Settings_DataCollectionText:
    'We collect data on the usage of the POWER app to understand how we can make it better. All the data we collect is completely anonymous and cannot be traced to you.',
  Settings_ErrorReports: 'Error reports',
  Settings_ErrorReportsText:
    'We collect anonymous error reports to fix any issues quickly.',
  Settings_Analytics: 'Analytics',
  Settings_AnalyticsText:
    'Analytics help us improve our training programmes, develop new features and create updates so that the POWER app is the best experience possible for you.',
  Settings_Language: 'Language',
  PurchaseModal_Info:
    'Get unlimited access to all the programmes on POWER, track your progress & share your results! ',
  PurchaseModal_YearlyButtonTitle: (price) => `YEARLY \u2022 £${price} / month`,
  PurchaseModal_YearlyButtonSubTitle: (price) =>
    `£${price} / year billed annually`,
  PurchaseModal_MonthlyButtonTitle: (price) =>
    `MONTHLY \u2022 £${price} / month`,
  PurchaseModal_SavePrompt: (percentage) => `Save ${percentage}%`,
  PurchaseModal_MonthlyButtonSubTitle: 'billed monthly',
  PurchaseModal_RestorePurchaseButton: 'Restore purchases',
  PurchaseModal_SubscriptionTermsTitle: 'Subscription terms',
  PurchaseModal_SubscriptionTermsText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};

export default enGB;
