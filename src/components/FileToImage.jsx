import React, { Component } from 'react';

class FileToImage extends Component {
  state = { image: null };

  componentDidUpdate(prevProps){
    if(this.props.file != prevProps.file){
      this.doTheWork();
    }
  }

  componentDidMount(){
    this.doTheWork();
  }

  doTheWork(){
    if (!this.props.file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      this.props.onImageReady && this.props.onImageReady(image);

      this.setState({image: image})
    }

    reader.readAsDataURL(this.props.file);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.image && this.props.children && this.props.children(this.state.image)}
      </React.Fragment>
    )
  }
}

export default FileToImage;
