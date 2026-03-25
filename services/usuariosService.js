const pool = require("../database/db");

async function listarUsuarios() {
    const resultado = await pool.query(
        "SELECT * FROM usuarios ORDER BY id"
    );
    return resultado.rows;
}

async function buscarUsuarioPorId(id) {
    const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
    );
    return resultado.rows[0];
}

// Exercício 1 – Total de usuários
async function contarUsuarios() {
    const resultado = await pool.query(
        "SELECT COUNT(*) FROM usuarios"
    );
    return Number(resultado.rows[0].count);
}

// Exercício 2 – Buscar usuários por idade mínima
async function buscarPorIdadeMinima(idadeMinima) {
    const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE idade >= $1 ORDER BY id",
        [idadeMinima]
    );
    return resultado.rows;
}

// Exercício 3 – Listar usuários ordenados por nome
async function listarOrdenadosPorNome() {
    const resultado = await pool.query(
        "SELECT * FROM usuarios ORDER BY nome"
    );
    return resultado.rows;
}

// Exercício 4 – Criar usuário com email
async function criarUsuario(nome, idade, email) {
    if (!nome || nome.trim() === "") {
        throw new Error("Nome é obrigatório");
    }

    const resultado = await pool.query(
        `
        INSERT INTO usuarios (nome, idade, email)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [nome, idade, email || null]
    );

    return resultado.rows[0];
}

async function atualizarUsuario(id, nome, idade, email) {
    const resultado = await pool.query(
        `
        UPDATE usuarios
        SET nome  = COALESCE($1, nome),
            idade = COALESCE($2, idade),
            email = COALESCE($3, email)
        WHERE id = $4
        RETURNING *
        `,
        [nome, idade, email || null, id]
    );
    return resultado.rows[0];
}

async function deletarUsuario(id) {
    const resultado = await pool.query(
        "DELETE FROM usuarios WHERE id = $1",
        [id]
    );
    return resultado.rowCount > 0;
}

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    contarUsuarios,
    buscarPorIdadeMinima,
    listarOrdenadosPorNome,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};