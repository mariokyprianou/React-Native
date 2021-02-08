//
//  AssetFont.swift
//  thecoreui
//
//  Created by Kristyna Fojtikova on 04/02/2021.
//

import Foundation
import UIKit

enum AssetFontType {
  
  case superGrand
  case grand
  case large
  case medium
  case small
  
  var font: UIFont {
    switch self {
    case .superGrand:
      return UIFont(name: "proximanova-bold", size: 300) ?? UIFont.systemFont(ofSize: self.size, weight: self.weight)
    case .grand:
      return UIFont(name: "proximanova-bold", size: 140) ?? UIFont.systemFont(ofSize: self.size, weight: self.weight)
    case .large:
      return UIFont(name: "proximanova-bold", size: 100) ?? UIFont.systemFont(ofSize: self.size, weight: self.weight)
    case .medium:
      return UIFont(name: "proximanova-bold", size: 52) ?? UIFont.systemFont(ofSize: self.size, weight: self.weight)
    case .small:
      return UIFont(name: "proximanova-bold", size: 45) ?? UIFont.systemFont(ofSize: self.size, weight: self.weight)
    }
  }
  
  var lineHeightMultiple: CGFloat {
    switch self {
    case .grand, .large, .medium, .small:
      return 1
    case .superGrand:
      return 0.5
    }
  }

  var size: CGFloat {
    switch self {
    case .superGrand:
      return 300
    case .grand:
      return 140
    case .large:
      return 100
    case .medium:
      return 52
    case .small:
      return 45
    }
  }

  var weight: UIFont.Weight {
    switch self {
    case .grand, .superGrand, .large, .medium:
      return .bold
    case .small:
      return .medium
    }
  }
}
