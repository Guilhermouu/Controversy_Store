document.addEventListener('DOMContentLoaded',() => {

    //Lógica da verificação de senhas iguais
    
    const senha = document.querySelector('#senha1')
    const verificar_senha =  document.querySelector('#senha2')
    const botao_cadasto = document.querySelector('.btn-cadastrar')


    botao_cadasto.addEventListener('click', (event) =>{
    const senha_valor =  senha.value.toString()
    
    const verificar_senha_valor = verificar_senha.value.toString()

    if (senha_valor === verificar_senha_valor){
        verificar_senha.setCustomValidity('');
    }

    else{
        event.preventDefault();
        verificar_senha.setCustomValidity('As senhas não coincidem.')
        verificar_senha.reportValidity()
       

    }

    })
       
    
})