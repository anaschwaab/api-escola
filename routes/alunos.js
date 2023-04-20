/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *         - matricula
 *         - turmaId
 *       properties:
 *         id:
 *           type: string
 *           description: Automaticamente gerado pelo Banco de Dados
 *         nome:
 *           type: string
 *           description: O nome do aluno
 *           format: isAlpha
 *         email:
 *           type: string
 *           description: O email do aluno
 *           format: isEmail
 *         telefone:
 *           type: string
 *           description: O telefone do aluno
 *         matricula:
 *           type: string
 *           description: O número de matrícula do aluno
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
 *         createdAt: 2023-04-20T14:14:36.108Z
 *         updatedAt: 2023-04-20T14:14:36.108Z
 *         turmaId: 2
 */

const Aluno = require("../database/aluno");
const Turma = require("../database/turma");

const { Router } = require("express");

const router = Router();

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Mostra a lista de todos os alunos
 *     description: Retorna uma lista com todos os alunos cadastrados
 *     responses:
 *       200:
 *         description: Lista de todos os alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */

router.get("/alunos", async (req, res) => {
    const listaAlunos = await Aluno.findAll();
    res.json(listaAlunos);
});

/**
 * @swagger
 * /alunos/{matricula}:
 *   get:
 *     summary: Mostra detalhes de aluno
 *     parameters:
 *       - in: path
 *         name: matricula
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de matrícula do aluno
 *     responses:
 *       200:
 *         description: Retonra detalhes do aluno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado
 */
router.get("/alunos/:matricula", async (req, res) => {
    const { matricula } = req.params;
    const aluno = await Aluno.findOne({ where: { matricula } });

    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).json({ message: "Aluno não encontrado." });
    }
});

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     description: Cria e adiciona um aluno
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
 *               matricula:
 *                 type: string
 *               turmaId:
 *                 type: integer
 *             example:
 *               nome: Ana
 *               email: ana7@email.com
 *               telefone: 1234567890
 *               matricula: 7777
 *               turmaId: 1
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro interno no servidor
 */

router.post("/alunos", async (req, res) => {
    const { nome, email, telefone, matricula, turmaId } = req.body;

    try {
        const turma = Turma.findOne({ where: { id: turmaId } });
        if (turma) {
            const novoAluno = await Aluno.create({
                nome,
                email,
                telefone,
                matricula,
                turmaId,
            });
            res.status(201).json(novoAluno);
        } else {
            res.status(404).json("Turma não encontrada!");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu!" });
    }
});

/** 
 * @swagger
 * /alunos/{matricula}:  
 *  put:
 *    summary: Atualiza um aluno
 *    parameters:
 *      - in: path
 *        name: matricula
 *        schema:
 *          type: string
 *        required: true
 *        description: Número de matrícula do aluno
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Aluno'
 *    responses:
 *      200:
 *        description: Aluno editado com sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Aluno'
 *      400:
 *        description: Requisição inválida
 *      404:
 *        description: Aluno não encontrado
 *      500:
 *        description: Um erro aconteceu
 */

router.put("/alunos/:matricula", async (req, res) => {
    const { nome, email, telefone, turmaId } = req.body;
    const { matricula } = req.params;
    try {
        const aluno = await Aluno.findOne({ where: { matricula } });
        const turma = await Turma.findOne({ where: { id: turmaId } });
        if (aluno) {
            if (turma) {
                const alunoNovo = await Aluno.update(
                    { nome, email, telefone, turmaId },
                    { where: { matricula } }
                );
                res.status(201).json("Aluno editado com sucesso!");
            } else {
                res.status(400).json({ message: "Requisição inválida." });
            }
        } else {
            res.status(404).json({ message: "Aluno não encontrado." });
        }
    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

/**
 * @swagger
 * /alunos/{matricula}:
 *  delete:
 *     summary: Remover um aluno
 *     parameters:
 *       - in: path
 *         name: matricula
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de matrícula do aluno
 *     responses:
 *       200:
 *         description: Aluno removido
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Um erro aconteceu
 */

router.delete("/alunos/:matricula", async (req, res) => {
    const { matricula } = req.params;
    const aluno = await Aluno.findOne({ where: { matricula } });
    try {
        if (aluno) {
            aluno.destroy();
            res.status(200).json("Aluno removido.");
        } else {
            res.status(404).json({ message: "Aluno não encontrado" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Um erro aconteceu!" });
    }
});

module.exports = router;
