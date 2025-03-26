import { assignComponent as assignInputComponent } from './input-components.js';

function createComponent(template: HTMLTemplateElement): HTMLElement {
  const clonedContent = template.content.cloneNode(true) as DocumentFragment;
  return clonedContent.firstElementChild as HTMLElement;
}

export function assignSectionComponent(globalContainer: HTMLElement): void {
  const sectionTemplate = document.querySelector<HTMLTemplateElement>(
    'template.app-tmpl-section',
  );
  if (!sectionTemplate) {
    console.error('Section template not found');
    return;
  }

  const updateSectionNumbersAndButtons = (): void => {
    const sections = Array.from(
      globalContainer.querySelectorAll<HTMLElement>('.app-cmp-section'),
    );
    sections.forEach((section, index) => {
      const sectionNumber =
        section.querySelector<HTMLElement>('.section-number');
      if (sectionNumber) {
        sectionNumber.textContent = `Section ${index + 1}`;
      } else {
        console.warn('Section number element not found in section', section);
      }

      const removeButton = section.querySelector<HTMLButtonElement>(
        '.app-cmd-remove-section',
      );
      if (removeButton) {
        removeButton.disabled = sections.length === 1;
      } else {
        console.warn('Remove button not found in section', section);
      }
    });
  };

  const addSection = (): void => {
    const sectionComponent = createComponent(sectionTemplate);
    assignInputComponent(sectionComponent);

    sectionComponent.addEventListener('click', (event) => {
      const removeButton = (event.target as HTMLElement).closest(
        '.app-cmd-remove-section',
      );
      if (
        removeButton &&
        globalContainer.querySelectorAll('.app-cmp-section').length > 1
      ) {
        removeButton.closest('.app-cmp-section')?.remove();
        updateSectionNumbersAndButtons();
      }
    });

    globalContainer.appendChild(sectionComponent);
    updateSectionNumbersAndButtons();
  };

  const addSectionButton = document.querySelector<HTMLButtonElement>(
    '.app-cmd-add-section',
  );
  if (addSectionButton) {
    const controller = new AbortController();
    addSectionButton.addEventListener('click', addSection, {
      signal: controller.signal,
    });
  }

  globalContainer.addEventListener('click', (event) => {
    const removeButton = (event.target as HTMLElement).closest(
      '.app-cmd-remove-section',
    );
    if (
      removeButton &&
      globalContainer.querySelectorAll('.app-cmp-section').length > 1
    ) {
      removeButton.closest('.app-cmp-section')?.remove();
      updateSectionNumbersAndButtons();
    }
  });

  if (!globalContainer.querySelector('.app-cmp-section')) {
    addSection();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const globalContainer =
    document.querySelector<HTMLElement>('.app-sections-list');

  if (globalContainer) assignSectionComponent(globalContainer);
});
