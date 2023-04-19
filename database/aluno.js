const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Aluno = connection.define("aluno", {
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
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = Aluno;