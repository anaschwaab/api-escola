/**
 * @swagger
 * components:
 *   schemas:
 *     Turma:
 *       type: object
 *       required:
 *         - serie
 *         - codigo
 *       properties:
 *         id:
 *           type: string
 *           description: Automaticamente gerado pelo Banco de Dados
 *         serie:
 *           type: string
 *           description: A série/ano da turma
 *           format: Alpha
 *         codigo:
 *           type: string
 *           description: O código de referência da turma
 *           format: Alphanumeric
 *         createdAt:
 *           type: datetime
 *           description: Automaticamente gerado pelo Banco de Dados
 *           format: date
 *         updatedAt:
 *           type: datetime
 *           description: Automaticamente gerado pelo Banco de Dados
 *           format: date
 *       example:
 *         id: 1
 *         serie: Quinta
 *         codigo: 5C
 *         createdAt: 2023-04-20T14:14:36.108Z
 *         updatedAt: 2023-04-20T14:14:36.108Z
 */

const Turma = require("../database/turma");
const Aluno = require("../database/aluno");
const Professor = require("../database/professor");

const { Router } = require("express");

const router = Router();

/**
 * @swagger
 * /turmas:
 *  get:
 *     summary: Mostra a lista de todas as turmas
 *     description: Retorna uma lista com todas as turmas cadastradas
 *     responses:
 *       200:
 *         description: Lista de todas as turmas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turma'
 */

router.get("/turmas", async (req, res) => {
    const listaTurmas = await Turma.findAll();
    res.json(listaTurmas);
});

/**
 * @swagger
 * /turmas/{id}:
 *  get:
 *     summary: Mostra detalhes da turma
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id gerada pelo Banco de Dados
 *     responses:
 *       200:
 *         description: Retorna detalhes da turma
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 *       404:
 *         description: Turma não encontrada
 */

router.get("/turmas/:id", async (req, res) => {
    const { id } = req.params;
    const turma = await Turma.findByPk(id, {include: [Aluno, Professor]});
    if(turma){
        res.json(turma);
    }else{
        res.status(404).json({message: "Turma não encontrado."});
    }
});

/**
 * @swagger
 * /turmas:
 *  post:
 *     summary: Cria uma nova turma
 *     description: Cria e adiciona uma turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serie:
 *                 type: string
 *               codigo:
 *                 type: string
 *             example:
 *               serie: Quinta
 *               codigo: 5C
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 *       500:
 *         description: Um erro aconteceu
 */

router.post("/turmas", async (req, res) => {
    const { serie, codigo } = req.body;
    try {
        const novaTurma = await Turma.create({ serie, codigo });
        res.status(201).json(novaTurma);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu!" });
    }
});

/**
 * @swagger
 * /turmas/{id}:
 *  put:
 *    summary: Atualiza as informações da turma
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
 *            $ref: '#/components/schemas/Turma'
 *    responses:
 *      200:
 *        description: A turma foi atualizada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Turma'
 *      404:
 *        description: Turma não encontrada
 *      500:
 *        description: Um erro aconteceu
 */

router.put("/turmas/:id", async (req, res) => {
    const { serie, codigo } = req.body
    try {
        const turma = await Turma.findByPk({ where: { id } })
        if (turma) {
        const turmaNova = await Turma.update({ serie, codigo }, { where: { id } });
        res.status(201).json("Turma editada com sucesso!");
        } else {
        res.status(404).json({ message: "Turma não encontrada." });
        }
    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
    })

/**
 * @swagger
 * /turmas/{id}:
 *  delete:
 *     summary: Deleta turma pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id gerada pelo Banco de Dados
 *     responses:
 *       200:
 *         description: A turma foi deletada
 *       404:
 *         description: Turma não encontrada
 */

router.delete("/turmas/:id", async (req, res) => {
    const { id } = req.params;
    const turma = await Turma.findByPk(id);
    try {
        if (turma) {
        await turma.destroy();
        res.json({ message: "Turma removida." });
    } else {
        res.status(404).json({ message: "A turma não foi encontrada." });
    }
    } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
    }
})

module.exports = router;
