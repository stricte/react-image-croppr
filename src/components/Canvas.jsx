import React from "react";

class Canvas extends React.Component {
  constructor(){
    super();

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.canvasRef.current;

    if(!canvas){
      return;
    }

    if(!this.props.image){
      return;
    }

    const coords = this.coords();

    const ctx = canvas.getContext("2d");

    ctx.drawImage(this.props.image,
      coords.x,
      coords.y,
      coords.width,
      coords.height,
      0,
      0,
      coords.width,
      coords.height
    );
  }

  coords(){
    if(this.props.coords){
      return this.props.coords;
    }
  }

  canvas() {
    return <canvas ref={this.canvasRef} width={this.coords().width} height={this.coords().height} />
  }

  render() {
    return this.props.coords && this.canvas();
  }
}

export default Canvas;
