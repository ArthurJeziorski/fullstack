const usuariosService = require("../services/usuariosService");

async function listarUsuarios(req, res) {

    const pool = require("../database/db");

    const usuarios = await usuariosService.listarUsuarios();

    res.json(usuarios);

}

async function buscarUsuario(req, res) {

    const id = Number(req.params.id);

    const usuario = await usuariosService.buscarUsuarioPorId(id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(usuario);

}

async function criarUsuario(req, res) {

    try {

        const { nome, idade } = req.body;

        const usuario = await usuariosService.criarUsuario(nome, idade);

        res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario
        });

    } catch (erro) {

        res.status(400).json({
            erro: erro.message
        });

    }

}

async function atualizarUsuario(req, res) {

    const id = Number(req.params.id);
    const { nome, idade } = req.body;

    const usuario = await usuariosService.atualizarUsuario(id, nome, idade);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(usuario);

}

async function deletarUsuario(req, res) {

    const id = Number(req.params.id);

    const removido = await usuariosService.deletarUsuario(id);

    if (!removido) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.status(204).send();

}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
