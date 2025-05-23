document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha1').value;
  const mensagemDiv = document.getElementById('message');

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "/tela-inicial.html";
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
