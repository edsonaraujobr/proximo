import db from "../db.js";

export const createOrder = (req,res) => {
    const { price_total, price, type_payment, registration_student, quantity_kg, quantity_items, id_service } = req.body;

    let queryInsert = "INSERT INTO orders (price_total, price_paid, type_payment, id_service";
    let queryParams = [ price_total, price, type_payment, id_service ];

    if(registration_student && registration_student.trim() !== '') {
        queryInsert += ", registration_student"
        queryParams.push(registration_student)
    }
    if(quantity_kg !== 0 && quantity_kg) {
        queryInsert += ", quantity_kg"
        queryParams.push(quantity_kg)
    }
    if(quantity_items !== 0 && quantity_items) {
        queryInsert += ", quantity_items"
        queryParams.push(quantity_items)
    }

    queryInsert += ") VALUES (?,?,?,?";
    if(registration_student && registration_student.trim() !== '') {
        queryInsert += ",?"
    }
    if(quantity_kg !== 0) {
        queryInsert += ",?"
    } else if(quantity_items !== 0) {
        queryInsert += ",?"
    }

    queryInsert += ")";

    db.query(queryInsert, queryParams, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar comanda' });
        }

        if (data.affectedRows > 0) {
            return res.status(200).json({ message: 'Comanda criado com sucesso' });
        } else {
            return res.status(404).json({ error: 'Comanda não criado.' });
        }
    })
}