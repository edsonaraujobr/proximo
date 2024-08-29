import moment from 'moment-timezone';
import database from "../database/connection.db.js";


export const createService = (req,res) => {
    const { id } = req.params
    const { date, type_service } = req.body

    const query = "INSERT INTO service (date_service,type_service,id_clerk) VALUES (?,?,?)"

    const formattedDate = moment(date).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

    database.query(query, [formattedDate, type_service, id], (err,data) => {
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

export const getServices = (req, res) => {
    const { id } = req.params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const query = `
        SELECT service.id,date_service, type_service,COUNT(service.id) AS total_services 
        FROM service
        INNER JOIN orders ON id_service = service.id 
        WHERE service.id_clerk = ?
        GROUP BY service.id      
        ORDER BY date_service 
        DESC LIMIT ?, ?; 
    `;
    
    database.query(query, [id,startIndex, limit], (err, results) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao buscar serviços' });
        }
        const countQuery = `        
            SELECT COUNT(*) AS total_rows 
            FROM (
                SELECT service.id,date_service, type_service,COUNT(service.id) AS total_services 
                FROM service
                INNER JOIN orders ON id_service = service.id 
                WHERE service.id_clerk = ?
                GROUP BY service.id   
            ) AS result_set
        `;

        database.query(countQuery, [id], (err, countResults) => {
            if (err) {
                console.error('Erro ao contar serviços:', err);
                return res.status(500).json({ error: 'Erro ao contar serviços' });
            }
            const total = countResults[0].total_rows;
            const totalPages = Math.ceil(total / limit);

            res.json({
                totalPages,
                currentPage: page,
                results: results,
                next: page < totalPages ? page + 1 : null,
                previous: page > 1 ? page - 1 : null
            });
        });
    });
};

export const getReport = (req,res) => {
    const {id} = req.params;
    const queryOrders = `SELECT price_total, price_paid, type_payment, registration_student, quantity_kg, quantity_items, student.type_assistance,
        (SELECT COUNT(*) FROM orders WHERE id_service = ?) AS total_clients
        FROM orders 
        LEFT JOIN student ON orders.registration_student = student.registration
        WHERE id_service = ?;`

    database.query(queryOrders, [id,id], (err, dataOrders) => {
        if(err) {
            return res.status(500).json({error: 'Erro ao buscar atendimento'});
        }

        if(dataOrders.length > 0) {
            const queryServices = `
                SELECT date_service, type_service, clerk.full_name AS name_clerk
                FROM service
                INNER JOIN clerk ON id_clerk = clerk.id AND service.id = ?;
            `;

            database.query(queryServices, id, (err, dataService) => {

                if(err) {
                    return res.status(500).json({error: 'Erro ao buscar serviço'});
                }

                if(dataService.length > 0) {
                    const { date_service, type_service, name_clerk } = dataService[0];

                    const ordersData = dataOrders.map(order => {
                        let data = {
                            price_total: order.price_total,
                            price_paid: order.price_paid,
                            type_payment: order.type_payment
                        };
                        if(order.type_assistance) {
                            data.type_assistance = order.type_assistance;
                        }
                        if(order.registration_student) {
                            data.registration_student = order.registration_student;
                        }
                        if(order.quantity_kg) {
                            data.quantity_kg = order.quantity_kg;
                        }
                        if(order.quantity_items) {
                            data.quantity_items = order.quantity_items;
                        }

                        return data;
                    });

                    const data = {
                        date_service,
                        type_service,
                        name_clerk,
                        total_clients: dataOrders[0].total_clients,
                        ordersData
                    }
    
                    return res.status(200).json({data})
                }
            })
        }
    })
};
