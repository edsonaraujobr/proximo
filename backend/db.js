import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "root",
    database: "ru"
})

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão com o banco de dados estabelecida!");
});

export default db;
