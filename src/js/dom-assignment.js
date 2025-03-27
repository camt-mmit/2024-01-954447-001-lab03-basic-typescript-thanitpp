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
exports.assignSectionComponent = assignSectionComponent;
var input_components_1 = require("./input-components");
// Original: return template.content.cloneNode(true).firstElementChild;
function createComponent(template) {
    return template.content.cloneNode(true).firstElementChild;
}
function assignSectionComponent(globalContainer) {
    var sectionTemplate = document.querySelector('template.app-tmpl-section');
    if (!sectionTemplate) {
        console.error('Section template not found');
        return;
    }
    var updateSectionNumbersAndButtons = function () {
        var sections = __spreadArray([], globalContainer.querySelectorAll('.app-cmp-section'), true);
        sections.forEach(function (section, index) {
            var sectionNumberElement = section.querySelector('.section-number');
            if (sectionNumberElement) {
                sectionNumberElement.textContent = "Section ".concat(index + 1);
            }
            var removeButton = section.querySelector('.app-cmd-remove-section');
            if (removeButton) {
                removeButton.disabled = sections.length === 1;
            }
        });
    };
    var addSection = function () {
        var sectionComponent = createComponent(sectionTemplate);
        sectionComponent.addEventListener('click', function (event) {
            var removeButton = event.target.closest('.app-cmd-remove-section');
            if (removeButton) {
                var sections = globalContainer.querySelectorAll('.app-cmp-section');
                if (sections.length > 1) {
                    var sectionToRemove = removeButton.closest('.app-cmp-section');
                    if (sectionToRemove) {
                        sectionToRemove.remove();
                        updateSectionNumbersAndButtons();
                    }
                }
            }
        });
        (0, input_components_1.assignComponent)(sectionComponent);
        globalContainer.appendChild(sectionComponent);
        updateSectionNumbersAndButtons();
    };
    var addSectionButton = document.querySelector('.app-cmd-add-section');
    if (addSectionButton) {
        addSectionButton.addEventListener('click', addSection);
    }
    globalContainer.addEventListener('click', function (event) {
        var removeButton = event.target.closest('.app-cmd-remove-section');
        if (removeButton) {
            var sections = globalContainer.querySelectorAll('.app-cmp-section');
            if (sections.length > 1) {
                var sectionToRemove = removeButton.closest('.app-cmp-section');
                if (sectionToRemove) {
                    sectionToRemove.remove();
                    updateSectionNumbersAndButtons();
                }
            }
        }
    });
    var existingSections = globalContainer.querySelectorAll('.app-cmp-section');
    if (existingSections.length === 0) {
        addSection();
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var globalContainer = document.querySelector('.app-sections-list');
    if (globalContainer) {
        assignSectionComponent(globalContainer);
    }
});
