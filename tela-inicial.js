document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.querySelector('.menu-container');
  const barraLateral = document.querySelector('.barra-lateral');
  const contentWrapper = document.querySelector('.content-wrapper');
  const lupa =  document.querySelector('.lupa')
  const areaPesquisa =  document.querySelector('.barra-acima')
  const header = document.querySelector('header')
  

  menuContainer.addEventListener('click', () => {
    menuContainer.classList.toggle('open');
    barraLateral.classList.toggle('open');

    if (menuContainer.classList.contains('open')) {
      contentWrapper.style.transition = 'filter 1s ease'
      contentWrapper.style.filter = 'brightness(0.5)';
    } else {
      contentWrapper.style.filter = 'none';
    }
  })



  lupa.addEventListener('click',() =>{
      lupa.classList.toggle('open')
      if(lupa.classList.contains('open')){
        lupa.style.opacity = '0'
        areaPesquisa.style.top = '0%'
      }

      else{
        
      }
  })
  
});
//código novo
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const mensagemDiv = document.getElementById('mensagem');
  
  mensagemDiv.textContent = '';
  mensagemDiv.className = 'mensagem';
  
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      mensagemDiv.textContent = `Bem-vindo, ${data.usuario.nome}!`;
      mensagemDiv.className = 'mensagem sucesso';
      
      // Redirecionar ou fazer algo após login bem-sucedido
      console.log('Usuário logado:', data.usuario);
    } else {
      mensagemDiv.textContent = data.message;
      mensagemDiv.className = 'mensagem erro';
    }
  } catch (error) {
    console.error('Erro:', error);
    mensagemDiv.textContent = 'Erro ao conectar com o servidor';
    mensagemDiv.className = 'mensagem erro';
  }
});