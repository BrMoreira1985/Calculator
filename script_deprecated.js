const numButtons = document.querySelectorAll("[bNumber]");
const opButtons = document.querySelectorAll("[bOperator]");
const clearButton = document.querySelector("[bClear]");
const equalButton = document.querySelector("[bEqual]");
const delButton = document.querySelector("[bDel]");
const mainDisplayText = document.querySelector("[mainDisplay]");
const secDisplayText = document.querySelector("[secDisplay]");

class Calculator {
  constructor(mainDisplayText, secDisplayText) {
    this.mainDisplayText = mainDisplayText;
    this.secDisplayText = secDisplayText;
    this.clear();
  }

  calculate() {
    let result;

    const _mainDisplay = parseFloat(this.mainDisplay);
  }
  pickOperation(operation) {
    if (this.mainDisplay != "") {
      this.calculate();
    }

    this.operation = operation;
    this.mainDisplay = `${this.mainDisplay}${this.operation}`;
  }

  appendNumber(number) {
    if (this.mainDisplay == "" && number == ".") this.mainDisplay = "0.";

    if (this.mainDisplay.includes(".") && number == ".") return;

    this.mainDisplay = `${this.mainDisplay}${number.toString()}`;
  }

  clear() {
    this.mainDisplay = "";
    this.secDisplay = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.mainDisplayText.innerText = this.mainDisplay;
    this.secDisplayText.innerText = this.secDisplay;
  }
}

const calculator = new Calculator(mainDisplayText, secDisplayText);

for (const numButton of numButtons) {
  numButton.addEventListener("click", () => {
    calculator.appendNumber(numButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of opButtons) {
  operationButton.addEventListener("click", () => {
    calculator.pickOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
