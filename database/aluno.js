const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Aluno = connection.define("aluno", {
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
    matricula: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isNumeric: true,
        },
    },
});

module.exports = Aluno;