const usuariosService = require("../services/usuariosService");

async function listarUsuarios(req, res) {
    const usuarios = await usuariosService.listarUsuarios();
    res.json(usuarios);
}

async function buscarUsuario(req, res) {
    const id = Number(req.params.id);
    const usuario = await usuariosService.buscarUsuarioPorId(id);

    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario);
}

// Exercício 1 – Total de usuários
async function totalUsuarios(req, res) {
    try {
        const total = await usuariosService.contarUsuarios();
        res.json({ total });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

// Exercício 2 – Buscar por idade mínima
async function buscarPorIdade(req, res) {
    try {
        const idadeMinima = Number(req.params.idade);

        if (isNaN(idadeMinima)) {
            return res.status(400).json({ erro: "Idade inválida" });
        }

        const usuarios = await usuariosService.buscarPorIdadeMinima(idadeMinima);
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

// Exercício 3 – Listar ordenados por nome
async function listarOrdenados(req, res) {
    try {
        const usuarios = await usuariosService.listarOrdenadosPorNome();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

// Exercício 4 – Criar usuário com email
async function criarUsuario(req, res) {
    try {
        const { nome, idade, email } = req.body;
        const usuario = await usuariosService.criarUsuario(nome, idade, email);

        res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario
        });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

async function atualizarUsuario(req, res) {
    const id = Number(req.params.id);
    const { nome, idade, email } = req.body;

    const usuario = await usuariosService.atualizarUsuario(id, nome, idade, email);

    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario);
}

async function deletarUsuario(req, res) {
    const id = Number(req.params.id);
    const removido = await usuariosService.deletarUsuario(id);

    if (!removido) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.status(204).send();
}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    totalUsuarios,
    buscarPorIdade,
    listarOrdenados,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};