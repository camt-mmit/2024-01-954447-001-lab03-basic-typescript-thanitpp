function createComponent(template: HTMLTemplateElement): HTMLElement {
  const clonedContent = template.content.cloneNode(true) as DocumentFragment;
  return clonedContent.firstElementChild as HTMLElement;
}

export function assignComponent(element: HTMLElement): void {
  const template = element.querySelector<HTMLTemplateElement>('template.app-tmpl-input');
  const container = element.querySelector<HTMLElement>('.app-cmp-inputs-list');

  if (!template || !container) {
      console.error('Required elements not found:', { template, container });
      return;
  }

  const updateInputComponents = (): void => {
      Array.from(container.querySelectorAll<HTMLElement>('.app-cmp-input')).forEach((component, index) => {
          component.querySelectorAll<HTMLElement>('.app-elem-title-no').forEach((titleNo) => {
              titleNo.textContent = `${index + 1}`;
          });
          component.querySelectorAll<HTMLButtonElement>('.app-cmd-remove-input').forEach((button) => {
              button.disabled = container.querySelectorAll('.app-cmp-input').length === 1;
          });
      });
  };

  const calculateResult = (): void => {
      const inputs = container.querySelectorAll<HTMLInputElement>('input[type="number"].app-elem-input');
      if (!inputs.length) {
          console.warn('No inputs found');
          return;
      }

      const result = Array.from(inputs).reduce((sum, input) => sum + (input.valueAsNumber ?? 0), 0);
      console.log('Calculated result:', result);

      const outputs = element.querySelectorAll<HTMLOutputElement>('output.app-elem-result');
      if (!outputs.length) {
          console.error('No outputs found');
          return;
      }

      outputs.forEach((output) => output.value = result.toLocaleString());
  };

  const appendInputComponent = (): void => {
      const inputComponent = createComponent(template);
      const removeButton = inputComponent.querySelector<HTMLButtonElement>('.app-cmd-remove-input');

      removeButton?.addEventListener('click', () => {
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

  element.querySelector<HTMLButtonElement>('.app-cmd-add-input')?.addEventListener('click', appendInputComponent);

  container.addEventListener('input', (ev) => {
      const target = ev.target as HTMLInputElement;
      if (target.matches('input[type="number"].app-elem-input')) {
          calculateResult();
      }
  });

  appendInputComponent();
}
