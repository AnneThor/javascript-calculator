import React from 'react';
import '../App.css';
import NumberButton from './NumberButton.js';
import FunctionButton from './FunctionButton.js';
import {evaluate} from 'mathjs';

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    let key = event.key;
    let regExp = /[0-9]/;
    if (regExp.test(key)) {
      this.handleInputClick(event, key);
    }
    regExp = /[-+*/]/;
    if (regExp.test(key)) {
      this.handleOperatorClick(event, key);
    }
    if (key === ".") {
      this.handleDecimalClick(event, key);
    }
  }

  handleClearClick(event) {
    this.setState( {input: '',});
  }

  handleInputClick(event, value) {
    let currentInput = this.state.input;
    let nextValue = currentInput+=value;
    this.setState(
      {input: nextValue}
    );
  }

  handleOperatorClick(event, value) {
    let currentInput = this.state.input;
    if ( currentInput.length === 0 ) {
      return;
    }
    let lastIndex = currentInput.length -1;
    let lastInput = currentInput.charAt(lastIndex);
    let regEx = /[-+*/]/;
    if (regEx.test(lastInput)) {
      return;
    }
    let nextValue = currentInput+=value;
    this.setState(
      {input: nextValue}
    );
  }

  handleDecimalClick(event, value) {
    let currentInput = this.state.input;
    let lastInput = currentInput.charAt(currentInput.length-1);
    if (lastInput === value) {
      return;
    }
    let nextValue = currentInput+=value;
    this.setState(
      {input: nextValue}
    );
  }

  handleEqualClick(event) {
    let currentInput = this.state.input;
    if (currentInput.length === 1) {
      return;
    }
    let regEx = /[0-9.]/;
    let lastInput = currentInput.charAt(currentInput.length-1);
    if ( !regEx.test(lastInput) ) {
      return;
    }
    let nextValue = evaluate(currentInput);
    console.log(nextValue);
    this.setState(
      { input: nextValue,}
    )
  }

  render() {
    return (
      <div id="calculator-display">

        <div id="display">
          <div>{this.state.input}</div>
        </div>

        <button className="function-button" id="clear"
                onClick={this.handleClearClick}>AC</button>

        <FunctionButton id="divide"
                        value="/"
                        clicked={this.handleOperatorClick}/>
        <FunctionButton id="multiply"
                        value="*"
                        clicked={this.handleOperatorClick}/>

        <NumberButton id="seven" value="7"
                      clicked={this.handleInputClick}
                      keyed={this.handleKeyDown}/>
        <NumberButton id="eight" value="8" clicked={this.handleInputClick} />
        <NumberButton id="nine" value="9" clicked={this.handleInputClick} />

        <FunctionButton id="subtract" value="-" clicked={this.handleOperatorClick}/>

        <NumberButton id="four" value="4" clicked={this.handleInputClick} />
        <NumberButton id="five" value="5" clicked={this.handleInputClick} />
        <NumberButton id="six" value="6" clicked={this.handleInputClick} />

        <FunctionButton id="add" value="+" clicked={this.handleOperatorClick}/>

        <NumberButton id="one" value="1" clicked={this.handleInputClick}/>
        <NumberButton id="two" value="2" clicked={this.handleInputClick}/>
        <NumberButton id="three" value="3" clicked={this.handleInputClick}/>

        <button className="function-button"
                id="equals"
                onClick={this.handleEqualClick}>=</button>
        <NumberButton id="zero" value="0" clicked={this.handleInputClick}/>
        <FunctionButton id="decimal" value="." clicked={this.handleDecimalClick}/>

      </div>
    )
  }


}

export default Calculator;
