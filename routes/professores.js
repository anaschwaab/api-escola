const Professor = require('../database/professor')
const { Router } = require("express")


const router = Router()

router.get("/professores", async (req, res) => {
    const listaProfessores = await Professor.findAll()
    res.json(listaProfessores)
})

router.get("/professores/:id", async (req, res) => {
    const { id } = req.params;
    const professor = await Professor.findOne({ where: { id } });
    if (professor) {
    res.json(professor);
    } else {
    res.status(404).json({ message: "Professor não encontrado." })
    }
});

