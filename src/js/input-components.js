'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.assignComponent = assignComponent;
function createComponent(template) {
  var clonedContent = template.content.cloneNode(true);
  return clonedContent.firstElementChild;
}
function assignComponent(element) {
  var _a;
  var template = element.querySelector('template.app-tmpl-input');
  var container = element.querySelector('.app-cmp-inputs-list');
  if (!template || !container) {
    console.error('Required elements not found:', {
      template: template,
      container: container,
    });
    return;
  }
  var updateInputComponents = function () {
    Array.from(container.querySelectorAll('.app-cmp-input')).forEach(
      function (component, index) {
        component
          .querySelectorAll('.app-elem-title-no')
          .forEach(function (titleNo) {
            titleNo.textContent = ''.concat(index + 1);
          });
        component
          .querySelectorAll('.app-cmd-remove-input')
          .forEach(function (button) {
            button.disabled =
              container.querySelectorAll('.app-cmp-input').length === 1;
          });
      },
    );
  };
  var calculateResult = function () {
    var inputs = container.querySelectorAll(
      'input[type="number"].app-elem-input',
    );
    if (!inputs.length) {
      console.warn('No inputs found');
      return;
    }
    var result = Array.from(inputs).reduce(function (sum, input) {
      var _a;
      return (
        sum + ((_a = input.valueAsNumber) !== null && _a !== void 0 ? _a : 0)
      );
    }, 0);
    console.log('Calculated result:', result);
    var outputs = element.querySelectorAll('output.app-elem-result');
    if (!outputs.length) {
      console.error('No outputs found');
      return;
    }
    outputs.forEach(function (output) {
      return (output.value = result.toLocaleString());
    });
  };
  var appendInputComponent = function () {
    var inputComponent = createComponent(template);
    var removeButton = inputComponent.querySelector('.app-cmd-remove-input');
    removeButton === null || removeButton === void 0 ?
      void 0
    : removeButton.addEventListener('click', function () {
        if (container.querySelectorAll('.app-cmp-input').length > 1) {
          inputComponent.remove();
          updateInputComponents();
          calculateResult();
        }
      });
    container.appendChild(inputComponent);
    updateInputComponents();
    calculateResult();
  };
  (_a = element.querySelector('.app-cmd-add-input')) === null || _a === void 0 ?
    void 0
  : _a.addEventListener('click', appendInputComponent);
  container.addEventListener('input', function (ev) {
    var target = ev.target;
    if (target.matches('input[type="number"].app-elem-input')) {
      calculateResult();
    }
  });
  appendInputComponent();
}
