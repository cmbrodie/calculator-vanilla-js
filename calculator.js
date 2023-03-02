//Utility Variables
let display = document.querySelector('p')
let numberString = '';
let symbolQueue = [];
let numberQueue = [];
let mathSymbols = {
    '÷': '/',
    '×': '*',
    '−': '-',
    '+': '+',
}

function isValidCalc() {
    return (numberQueue.length == 2 && symbolQueue.length == 1);
}
function calc() {

    let str = numberQueue[0] + symbolQueue[0] + numberQueue[1];
    result = String(eval(str))

    numberQueue = [];
    numberQueue.push(result)

    return result

}

function numberHandler(event) {
    if (display.innerText == '0' || (display.innerText in mathSymbols)) {
        updateDisplay('');
    }
    display.innerText += event.target.innerText
    numberString = display.innerText

}
function clear() {
    numberString = '0';
    updateDisplay(0);
}
function backspace() {

    if (numberQueue.length != 1 || numberString) {
        numberString = numberString.slice(0, -1)
        if (numberString.length > 0) {
            updateDisplay(numberString)
        }
        else {
            updateDisplay(0)
        }
    }
}
function symbolPush(symbol) {
    symbolQueue.push(symbol)
}


function equals() {
    if (numberString && symbolQueue.length == 1) {

        numberQueue.push(numberString)
        numberString = ''

    }
    if (isValidCalc()) {
        nums = calc();
        updateDisplay(nums)
        numberString = '';
        symbolQueue = [];

    }
}
function parseSymbol(event) {

    let symbol = event.target.innerText;

    return mathSymbols[symbol];
}
function updateDisplay(value) {
    display.innerText = value;
}
function symbolHandler(event) {
    let symbol = event.target.innerText
    if (numberQueue.length == 1 && numberString && symbolQueue.length == 1) {
        // commitExpression()
        numberQueue.push(numberString)
        calc();
        updateDisplay(symbol)

        numberString = '';
        symbolQueue = [];
        validSymbol = parseSymbol(event);
        symbolPush(validSymbol)
    }
    else if (symbolQueue.length == 0) {
        if (numberQueue.length == 1 && numberString) {
            numberQueue = [];
            numberQueue.push(numberString);
            clear();
            updateDisplay(symbol)
            validSymbol = parseSymbol(event);
            symbolPush(validSymbol)
        }
        else if (numberString) {
            numberQueue.push(numberString);
            clear();
            updateDisplay(symbol)
            validSymbol = parseSymbol(event);
            symbolPush(validSymbol)
        }
        else if (numberQueue.length == 1) {
            clear();
            updateDisplay(symbol)
            validSymbol = parseSymbol(event);
            symbolPush(validSymbol)
        }

    }
}

function buttonClick(event) {
    if (event.target.id == 'equals') {
        equals();

    }
    if (event.target.className == 'number') {

        numberHandler(event);
    }
    if (event.target.innerText == 'C') {
        clear();
        numberQueue = []
        symbolQueue = []
    }
    if (event.target.innerText == '←') {
        backspace();
    }
    if (event.target.className.includes('symbol')) {
        symbolHandler(event)

    }
}


function init() {
    document.querySelector('main')
        .addEventListener('click', (event) => {
            buttonClick(event)


        })
}

init()