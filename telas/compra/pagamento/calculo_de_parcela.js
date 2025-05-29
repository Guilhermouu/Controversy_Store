// ================================================
// 1. IMPORTAÇÕES
// Importa o valor total calculado de pagamento.js
// ================================================
import { valorTotalCalculado } from "./pagamento.js";

document.addEventListener("DOMContentLoaded", () => {
  // ================================================
  // 2. OBTENÇÃO DOS ELEMENTOS DO DOM
  // Captura os spans onde cada valor de parcela será exibido
  // ================================================
  const parcelaEl1  = document.querySelector(".parcelaUm");
  const parcelaEl2  = document.querySelector(".parcelaDois");
  const parcelaEl3  = document.querySelector(".parcelaTres");
  const parcelaEl4  = document.querySelector(".parcelaQuatro");
  const parcelaEl5  = document.querySelector(".parcelaCinco");
  const parcelaEl6  = document.querySelector(".parcelaSeis");
  const parcelaEl7  = document.querySelector(".parcelaSete");
  const parcelaEl8  = document.querySelector(".parcelaOito");
  const parcelaEl9  = document.querySelector(".parcelaNove");
  const parcelaEl10 = document.querySelector(".parcelaDez");

  // Captura o botão que dispara a confirmação da compra
  const confirmarCompraBtn = document.querySelector(".botao-confirmar-parcelamento");

  // ================================================
  // 3. CÁLCULO DOS VALORES DE PARCELA
  // Divide o valor total pelos números de parcelas desejados
  // ================================================
  const parcela1  = valorTotalCalculado / 2;
  const parcela2  = valorTotalCalculado / 3;
  const parcela3  = valorTotalCalculado / 4;
  const parcela4  = valorTotalCalculado / 5;
  const parcela5  = valorTotalCalculado / 6;
  const parcela6  = valorTotalCalculado / 7;
  const parcela7  = valorTotalCalculado / 8;
  const parcela8  = valorTotalCalculado / 9;
  const parcela9  = valorTotalCalculado / 10;
  const parcela10 = valorTotalCalculado / 12;

  // ================================================
  // 4. ATUALIZAÇÃO DA INTERFACE COM OS VALORES
  // Preenche cada span com o valor calculado formatado
  // ================================================
  parcelaEl1.textContent = parcela1 .toFixed(2);
  parcelaEl2.textContent = parcela2 .toFixed(2);
  parcelaEl3.textContent = parcela3 .toFixed(2);
  parcelaEl4.textContent = parcela4 .toFixed(2);
  parcelaEl5.textContent = parcela5 .toFixed(2);
  parcelaEl6.textContent = parcela6 .toFixed(2);
  parcelaEl7.textContent = parcela7 .toFixed(2);
  parcelaEl8.textContent = parcela8 .toFixed(2);
  parcelaEl9.textContent = parcela9 .toFixed(2);
  parcelaEl10.textContent = parcela10.toFixed(2);

  // ================================================
  // 5. LISTENER DE CONFIRMAÇÃO DE COMPRA
  // Ao clicar, lê o número de parcelas selecionado e exibe alerta
  // ================================================
  confirmarCompraBtn.addEventListener('click', () => {
    //No caso aqui seria feita a comunicação com o back e o banco para enviar a compra
    const parcelas = document.getElementById('parcelamento-select').value;
    alert(`Compra confirmada em ${parcelas}x!`);
  });
});
