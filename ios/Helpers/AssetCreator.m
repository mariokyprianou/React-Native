//
//  AssetCreator.m
//  thecoreui
//
//  Created by Kristyna Fojtikova on 26/01/2021.
//

#import "AssetCreator.h"
#import "TheCoreUI-Swift.h"

@class SwiftAssetCreator;


@implementation AssetCreator

RCT_EXPORT_MODULE(iOSAssetCreator);

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(createBase64ImageForWorkoutComplete:(NSString *)imageUrl title:(NSString *)title completedWorkouts:(NSInteger *)completedWorkouts totalTime:(NSString *)totalTime colour:(NSString *)colour)
{
  SwiftAssetCreator *creator = [SwiftAssetCreator new];
  NSString *image = [creator encodedWorkoutCompleteImageWith:title from:imageUrl completedWorkoutsNumber:completedWorkouts totalTime:totalTime color:colour];
  return image;
};

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(createBase64ImageForStringAchievement:(NSString *)imageUrl timeString:(NSString *)achievementValueString description:(NSString *)description colour:(NSString *)colour)
{
  SwiftAssetCreator *creator = [SwiftAssetCreator new];
  NSString *image = [creator encodedAchievementImageStringBasedFor:achievementValueString with:description from:imageUrl color:colour];
  return image;
};

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(createBase64ImageForIntAchievement:(NSString *)imageUrl achievedValue:(NSInteger *)achievedValue description:(NSString *)description colour:(NSString *)colour)
{
  SwiftAssetCreator *creator = [SwiftAssetCreator new];
  NSString *image = [creator encodedAchievementImageIntBasedFor:achievedValue with:description from:imageUrl color:colour];
  return image;
};


@end
