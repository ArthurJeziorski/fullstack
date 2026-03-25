const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome  = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const email = document.getElementById("email").value;

  const usuario = {
    nome,
    idade: Number(idade),
    email: email || undefined
  };

  try {
    const resposta = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });

    if (!resposta.ok) {
      throw new Error("Erro ao cadastrar usuário");
    }

    const dados = await resposta.json();

    mensagem.textContent = `Usuário ${dados.usuario.nome} cadastrado com sucesso!`;
    mensagem.style.color = "green";

    form.reset();

  } catch (erro) {
    mensagem.textContent = "Erro ao cadastrar usuário.";
    mensagem.style.color = "red";
    console.error(erro);
  }
});