import db from "../db.js";
import moment from 'moment-timezone';

export const createService = (req,res) => {
    const { date, type_service, id_clerk } = req.body

    const query = "INSERT INTO service (date_service,type_service,id_clerk) VALUES (?,?,?)"

    const formattedDate = moment(date).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

    db.query(query, [formattedDate, type_service, id_clerk], (err,data) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao criar serviço' });
        }

        if (data.affectedRows > 0) {
            return res.status(200).json({ message: 'Serviço criado com sucesso', id: data.insertId });
        } else {
            return res.status(404).json({ error: 'Serviço não criado.' });
        }
    });

}