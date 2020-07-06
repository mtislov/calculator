




const calcBtnArr = Array.from(document.querySelectorAll('.calculator__btn'));
const calcSreen = document.querySelector('.calculator__screen');
const calcOperators = ['/', '*', '-', '+', '.'];


function calcValidate (operator) {
    let val = calcSreen.value;

    if (val == '' && operator !== '-') return false;

    calcOperators.forEach(op => {
        if (op == val.slice(-1)) calcClearLast();

    });

    return true;
}

function addOperator(operator) {
    if ( calcValidate(operator) ) addValue(operator);
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

    calcSreen.value = eval(calcSreen.value);
    console.log(eval(calcSreen.value));
}