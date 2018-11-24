import React from "react";

import '../assets/croppr.css';
import Croppr from 'croppr';

const withCroppr = (Img) => {
  return class ImgWithCroppr extends React.Component {
    constructor(){
      super();

      this.imageRef = React.createRef();
      this.state = {coords: null};

      this.onChangeCroppr = this.onChangeCroppr.bind(this);
      this.onInitializeCropp = this.onInitializeCropp.bind(this);
    }

    componentDidUpdate(prevProps){
      if (this.props.src !== prevProps.src) {
        this.destroyCroppr();
        this.initCroppr();
      }
    }

    componentDidMount() {
      this.initCroppr();
    }

    onInitializeCropp(croppr){
      this.props.onCoordsReady && this.props.onCoordsReady(croppr.getValue());
      this.setState({ coords: croppr.getValue() });
    }

    initCroppr(){
      const node = this.imageRef.current;

      if(!node || !node.src) return;

      this.croppr = new Croppr(node, {
        aspectRatio: 1,
        startSize: [100, 100, 'px'],
        onInitialize: this.onInitializeCropp,
        onCropEnd: this.onChangeCroppr
      });
    }

    componentWillUnmount() {
      this.destroyCroppr();
    }

    destroyCroppr(){
      if (this.croppr) {
        this.croppr.destroy();
        delete this.croppr;
      }
    }

    onChangeCroppr(coords) {
      this.props.onCoordsReady && this.props.onCoordsReady(coords);
      this.setState({coords: coords});
    }

    render() {
      return (
        <React.Fragment>
          <Img ref={this.imageRef} src={this.props.src} />
          {this.props.children && this.props.children(this.state.coords)}
        </React.Fragment>
      );
    }
  }
}

export default withCroppr;
