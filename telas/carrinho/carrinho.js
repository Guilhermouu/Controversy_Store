import { HeaderFuncoes } from "../../header.js";
HeaderFuncoes();

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    const alvo = event.target;

    // Verifica se clicou num elemento com classe 'button'
    if (alvo.classList.contains('button')) {
      if (alvo.textContent.trim() === '+') {
        console.log('oi');
      }
    }
  });
});
