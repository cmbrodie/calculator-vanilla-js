//Utility Variables
let result = document.querySelector('p')
let numstring = '';
let symQueue = [];
let numQueue = [];


function calcCheck() {
    return (numQueue.length == 2 && symQueue.length == 1);
}
function calc() {
    console.log('entering calc')
    console.log(numQueue, numstring, symQueue)
    let str = numQueue[0] + symQueue[0] + numQueue[1];
    numstring = eval(str)

    numQueue = [];
    numQueue.push(numstring)


    console.log('leaving calc')
    console.log(numQueue, numstring, symQueue)
    return numstring

}
//button event handlers
function numberHandler(event) {
    if (result.innerText == '0' || (result.innerText in symObject)) {
        result.innerText = '';
    }
    result.innerText += event.target.innerText
    numstring += event.target.innerText
    console.log('in numberHandler')
    console.log(numQueue, numstring, symQueue)
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
let symObject = {
    '÷': divide,
    '×': multiply,
    '−': subtract,
    '+': plus,
}
function symbolHandler(event) {

    let sym = event.target.innerText;

    symObject[sym]();
}


document.querySelector('main')
    .addEventListener('click', (event) => {
        if (event.target.id == 'equals') {
            if (numstring && symQueue.length == 1) {
                numQueue.push(numstring)
            }
            if (calcCheck()) {
                nums = calc();
                result.innerText = nums;
                numstring = '';
                symQueue = [];
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
            console.log('sym pressed')
            console.log(numQueue, numstring, symQueue)
            console.log(calcCheck())
            if (numQueue.length == 1 && numstring && symQueue.length == 1) {
                numQueue.push(numstring)
                nums = calc();
                // result.innerText = nums;
                result.innerText = event.target.innerText;
                // result.innerText = 0;
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
            console.log('after symfunction')
            console.log(numQueue, numstring, symQueue)

        }

    })