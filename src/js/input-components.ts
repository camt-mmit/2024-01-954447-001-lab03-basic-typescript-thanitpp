function createComponent(template: HTMLTemplateElement): Element | null {
  return (template.content.cloneNode(true) as Element).firstElementChild;
}

export function assignComponent(element: HTMLElement): void {
  const template = element.querySelector(
    'template.app-tmpl-input',
  ) as HTMLTemplateElement | null;
  if (!template) {
    console.error('Input template not found');
    return;
  }

  const container = element.querySelector(
    '.app-cmp-inputs-list',
  ) as HTMLElement | null;
  if (!container) {
    console.error('Input container not found');
    return;
  }

  const updateInputComponents = (): void => {
    const inputComponents = [
      ...container.querySelectorAll('.app-cmp-input'),
    ] as HTMLElement[];
    inputComponents.forEach((component: HTMLElement, index: number) => {
      const titleNoElements = component.querySelectorAll(
        '.app-elem-title-no',
      ) as NodeListOf<HTMLElement>;
      titleNoElements.forEach((titleNo: HTMLElement) => {
        titleNo.textContent = `${index + 1}`;
      });

      const removeButtons = component.querySelectorAll(
        '.app-cmd-remove-input',
      ) as NodeListOf<HTMLButtonElement>;
      removeButtons.forEach((cmdRemoveInput: HTMLButtonElement) => {
        cmdRemoveInput.disabled = inputComponents.length === 1;
      });
    });
  };

  const calculateResult = (): void => {
    const inputs = [
      ...container.querySelectorAll('input[type="number"].app-elem-input'),
    ] as HTMLInputElement[];
    console.log(`Found ${inputs.length} input(s) for calculation.`);
    if (inputs.length === 0) {
      console.warn('No input elements found for calculation.');
      return;
    }

    const result = inputs.reduce((sum: number, element: HTMLInputElement) => {
      const value = element.valueAsNumber;
      console.log(`Processing input value: ${value}`);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);

    console.log(`Calculated result: ${result}`);
    const resultOutputs =
      (container
        .closest('.app-cmp-section')
        ?.querySelectorAll(
          'output.app-elem-result',
        ) as NodeListOf<HTMLOutputElement>) || [];

    if (resultOutputs.length === 0) {
      console.error('No output elements found for displaying the result.');
      return;
    }

    resultOutputs.forEach((output: HTMLOutputElement) => {
      output.value = result.toLocaleString();
    });
  };

  const appendInputComponent = (): void => {
    const inputComponent = createComponent(template) as HTMLElement;
    const removeButton = inputComponent.querySelector(
      '.app-cmd-remove-input',
    ) as HTMLButtonElement | null;

    if (removeButton) {
      removeButton.addEventListener('click', () => {
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

  const addInputButton = element.querySelector(
    '.app-cmd-add-input',
  ) as HTMLButtonElement | null;
  if (addInputButton) {
    addInputButton.addEventListener('click', appendInputComponent);
  }

  container.addEventListener('input', (ev: Event) => {
    const target = ev.target as HTMLElement;
    if (target && target.matches('input[type="number"].app-elem-input')) {
      calculateResult();
    }
  });

  appendInputComponent();
}
