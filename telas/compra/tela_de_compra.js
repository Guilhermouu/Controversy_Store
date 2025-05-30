 // 1. Importações
import { HeaderFuncoes } from "../../header.js";
HeaderFuncoes();

// 2. Execução após o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  
  // 3. Seleciona todos os títulos de filtro
  const filterHeaders = document.querySelectorAll(".filter-title");
  // 4. Adiciona evento de clique para cada título
  filterHeaders.forEach(header => {
    header.addEventListener("click", () => {
      // pega o container .filter-options que vem logo depois do <h3>
      const options = header.nextElementSibling;
      options.classList.toggle("show-options");  // abre/fecha a lista
      
      // gira a seta interna
      const arrow = header.querySelector(".arrow-lista");
      if (arrow) {
        arrow.classList.toggle("rotated");
      }
    });
  });

});
// carrinho.js
export async function adicionarAoCarrinho(idProduto, tamanho, cor) {
  try {
    const resposta = await fetch('http://localhost:3000/api/carrinho/adicionar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_produto: idProduto, tamanho, cor })
    });

    const resultado = await resposta.json();
    alert(resultado.message);
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
  }
}
window.adicionarAoCarrinho = adicionarAoCarrinho;