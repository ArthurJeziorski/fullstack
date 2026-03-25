const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

// ── Rotas específicas (devem vir ANTES das rotas com parâmetro) ──────────────

// Exercício 1 – Total de usuários
router.get("/total", usuariosController.totalUsuarios);

// Exercício 3 – Listagem ordenada por nome
router.get("/ordenados", usuariosController.listarOrdenados);

// Exercício 2 – Buscar por idade mínima
router.get("/idade/:idade", usuariosController.buscarPorIdade);

// ── Rotas gerais ─────────────────────────────────────────────────────────────

router.get("/", usuariosController.listarUsuarios);

router.get("/:id", usuariosController.buscarUsuario);

router.post("/", usuariosController.criarUsuario);

router.put("/:id", usuariosController.atualizarUsuario);

router.delete("/:id", usuariosController.deletarUsuario);

module.exports = router;