'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const inputComponents = Array.from(
    document.querySelectorAll<HTMLInputElement>(
      'input[type="number"].app-elem-input',
    ),
  );

  const computeResult = (): void => {
    const result = inputComponents.reduce(
      (sum: number, input: HTMLInputElement) => {
        const value = input.valueAsNumber;
        // Check if it's a number
        return sum + (isNaN(value) ? 0 : value);
      },
      0,
    );

    const output = document.querySelector<HTMLOutputElement>(
      'output.app-elem-result',
    );
    if (output !== null) {
      output.value = `${result}`;
    } else {
      console.error('output.app-elem-result not found');
    }
  };

  inputComponents.forEach((input: HTMLInputElement) => {
    input.addEventListener('change', computeResult);
  });

  computeResult(); // Calculate initial value when page loads
});
