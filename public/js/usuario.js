const detalhes = document.getElementById("detalhes");
const mensagem = document.getElementById("mensagem");

// Lê o parâmetro ?id= da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  detalhes.innerHTML = "<p>Nenhum ID informado na URL.</p>";
} else {
  carregarUsuario(id);
}

async function carregarUsuario(id) {
  try {
    const resposta = await fetch(`/api/usuarios/${id}`);

    if (resposta.status === 404) {
      detalhes.innerHTML = "<p>Usuário não encontrado.</p>";
      return;
    }

    if (!resposta.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    const usuario = await resposta.json();

    detalhes.innerHTML = `
      <table>
        <tr><th>ID</th>    <td>${usuario.id}</td></tr>
        <tr><th>Nome</th>  <td>${usuario.nome}</td></tr>
        <tr><th>Idade</th> <td>${usuario.idade} anos</td></tr>
        <tr><th>E-mail</th><td>${usuario.email || "—"}</td></tr>
      </table>
    `;

  } catch (erro) {
    mensagem.textContent = "Erro ao carregar os dados do usuário.";
    mensagem.style.color = "red";
    console.error(erro);
  }
}   