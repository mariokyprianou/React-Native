//
//  AssetCreator.swift
//  thecoreui
//
//  Created by Kristyna Fojtikova on 26/01/2021.
//

import Foundation
import UIKit

struct GraphicContextTextContent {
  var string: NSAttributedString
  var frame: CGRect
}

@objc public class SwiftAssetCreator: NSObject {
  
  // MARK: - Initializers
  
  var assetWidth: CGFloat = 1080
  var assetHeight: CGFloat = 1920
  let fontColor: UIColor = .white
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
  
  @objc public func encodedWorkoutCompleteImage(with upperTitle: String, from imageUrl: String, completedWorkoutsNumber: Int, totalTime: String) -> String? {
          let fifthHeight = self.assetHeight / 5
        
          let topLabelFrame = CGRect(x: padding, y: fifthHeight * 0.92, width: contentWidth, height: fifthHeight * 2)
          let topLabel =
              NSAttributedString(string: upperTitle, attributes: fontAttributes(fontType: .medium))
    
          let bottomLabelFrame = CGRect(x: padding, y: fifthHeight * 3.55, width: contentWidth, height: fifthHeight * 1.5)
          let workoutsNumber = NSAttributedString(string: "\(completedWorkoutsNumber)", attributes: fontAttributes(fontType: .large))
          let workoutsText = NSAttributedString(string: "\nWorkouts", attributes: fontAttributes(fontType: .small))
          let spacing = NSAttributedString(string: "\n ", attributes: fontAttributes(fontType: .medium))
          let totalTimeValue = NSAttributedString(string: "\n\(totalTime)", attributes: fontAttributes(fontType: .large))
          let totalTimeText = NSAttributedString(string: "\nTotal time", attributes: fontAttributes(fontType: .small))
          let bottomLabel = join([workoutsNumber, workoutsText, spacing, totalTimeValue, totalTimeText])
    
          let contents = [
            GraphicContextTextContent(string: topLabel, frame: topLabelFrame),
            GraphicContextTextContent(string: bottomLabel, frame: bottomLabelFrame)
          ]
          return createAsset(from: imageUrl, and: contents)
  }
  
  // MARK: -  Private Generating Methods
  
  @objc public func encodedAchievementImageIntBased(for achievedValue: Int, with subtext: String, from imageUrl: String) -> String? {
    let valueText = NSAttributedString(string: "\(achievedValue)", attributes: fontAttributes(rightAlign: false, fontType: .superGrand))
    let spacing = NSAttributedString(string: "\n ", attributes: fontAttributes(rightAlign: false, fontType: .small, moveUp: true))
    let descriptionText = NSAttributedString(string: "\(subtext)", attributes: fontAttributes(rightAlign: false, fontType: .medium))
    let title = join([valueText, spacing, descriptionText])
    return encodedImage(with: title, from: imageUrl)
  }
  
  @objc public func encodedAchievementImageStringBased(for string: String, with subtext: String, from imageUrl: String) -> String? {
    let valueText = NSAttributedString(string: string, attributes: fontAttributes(rightAlign: false, fontType: .grand))
    let descriptionText = NSAttributedString(string: "\n\(subtext)", attributes: fontAttributes(rightAlign: false, fontType: .medium))
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
  
  private func fontAttributes(rightAlign: Bool = true, fontType: AssetFontType, moveUp: Bool = false) -> [NSAttributedString.Key: Any] {
    var attributes = [
      NSAttributedString.Key.font: fontType.font,
      NSAttributedString.Key.foregroundColor: fontColor,
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
}
