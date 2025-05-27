    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha1').value;
    const confirmarSenha = document.getElementById('senha2').value;
    const mensagemDiv = document.getElementById('message');

    // Validação da senha
    if (senha !== confirmarSenha  ) {
        mensagemDiv.textContent = 'As senhas não coincidem.';
        mensagemDiv.className = 'mensagem erro';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (data.success) {
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/tela-inicial.html';
        } else {
        mensagemDiv.textContent = data.message;
        mensagemDiv.className = 'mensagem erro';
        }
    } catch (error) {
        console.error('Erro:', error);
        mensagemDiv.textContent = 'Erro ao conectar com o servidor.';
        mensagemDiv.className = 'mensagem erro';
    }
    });
