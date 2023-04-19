const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Professor = connection.define("professor", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    materia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Turma = require("./turma");

// Relacionamento 1:1 entre Turma e Professor
Professor.belongsTo(Turma);
Turma.hasOne(Professor);


module.exports = Professor;