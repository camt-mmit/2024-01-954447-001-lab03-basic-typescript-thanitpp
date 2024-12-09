import { assignComponent as assignInputComponent } from './input-components.js';
function createComponent(template) {
    return template.content.cloneNode(true);
}
export function assignSectionComponent(globalContainer) {
    const sectionTemplate = document.querySelector('template.app-tmpl-section');
    if (!sectionTemplate) {
        console.error('Section template not found');
        return;
    }
    const updateSectionNumbersAndButtons = () => {
        const sections = [
            ...globalContainer.querySelectorAll('.app-cmp-section'),
        ];
        sections.forEach((section, index) => {
            // Update the section number
            const sectionNumberElement = section.querySelector('.section-number');
            if (sectionNumberElement) {
                sectionNumberElement.textContent = `Section ${index + 1}`;
            }
            // Enable or disable the "Remove Section" button
            const removeButton = section.querySelector('.app-cmd-remove-section');
            if (removeButton) {
                removeButton.disabled = sections.length === 1;
            }
        });
    };
    const addSection = () => {
        const sectionComponent = createComponent(sectionTemplate);
        // Add event delegation for remove section functionality
        sectionComponent.addEventListener('click', (event) => {
            const removeButton = event.target.closest('.app-cmd-remove-section');
            if (removeButton) {
                const sections = globalContainer.querySelectorAll('.app-cmp-section');
                // Prevent removing the last section
                if (sections.length > 1) {
                    const sectionToRemove = removeButton.closest('.app-cmp-section');
                    if (sectionToRemove) {
                        sectionToRemove.remove();
                        updateSectionNumbersAndButtons();
                    }
                }
            }
        });
        // Assign input management to the new section
        assignInputComponent(sectionComponent);
        globalContainer.appendChild(sectionComponent);
        updateSectionNumbersAndButtons();
    };
    // Ensure this listener is attached only once
    const addSectionButton = document.querySelector('.app-cmd-add-section');
    if (addSectionButton) {
        // Remove existing listeners to prevent multiple bindings
        const existingListeners = addSectionButton.eventListeners || [];
        existingListeners.forEach((listener) => {
            addSectionButton.removeEventListener('click', listener);
        });
        // Add new listener
        addSectionButton.addEventListener('click', addSection);
        addSectionButton.eventListeners = [addSection];
    }
    // Add an initial section if the container is empty
    if (globalContainer.children.length === 0) {
        addSection();
    }
    // Add event delegation to the global container for remove section
    globalContainer.addEventListener('click', (event) => {
        const removeButton = event.target.closest('.app-cmd-remove-section');
        if (removeButton) {
            const sections = globalContainer.querySelectorAll('.app-cmp-section');
            // Prevent removing the last section
            if (sections.length > 1) {
                const sectionToRemove = removeButton.closest('.app-cmp-section');
                if (sectionToRemove) {
                    sectionToRemove.remove();
                    updateSectionNumbersAndButtons();
                }
            }
        }
    });
}
// Ensure the function is called when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const globalContainer = document.querySelector('.app-sections-list');
    if (globalContainer) {
        assignSectionComponent(globalContainer);
    }
});