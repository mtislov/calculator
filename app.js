const calculator = document.querySelector('.calculator');
const calcBtns = Array.from(document.querySelectorAll('.calculator__btn'));
const calcSreen = document.querySelector('.calculator__screen');
const calcKeyBoard = document.querySelector('.calculator__keyboard');
const calcError = document.querySelector('.calculator__error');
const calcOperators = ['/', '*', '-', '+', '.'];


calcBtns.forEach(btn => {
    btn.onmousedown = (e) => e.preventDefault();
});


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
    calcSreen.setRangeText(value, calcSreen.selectionStart, calcSreen.selectionEnd, "end");
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

function checkKeyPress(event, isSreenFocused) {

    let key = event.key;
    calcSreen.focus();

    if (isSreenFocused && numbersKeys.test(key) || operatorsKeys.test(key)) {
        return;
    } else event.preventDefault();

    if (numbersKeys.test(key) && !isSreenFocused) addValue(key);
    if (operatorsKeys.test(key) && !isSreenFocused) addOperator(operator);

    if (key == 'Enter' || key == '=') calculate();

}

calcKeyBoard.onkeypress = (e) => checkKeyPress(e);
calcSreen.onkeypress = (e) => checkKeyPress(e, true);







// check https://learn.javascript.ru/selection-range#primer-vstavka-na-meste-kursora