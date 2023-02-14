
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
            textInput.value = event.target.value;
            event.target.style.setProperty('--value', event.target.value)
        })
        textInput.addEventListener('input', (event) => {
            rangeInput.value = event.target.value;
            document.querySelector('.leasing_calc-cost-hint').value = event.target.value;
        })
        textInput.addEventListener('change', (event) => {
            let target = parseInt(event.target.value);
            let min = parseInt(rangeInput.min);
            let max = parseInt(rangeInput.max);
            if (target < min) {
                event.target.value = rangeInput.min
            } else if (target > max) {
                event.target.value = rangeInput.max
            }
        })
    })
}
  
rangeInputValue()