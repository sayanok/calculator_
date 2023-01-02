import React, { useState } from "react";
import "./App.css";
const App: React.FC = () => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operators = ["+", "-", "×", "÷"];
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [prevNumber, setPrevNumber] = useState<number>(0);
  const [inputItem, setInputItem] = useState<string>("prevNumber");
  const [inputOperator, setInputOperator] = useState<string>(" ");
  const [answer, setAnswer] = useState<number | string>(0);
  function onClickHandler(value: string) {
    if (currentNumber >= 10000000 || prevNumber >= 10000000) {
      setAnswer("ERR");
    } else {
      setNumber(value);
    }
  }
  function setNumber(value: string) {
    let number = "";
    if (inputItem === "prevNumber") {
      number = prevNumber.toString() + value;
      setPrevNumber(parseInt(number));
    } else {
      number = currentNumber.toString() + value;
      setCurrentNumber(parseInt(number));
    }
  }
  function setOperator(operator: string) {
    if (operator === "+") {
      if (prevNumber !== 0 && currentNumber !== 0) {
        calculate();
      }
      setInputOperator("+");
    } else if (operator === "-") {
      if (prevNumber !== 0 && currentNumber !== 0) {
        calculate();
      }
      setInputOperator("-");
    } else if (operator === "×") {
      if (prevNumber !== 0 && currentNumber !== 0) {
        calculate();
      }
      setInputOperator("×");
    } else if (operator === "÷") {
      if (prevNumber !== 0 && currentNumber !== 0) {
        calculate();
      }
      setInputOperator("÷");
    }
    setInputItem("currentNumber");
  }
  function calculate() {
    let result: number | string = 0;
    if (inputOperator === "+") {
      result = prevNumber + currentNumber;
    } else if (inputOperator === "-") {
      result = prevNumber - currentNumber;
    } else if (inputOperator === "×") {
      result = prevNumber * currentNumber;
    } else if (inputOperator === "÷") {
      result = prevNumber / currentNumber;
    }
    if (result >= 10000000) {
      result = "ERR";
    } else {
      setPrevNumber(result);
      setCurrentNumber(0);
    }
    setAnswer(result);
  }
  function clear() {
    if (currentNumber !== 0) {
      setCurrentNumber(0);
    } else if (inputOperator !== " ") {
      setInputOperator(" ");
    } else {
      setPrevNumber(0);
      setInputItem("prevNumber");
    }
  }
  function allClear() {
    setCurrentNumber(0);
    setInputOperator(" ");
    setPrevNumber(0);
    setAnswer(0);
    setInputItem("prevNumber");
  }
  return (
    <div className="App">
      {numbers.map((number) => (
        <li>
          <button onClick={() => onClickHandler(number)}>{number}</button>
        </li>
      ))}
      {operators.map((operator) => (
        <li>
          <button onClick={() => setOperator(operator)}>{operator}</button>
        </li>
      ))}
      <button onClick={() => calculate()}>=</button>
      <button onClick={() => clear()}>C</button>
      <button onClick={() => allClear()}>AC</button>
      <p>
        {prevNumber}
        {inputOperator}
        {currentNumber}
      </p>
      <p>answer: {answer}</p>
    </div>
  );
};
export default App;
