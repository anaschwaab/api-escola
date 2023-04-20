const Turma = require("../database/turma");
const Aluno = require("../database/aluno");
const Professor = require("../database/professor");

const { Router } = require("express");

const router = Router();

router.get("/turmas", async (req, res) => {
    const listaTurmas = await Turma.findAll();
    res.json(listaTurmas);
});

// Refatorar quando fizer professor para listar professor tmb
router.get("/turmas/:id", async (req, res) => {
    const { id } = req.params;
    const turma = await Turma.findByPk(id, {include: [Aluno, Professor]});
    if(turma){
        res.json(turma);
    }else{
        res.status(404).json({message: "Turma não encontrado."});
    }
});

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
