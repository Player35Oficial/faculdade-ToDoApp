const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

// converter dados do formulário em objetos javascript
app.use(
  express.urlencoded({
    extended: true,
  })
);

// rotas
app.post("/criar", (req, res) => {
  const { descricao } = req.body;
  const completa = 0;

  const sql = `INSERT INTO tarefas(descricao, completa) VALUES('${descricao}', '${completa}')`;

  conexao.query(sql, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/");
  });
});

app.get("/", (req, res) => {
  const sql = "SELECT * from tarefas";

  conexao.query(sql, (erro, dados) => {
    if (erro) {
      return console.log(erro);
    }

    const tarefas = dados.map((dado) => {
      return {
        id: dados.id,
        descricao: dado.descricao,
        completa: dado.completa === 0 ? false : true,
      };
    });
  });

  res.render("home");
});

const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todoapp",
  port: "3306",
});

conexao.connect((erro) => {
  if (erro) {
    return console.log(erro);
  }
  console.log("conectado ao mysql");
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
  });
});
