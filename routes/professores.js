const Professor = require("../database/professor");
const Turma = require("../database/turma");
const { Router } = require("express");

const router = Router();

router.get("/professores", async (req, res) => {
    const listaProfessores = await Professor.findAll();
    res.json(listaProfessores);
});

router.get("/professores/:id", async (req, res) => {
    const { id } = req.params;
    const professor = await Professor.findOne({ where: { id } });
    if (professor) {
    res.json(professor);
    } else {
    res.status(404).json({ message: "Professor não encontrado." });
    }
});

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