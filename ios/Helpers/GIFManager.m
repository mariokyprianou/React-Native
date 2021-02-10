//
//  GIFManager.m
//  thecoreui
//
//  Created by James Shaw on 01/02/2021.
//

#import "GIFManager.h"
#import "thecoreui-Swift.h"

#import <UIKit/UIKit.h>
#import <ImageIO/ImageIO.h>
#import <MobileCoreServices/MobileCoreServices.h>

@implementation GIFManager

RCT_EXPORT_MODULE(GIFManager);

RCT_EXPORT_METHOD(fetch:(NSString*)beforeImagePath :(NSString*)afterImagePath resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  SwiftAssetCreator *creator = [SwiftAssetCreator new];
  UIImage *beforeImage = [creator loadImageFrom:beforeImagePath];
  UIImage *afterImage = [creator loadImageFrom:afterImagePath];
  NSArray *array = [self getImages:beforeImage :afterImage];
  NSString *filePath = [self createGIF:array];
  resolve(filePath);
}

- (NSArray *)getImages:(UIImage *)beforeImage :(UIImage *)afterImage {
  NSMutableArray *array = [[NSMutableArray alloc] init];
  NSMutableArray *secondArray = [[NSMutableArray alloc] init];
  
  NSInteger kFrameCount = 10;
  CGFloat imageWidth = beforeImage.size.width;
  CGFloat chunkWidget = imageWidth / kFrameCount;
  
  for (NSUInteger i = 1; i < kFrameCount; i++) {
    CGFloat beforeWidth = i * chunkWidget;
    CGRect beforeRect = CGRectMake(0.0, 0.0, beforeWidth, beforeImage.size.height);
    UIImage *beforeCroppedImage = [self cropImage:beforeImage toRect:beforeRect];
    
    CGFloat afterWidth = (kFrameCount - i) * chunkWidget;
    CGRect afterRect = CGRectMake(beforeWidth, 0.0, afterWidth, afterImage.size.height);
    UIImage *afterCroppedImage = [self cropImage:afterImage toRect:afterRect];
    
    UIImage *stitchedImage = [self stitchImages:beforeCroppedImage :afterCroppedImage];
    [array addObject:stitchedImage];
    [secondArray insertObject:stitchedImage atIndex:0];
  }
  
  NSMutableArray *newArray = [[NSMutableArray alloc] init];
  [newArray addObjectsFromArray:secondArray];
  [newArray addObjectsFromArray:array];
  [newArray addObject:beforeImage];
  return newArray;
}

- (UIImage *)stitchImages:(UIImage *)beforeImage :(UIImage *)afterImage {
  CGSize size = CGSizeMake(beforeImage.size.width + afterImage.size.width, beforeImage.size.height);

  UIGraphicsBeginImageContext(size);

  [beforeImage drawInRect:CGRectMake(0,0,beforeImage.size.width, size.height)];
  [afterImage drawInRect:CGRectMake(beforeImage.size.width, 0, afterImage.size.width, size.height)];
  UIImage *finalImage = UIGraphicsGetImageFromCurrentImageContext();

  UIGraphicsEndImageContext();
  return finalImage;
}

- (NSString *)createGIF:(NSArray*)imageArray {
    NSUInteger kFrameCount = imageArray.count;

    NSDictionary *fileProperties = @{
        (__bridge id)kCGImagePropertyGIFDictionary: @{
            (__bridge id)kCGImagePropertyGIFLoopCount: @0, // 0 means loop forever
        }
    };

    NSDictionary *frameProperties = @{
        (__bridge id)kCGImagePropertyGIFDictionary: @{
            (__bridge id)kCGImagePropertyGIFDelayTime: @0.1f, // a float (not double!) in seconds, rounded to centiseconds in the GIF data
        }
    };

    NSURL *documentsDirectoryURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:YES error:nil];
    NSURL *fileURL = [documentsDirectoryURL URLByAppendingPathComponent:@"animated.gif"];
    
    CGImageDestinationRef destination = CGImageDestinationCreateWithURL((__bridge CFURLRef)fileURL, kUTTypeGIF, kFrameCount, NULL);
    CGImageDestinationSetProperties(destination, (__bridge CFDictionaryRef)fileProperties);

    for (NSUInteger i = 0; i < kFrameCount; i++) {
        @autoreleasepool {
            UIImage *image = imageArray[i];
            CGImageDestinationAddImage(destination, image.CGImage, (__bridge CFDictionaryRef)frameProperties);
        }
    }

    if (!CGImageDestinationFinalize(destination)) {
        NSLog(@"failed to finalize image destination");
    }
    CFRelease(destination);

  return [fileURL absoluteString];
}

- (UIImage *)cropImage:(UIImage *)imageToCrop toRect:(CGRect)rect {
    CGImageRef imageRef = CGImageCreateWithImageInRect([imageToCrop CGImage], rect);
    UIImage *cropped = [UIImage imageWithCGImage:imageRef];
    CGImageRelease(imageRef);

    return cropped;
}

@end
