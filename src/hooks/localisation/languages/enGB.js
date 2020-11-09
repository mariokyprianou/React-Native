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
  AnalyticsPermissionsTitle: 'Analytics',
  AnalyticsPermissionsText:
    'To create the best workout programmes possible and keep improving the POWER experience, we need your permission to collect analytics from the app.',
  NotificationsPermissionsTitle: 'Notifications',
  NotificationsPermissionsText:
    'To send you workout updates, we need permission to send push notifications to your device.',
};

export default enGB;
