const lista    = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const botao    = document.getElementById("btnAtualizar");

botao.addEventListener("click", carregarUsuarios);

// Carrega a lista automaticamente ao abrir a página
carregarUsuarios();

async function carregarUsuarios() {
  mensagem.textContent = "Carregando...";

  try {
    const resposta = await fetch("/api/usuarios");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    const usuarios = await resposta.json();

    renderizarUsuarios(usuarios);
    mensagem.textContent = "";

  } catch (erro) {
    mensagem.textContent = "Erro ao carregar usuários.";
    mensagem.style.color = "red";
    console.error(erro);
  }
}

function renderizarUsuarios(usuarios) {
  lista.innerHTML = "";

  if (usuarios.length === 0) {
    lista.innerHTML = "<li>Nenhum usuário cadastrado.</li>";
    return;
  }

  usuarios.forEach(usuario => {
    const li = document.createElement("li");

    // Texto do usuário
    li.textContent = `${usuario.nome} - ${usuario.idade} anos`;

    // Exibe e-mail se existir
    if (usuario.email) {
      li.textContent += ` (${usuario.email})`;
    }

    // Exercício 5 – link para página de detalhes
    const linkDetalhes = document.createElement("a");
    linkDetalhes.href        = `usuario.html?id=${usuario.id}`;
    linkDetalhes.textContent = " [Ver]";
    linkDetalhes.style.marginLeft = "8px";

    // Exercício 6 – botão excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.style.marginLeft = "8px";

    btnExcluir.addEventListener("click", async () => {
      const confirmar = confirm(`Deseja excluir o usuário ${usuario.nome}?`);
      if (!confirmar) return;

      try {
        const resposta = await fetch(`/api/usuarios/${usuario.id}`, {
          method: "DELETE"
        });

        if (resposta.ok) {
          carregarUsuarios(); // Atualiza a lista automaticamente
        } else {
          alert("Erro ao excluir usuário.");
        }
      } catch (erro) {
        alert("Erro ao excluir usuário.");
        console.error(erro);
      }
    });

    li.appendChild(linkDetalhes);
    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });
}