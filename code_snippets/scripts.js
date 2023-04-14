const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');
const equal = document.querySelector('.equal');

let firstOperand = null;
let currentOperator = null;

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
};

function calculate() {
    if (firstOperand === null || currentOperator === null) return;
  
    const operatorIndex = display.value.indexOf(currentOperator);
    const secondOperand = parseFloat(display.value.slice(operatorIndex + 1));
    const operation = operations[currentOperator];
  
    if (!operation) return;
  
    const result = operation(firstOperand, secondOperand);
    display.value = result;
  
    firstOperand = null;
    currentOperator = null;
  }
  

buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const content = button.textContent;
  
      if (content === 'C') {
        display.value = '';
        firstOperand = null;
        currentOperator = null;
      } else if (content === '.') {
        if (!display.value.includes('.')) {
          display.value += '.';
        }
      } else if ('+-*/'.includes(content)) {
        if (firstOperand === null) {
          firstOperand = parseFloat(display.value);
          currentOperator = content;
          display.value += content;
        } else {
          currentOperator = content;
          display.value += content;
        }
      } else {
        display.value += content;
      }
    });
  });
  

equal.addEventListener('click', calculate);
