import { HeaderFuncoes } from "../../header.js"
HeaderFuncoes()

    document.addEventListener("DOMContentLoaded", () => {
      // preencher resumo (exemplo)
      const vp = 900.00, vf = 100.00;
      document.getElementById("valor-produto").textContent = vp.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
      document.getElementById("valor-frete").textContent = vf.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
      document.getElementById("valor-total").textContent = (vp+vf).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

      // radios e containers
      const radios = document.querySelectorAll('input[name="formaPagamento"]');
      const pix    = document.querySelector(".detalhes-pix");
      const cartao = document.querySelector(".detalhes-cartao");
      const boleto = document.querySelector(".detalhes-boleto");

      // esconder todos e depois mostrar o selecionado
      function atualizar() {
        const sel = document.querySelector('input[name="formaPagamento"]:checked')?.value;
        pix.style.display    = sel==="pix"    ? "block":"none";
        cartao.style.display = sel==="cartao" ? "block":"none";
        boleto.style.display = sel==="boleto" ? "block":"none";
      }
      radios.forEach(r=> r.addEventListener("change", atualizar));
      atualizar();

      // copiar PIX
      document.querySelector(".botao-copiar").onclick = () => {
        const c = document.getElementById("codigo-pix");
        navigator.clipboard.writeText(c.value).then(()=>alert("PIX copiado!"));
      };

      // botões confirmar (apenas alertas de exemplo)
      document.querySelector(".detalhes-pix .botao-confirmar").onclick = () =>
        alert("PIX confirmado!");
      document.querySelector(".detalhes-cartao .botao-confirmar").onclick = () =>
        alert("Cartão processado!");
      document.querySelector(".detalhes-boleto .botao-confirmar").onclick = () =>
        alert("Boleto gerado!");
    });