import db from "../db.js";

export const getAdministrators = (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM administrator WHERE (name = ? OR email = ?) AND password = ?";

    db.query(query, [username,username, password], (err, data) =>{
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }

        if (data.length > 0) {
            return res.status(200).json({ message: 'Usuário autenticado com sucesso', user: data[0] });
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
};