require("dotenv").config();
const express = require("express");
(bodyParser = require("body-parser")),
  (swaggerJsdoc = require("swagger-jsdoc")),
  (swaggerUi = require("swagger-ui-express"));
const morgan = require("morgan");

const app = express();
app.use(express.json());

const { connection, authenticate } = require("./database/database");
authenticate(connection);

const rotasAlunos = require("./routes/alunos");
const rotasTurmas = require("./routes/turmas");
const rotasProfessores = require("./routes/professores");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Soulcode Academy",
      version: "1.0",
      description:
        "Essa é uma CRUD API criada com Express e documentada com Swagger",
    //   license: {
    //     name: "MIT",
    //     url: "https://spdx.org/licenses/MIT.html",
    //   },
    //   contact: {
    //     name: "LogRocket",
    //     url: "https://logrocket.com",
    //     email: "info@email.com",
    //   },
    },
    servers: [
      {
        url: "http://localhost:3000/alunos",
      },
      {
        url: "http://localhost:3000/professores",
      },
      {
        url: "http://localhost:3000/turmas",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use(rotasAlunos);
app.use(rotasTurmas);
app.use(rotasProfessores);


app.listen(3000, () => {
  connection.sync({ force: true });
  console.log("Servidor rodando em http://localhost:3000");
});
