//Utility Variables
let result = document.querySelector('p')
let numstring = '';
let symQueue = [];
let numQueue = [];


function calcCheck() {
    return (numQueue.length == 2 && symQueue.length == 1);
}
function calc() {

    let str = numQueue[0] + symQueue[0] + numQueue[1];
    numstring = String(eval(str))

    numQueue = [];
    numQueue.push(numstring)

    return numstring

}
//button event handlers
function numberHandler(event) {
    if (result.innerText == '0' || (result.innerText in symObject)) {
        result.innerText = '';
    }
    result.innerText += event.target.innerText
    numstring += event.target.innerText

}
function clear() {
    numstring = '';
    result.innerText = 0;
}
function backspace() {

    if (numQueue.length != 1 || numstring) {
        numstring = numstring.slice(0, -1)
        if (numstring.length > 0) {
            result.innerText = numstring
        }
        else {
            result.innerText = 0
        }
    }
}
function divide() {
    symQueue.push('/')

}
function multiply() {
    symQueue.push('*')
}
function plus() {
    symQueue.push('+')
}
function subtract() {
    symQueue.push('-')
}
let symObject = {
    '÷': divide,
    '×': multiply,
    '−': subtract,
    '+': plus,
}

function equals() {
    if (numstring && symQueue.length == 1) {

        numQueue.push(numstring)
        numstring = ''

    }
    if (calcCheck()) {
        nums = calc();
        result.innerText = nums;
        numstring = '';
        symQueue = [];

    }
}
function symbolHandler(event) {

    let sym = event.target.innerText;

    symObject[sym]();
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
        numQueue = []
        symQueue = []
    }
    if (event.target.innerText == '←') {
        backspace();
    }
    if (event.target.className.includes('symbol')) {

        if (numQueue.length == 1 && numstring && symQueue.length == 1) {
            numQueue.push(numstring)
            calc();
            result.innerText = event.target.innerText;

            numstring = '';
            symQueue = [];
            symbolHandler(event)
        }
        if (symQueue.length == 0) {
            if (numstring) {
                numQueue.push(numstring);
                clear();
                result.innerText = event.target.innerText;
                symbolHandler(event);
            }
            else if (numQueue.length == 1) {
                clear();
                result.innerText = event.target.innerText;
                symbolHandler(event);
            }

        }

    }
}




function init() {
    document.querySelector('main')
        .addEventListener('click', (event) => {
            buttonClick(event)


        })
}

init()