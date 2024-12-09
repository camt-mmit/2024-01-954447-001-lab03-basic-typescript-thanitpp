function createComponent(template: HTMLTemplateElement) {
  return (template.content.cloneNode(true) as DocumentFragment)
    .firstElementChild as HTMLElement;
}

export function assignComponent(element: HTMLElement): void {
  const template = element.querySelector(
    'template.app-tmpl-input',
  ) as HTMLTemplateElement;

  if (!template) {
    console.error('Input template not found');
    return;
  }

  const container = element.querySelector(
    '.app-cmp-inputs-list',
  ) as HTMLElement;

  if (!container) {
    console.error('Input container not found');
    return;
  }

  const updateInputComponents = (): void => {
    const inputComponents = [...container.querySelectorAll('.app-cmp-input')];

    inputComponents.forEach((component, index) => {
      // Update input number
      const titleNoElements = component.querySelectorAll('.app-elem-title-no');
      titleNoElements.forEach((titleNo) => {
        if (titleNo instanceof HTMLElement) {
          titleNo.textContent = `${index + 1}`;
        }
      });

      // Enable/disable remove button
      const removeButtons = component.querySelectorAll('.app-cmd-remove-input');
      removeButtons.forEach((cmdRemoveInput) => {
        if (cmdRemoveInput instanceof HTMLButtonElement) {
          cmdRemoveInput.disabled = inputComponents.length === 1;
        }
      });
    });
  };

  const calculateResult = (): void => {
    const inputs = [
      ...container.querySelectorAll('input[type="number"].app-elem-input'),
    ] as HTMLInputElement[];

    const result = inputs.reduce(
      (sum, element) => sum + (element?.valueAsNumber || 0),
      0,
    );

    const resultOutputs = element.querySelectorAll('output.app-elem-result');
    resultOutputs.forEach((output) => {
      if (output instanceof HTMLOutputElement) {
        output.value = result.toLocaleString();
      }
    });
  };

  const appendInputComponent = (): void => {
    const inputComponent = createComponent(template);

    // Add remove functionality
    const removeButton = inputComponent.querySelector('.app-cmd-remove-input');
    if (removeButton) {
      removeButton.addEventListener('click', () => {
        // Prevent removing the last input
        const currentInputs = container.querySelectorAll('.app-cmp-input');
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

  // Add input button event listener
  const addInputButton = element.querySelector('.app-cmd-add-input');
  if (addInputButton) {
    addInputButton.addEventListener('click', appendInputComponent);
  }

  // Input change event listener
  container.addEventListener('input', (ev) => {
    const target = ev.target as HTMLInputElement;
    if (target?.matches('input[type="number"].app-elem-input')) {
      calculateResult();
    }
  });

  // Add initial input
  appendInputComponent();
}
