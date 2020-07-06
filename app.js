




const calcBtnArr = Array.from(document.querySelectorAll('.calculator__btn'));
const calcSreen = document.querySelector('.calculator__screen');

function addValue(value) {
    calcSreen.value += value;
}

function calcClear() {
    calcSreen.value = '';
}