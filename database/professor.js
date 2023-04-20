const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Professor = connection.define("professor", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{ 
            isEmail: true,
            notEmpty: true },
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [10,17],
            notEmpty: true},
    },
    materia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        },
    },
});

const Turma = require("./turma");

// Relacionamento 1:1 entre Turma e Professor
Professor.belongsTo(Turma);
Turma.hasOne(Professor);


module.exports = Professor;