/**
 * @swagger
 * components:
 *   schemas:
 *     Professor:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *         - materia
 *         - turmaId
 *       properties:
 *         id:
 *           type: string
 *           description: Automaticamente gerado pelo Banco de Dados
 *         nome:
 *           type: string
 *           description: O nome do professor
 *           format: isAlpha
 *         email:
 *           type: string
 *           description: O email do professor
 *           format: isEmail
 *         telefone:
 *           type: string
 *           description: O telefone do professor 
 *         materia:
 *           type: string
 *           description: A matéria lecionada pelo professor
 *         createdAt:
 *           type: datetime
 *           description: Automaticamente gerado pelo Banco de Dados
 *           format: date
 *         updatedAt:
 *           type: datetime
 *           description: Automaticamente gerado pelo Banco de Dados
 *           format: date
 *         turmaId:
 *           type: int
 *           description: Id da Turma
 *           format: integer
 *       example:
 *         id: 1
 *         nome: João Silva
 *         email: joaosilva@email.com
 *         telefone: (00) 00000-0000
 *         materia: Física
 *         createdAt: 2023-04-20T14:14:36.108Z
 *         updatedAt: 2023-04-20T14:14:36.108Z
 *         turmaId: 2
 * */

const Professor = require("../database/professor");
const Turma = require("../database/turma");
const { Router } = require("express");

const router = Router();

/**
 * @swagger
 * /professores:
 *  get:
 *     summary: Mostre a lista de todos os professores
 *     description: Retorna uma lista com todos os professores cadastradas
 *     responses:
 *       200:
 *         description: Lista de todos os professores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professor'
 */

router.get("/professores", async (req, res) => {
    const listaProfessores = await Professor.findAll();
    res.json(listaProfessores);
});

/**
 * @swagger
 * /professores/{id}:
 *  get:
 *     summary: Mostra detalhes do Professor
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id gerada pelo Banco de Dados
 *     responses:
 *       200:
 *         description: Retorna detalhes do Professor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professor'
 *       404:
 *         description: Professor não encontrado
 */

router.get("/professores/:id", async (req, res) => {
    const { id } = req.params;
    const professor = await Professor.findOne({ where: { id } });
    if (professor) {
    res.json(professor);
    } else {
    res.status(404).json({ message: "Professor não encontrado." });
    }
});

/**
 * @swagger
 * /professores:
 *  post:
 *     summary: Adiciona um novo professor
 *     description: Cria e adiciona um professor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               materia:
 *                 type: string
 *               turmaId:
 *                 type: string
 *             example:
 *               nome: José Almir
 *               email: almir@mail.com
 *               telefone: (00) 00000-0000
 *               materia: Física
 *               turmaId: 1
 *     responses:
 *       201:
 *         description: Professor adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professor'
 *       404:
 *          description: Turma não encontrada
 *       500:
 *          description: Um erro aconteceu
 */

router.post("/professores", async (req, res) => {
    const { nome, email, telefone, materia, turmaId } = req.body;
    try {
    const turma = await Turma.findOne({ where: { id: turmaId } });
    if (turma) {
        const professorNovo = await Professor.create({
        nome,
        email,
        telefone,
        materia,
        turmaId
        });
        res.status(201).json(professorNovo);
    } else {
        res.status(404).json({ message: "Turma não encontrado." });
    }
    } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
    }
});

/**
 * @swagger
 * /professores/{id}:
 *  put:
 *    summary: Atualiza as informações do professor
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id gerada pelo Banco de Dados
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Professor'
 *    responses:
 *      200:
 *        description: Professor atualizado com sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Professor'
 *      404:
 *        description: Professor não encontrado
 *      500:
 *        description: Um erro aconteceu
 */

router.put("/professores/:id", async (req, res) => {
    const { nome, email, telefone, materia, turmaId } = req.body;
    const professor = await Professor.findByPk(req.params.id);
    try {
        if (professor) {
        await Professor.update(
        { nome, email, telefone, materia, turmaId },
        { where: { id: req.params.id } }
    );
        res.json({ message: "O professor foi editado." });
    } else {
        res.status(404).json({ message: "O professor não foi encontrado." });
    }
    } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
    }
});

/**
 * @swagger
 * /professores/{id}:
 *  delete:
 *     summary: Remove professor pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id gerada pelo Banco de Dados
 *     responses:
 *       200:
 *         description: Professor excluído com sucesso!
 *       404:
 *         description: Professor não encontrado
 */

router.delete("/professores/:id", async (req, res) => {
    const professor = await Professor.findByPk(req.params.id);
    try {
        if (professor) {
        await professor.destroy();
        res.json({ message: "O professor foi removido." });
    } else {
        res.status(404).json({ message: "O professor não foi encontrado." });
    }
    } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;