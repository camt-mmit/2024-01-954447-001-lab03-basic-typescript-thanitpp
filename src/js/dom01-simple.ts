document.addEventListener('DOMContentLoaded', () => {
  const inputComponent = [
    ...document.querySelectorAll<HTMLInputElement>(
      'input[tpe="number"].app-elem-input',
    ),
  ];
  const computerResult = () => {
    const result = inputComponent.reduce((result, inputComponent) => {
      return result + inputComponent.valueAsNumber;
    }, 0);
    const output = document.querySelector<HTMLOutputElement>(
      'output.app-elem-result',
    );
    if (output !== null) {
      output.value = `${result}`;
    } else {
      console.error('output.app-elem-result not found');
    }
  };
  inputComponent.forEach((inputComponent) => {
    inputComponent.addEventListener('change', computerResult);
  });
  computerResult();
});
