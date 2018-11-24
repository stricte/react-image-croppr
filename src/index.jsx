import React from "react";
import ReactDOM from 'react-dom';

import ErrorBoundary from "./components/ErrorBoundary"
import Canvas from "./components/Canvas";
import FilePicker from './components/FilePicker';
import FileToImage from "./components/FileToImage";
import Img from './components/Img';
import withCroppr from './components/withCroppr';

const filterImages = (selectedFile) => {
  let imageType = /^image\//;

  if (imageType.test(selectedFile.type)) {
    return true;
  }

  return false;
}

const ImgWithCroppr = withCroppr(Img);

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      coords: null,
      image: null
    };

    this.onImageReady = this.onImageReady.bind(this);
    this.onCoordsReady = this.onCoordsReady.bind(this);
  }

  onImageReady(image) {
    this.setState({ image: image });
  }

  onCoordsReady(coords) {
    this.setState({ coords: coords });
  }

  render(){
    return (
      <ErrorBoundary>
              <FilePicker filter={filterImages}>
                {(file) => (
                  <FileToImage file={file} onImageReady={this.onImageReady}>
                    {(image) => (
                      <div>
                        <div style={{ maxWidth: '50%', float: 'left', width: '50%' }}>
                          <ImgWithCroppr src={image.src} onCoordsReady={this.onCoordsReady} />
                        </div>
                        <div style={{ maxWidth: '50%', float: 'left', width: '50%' }}>
                          <Canvas image={this.state.image} coords={this.state.coords}/>
                        </div>
                      </div>
                    )}
                  </FileToImage>
                )}
              </FilePicker>
      </ErrorBoundary>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));
