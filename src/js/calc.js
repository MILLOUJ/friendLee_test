// const firstPay = document.querySelector('#firstPay');
// const creditPeriod = document.querySelector('#creditPeriod');
// const carCost = document.querySelector('#carCost');
// const totalSum = document.querySelector('#totalSum');
// const monthSum = document.querySelector('#monthSum');



// function calculate() {
//     totalSum.innerHTML = firstPay + creditPeriod * monthSum;
//     // totalSum = firstPay + creditPeriod * monthSum;
//     monthSum = (carCost - firstPay) * (0.05 * Math.pow((1 + 0.05), creditPeriod)) / (Math.pow((1 + 0.05), creditPeriod) - 1)
// }
// // “Сумма договора лизинга” = Первоначальный взнос + Срок кредита в месяцах * Ежемесячный платеж от

// // Ежемесячный платеж от = (Стоимость автомобиля - Первоначальный взнос) * (0.05 * Math.pow((1 + 0.05), Срок кредита в месяцах) / (Math.pow((1 + 0.05), Срок кредита в месяцах) - 1)
// const btn = document.querySelector('.leasing_btn')
// const btnText = document.querySelector('.leasing_btn-text')

// btn.addEventListener('click', function (e) {
//     btnText.textContent = 'Отправлено'
//     this.disabled = true
// })
// calculate();