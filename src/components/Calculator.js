import React from 'react';
import '../App.css';
import NumberButton from './NumberButton.js';
import FunctionButton from './FunctionButton.js';
import {evaluate} from 'mathjs';

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputArray: ['0'],
      index: 0,
      input: true,
      output: '0',
      lastTotal: '',
    }
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.prevEqualClick = this.prevEqualClick.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    let key = event.key;
    if (key === "Enter") {
      this.handleEqualClick(event);
      return;
    }
    if (key === ".") {
      this.handleInputClick(event, key);
    }
    if (key === "C" || key === "c") {
      this.handleClearClick(event);
    }
    let regExp = /[0-9]/;
    if (regExp.test(key)) {
      this.handleInputClick(event, key);
    }
    regExp = /[-+*/]/;
    if (regExp.test(key)) {
      this.handleOperatorClick(event, key);
    }
  }

  handleClearClick(event) {
    this.setState({
      inputArray: ['0'],
      input: true,
      output: '0',
      decimal: false,
      lastTotal: '',
      lastEqual: false,
    });
  }

  handleInputClick(event, value) {
    let currentArray = this.state.inputArray;
    let currentInput = currentArray.pop();
    let lastTotal = this.state.lastTotal;
    let regex = /[-+*/]/;
    let regexDecimal = /\./;

    if (currentInput === "=") {
      currentArray = [];
      currentInput = "0";
    }
    if ( regex.test(currentInput) ) {
      currentArray.push(currentInput);
      currentInput = '';
    }
    if ( regexDecimal.test(currentInput) && value === "." ) {
      value='';
    }
    if (currentInput === '0' && value === "0") {
      currentArray.push(currentInput);
      return;
    } else if ( currentInput==='0') {
      currentInput = '';
    }
    let nextValue = currentInput+value;
    currentArray.push(nextValue);
    this.setState({
      inputArray: currentArray,
      lastTotal: lastTotal,
      input: true,
     });
  }

  handleOperatorClick(event, value) {
    let currentArray = this.state.inputArray;
    let currentInput = currentArray.pop();
    let lastTotal = this.state.lastTotal;
    let regex = /[-+*/]/;
    //if operator is entered before any numerical values
    //either add zero and then the operator or
    //if applicable add last total and then the operator
    if (currentInput === "=") {
      currentArray = [lastTotal];
      currentArray.push(value);
      lastTotal= '';
    } else if (currentInput === '') {
      currentArray.push("0");
      currentArray.push(value);
    //if the last value is an operator, replace the value
    } else if (regex.test(currentInput)) {
      if (value === "-") {
        let prevInput = currentArray.pop() ;
        if (regex.test(prevInput)) {
          currentArray.push(prevInput);
          currentArray.push(currentInput);
        } else {
          currentArray.push(prevInput);
          currentArray.push(currentInput);
          currentArray.push(value);
        }
      } else {
        let prevInput = currentArray.pop();
        if (regex.test(prevInput)) {
          currentArray.push(value)
        } else {
          currentArray.push(prevInput);
          currentArray.push(value);
        }
      }
    //otherwise we just need to add the number and then the operator as normal
    } else {
      currentArray.push(currentInput);
      currentArray.push(value);
    }
    //now the currentInput in state needs to return to blank update inputArray
    this.setState({
      inputArray: currentArray,
      lastTotal: lastTotal,
    });
  }

  prevEqualClick(value) {
    let currentTotal = this.state.output;
    this.setState({
      input: currentTotal + value,
      lastCharacter: value,
    })
  }

  handleEqualClick(event) {
    let currentArray = this.state.inputArray;
    let currentInput = currentArray.pop();

    if (currentInput === "=") {
      return;
    }
    currentArray.push(currentInput);
    currentArray.push("=");
    let stringArray = currentArray.join('');
    stringArray = stringArray.slice(0,-1);
    let value = evaluate(stringArray);
    this.setState({
      inputArray: currentArray,
      output: value,
      lastTotal: value,
      input: false,
    })

  }

  displayInput(inputArray) {
    return inputArray.join(' ');
  }

  render() {
    return (
      <div id="calculator-display">

        <div id="display-in-out">
          <p id="display">{ this.state.input ? this.displayInput(this.state.inputArray) : this.state.output }</p>
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
        <FunctionButton id="decimal" value="." clicked={this.handleInputClick}/>

      </div>
    )
  }


}

export default Calculator;
