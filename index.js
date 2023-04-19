require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());

const  { connection, authenticate } = require("./database/database");
authenticate(connection);

const rotasAlunos = require("./routes/alunos");
const rotasTurmas = require("./routes/turmas");



app.use(rotasAlunos);
app.use(rotasTurmas);


app.listen(3000, () => {
    connection.sync({force: true});
    console.log("Servidor rodando em http://localhost:3000");
});