const swaggerJsdoc = require('swagger-jsdoc');


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Soulcode Academy",
            version: "1.0",
            description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        }  ,
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
