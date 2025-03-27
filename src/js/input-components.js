"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignComponent = assignComponent;
function createComponent(template) {
    return template.content.cloneNode(true).firstElementChild;
}
function assignComponent(element) {
    var template = element.querySelector('template.app-tmpl-input');
    if (!template) {
        console.error('Input template not found');
        return;
    }
    var container = element.querySelector('.app-cmp-inputs-list');
    if (!container) {
        console.error('Input container not found');
        return;
    }
    var updateInputComponents = function () {
        var inputComponents = __spreadArray([], container.querySelectorAll('.app-cmp-input'), true);
        inputComponents.forEach(function (component, index) {
            var titleNoElements = component.querySelectorAll('.app-elem-title-no');
            titleNoElements.forEach(function (titleNo) {
                titleNo.textContent = "".concat(index + 1);
            });
            var removeButtons = component.querySelectorAll('.app-cmd-remove-input');
            removeButtons.forEach(function (cmdRemoveInput) {
                cmdRemoveInput.disabled = inputComponents.length === 1;
            });
        });
    };
    var calculateResult = function () {
        var _a;
        var inputs = __spreadArray([], container.querySelectorAll('input[type="number"].app-elem-input'), true);
        console.log("Found ".concat(inputs.length, " input(s) for calculation."));
        if (inputs.length === 0) {
            console.warn('No input elements found for calculation.');
            return;
        }
        var result = inputs.reduce(function (sum, element) {
            var value = element.valueAsNumber;
            console.log("Processing input value: ".concat(value));
            return sum + (isNaN(value) ? 0 : value);
        }, 0);
        console.log("Calculated result: ".concat(result));
        var resultOutputs = ((_a = container
            .closest('.app-cmp-section')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('output.app-elem-result')) || [];
        if (resultOutputs.length === 0) {
            console.error('No output elements found for displaying the result.');
            return;
        }
        resultOutputs.forEach(function (output) {
            output.value = result.toLocaleString();
        });
    };
    var appendInputComponent = function () {
        var inputComponent = createComponent(template);
        var removeButton = inputComponent.querySelector('.app-cmd-remove-input');
        if (removeButton) {
            removeButton.addEventListener('click', function () {
                var currentInputs = container.querySelectorAll('.app-cmp-input');
                if (currentInputs.length > 1) {
                    inputComponent.remove();
                    updateInputComponents();
                    calculateResult();
                }
            });
        }
        container.appendChild(inputComponent);
        updateInputComponents();
        calculateResult();
    };
    var addInputButton = element.querySelector('.app-cmd-add-input');
    if (addInputButton) {
        addInputButton.addEventListener('click', appendInputComponent);
    }
    container.addEventListener('input', function (ev) {
        var target = ev.target;
        if (target && target.matches('input[type="number"].app-elem-input')) {
            calculateResult();
        }
    });
    appendInputComponent();
}
