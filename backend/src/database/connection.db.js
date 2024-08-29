import mysql from "mysql2";

const database = mysql.createConnection({
  host: "mysql",
  user: "root",
  port: 3306,
  password: "root",
  database: "ru",
});

database.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão com o banco de dados estabelecida!");
});

export default database;

