//Importação de funções do header
import { HeaderFuncoes } from "../../header.js";
HeaderFuncoes();

document.querySelector('.botao-continuar').addEventListener('click', () => {
  // redireciona para a página de pagamento
  window.location.href = 'pagamento.html';
});
