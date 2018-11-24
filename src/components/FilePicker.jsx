import React from "react";

export default class FilePicker extends React.Component {
  constructor(){
    super();

    this.state = { file: null };

    this.onFileSelected = this.onFileSelected.bind(this);
  }

  onFileSelected(event) {
    let selectedFile = event.target.files[0];

    if(this.props.filter && !this.props.filter(selectedFile)){
      return;
    }

    this.setState({ file: selectedFile });
  }

  render() {
    return (
      <React.Fragment>
        <input type="file" onChange={this.onFileSelected} />
        {this.state.file && this.props.children && this.props.children(this.state.file)}
      </React.Fragment>
    );
  }
}
