const Turma = require("../database/turma");
const Aluno = require("../database/aluno");

const { Router } = require("express");

const router = Router();

router.get("/turmas", async (req, res) => {
    const listaTurmas = await Turma.findAll();
    res.json(listaTurmas);
});

// Refatorar quando fizer professor para listar professor tmb
router.get("/turmas/:id", async (req, res) => {
    const { id } = req.params;
    const turma = await Turma.findByPk(id, {include: [Aluno]});
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

module.exports = router;
