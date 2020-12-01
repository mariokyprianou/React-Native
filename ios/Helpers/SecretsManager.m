//
//  SecretsManager.m
//  TheCoreUI
//
//  Created by James Shaw on 28/12/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "SecretsManager.h"
#import "thecoreui-Swift.h"

@implementation SecretsManager

RCT_EXPORT_MODULE(iOSSecretsManager);

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(fetch:(NSString *)environment) {
  
  if ([[environment lowercaseString] containsString:@"prod"]) {
    NSString *graphQLUrl = [Secrets graphQLUrlProduction];
    NSString *awsRegion = [Secrets awsRegionProduction];
    NSString *userPoolId = [Secrets userPoolIdProduction];
    NSString *clientId = [Secrets userPoolClientIdProduction];
    NSString *checksum = [Secrets checksum];
//    NSString *intercomAPIKey = [Secrets intercomAPIKey];
//    NSString *intercomAppId = [Secrets intercomAppId];
    NSDictionary *dictionary = [NSDictionary dictionaryWithObjectsAndKeys:
                                graphQLUrl, @"graphQLUrl",
                                awsRegion, @"awsRegion",
                                userPoolId, @"userPoolId",
                                clientId, @"clientId",
                                checksum, @"checksum", nil];
    return dictionary;
  }
  
  if ([[environment lowercaseString] containsString:@"dev"]) {
    NSString *graphQLUrl = [Secrets graphQLUrlDevelopment];
    NSString *awsRegion = [Secrets awsRegionDevelopment];
    NSString *userPoolId = [Secrets userPoolIdDevelopment];
    NSString *clientId = [Secrets userPoolClientIdDevelopment];
    NSString *checksum = [Secrets checksum];
//    NSString *intercomAPIKey = [Secrets intercomAPIKey];
//    NSString *intercomAppId = [Secrets intercomAppId];
    NSDictionary *dictionary = [NSDictionary dictionaryWithObjectsAndKeys:
                                graphQLUrl, @"graphQLUrl",
                                awsRegion, @"awsRegion",
                                userPoolId, @"userPoolId",
                                clientId, @"clientId",
                                checksum, @"checksum", nil];
    return dictionary;
  }
  
  NSString *graphQLUrl = [Secrets graphQLUrlStaging];
  NSString *awsRegion = [Secrets awsRegionStaging];
  NSString *userPoolId = [Secrets userPoolIdStaging];
  NSString *clientId = [Secrets userPoolClientIdStaging];
  NSString *checksum = [Secrets checksum];
//  NSString *intercomAPIKey = [Secrets intercomAPIKey];
//  NSString *intercomAppId = [Secrets intercomAppId];
  NSDictionary *dictionary = [NSDictionary dictionaryWithObjectsAndKeys:
                              graphQLUrl, @"graphQLUrl",
                              awsRegion, @"awsRegion",
                              userPoolId, @"userPoolId",
                              clientId, @"clientId",
                              checksum, @"checksum", nil];
  return dictionary;
}

@end
