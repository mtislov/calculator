const calculator = document.querySelector('.calculator');
const calcBtns = Array.from(document.querySelectorAll('.calculator__btn'));
const calcScreen = document.querySelector('.calculator__screen');
const calcKeyBoard = document.querySelector('.calculator__keyboard');
const calcError = document.querySelector('.calculator__error');
const calcOperators = ['/', '*', '-', '+', '.'];


calcBtns.forEach(btn => {
    btn.onmousedown = (e) => e.preventDefault();
});


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

function checkKeyPress(event, isSreenFocused) {

    let key = event.key;
    calcScreen.focus();

    if (isSreenFocused && numbersKeys.test(key) || operatorsKeys.test(key)) {
        return;
    } else event.preventDefault();

    if (numbersKeys.test(key) && !isSreenFocused) addValue(key);
    if (operatorsKeys.test(key) && !isSreenFocused) addOperator(operator);

    if (key == 'Enter' || key == '=') calculate();

}

calculator.onkeypress = (e) => checkKeyPress(e);




