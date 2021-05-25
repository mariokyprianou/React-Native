//
//  AssetCreator.swift
//  thecoreui
//
//  Created by Kristyna Fojtikova on 26/01/2021.
//

import Foundation
import UIKit
import AVFoundation
import Photos

struct GraphicContextTextContent {
  var string: NSAttributedString
  var frame: CGRect
}

@objc public class SwiftAssetCreator: NSObject {

  // MARK: - Initializers

  var assetWidth: CGFloat = 1125
  var assetHeight: CGFloat = 2001
  let fontColor: UIColor = .black
  var padding: CGFloat {
    return assetWidth / 23
  }
  var contentWidth: CGFloat {
    return assetWidth - (padding * 2)
  }

  var documentsUrl: URL {
      return FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
  }

  override init() {
  }

  // MARK: -  Exposed Methods

  @objc public func encodeTransformationImage(image: UIImage, beforeDate: String, afterDate: String, color: String) -> UIImage {
    let beforeDateX = image.size.width * 0.05
    let beforeDateY = (image.size.height * 0.2) + (image.size.height / 2.0) + 20.0
    let beforeDateWidth = image.size.width * 0.9
    let beforeDateHeight: CGFloat = 80.0
    let labelFrame = CGRect(x: beforeDateX, y: beforeDateY, width: beforeDateWidth, height: beforeDateHeight)
    let beforeDateLabel = NSAttributedString(string: beforeDate, attributes: fontAttributes(rightAlign: false, fontType: .medium, color: color))
    let afterDateLabel = NSAttributedString(string: afterDate, attributes: fontAttributes(rightAlign: true, fontType: .medium, color: color))

    let contents = [
      GraphicContextTextContent(string: beforeDateLabel, frame: labelFrame),
      GraphicContextTextContent(string: afterDateLabel, frame: labelFrame)
    ]

    let assetFrame = CGRect(x: 0, y: 0, width: image.size.width, height: image.size.height)
    let bgImageView = UIImageView(frame: assetFrame)
    bgImageView.image = image

    UIGraphicsBeginImageContext(assetFrame.size)
    if let currentContext = UIGraphicsGetCurrentContext() {
      bgImageView.layer.render(in: currentContext)
      contents.forEach { (content) in
        content.string.draw(in: content.frame)
      }
      let newImage = UIGraphicsGetImageFromCurrentImageContext()
      return newImage ?? UIImage()
    }

    return UIImage()
  }

  @objc public func encodedWorkoutCompleteImage(with upperTitle: String, from imageUrl: String, completedWorkoutsNumber: Int, totalTime: String, color: String = "WHITE") -> String? {
        let fifthHeight = self.assetHeight / 5

        let topLabelFrame = CGRect(x: padding, y: fifthHeight * 0.92, width: contentWidth, height: fifthHeight * 2)
        let topLabel =
            NSAttributedString(string: upperTitle, attributes: fontAttributes(fontType: .medium))

        let bottomLabelFrame = CGRect(x: padding, y: fifthHeight * 3.55, width: contentWidth, height: fifthHeight * 1.5)
        let workoutsNumber = NSAttributedString(string: "\(completedWorkoutsNumber)", attributes: fontAttributes(fontType: .large, color: color))
        let workoutsText = NSAttributedString(string: "\nWorkouts", attributes: fontAttributes(fontType: .small, color: color))
        let spacing = NSAttributedString(string: "\n ", attributes: fontAttributes(fontType: .medium, color: color))
        let totalTimeValue = NSAttributedString(string: "\n\(totalTime)", attributes: fontAttributes(fontType: .large, color: color))
        let totalTimeText = NSAttributedString(string: "\nTotal time", attributes: fontAttributes(fontType: .small, color: color))
        let bottomLabel = join([workoutsNumber, workoutsText, spacing, totalTimeValue, totalTimeText])

        let contents = [
          GraphicContextTextContent(string: topLabel, frame: topLabelFrame),
          GraphicContextTextContent(string: bottomLabel, frame: bottomLabelFrame)
        ]
        return createAsset(from: imageUrl, and: contents)
  }

  // MARK: -  Private Generating Methods

  @objc public func encodedAchievementImageIntBased(for achievedValue: Int, with subtext: String, from imageUrl: String, color: String = "WHITE") -> String? {
    let valueText = NSAttributedString(string: "\(achievedValue)", attributes: fontAttributes(rightAlign: false, fontType: .superGrand, color: color))
    let spacing = NSAttributedString(string: "\n ", attributes: fontAttributes(rightAlign: false, fontType: .small, moveUp: true, color: color))
    let descriptionText = NSAttributedString(string: "\(subtext)", attributes: fontAttributes(rightAlign: false, fontType: .medium, color: color))
    let title = join([valueText, spacing, descriptionText])
    return encodedImage(with: title, from: imageUrl)
  }

  @objc public func encodedAchievementImageStringBased(for string: String, with subtext: String, from imageUrl: String, color: String = "WHITE") -> String? {
    let valueText = NSAttributedString(string: string, attributes: fontAttributes(rightAlign: false, fontType: .grand, color: color))
    let descriptionText = NSAttributedString(string: "\n\(subtext)", attributes: fontAttributes(rightAlign: false, fontType: .medium, color: color))
    let title = join([valueText, descriptionText])
    return encodedImage(with: title, from: imageUrl, spacingFromTopMultiplier: 1.2)
  }

  private func encodedImage(with centerLeftTitle: NSAttributedString, from imageUrl: String, spacingFromTopMultiplier: CGFloat = 0.92) -> String? {
    let fifthHeight = self.assetHeight / 5
    let centerLeftFrame = CGRect(x: padding, y: fifthHeight * spacingFromTopMultiplier, width: contentWidth, height: fifthHeight * 2)
    let contents = [
      GraphicContextTextContent(string: centerLeftTitle, frame: centerLeftFrame)
    ]
    return createAsset(from: imageUrl, and: contents)
  }

  private func createAsset(from imageUrl: String, and contents: [GraphicContextTextContent]) -> String? {
//    guard let backgroundImage = UIImage(named: "shareSample") else {
    guard let backgroundImage = loadImage(from: imageUrl) else {
      return nil
    }
    let assetFrame = CGRect(x: 0, y: 0, width: assetWidth, height: assetHeight)
    let bgImageView = UIImageView(frame: assetFrame)
    bgImageView.image = backgroundImage
    bgImageView.contentMode = .scaleAspectFill

    UIGraphicsBeginImageContext(assetFrame.size)
    if let currentContext = UIGraphicsGetCurrentContext() {
      bgImageView.layer.render(in: currentContext)

      contents.forEach { (content) in
        content.string.draw(in: content.frame)
      }
      let newImage = UIGraphicsGetImageFromCurrentImageContext()
      let encodedImage = self.encode(newImage)
      return encodedImage
    }
    return nil
  }


  // MARK: - Private UI Methods

  private func fontAttributes(rightAlign: Bool = true, fontType: AssetFontType, moveUp: Bool = false, color: String = "WHITE") -> [NSAttributedString.Key: Any] {
    var attributes = [
      NSAttributedString.Key.font: fontType.font,
      NSAttributedString.Key.foregroundColor: AssetFontColor.transformation(color).color,
    ]
    let paragraphStyle = NSMutableParagraphStyle()
    if rightAlign == true {
      paragraphStyle.alignment = .right
    }
    if (moveUp == true) {
      paragraphStyle.lineHeightMultiple = 0.1
    }
    attributes[NSAttributedString.Key.paragraphStyle] = paragraphStyle
    return attributes
  }

  private func join(_ allStrings: [NSAttributedString]) -> NSMutableAttributedString {
    let mutableString = NSMutableAttributedString()
    allStrings.forEach { (string) in
      mutableString.append(string)
    }
    return mutableString
  }

  // MARK: - Private Data Methods

  private func encode(_ image: UIImage?) -> String? {
    let imageData: NSData? = image?.pngData() as NSData?
    let encoded = imageData?.base64EncodedString(options: .endLineWithCarriageReturn)
    return encoded
  }

  @objc public func loadImage(from path: String) -> UIImage? {
      guard let fileURL = URL(string: "\(documentsUrl)\(path)") else {
        return nil
      }
      do {
          let imageData = try Data(contentsOf: fileURL)
          return UIImage(data: imageData)
      } catch {
          print("Error loading image : \(error)")
      }
      return nil
  }

  
  // Video Creation

  @objc public func encodeVideo(allImages: [UIImage], videoSize: CGSize, completion: @escaping (String?) -> Void) {
      let videoFPS: Int32 = 10
      let videoOutputURL = documentsUrl.appendingPathComponent("videoTransformation.mov", isDirectory: false)
      let videoPath = videoOutputURL.relativePath
      // Create AVAssetWriter to write video
      guard let assetWriter = createAssetWriter(url: videoOutputURL, size: videoSize) else {
          print("Error converting images to video: AVAssetWriter not created")
          completion(nil)
          return
      }

      // If here, AVAssetWriter exists so create AVAssetWriterInputPixelBufferAdaptor
      let writerInput = assetWriter.inputs.filter{ $0.mediaType == AVMediaType.video }.first!
      let sourceBufferAttributes: [String: Any] = [
          kCVPixelBufferPixelFormatTypeKey as String : Int(kCVPixelFormatType_32ARGB),
          kCVPixelBufferWidthKey as String : videoSize.width,
          kCVPixelBufferHeightKey as String : videoSize.height,
      ]
      let pixelBufferAdaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: writerInput, sourcePixelBufferAttributes: sourceBufferAttributes)

      if FileManager.default.fileExists(atPath: videoPath) {
        try? FileManager.default.removeItem(atPath: videoPath)
      }

      // Start writing session
      if assetWriter.startWriting() {
        assetWriter.startSession(atSourceTime: CMTime.zero)
        if (pixelBufferAdaptor.pixelBufferPool == nil) {
            print("Error converting images to video: pixelBufferPool nil after starting session")
            completion(nil)
            return
        }

        // -- Create queue for <requestMediaDataWhenReadyOnQueue>
        let mediaQueue = DispatchQueue(__label: "mediaInputQueue", attr: nil)

        // -- Set video parameters
        let frameDuration = CMTimeMake(value: 1, timescale: videoFPS)
        var frameCount = 0

        // -- Add images to video
        let numImages = allImages.count
        writerInput.requestMediaDataWhenReady(on: mediaQueue, using: { () -> Void in
            // Append unadded images to video but only while input ready
          while (writerInput.isReadyForMoreMediaData && frameCount < numImages) {
            let lastFrameTime = CMTimeMake(value: Int64(frameCount), timescale: videoFPS)
                let presentationTime = frameCount == 0 ? lastFrameTime : CMTimeAdd(lastFrameTime, frameDuration)

            if !self.appendPixelBufferForImageAtURL(image: allImages[frameCount], pixelBufferAdaptor: pixelBufferAdaptor, presentationTime: presentationTime) {
                    print("Error converting images to video: AVAssetWriterInputPixelBufferAdapter failed to append pixel buffer")
                    completion(nil)
                    return
                }

                frameCount += 1
            }

            // No more images to add? End video.
            if (frameCount >= numImages) {
                writerInput.markAsFinished()
              assetWriter.finishWriting {
                    if (assetWriter.error != nil) {
                      completion(nil)
                      print("Error converting images to video: \(String(describing: assetWriter.error))")
                    } else {
                      self.saveVideoToLibrary(videoURL: URL(fileURLWithPath: videoPath))
                        print("Converted images to movie @ \(videoPath)")
                        completion(videoPath)
                    }
                }
            }
        })
      }
  }


  private func createAssetWriter(url: URL, size: CGSize) -> AVAssetWriter? {
      do {
          // Create asset writer
        let newWriter = try AVAssetWriter(outputURL: url, fileType: AVFileType.mov)

          // Define settings for video input
          let videoSettings: [String: Any] = [
              AVVideoCodecKey  : AVVideoCodecH264,
              AVVideoWidthKey  : size.width,
              AVVideoHeightKey : size.height,
          ]

          // Add video input to writer
        let assetWriterVideoInput = AVAssetWriterInput(mediaType: AVMediaType.video, outputSettings: videoSettings)
          newWriter.add(assetWriterVideoInput)

          // Return writer
          print("Created asset writer for \(size.width)x\(size.height) video")
          return newWriter
      } catch {
          print("Error creating asset writer: \(error)")
          return nil
      }
  }


  private func appendPixelBufferForImageAtURL(image: UIImage, pixelBufferAdaptor: AVAssetWriterInputPixelBufferAdaptor, presentationTime: CMTime) -> Bool {
      var appendSucceeded = false

      autoreleasepool {
          if let pixelBufferPool = pixelBufferAdaptor.pixelBufferPool {
              var pixelBuffer: CVPixelBuffer?
              let status: CVReturn = CVPixelBufferPoolCreatePixelBuffer(
                kCFAllocatorDefault,
                pixelBufferPool,
                &pixelBuffer
              )

              if let pixelBuffer = pixelBuffer, status == 0 {
                fillPixelBufferFromImage(image: image, pixelBuffer: pixelBuffer)

                appendSucceeded = pixelBufferAdaptor.append(
                  pixelBuffer,
                  withPresentationTime: presentationTime
                )
              } else {
                NSLog("error: Failed to allocate pixel buffer from pool")
              }
          }
      }

      return appendSucceeded
  }


  private func fillPixelBufferFromImage(image: UIImage, pixelBuffer: CVPixelBuffer) {
    CVPixelBufferLockBaseAddress(pixelBuffer, CVPixelBufferLockFlags(rawValue: 0))

      let pixelData = CVPixelBufferGetBaseAddress(pixelBuffer)
      let rgbColorSpace = CGColorSpaceCreateDeviceRGB()

      // Create CGBitmapContext
      let context = CGContext(
        data: pixelData,
        width: Int(image.size.width),
        height: Int(image.size.height),
        bitsPerComponent: 8,
        bytesPerRow: CVPixelBufferGetBytesPerRow(pixelBuffer),
        space: rgbColorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue
      )

      // Draw image into context
      context?.draw(image.cgImage!, in: CGRect(x: 0.0, y: 0.0, width: image.size.width, height: image.size.height))

      CVPixelBufferUnlockBaseAddress(pixelBuffer, CVPixelBufferLockFlags(rawValue: 0))
  }


  private func saveVideoToLibrary(videoURL: URL) {
      PHPhotoLibrary.requestAuthorization { status in
          // Return if unauthorized
        guard status == .authorized else {
              print("Error saving video: unauthorized access")
              return
          }

          // If here, save video to library
        PHPhotoLibrary.shared().performChanges({
          PHAssetChangeRequest.creationRequestForAssetFromVideo(atFileURL: videoURL)
          }) { success, error in
              if !success {
                print("Error saving video: \(String(describing: error))")
              }
          }
      }
  }
}

extension UIImage {
    @objc func drawInRectAspectFill(rect: CGRect) {
        let targetSize = rect.size
        if targetSize == .zero {
          return self.draw(in: rect)
        }
        let widthRatio    = targetSize.width  / self.size.width
        let heightRatio   = targetSize.height / self.size.height
        let scalingFactor = max(widthRatio, heightRatio)
        let newSize = CGSize(width:  self.size.width  * scalingFactor,
                             height: self.size.height * scalingFactor)
        UIGraphicsBeginImageContext(targetSize)
        let origin = CGPoint(x: (targetSize.width  - newSize.width)  / 2,
                             y: (targetSize.height - newSize.height) / 2)
      self.draw(in: CGRect(origin: origin, size: newSize))
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
      scaledImage?.draw(in: rect)
    }
}
