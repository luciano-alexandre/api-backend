// Localiza o formulário e a área usada para mostrar respostas.
const formulario = document.querySelector('#form-inscricao');
const resultado = document.querySelector('#resultado');

formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(formulario);

  const observacoes = String(formData.get('observacoes') ?? '').trim();
  if (!observacoes) {
    formData.delete('observacoes');
  }

  formData.set(
    'aceitaTermos',
    formulario.elements.aceitaTermos.checked ? 'true' : 'false',
  );

  console.log('Campos enviados:');
  for (const [chave, valor] of formData.entries()) {
    console.log(chave, valor);
  }

  try {
    const resposta = await fetch(
      'http://localhost:3000/inscricoes/com-arquivo',
      {
        method: 'POST',
        body: formData,
      },
    );

    const corpo = await resposta.json();

    if (!resposta.ok) {
      resultado.textContent = JSON.stringify(
        {
          status: resposta.status,
          erro: corpo,
        },
        null,
        2,
      );
      return;
    }

    resultado.textContent = JSON.stringify(corpo, null, 2);
    formulario.reset();
  } catch (erro) {
    resultado.textContent = JSON.stringify(
      {
        mensagem: 'Não foi possível acessar a API',
        detalhe: erro.message,
      },
      null,
      2,
    );
  }
});