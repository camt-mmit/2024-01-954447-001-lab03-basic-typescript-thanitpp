'use strict';
document.addEventListener('DOMContentLoaded', function () {
    var inputComponents = Array.from(document.querySelectorAll('input[type="number"].app-elem-input'));
    var computeResult = function () {
        var result = inputComponents.reduce(function (sum, input) {
            var value = input.valueAsNumber;
            // Check if it's a number
            return sum + (isNaN(value) ? 0 : value);
        }, 0);
        var output = document.querySelector('output.app-elem-result');
        if (output !== null) {
            output.value = "".concat(result);
        }
        else {
            console.error('output.app-elem-result not found');
        }
    };
    inputComponents.forEach(function (input) {
        input.addEventListener('change', computeResult);
    });
    computeResult(); // Calculate initial value when page loads
});
