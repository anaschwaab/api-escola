const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Turma = connection.define("turma", {
    serie: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        },
    },
    codigo: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate:{
            isAlphanumeric: true,
            notEmpty: true
        },
    },
});


const Aluno = require("./aluno");

// Relacionamento 1:N entre Turma e Aluno
Turma.hasMany(Aluno);
Aluno.belongsTo(Turma);



module.exports = Turma;