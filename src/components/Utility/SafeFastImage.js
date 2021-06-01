import React, {Component} from 'react';
import FastImage from 'react-native-fast-image';

class SafeFastImage extends Component {
  constructor(props) {
    super(props);

    const imageName = props.imageUrl
      ? props.imageUrl.split('/').pop().split('?').shift()
      : null;

    this.state = {
      imageName: imageName,
      loaded: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const newImageName = nextProps.imageUrl
      ? nextProps.imageUrl.split('/').pop().split('?').shift()
      : null;

    const shouldUpdate = nextState.imageName !== newImageName;

    if (shouldUpdate) {
      this.setState({imageName: newImageName});
    }

    return shouldUpdate;
  }

  render() {
    return (
      <FastImage
        source={this.props.source}
        style={this.props.style}
        onLoadEnd={() => {
          this.props.onLoadEnd && this.props.onLoadEnd();
        }}
        onError={() => {
          this.props.onError && this.props.onError();
        }}
        {...this.props}
      />
    );
  }
}

export default SafeFastImage;
