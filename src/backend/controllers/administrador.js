import { db } from "../db.js";

export const getAdministradores = (_, res) => {
    // Verifica se a conexão com o banco de dados está estabelecida
    if (!db._connectCalled) {
        return res.status(500).json({ error: "A conexão com o banco de dados não foi estabelecida!" });
    }

    const q = "SELECT * FROM administrador";

    db.query(q, (err, data) =>{
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar administradores.", details: err });
        }

        return res.status(200).json(data);
    });
};