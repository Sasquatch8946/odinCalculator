let storedValues = { 
    num1: '',
    operator: null,
    num2: '',
    prevResult: null
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
    firstNumber = parseInt(num1);
    secondNumber = parseInt(num2);
    switch (operator) {
        case '+': return add(firstNumber, secondNumber);
        case '-': return subtract(firstNumber, num2);
        case '/': return divide(firstNumber, num2);
        case '*': return multiply(firstNumber, num2);
        default: throw('ERROR');
    }

}

function populateDisplay(event) {
    const btn = event.target;
    const display = document.querySelector("div.display");
    console.log(btn.innerText);
    display.innerText = btn.innerText;
    if (!storedValues.operator) {
        storedValues.num1 += btn.innerText;
        console.log(storedValues);
    }
    else {
        storedValues.num2 += btn.innerText;
        console.log(storedValues);
    }
}

// add event listeners to number buttons so they populate display
const btns = document.querySelectorAll("button.number");
btns.forEach((btn) => {
    console.log(`btn: ${btn.innerText}`)
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
    storedValues.operator = null;
});

// add distinct event listener for operators
const operatorBtns = document.querySelectorAll("button.operator");
operatorBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
    if (!storedValues.num1 && storedValues.operator && storedValues.prevResult) {
        storedValues.num1 = storedValues.prevResult
    }
    storedValues.operator = e.target.innerText;
    console.log("operator was selected");
    console.log(storedValues);
})});

// add event listener for equals sign that calls operate function
// and performs calculation
const equalBtn = document.querySelector("button.equals");
equalBtn.addEventListener("click", () => {
    const display = document.querySelector("div.display");
    let result = operate(storedValues.num1, storedValues.operator, storedValues.num2);
    display.innerText = result;
    storedValues.prevResult = result;
    console.log(storedValues);
    storedValues.num1 = ''
    storedValues.num2 = ''
});


