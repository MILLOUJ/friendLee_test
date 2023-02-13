
function rangeInputValue() {
    const parentOfInputs = document.querySelectorAll('.leasing_calc');

    parentOfInputs.forEach((parent) => {
        let rangeInput = parent.querySelector('.leasing_calc-range');
        let textInput = parent.querySelector('.leasing_calc-cost');
        rangeInput.addEventListener('input', (event) => {
            textInput.value = event.target.value;
        })
        textInput.addEventListener('input', (event) => {
            rangeInput.value = event.target.value;
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