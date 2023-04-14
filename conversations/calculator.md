Can you use html, javascript and css to create a calculator similar to the one in Windows? It must support the standart arithmetic functions.

**ChatGPT4**

Yes, you can create a calculator similar to the one in Windows using HTML, CSS, and JavaScript. Here's a basic example with standard arithmetic functions (addition, subtraction, multiplication, and division):

1.  HTML: Create the structure of the calculator.

```
htmlCopy code<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="calculator">
        <input type="text" class="display" readonly>
        <div class="buttons">
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>/</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>*</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>-</button>
            <button>0</button>
            <button>.</button>
            <button>C</button>
            <button>+</button>
        </div>
        <button class="equal">=</button>
    </div>
    <script src="scripts.js"></script>
</body>
</html>

```

2.  CSS: Style the calculator to make it look like the one in Windows.

```
cssCopy codebody {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.calculator {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    display: inline-grid;
    grid-template-rows: auto 1fr auto;
    gap: 5px;
    padding: 10px;
}

.display {
    width: 100%;
    height: 40px;
    text-align: right;
    padding-right: 5px;
    font-size: 24px;
    outline: none;
    border: 1px solid #ccc;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
}

button {
    border: none;
    background-color: #eee;
    font-size: 18px;
    padding: 0;
    height: 40px;
    cursor: pointer;
}

button:hover {
    background-color: #ddd;
}

.equal {
    grid-column: 1 / -1;
    background-color: #4CAF50;
    color: #fff;
}

.equal:hover {
    background-color: #45a049;
}

```

3.  JavaScript: Add functionality to perform calculations.

```
javascriptCopy codeconst display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");
const equal = document.querySelector(".equal");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "C") {
            display.value = "";
        } else {
            display.value += button.textContent;
        }
    });
});

equal.addEventListener("click", () => {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
});

```

This code will create a basic calculator that supports standard arithmetic operations. Note that using `eval()` for calculations can be dangerous if not handled properly.

**Georgi**

Can you use separate javascript functions for each opearation insted of eval?

**ChatGPT4**

Certainly! Here's an updated version of the JavaScript code using separate functions for each operation instead of `eval()`:

```
javascriptCopy codeconst display = document.querySelector('.display');
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

  const secondOperand = parseFloat(display.value);
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
        display.value = '';
      } else {
        currentOperator = content;
      }
    } else {
      display.value += content;
    }
  });
});

equal.addEventListener('click', calculate);

```

This version of the code uses separate functions for each arithmetic operation and handles button clicks accordingly. When an operator button is clicked, it saves the first operand and the operator. Then, when the equal button is clicked, it performs the corresponding operation and displays the result.

**Georgi**

There is a problem, when I click on the operations button nothing is written. Only numbers are displayed.

**ChatGPT4**

Apologies for the confusion. I misunderstood your requirements. If you want to display the operator in the input field as well, you can modify the button click event listener like this:

```
javascriptCopy codebuttons.forEach((button) => {
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

```

Now, the operator will be displayed in the input field when you click on an operation button. Keep in mind that this change will also require updating the `calculate()` function since the display value now contains the operator as well. You can use the following updated `calculate()` function:

```
javascriptCopy codefunction calculate() {
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

```

With these changes, the calculator will display the operator in the input field and perform calculations accordingly.
