const calculator = document.querySelector('.calculator');
const calcBtns = Array.from(document.querySelectorAll('.calculator__btn'));
const calcScreen = document.querySelector('.calculator__screen');
const calcKeyBoard = document.querySelector('.calculator__keyboard');
const calcError = document.querySelector('.calculator__error');
const calcOperators = ['/', '*', '-', '+', '.'];


function calcValidate(operator) {
    let val = calcScreen.value;

    if (val == '' && operator !== '-') return false;

    calcOperators.forEach(op => {
        if (op == val.slice(-1)) calcClearLast();
    });

    return true;
}

function addOperator(operator) {
    if (calcValidate(operator)) addValue(operator);
}

function addValue(value) {
    calcScreen.focus();
    calcScreen.setRangeText(value, calcScreen.selectionStart, calcScreen.selectionEnd, "end");
}

function calcClear() {
    calcScreen.value = '';
}

function calcClearLast() {
    calcScreen.value = calcScreen.value.slice(0, -1)
}

function calculate() {
    if (calcScreen.value == '') return false;

    try {
        calcScreen.value = eval(calcScreen.value);
    } catch {
        showError();
    }
}

function showError() {
    calcError.style.display = 'block';
    setTimeout(() => {
        calcError.style.display = 'none';
    }, 3000);
}

const numbersKeys = /['0-9']/;
const operatorsKeys = /['+', '*', '(', ')', '/', '.' ^\s -]/;

function checkKeyPress(e) {
    e.preventDefault();
    let key = e.key;
    
    if (numbersKeys.test(key)) addValue(key)
    else if (operatorsKeys.test(key)) addOperator(key)
    else if (key == 'Enter' || key == '=') calculate();
    
}

calcScreen.onkeypress = (e) => checkKeyPress(e); 

calcBtns.forEach(btn => {
    btn.onmousedown = (e) => e.preventDefault();
});