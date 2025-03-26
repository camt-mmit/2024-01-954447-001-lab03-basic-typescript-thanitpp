'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.assignSectionComponent = assignSectionComponent;
var input_components_js_1 = require('./input-components.js');
function createComponent(template) {
  var clonedContent = template.content.cloneNode(true);
  return clonedContent.firstElementChild;
}
function assignSectionComponent(globalContainer) {
  var sectionTemplate = document.querySelector('template.app-tmpl-section');
  if (!sectionTemplate) {
    console.error('Section template not found');
    return;
  }
  var updateSectionNumbersAndButtons = function () {
    var sections = Array.from(
      globalContainer.querySelectorAll('.app-cmp-section'),
    );
    sections.forEach(function (section, index) {
      var sectionNumber = section.querySelector('.section-number');
      if (sectionNumber) {
        sectionNumber.textContent = 'Section '.concat(index + 1);
      } else {
        console.warn('Section number element not found in section', section);
      }
      var removeButton = section.querySelector('.app-cmd-remove-section');
      if (removeButton) {
        removeButton.disabled = sections.length === 1;
      } else {
        console.warn('Remove button not found in section', section);
      }
    });
  };
  var addSection = function () {
    var sectionComponent = createComponent(sectionTemplate);
    (0, input_components_js_1.assignComponent)(sectionComponent);
    sectionComponent.addEventListener('click', function (event) {
      var _a;
      var removeButton = event.target.closest('.app-cmd-remove-section');
      if (
        removeButton &&
        globalContainer.querySelectorAll('.app-cmp-section').length > 1
      ) {
        (
          (_a = removeButton.closest('.app-cmp-section')) === null ||
          _a === void 0
        ) ?
          void 0
        : _a.remove();
        updateSectionNumbersAndButtons();
      }
    });
    globalContainer.appendChild(sectionComponent);
    updateSectionNumbersAndButtons();
  };
  var addSectionButton = document.querySelector('.app-cmd-add-section');
  if (addSectionButton) {
    var controller = new AbortController();
    addSectionButton.addEventListener('click', addSection, {
      signal: controller.signal,
    });
  }
  globalContainer.addEventListener('click', function (event) {
    var _a;
    var removeButton = event.target.closest('.app-cmd-remove-section');
    if (
      removeButton &&
      globalContainer.querySelectorAll('.app-cmp-section').length > 1
    ) {
      (
        (_a = removeButton.closest('.app-cmp-section')) === null ||
        _a === void 0
      ) ?
        void 0
      : _a.remove();
      updateSectionNumbersAndButtons();
    }
  });
  if (!globalContainer.querySelector('.app-cmp-section')) {
    addSection();
  }
}
document.addEventListener('DOMContentLoaded', function () {
  var globalContainer = document.querySelector('.app-sections-list');
  if (globalContainer) assignSectionComponent(globalContainer);
});
