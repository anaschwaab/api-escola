require("dotenv").config();
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger.js');


const app = express();
app.use(express.json());

const { connection, authenticate } = require("./database/database");
authenticate(connection);

const rotasAlunos = require("./routes/alunos");
const rotasTurmas = require("./routes/turmas");
const rotasProfessores = require("./routes/professores");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use(rotasAlunos);
app.use(rotasTurmas);
app.use(rotasProfessores);


app.listen(3000, () => {
  connection.sync({ force: true });
  console.log("Servidor rodando em http://localhost:3000");
});
