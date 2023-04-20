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
 * tags:
 *   name: alunos
 *   description: The books managing API
 * /alunos:
 *   post:
 *     summary: Create a new book
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/alunos'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/aluno'
 *       500:
 *         description: Some server error
 *
 */

router.get("/alunos", async (req, res) => {
    const listaAlunos = await Aluno.findAll();
    res.json(listaAlunos);
});

router.get("/alunos/:matricula", async (req, res) => {
    const { matricula } = req.params;
    const aluno = await Aluno.findOne({ where: { matricula } });

    if(aluno){
        res.json(aluno);
    }else{
        res.status(404).json({message: "Aluno não encontrado."})
    }
});

router.post("/alunos", async (req, res) => {
    const { nome, email, telefone, matricula, turmaId } = req.body;

    try{
        const turma = Turma.findOne({where: {id: turmaId}})
        if(turma){
            const novoAluno = await Aluno.create(
                { nome, email, telefone, matricula, turmaId }
                );
                res.status(201).json(novoAluno);
        }else{
            res.status(404).json("Turma não encontrada!");
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Um erro aconteceu!"});
    }
});

router.put("/alunos/:matricula", async (req, res) => {
    const { nome, email, telefone, turmaId } = req.body
    const { matricula } = req.params
    try {
    const aluno = await Aluno.findOne({ where: { matricula } })
    const turma = await Turma.findOne({ where: {id: turmaId} })
    if (aluno) {
        if(turma){
            const alunoNovo = await Aluno.update({ nome, email, telefone, turmaId }, { where: { matricula } });
            res.status(201).json("Aluno editado com sucesso!");
        }else{
            res.status(404).json({message: "Turma não encontrada."});
        }
    } else {
        res.status(404).json({ message: "Aluno não encontrado." });
    }
    } catch (err) {
    res.status(500).json({ message: "Um erro aconteceu." });
    }
})

router.delete("/alunos/:matricula", async (req, res) => {
    const { matricula} = req.params;
    const aluno = await Aluno.findOne({ where: { matricula } });
    try {
    if (aluno) {
        aluno.destroy();
        res.status(200).json("Aluno removido.")
    } else {
        res.status(404).json({ message: "Aluno não encontrado" })
    }
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Um erro aconteceu!" });
    }
});

module.exports = router;
