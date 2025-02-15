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
        firstNumber = parseFloat(num1);
    }
    if (isInt(num2)) {
        secondNumber = parseInt(num2);
    }
    else {
        secondNumber = parseFloat(num2);
    }
    switch (operator) {
        case '+': return add(firstNumber, secondNumber);
        case '-': return subtract(firstNumber, secondNumber);
        case '/': return divide(firstNumber, secondNumber);
        case '*': return multiply(firstNumber, secondNumber);
        default: console.log('Unexpected selection made. Equals button prematurely pressed?');
    }

}

function storeEventData(value) {
    console.log(`event data value: ${value}`);
    console.log(typeof(value));
    const display = document.querySelector("div.display");
    if (!storedValues.operator) {
        storedValues.num1 += value;
        display.innerText = storedValues.num1;
        console.log(storedValues);
    }
    else {
        storedValues.num2 += value;
        display.innerText = storedValues.num2;
        console.log(storedValues);
    }
}

function populateDisplay(event) {
    if (event.type == 'click') {
        const btn = event.target;
        const val = btn.innerText;
        storeEventData(val);
    } else if (event.type == 'keydown') {
        storeEventData(event.key);
    }
}

function clearAll() {
    const display = document.querySelector("div.display");
    display.innerText = '';
    storedValues.num1 = '';
    storedValues.num2 = '';
    storedValues.operator = null;
    storedValues.prevResult = null;
}

function startOperation(e) {
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
    else if (!storedValues.num1) {
        console.log("operator clicked without num1 being entered, do nothing");
        return;
    }
    else {
        console.log("unhandled case in operator button event")
    }
    storedValues.operator = e.target.innerText;
    console.log("operator was selected");
    console.log(storedValues);
}

function startEqualsOperation() {
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
    
}

function calculatePercent() {
    console.log("percentage button clicked");
    console.log(storedValues);
    if (storedValues.num1 && !storedValues.num2) {
        storedValues.num1 = storedValues.num1 / 100;
        displayResult(storedValues.num1);
    }
    else if (storedValues.num1 && storedValues.num2) { 
        storedValues.num2 = storedValues.num2 / 100;
        displayResult(storedValues.num2);
    }
    else {
        console.log("unhandled case for percentage button");
    }
}

function changeSign() {
    if (!storedValues.num2) {
        storedValues.num1 = storedValues.num1 * -1;
        displayResult(storedValues.num1);
    }
    else {
        storedValues.num2 = storedValues.num2 * -1;
        displayResult(storedValues.num2);
    }
}

function insertDecimal(e) {
    if (!storedValues.operator) {
        if (storedValues.num1.indexOf('.') === -1) {
            console.log("no decimal in num1");
            populateDisplay(e);
        }
    } else {
        if (storedValues.num2.indexOf('.') === -1) {
            console.log("no decimal in num2");
            populateDisplay(e);
        } 
    }
}

function startDeletion() {
    if (!storedValues.operator && storedValues.num1) {
        let nums = storedValues.num1.toString().split('');
        nums.pop()
        let newNum = nums.join('');
        storedValues.num1 = newNum;
        displayResult(newNum);
    } else {
        let nums = storedValues.num2.toString().split('');
        nums.pop()
        let newNum = nums.join('');
        storedValues.num2 = newNum
        displayResult(newNum);
    }
}

function processKeyPress(event) {
    value = event.key;
    console.log(`KEY PRESS: ${value}`);
    console.log(typeof(value));
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let operators = ['+', '-', '/', '*'];
    let equalsSign = ['='];
    let back = ['Backspace'];
    if (nums.indexOf(value) !== -1) {
        console.log("key press is a number");
        populateDisplay(event);
    }
    else if (operators.indexOf(value) > -1) {
        startOperation(event);
    } else if (equalsSign.indexOf(value) > -1) {
        startEqualsOperation();
    } else if (back.indexOf(value) > -1) {
        startDeletion();
    }
}
// add event listeners to number buttons so they populate display
const btns = document.querySelectorAll("button.number");
btns.forEach((btn) => {
    btn.addEventListener("click", populateDisplay);
});

// add special event listener to clear button 
const clearBtn = document.querySelector("button.clear");
clearBtn.addEventListener("click", clearAll);

// add distinct event listener for operators
const operatorBtns = document.querySelectorAll("button.operator");
operatorBtns.forEach((btn) => {
    btn.addEventListener("click", startOperation)
});

// add event listener for equals sign that calls operate function
// and performs calculation
const equalBtn = document.querySelector("button.equals");
equalBtn.addEventListener("click", startEqualsOperation);

// TODO
// currently can't hit 'equals' and then 'percent'
// in other words can convert prevResult to percent
const percentageBtn = document.querySelector("button.percent");
percentageBtn.addEventListener("click", calculatePercent);

// event listener for +/- button
const signButton = document.querySelector("button.sign");
signButton.addEventListener("click", () => changeSign);

const decimalButton = document.querySelector("button.decimal");
decimalButton.addEventListener("click", insertDecimal);

const backButton = document.querySelector('button.back');
backButton.addEventListener("click", startDeletion);

// keyboard support
// trigger different function depending on the type of button
// that the key corresponds with
document.addEventListener("keydown", processKeyPress);

// TODO: make sure operator button does nothing without num1 being entered
