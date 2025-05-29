import { HeaderFuncoes } from "../../../header.js";
HeaderFuncoes()
//Pegando elementos para modificar seus valores
const valorProdutoElemento = document.getElementById("valor-produto");
const valorFreteElemento = document.getElementById("valor-frete");
const valorTotalElemento = document.getElementById("valor-total"); 

//ONDE SE DEVE MODIFICAR OS VALORES
const valorProduto = 199.99;
const valorFrete = 20.00; //esse aqui meio que não precisa já que não vai ter
export const valorTotalCalculado = valorProduto + valorFrete; //Calculo

// Atualização no HTML
  valorProdutoElemento.textContent = valorProduto.toFixed(2);
  valorFreteElemento.textContent = valorFrete.toFixed(2);
  valorTotalElemento.textContent = valorTotalCalculado.toFixed(2);
  
  const radios = document.querySelectorAll('input[name="formaPagamento"]');
  const detalhesPix = document.querySelector(".detalhes-pix");
  const detalhesCartao = document.querySelector(".detalhes-cartao");
  const detalhesBoleto = document.querySelector(".detalhes-boleto")
  const botaoContinuar = document.querySelector(".botao-confirmar-parcelamento");
  const parcelamentoCartao = document.querySelector('#parcelamento')
  const boletoPagamento = document.querySelector(".boleto-section")

  // Reset inicial
  detalhesPix.style.display = 'none';
  detalhesCartao.style.display = 'none';
  detalhesBoleto.style.display = 'none';
  botaoContinuar.style.display = 'none';
  
  radios.forEach(radio => radio.checked = false);

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      // Usa diretamente o valor de `radio` para alternar a visualização
      //SE POSSÍVEL, NÃO ALTERAR POIS HÁ UMA ESTRUTURA LÓGICA BEM ESTABELECIDA E FUNCIONAL
      //Caso seja de urgência por favor falar comigo (mesmo vale para dúvidas)
      if (radio.value === "pix") {
        boletoPagamento.style.display = 'none'
        parcelamentoCartao.style.display = "none"
        detalhesCartao.style.display = "none";
        botaoContinuar.style.display = "none";
        detalhesBoleto.style.display = "none"
        detalhesPix.style.display = "block";
        
     
      } else if (radio.value === "cartao") {
        boletoPagamento.style.display = 'none'
        parcelamentoCartao.style.display = "none"
        detalhesPix.style.display = "none";
        botaoContinuar.style.display = "none";
        detalhesBoleto.style.display = "none"
        detalhesCartao.style.display = "block";
      } 
      
      else if(radio.value === "boleto"){
        boletoPagamento.style.display = 'none'
        parcelamentoCartao.style.display = "none"
        detalhesPix.style.display = "none";
        detalhesCartao.style.display = "none";
        botaoContinuar.style.display = "none"
        detalhesBoleto.style.display = "block"
      }
      
      else {
        boletoPagamento.style.display = 'none'
        parcelamentoCartao.style.display = "none"
        detalhesBoleto.style.display = "none"
        detalhesPix.style.display = "none";
        detalhesCartao.style.display = "none";
        botaoContinuar.style.display = "none";
      }
    });
  });
