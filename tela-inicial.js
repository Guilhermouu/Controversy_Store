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

