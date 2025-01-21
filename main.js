let storedValues = { 
    num1: '',
    operator: null,
    num2: '',
    prevResult: null
}

function resetValues() { 
    storedValues.num1 = '';
    storedValues.operator = null;
    storedValues.num2 = '';
}

function isDivisionByZero() { 
    if (storedValues.operator == '/' && storedValues.num2 == 0) {
        return true;
    }
    else {
        return false;
    }
}
function isInt(num) {
    return num % 1 === 0;
}

function displayResult(result) {
    const display = document.querySelector("div.display");
    display.innerText = result;
}

function calculate() { 
    let result = operate(storedValues.num1, storedValues.operator, storedValues.num2);
    storedValues.prevResult = result;
    displayResult(result);
    storedValues.num1 = '';
    storedValues.num2 = '';
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) { 
    if (isInt(num1)) {
        firstNumber = parseInt(num1);
    }
    else {
        firstNumber = num1;
    }
    if (isInt(num2)) {
        secondNumber = parseInt(num2);
    }
    else {
        secondNumber = num2;
    }
    switch (operator) {
        case '+': return add(firstNumber, secondNumber);
        case '-': return subtract(firstNumber, secondNumber);
        case '/': return divide(firstNumber, secondNumber);
        case '*': return multiply(firstNumber, secondNumber);
        default: console.log('Unexpected selection made. Equals button prematurely pressed?');
    }

}

function populateDisplay(event) {
    const btn = event.target;
    const display = document.querySelector("div.display");
    console.log(btn.innerText);
    if (!storedValues.operator) {
        storedValues.num1 += btn.innerText;
        display.innerText = storedValues.num1;
        console.log(storedValues);
    }
    else {
        storedValues.num2 += btn.innerText;
        display.innerText = storedValues.num2;
        console.log(storedValues);
    }
}

// add event listeners to number buttons so they populate display
const btns = document.querySelectorAll("button.number");
btns.forEach((btn) => {
    btn.addEventListener("click", populateDisplay);
});

// add special event listener to clear button 
const clearBtn = document.querySelector("button.clear");
clearBtn.addEventListener("click", () => {
    const display = document.querySelector("div.display");
    display.innerText = '';
    storedValues.num1 = '';
    storedValues.num2 = '';
    storedValues.operator = null;
    storedValues.prevResult = null;
});

// add distinct event listener for operators
const operatorBtns = document.querySelectorAll("button.operator");
operatorBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
    console.log(storedValues);
    // this if statement assumes that user previously used equals button
    // our event handler clears all vars except prevResult
    // so I want to be very specific here
    if (!storedValues.num1 && !storedValues.num2 && !storedValues.operator && storedValues.prevResult) {
        console.log("performing a calcuation on the previous result");
        storedValues.num1 = storedValues.prevResult
    }
    // this one assumes equals button was NOT used
    else if (storedValues.num1 && storedValues.num2) {
        console.log("previous calculation not finished");
        calculate();
    }
    // this assumes at least a second or nth iteration of the previous scenario
    // user keeps clicking operator without clicking equals sign
    // checking for num2 to allow users to change the operator
    else if (storedValues.operator && storedValues.prevResult && storedValues.num2) {
        console.log("calculating result of ongoing calculation");
        storedValues.num1 = storedValues.prevResult;
        calculate();
    }
    else {
        console.log("unhandled case in operator button event")
    }
    storedValues.operator = e.target.innerText;
    console.log("operator was selected");
    console.log(storedValues);
})});

// add event listener for equals sign that calls operate function
// and performs calculation
const equalBtn = document.querySelector("button.equals");
equalBtn.addEventListener("click", () => {
    if (!storedValues.num1 && storedValues.operator && storedValues.num2 && storedValues.prevResult) {
        console.log("making the previous result the first number");
        storedValues.num1 = storedValues.prevResult;
    } else if (!storedValues.operator && !storedValues.num2) {
        console.log("operator and second number not given; cannot calculate");
        return;
    } else if (!storedValues.num2) { 
        console.log("operator selected but no second number; cannot calulate");
        return;
    }

    if (isDivisionByZero()) {
        displayResult("YOU CAN'T DO THAT >:(");
        resetValues();
    } else {
        calculate();
        storedValues.operator = null;
    }
    
});

const percentageBtn = document.querySelector("button.percent");
percentageBtn.addEventListener("click", () => {
    console.log("percentage button clicked");
    console.log(storedValues);
    if (storedValues.num1 && !storedValues.num2) {
        storedValues.num1 = parseInt(storedValues.num1) / 100;
        displayResult(storedValues.num1);
    }
    else if (storedValues.num1 && storedValues.num2) { 
        storedValues.num2 = parseInt(storedValues.num2) / 100;
        displayResult(storedValues.num2);
    }
    else {
        console.log("unhandled case for percentage button");
    }
});

// event listener for +/- button
const signButton = document.querySelector("button.sign");
signButton.addEventListener("click", () => {
    if (!storedValues.num2) {
        storedValues.num1 = storedValues.num1 * -1;
        displayResult(storedValues.num1);
    }
    else {
        storedValues.num2 = storedValues.num2 * -1;
        displayResult(storedValues.num2);
    }
});



