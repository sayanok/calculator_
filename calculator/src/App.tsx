import React, { useState } from "react";
import "./App.css";
const App: React.FC = () => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operators = ["+", "-", "×", "÷"];
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [prevNumber, setPrevNumber] = useState<number | null>(null);
  const [numberToDisplay, setNumberToDisplay] = useState<number | string>(0);
  const [prevNumberToDisplay, setPrevNumberToDisplay] = useState<number>(0);
  const [inputItem, setInputItem] = useState<"prevNumber" | "currentNumber">("prevNumber");
  const [inputOperator, setInputOperator] = useState<string>("");

  function onClickHandler(value: string) {
    if (numberToDisplay.toString().length > 7) {
      setNumberToDisplay("8桁以上は表示できないよ");
    } else {
      setNumber(value);
    }
  }

  function setNumber(value: string) {
    let number = "";
    if (inputItem === "prevNumber") {
      number = prevNumber ? prevNumber.toString() + value : value;
      setPrevNumber(parseInt(number));
      setNumberToDisplay(parseInt(number));
      setPrevNumberToDisplay(parseInt(number));
    } else {
      number = currentNumber ? currentNumber.toString() + value : value;
      setCurrentNumber(parseInt(number));
      setPrevNumberToDisplay(parseInt(number));
      setNumberToDisplay(parseInt(number));
    }
  }

  function setOperator(operator: string) {
    if (prevNumber && currentNumber) {
      calculate();
    } else {
      setInputOperator(operator);
    }
    setInputItem("currentNumber");
  }

  function calculate() {
    let result: number | string = 0;
    if (prevNumber && currentNumber) {
      if (inputOperator === "+") {
        result = prevNumber + currentNumber;
      } else if (inputOperator === "-") {
        result = prevNumber - currentNumber;
      } else if (inputOperator === "×") {
        result = prevNumber * currentNumber;
      } else if (inputOperator === "÷") {
        result = prevNumber / currentNumber;
      }

      if (result.toString().length > 7) {
        result = "8桁以上は表示できないよ!";
      } else {
        setPrevNumber(result);
        setCurrentNumber(0);
      }
      setNumberToDisplay(result);
    } else {
      setNumberToDisplay(prevNumberToDisplay);
    }
  }

  function clear() {
    if (currentNumber !== 0) {
      setCurrentNumber(null);
      setNumberToDisplay(prevNumber ? prevNumber : 0);
      setPrevNumberToDisplay(prevNumber ? prevNumber : 0);
    } else if (inputOperator !== "") {
      setInputOperator("");
      setNumberToDisplay(prevNumberToDisplay);
      setInputItem("prevNumber");
      setPrevNumber(prevNumberToDisplay!);
    } else {
      setPrevNumber(null);
      setPrevNumberToDisplay(currentNumber);
      setNumberToDisplay(0);
      setInputItem("prevNumber");
    }
  }

  function allClear() {
    setCurrentNumber(null);
    setInputOperator("");
    setPrevNumber(null);
    setNumberToDisplay(0);
    setPrevNumberToDisplay(0);
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
      <p>計算内容:{numberToDisplay}</p>
    </div>
  );
};
export default App;
