import React from 'react';
import '../App.css';

class NumberButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <button className="number-button"
             id={this.props.id}
             onClick={(e) => this.props.clicked(e, this.props.value)}>{this.props.value}</button>

    );
  }

}

export default NumberButton;
