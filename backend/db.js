import mysql from "mysql2"

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    // port: 3300,
    password: "root",
    database: "ru"
})

// Estabelece a conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});

export default db;