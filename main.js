/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sass/_base.scss":
/*!*****************************!*\
  !*** ./src/sass/_base.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/_base.scss */ "./src/sass/_base.scss");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var period;
var sum;
var first;
var total;
var month;
function rangeInputValue() {
  var parentOfInputs = document.querySelectorAll('.leasing_calc');
  var rangeInputs = document.querySelectorAll('.leasing_calc-range');
  rangeInputs.forEach(function (item) {
    item.style.setProperty('--value', item.value);
    item.style.setProperty('--min', item.min == '' ? '0' : item.min);
    item.style.setProperty('--max', item.max == '' ? '100' : item.max);
  });
  parentOfInputs.forEach(function (parent) {
    var rangeInput = parent.querySelector('.leasing_calc-range');
    var textInput = parent.querySelector('.leasing_calc-cost-value');
    rangeInput.addEventListener('input', function (event) {
      if (parent.id === 'firstPay') {
        textInput.value = joinSpace(Math.round(parseInt(sum) / 100 * parseInt(rangeInput.value)));
        event.target.style.setProperty('--value', event.target.value);
        parent.querySelector('.highlight').innerHTML = rangeInput.value + '%';
      } else {
        textInput.value = joinSpace(event.target.value);
        event.target.style.setProperty('--value', event.target.value);
      }
    });
    textInput.addEventListener('input', function (event) {
      var prev_value = "";
      event.target.value = event.target.value.replace(/[^\d\s]/g, "");
      if (prev_value == event.target.value) {
        return;
      } else {
        prev_value = event.target.value;
        if (parent.id === 'firstPay') {
          var percent = percentOfValue(removeSpace(event.target.value));
          rangeInput.value = percent;
          event.target.value = joinSpace(event.target.value);
          rangeInput.style.setProperty('--value', percent);
          if (percentOfValue(removeSpace(event.target.value)) < rangeInput.min) return parent.querySelector('.highlight').innerHTML = rangeInput.min + '%';else if (percentOfValue(removeSpace(event.target.value)) > rangeInput.max) return parent.querySelector('.highlight').innerHTML = rangeInput.max + '%';else parent.querySelector('.highlight').innerHTML = Math.round(percentOfValue(removeSpace(event.target.value))) + '%';
        } else {
          rangeInput.value = removeSpace(event.target.value);
          event.target.value = joinSpace(event.target.value);
          rangeInput.style.setProperty('--value', removeSpace(event.target.value));
        }
      }
    });
    textInput.addEventListener('change', function (event) {
      var target = parseInt(removeSpace(event.target.value));
      var min = parseInt(rangeInput.min);
      var max = parseInt(rangeInput.max);
      if (parent.id === 'firstPay') {
        if (target < sum * (min / 100)) {
          event.target.value = sum * (min / 100);
        } else if (target > sum * (max / 100)) {
          event.target.value = sum * (max / 100);
        }
      } else {
        if (target < min) {
          event.target.value = rangeInput.min;
        } else if (target > max) {
          event.target.value = rangeInput.max;
        }
      }
      whichOne(parent.id, event.target.value);
    });
    rangeInput.addEventListener('change', function (event) {
      whichOne(parent.id, parent.querySelector('.leasing_calc-cost-value').value);
      if (parent.id === 'carCost') {
        document.querySelector('#firstPay').querySelector('.leasing_calc-cost-value').value = joinSpace(Math.round(parseInt(sum) * 0.1));
        first = Math.round(parseInt(sum) * 0.1);
      }
    });
  });
}
function percentOfValue(num) {
  return parseInt(num) / sum * 100;
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
  calcEvenMonth(sum, first, period);
}
function calcEvenMonth(sum, first, period) {
  console.log(_typeof(sum), _typeof(first), _typeof(period));
  if (sum != 'undefined' && first != 'undefined' && period != 'undefined') {
    month = (sum - first) * (0.05 * Math.pow(1 + 0.05, period)) / (Math.pow(1 + 0.05, period) - 1);
    document.querySelector('#monthSum').innerHTML = joinSpace(Math.round(month) + '');
    totalSum(month);
  } else {
    document.querySelector('#monthSum').innerHTML = 'error';
  }
}
function totalSum(month) {
  total = parseFloat(first) + parseFloat(period) * parseFloat(month);
  document.querySelector('#totalSum').innerHTML = joinSpace(Math.round(total) + '');
}
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.leasing_calc-cost').forEach(function (inpt) {
    whichOne(inpt.parentNode.id, inpt.querySelector('.leasing_calc-cost-value').value);
    inpt.querySelector('.leasing_calc-cost-value').value = joinSpace(inpt.querySelector('.leasing_calc-cost-value').value + '');
  });
  rangeInputValue();
});
window.formSubmit = function (event) {
  event.preventDefault();
  event.target.querySelector('.leasing_btn').disabled = true;
  var data = {
    'Стоимость автомобиля': sum,
    'Первоначальный взнос': first,
    'Срок лизинга': period,
    'Сумма договора лизинга': total,
    'Ежемесячный платеж': month
  };
  setTimeout(function () {
    alert(JSON.stringify(data));
  }, 300);
};
})();

/******/ })()
;
//# sourceMappingURL=main.js.map