import db from "../db.js";

export const getAdministradores = (_, res) => {
    const q = "SELECT * FROM administrador";

    db.query(q, (err, data) =>{
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar administradores.", details: err });
        }

        return res.status(200).json(data);
    });
};