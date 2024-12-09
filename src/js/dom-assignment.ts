import { assignComponent as assignInputComponent } from './input-components.js';

function createComponent(template: HTMLTemplateElement): HTMLElement {
  return template.content.cloneNode(true) as HTMLElement;
}

export function assignSectionComponent(globalContainer: HTMLElement): void {
  const sectionTemplate = document.querySelector(
    'template.app-tmpl-section',
  ) as HTMLTemplateElement;

  if (!sectionTemplate) {
    console.error('Section template not found');
    return;
  }

  const updateSectionNumbersAndButtons = (): void => {
    const sections = [
      ...globalContainer.querySelectorAll<HTMLElement>('.app-cmp-section'),
    ];

    sections.forEach((section, index) => {
      // Update the section number
      const sectionNumberElement = section.querySelector('.section-number');
      if (sectionNumberElement) {
        sectionNumberElement.textContent = `Section ${index + 1}`;
      }

      // Enable or disable the "Remove Section" button
      const removeButton = section.querySelector(
        '.app-cmd-remove-section',
      ) as HTMLButtonElement;
      if (removeButton) {
        removeButton.disabled = sections.length === 1;
      }
    });
  };

  const addSection = (): void => {
    const sectionComponent = createComponent(sectionTemplate);

    // Add event delegation for remove section functionality
    sectionComponent.addEventListener('click', (event) => {
      const removeButton = (event.target as HTMLElement).closest(
        '.app-cmd-remove-section',
      );

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
    const existingListeners = (addSectionButton as any).eventListeners || [];
    existingListeners.forEach((listener: EventListener) => {
      addSectionButton.removeEventListener('click', listener);
    });

    // Add new listener
    addSectionButton.addEventListener('click', addSection);
    (addSectionButton as any).eventListeners = [addSection];
  }

  // Add event delegation to the global container for remove section
  globalContainer.addEventListener('click', (event) => {
    const removeButton = (event.target as HTMLElement).closest(
      '.app-cmd-remove-section',
    );

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

  // Check if there are any existing sections
  const existingSections = globalContainer.querySelectorAll('.app-cmp-section');

  // If no sections exist, add an initial section
  if (existingSections.length === 0) {
    addSection();
  }
}

// Ensure the function is called when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const globalContainer = document.querySelector('.app-sections-list');
  if (globalContainer) {
    assignSectionComponent(globalContainer as HTMLElement);
  }
});
