import { assignComponent as assignInputComponent } from './input-components';

// Original: return template.content.cloneNode(true).firstElementChild;
function createComponent(template: HTMLTemplateElement): Element | null {
  return (template.content.cloneNode(true) as Element).firstElementChild;
}

export function assignSectionComponent(globalContainer: HTMLElement): void {
  const sectionTemplate = document.querySelector(
    'template.app-tmpl-section',
  ) as HTMLTemplateElement | null;
  if (!sectionTemplate) {
    console.error('Section template not found');
    return;
  }

  const updateSectionNumbersAndButtons = (): void => {
    const sections = Array.from(
      globalContainer.querySelectorAll<HTMLElement>('.app-cmp-section'),
    );
    sections.forEach((section: HTMLElement, index: number) => {
      const sectionNumberElement = section.querySelector(
        '.section-number',
      ) as HTMLElement | null;
      if (sectionNumberElement) {
        sectionNumberElement.textContent = `Section ${index + 1}`;
      }

      const removeButton = section.querySelector(
        '.app-cmd-remove-section',
      ) as HTMLButtonElement | null;
      if (removeButton) {
        removeButton.disabled = sections.length === 1;
      }
    });
  };

  const addSection = (): void => {
    const sectionComponent = createComponent(sectionTemplate) as HTMLElement;

    sectionComponent.addEventListener('click', (event: Event) => {
      const removeButton = (event.target as Element).closest(
        '.app-cmd-remove-section',
      ) as HTMLButtonElement | null;
      if (removeButton) {
        const sections = globalContainer.querySelectorAll('.app-cmp-section');
        if (sections.length > 1) {
          const sectionToRemove = removeButton.closest(
            '.app-cmp-section',
          ) as HTMLElement | null;
          if (sectionToRemove) {
            sectionToRemove.remove();
            updateSectionNumbersAndButtons();
          }
        }
      }
    });

    assignInputComponent(sectionComponent);
    globalContainer.appendChild(sectionComponent);
    updateSectionNumbersAndButtons();
  };

  const addSectionButton = document.querySelector(
    '.app-cmd-add-section',
  ) as HTMLButtonElement | null;
  if (addSectionButton) {
    addSectionButton.addEventListener('click', addSection);
  }

  globalContainer.addEventListener('click', (event: Event) => {
    const removeButton = (event.target as Element).closest(
      '.app-cmd-remove-section',
    ) as HTMLButtonElement | null;
    if (removeButton) {
      const sections = globalContainer.querySelectorAll('.app-cmp-section');
      if (sections.length > 1) {
        const sectionToRemove = removeButton.closest(
          '.app-cmp-section',
        ) as HTMLElement | null;
        if (sectionToRemove) {
          sectionToRemove.remove();
          updateSectionNumbersAndButtons();
        }
      }
    }
  });

  const existingSections = globalContainer.querySelectorAll('.app-cmp-section');
  if (existingSections.length === 0) {
    addSection();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const globalContainer = document.querySelector(
    '.app-sections-list',
  ) as HTMLElement | null;
  if (globalContainer) {
    assignSectionComponent(globalContainer);
  }
});
