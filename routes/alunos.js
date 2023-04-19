const Aluno = require("../database/aluno");
const Turma = require("../database/turma");

const { Router } = require("express");

const router = Router();

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
    const { nome, email, telefone, turma } = req.body
    const { matricula } = req.params
    try {
    const aluno = await Aluno.findOne({ where: { matricula } })
    if (aluno) {
        if (turma) {
        await Turma.update(turma, { where: { turma: codigo } });
        }
        await Aluno.update({ nome, email, telefone }, { where: { matricula } });
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
