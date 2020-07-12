const calculator = document.querySelector('.calculator');
const calcBtnArr = Array.from(document.querySelectorAll('.calculator__btn'));
const calcSreen = document.querySelector('.calculator__screen');
const calcError = document.querySelector('.calculator__error');
const calcOperators = ['/', '*', '-', '+', '.'];



function calcValidate(operator) {
    let val = calcSreen.value;

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
    calcSreen.value += value;
}

function calcClear() {
    calcSreen.value = '';
}

function calcClearLast() {
    calcSreen.value = calcSreen.value.slice(0, -1)
}

function calculate() {

    if (calcSreen.value == '') return false;

    try {
        calcSreen.value = eval(calcSreen.value);
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

function checkKeyPress(event) {

    calcSreen.focus();
    calcSreen.selectionStart = calcSreen.value.length;
    let key = event.key;

    if (numbersKeys.test(key) || operatorsKeys.test(key)) return;

    if (key == 'Enter' || key == '=') calculate();
    event.preventDefault();
}

calculator.onkeypress = (event) => checkKeyPress(event);