import "./sass/_base.scss";

let period;
let sum;
let first;
let total;
let month;

function rangeInputValue() {
    const parentOfInputs = document.querySelectorAll('.leasing_calc');
    const rangeInputs = document.querySelectorAll('.leasing_calc-range');

    rangeInputs.forEach((item) => {
        item.style.setProperty('--value', item.value);
        item.style.setProperty('--min', item.min == '' ? '0' : item.min);
        item.style.setProperty('--max', item.max == '' ? '100' : item.max);
    })
    parentOfInputs.forEach((parent) => {
        let rangeInput = parent.querySelector('.leasing_calc-range');
        let textInput = parent.querySelector('.leasing_calc-cost-value');
        rangeInput.addEventListener('input', (event) => {

            if (parent.id === 'firstPay') {
                textInput.value = joinSpace(Math.round((parseInt(sum) / 100) * parseInt(rangeInput.value)));
                event.target.style.setProperty('--value', event.target.value)
                parent.querySelector('.highlight').innerHTML = rangeInput.value + '%';
            } else {
                textInput.value = joinSpace(event.target.value);
                event.target.style.setProperty('--value', event.target.value)
            }
        })
        textInput.addEventListener('input', (event) => {
            let prev_value = "";
            event.target.value = event.target.value.replace(/[^\d\s]/g, "");

            if (prev_value == event.target.value) {
                return;
            } else {

                prev_value = event.target.value;
                if (parent.id === 'firstPay') {
                    let percent = percentOfValue(removeSpace(event.target.value));
                    rangeInput.value = percent;
                    event.target.value = joinSpace(event.target.value);
                    rangeInput.style.setProperty('--value', percent);
                    if (percentOfValue(removeSpace(event.target.value)) < rangeInput.min) return parent.querySelector('.highlight').innerHTML = rangeInput.min + '%';
                    else if (percentOfValue(removeSpace(event.target.value)) > rangeInput.max) return parent.querySelector('.highlight').innerHTML = rangeInput.max + '%';
                    else parent.querySelector('.highlight').innerHTML = Math.round(percentOfValue(removeSpace(event.target.value))) + '%';

                } else {
                    rangeInput.value = removeSpace(event.target.value);
                    event.target.value = joinSpace(event.target.value);
                    rangeInput.style.setProperty('--value', removeSpace(event.target.value));
                }

            }
        })
        textInput.addEventListener('change', (event) => {
            let target = parseInt(removeSpace(event.target.value));
            let min = parseInt(rangeInput.min);
            let max = parseInt(rangeInput.max);
            if (parent.id === 'firstPay') {
                if (target < sum * (min / 100)) {
                    event.target.value = sum * (min / 100);
                } else if (target > sum * (max / 100)) {
                    event.target.value = sum * (max / 100);
                }

            } else {
                if (target < min) {
                    event.target.value = rangeInput.min
                } else if (target > max) {
                    event.target.value = rangeInput.max
                }
            }

            whichOne(parent.id, event.target.value)
        })
        rangeInput.addEventListener('change', (event) => {
            whichOne(parent.id, parent.querySelector('.leasing_calc-cost-value').value);
            if (parent.id === 'carCost') {
                document.querySelector('#firstPay').querySelector('.leasing_calc-cost-value').value = joinSpace(Math.round(parseInt(sum) * 0.1));
                first = Math.round(parseInt(sum) * 0.1);
            }
        })
    })
}

function percentOfValue(num) {
    return (parseInt(num) / sum) * 100;
}

function joinSpace(str) {
    str = str + '';
    return str.replace(/[^\d]/g, "").split("").reverse().join("").replace(/\d{3}(?!$|(?:\s$))/g, "$& ").split("").reverse().join("");
}

function removeSpace(str) {
    return str.replace(/\s/g, "");
}

function whichOne(id, target) {

    switch (id) {
        case "carCost":
            sum = parseFloat(removeSpace(target));
            break;
        case "creditPeriod":
            period = parseFloat(removeSpace(target));
            break;
        case "firstPay":
            first = parseFloat(removeSpace(target));
            break;
    }
    calcEvenMonth(sum, first, period)
}

function calcEvenMonth(sum, first, period) {
    console.log(typeof sum, typeof first, typeof period)
    if (sum != 'undefined' && first != 'undefined' && period != 'undefined') {
        month = (sum - first) * (0.05 * Math.pow((1 + 0.05), period)) / (Math.pow((1 + 0.05), period) - 1);
        document.querySelector('#monthSum').innerHTML = joinSpace(Math.round(month) + '');
        totalSum(month)
    } else {
        document.querySelector('#monthSum').innerHTML = 'error';
    }
}

function totalSum(month) {
    total = parseFloat(first) + parseFloat(period) * parseFloat(month);
    document.querySelector('#totalSum').innerHTML = joinSpace(Math.round(total) + '');
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.leasing_calc-cost').forEach(inpt => {
        whichOne(inpt.parentNode.id, inpt.querySelector('.leasing_calc-cost-value').value)
        inpt.querySelector('.leasing_calc-cost-value').value = joinSpace(inpt.querySelector('.leasing_calc-cost-value').value + '')
    })
    rangeInputValue();
});

window.formSubmit = function (event) {
    event.preventDefault();
    event.target.querySelector('.leasing_btn').disabled = true;

    let data = {
        'Стоимость автомобиля': sum,
        'Первоначальный взнос': first,
        'Срок лизинга': period,
        'Сумма договора лизинга': total,
        'Ежемесячный платеж': month,
    }

    setTimeout(() => {
        alert(JSON.stringify(data))
    }, 300)

}
