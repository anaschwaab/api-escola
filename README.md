# API ESCOLA

## Objetivo
O principal propósito desse projeto foi praticar e aprender mais sobre Express e ORM através da construção de uma API simples com MySQL que gerencia a parte acadêmica de uma escola, além de praticar a documentação com Swagger.

## Funcionalidades
- **CRUD de Alunos, Professores e Turmas:**
    - A API oferece endpoints para criar, visualizar, atualizar e excluir registros de alunos, professores e turmas. 
- **Filtragem com where:**
    - Além das operações CRUD básicas, a API disponibiliza rotas de filtragem, permitindo consultas mais específicas através do uso de cláusulas WHERE. Isso facilita a busca e recuperação de informações específicas com base em critérios definidos.
- **Validações de campos com Sequelize**
    - Utilizando o Sequelize, uma biblioteca ORM (Object-Relational Mapping) para Node.js, foram implementadas validações nos campos, garantindo que apenas dados válidos e consistentes sejam armazenados no banco de dados.

- **Documentação Swagger** 
    - A documentação com Swagger facilita a compreensão e utilização da API, proporcionando uma interface interativa para explorar os endpoints disponíveis, os parâmetros aceitos e os formatos de resposta. Para acessá-la, siga o passo-a-passo abaixo:


## Executando o Projeto Localmente

Para executar esse projeto certifique-se de ter o ambiente configurado com as seguintes ferramentas:
- [Node.js](https://nodejs.org/en)
- [MySQL](https://www.mysql.com/downloads/Building/)
- [GIT](https://git-scm.com/downloads)



1. **Clone o Repositório:**

   - Copie o link do repositório no [Github](https://github.com/anaschwaab/API-Escola)
   - Abra o terminal e navegue até a pasta onde você deseja clonar o projeto.
   - Execute o comando abaixo, substituindo `link` pelo link do repositório que você copiou:

     ```bash
     git clone link
     ```

2. **Acesse o Diretório do Projeto:**

   - Navegue para o diretório do projeto usando o terminal. Você pode fazer isso com o comando:

     ```bash
     cd nome-do-projeto
     ```

   Substitua `nome-do-projeto` pelo nome da pasta onde o projeto foi clonado.

3. **Instale as Dependências:**

   - Execute o seguinte comando para instalar as dependências do projeto:

     ```bash
     npm install
     ```

4. **Inicie o Aplicativo:**

   - Após a instalação das dependências, rode a API localmente:

     ```bash
     npm start
     ```
5. **Acesse o Swagger:**

    - Clique [aqui](http://localhost:3000/api-docs) e acesse e explore de forma fácil e intuitiva todas as funcionalidades oferecidas pela API.
