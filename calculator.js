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
    result.innerText = eval(str);
    numstring = result.innerText

    numQueue = [];
    numQueue.push(numstring)
    symQueue = [];
    console.log(numQueue)

}
//button event handlers
function numberHandler(event) {
    if (result.innerText == '0') {
        result.innerText = '';
    }
    result.innerText += event.target.innerText
    numstring += event.target.innerText
    if (calcCheck()) {
        calc();
    }
}
function clear() {
    numstring = '';
    result.innerText = 0;
}
function backspace() {
    numstring = numstring.slice(0, -1)
    if (numstring.length > 0) {
        result.innerText = numstring
    }
    else {
        result.innerText = 0
    }
    numQueue[numQueue.length - 1] = numstring
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
function symbolHandler(event) {

    let sym = event.target.innerText;
    let symObject = {
        '÷': divide,
        '×': multiply,
        '−': subtract,
        '+': plus,
    }
    symObject[sym]();
}


document.querySelector('main')
    .addEventListener('click', (event) => {
        if (event.target.id == 'equals') {
            if (numstring && symQueue.length == 1) {
                let n = numstring
                numQueue.push(n)
            }
            if (calcCheck()) {
                calc();

            }
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
            if (numstring) {
                if (numQueue.length == 0) {
                    let num = numstring;
                    numQueue.push(num);
                }
                clear();
                symbolHandler(event);
            }

        }

    })