import database from "../database/connection.db.js";

export const getStudent = (req, res) => {
    const { registration } = req.params;

    const query = "SELECT * FROM student WHERE registration = ?";

    database.query(query, [registration], (err, data) =>{
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }

        if (data.length > 0) {
            const student = data[0];

            const responseStudent = {
              registration: student.registration,
              typeAssistance: student.type_assistance,
              name: student.full_name,
              course: student.course,
              noticeNumber: student.notice_number,
              dateStartedAssistance: student.date_started_assistance,
              photo: `http://localhost:3030/uploads/${student.photo}`,
            };

            return res.status(200).json({ message: 'Usuário autenticado com sucesso', responseStudent });
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
};

export const registerStudents = (req,res) => {
    const { registration, typeAssistance, name, course, noticeNumber, dateStartedAssistance,idAdministrator} = req.body;
    const photo = req.file ? req.file.filename : null;

    const query = "SELECT * FROM student WHERE registration = ?";

    database.query(query, [registration], (err,data) => {
        if(err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao buscar estudante' });
        }

        if(data.length == 0) {
            let queryInsert = "INSERT INTO student (registration, type_assistance, full_name, course,id_administrator" 
            let queryParams = [registration, typeAssistance, name, course, idAdministrator]

            if(noticeNumber && noticeNumber.trim() !== '') {
                queryInsert += ", notice_number";
                queryParams.push(noticeNumber);
            }
            if(dateStartedAssistance && dateStartedAssistance.trim() !== '') {
                queryInsert += ", date_started_assistance";
                queryParams.push(dateStartedAssistance);
            }
            if(photo) {
                queryInsert += ", photo";
                queryParams.push(photo);
            }

            queryInsert += ") VALUES (?,?,?,?,?";

            if(noticeNumber && noticeNumber.trim() !== '') {
                queryInsert += ",?";
            }
            if(dateStartedAssistance && dateStartedAssistance.trim() !== '') {
                queryInsert += ",?";
            }
            if(photo) {
                queryInsert += ",?";
            }
            queryInsert += ")";

            database.query(queryInsert, queryParams, (err, data) => {
                if(err) {
                    console.error('Erro ao inserir aluno no banco de dados:', err);
                    return res.status(500).json({ error: 'Erro ao inserir aluno no banco de dados' });
                } 
                return res.status(200).json({ message: 'Aluno cadastrado com sucesso'});
            });

        } else {
            console.error('Usuario já cadastrado!', err);
            return res.status(500).json({ error: 'Já existe esse usuário cadastrado' });
        }
    });
}

export const getAllStudents = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const query = "SELECT registration, type_assistance, full_name, course, notice_number, date_started_assistance FROM student ORDER BY full_name ASC LIMIT ?,? ";
    const totalRowsQuery = "SELECT COUNT(*) AS total_rows FROM student";

    database.query(totalRowsQuery, (err, totalRowsData) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar total de alunos" });
        }
    
        const totalRows = totalRowsData[0].total_rows;

        database.query(query, [startIndex, limit], (err, data) => {
            if(err) {
                return res.status(500).json({error: "Erro ao buscar alunos"});
            }
    
            if(data.length > 0) {
                const totalPages = Math.ceil(totalRows / limit)
    
    
                return res.status(200).json({
                    totalPages,
                    currentPage: page,
                    results: data,
                    next: page < totalPages ? page + 1 : null,
                    previous: page > 1 ? page - 1 : null
                });
            }
        })
    })

}

export const updateStudent = (req, res) => {
    const { registration } = req.params
    const { course, type_assistance, notice_number, date_started_assistance} = req.body;

    if (!registration) {
        return res.status(400).send('Dados insuficientes');
    }

    const query = `UPDATE student SET course = ?, type_assistance = ?, notice_number = ?, date_started_assistance = ? WHERE registration = ?`;
    const values = [course, type_assistance, notice_number || null , date_started_assistance || null , registration];

    database.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar aluno');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Aluno não encontrado');
        }

        res.send('Aluno atualizado com sucesso');
    });

}

export const removeStudent = (req, res) => {
    const { registration } = req.params;

    if (!registration) {
        return res.status(400).send('Dados insuficientes');
    }

    const query = `DELETE FROM student WHERE registration = ?`;
    
    database.query(query, registration, (err, result) => {
        if(err) {
            return res.status(500).send('Erro ao remover aluno');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Aluno não encontrado');
        }

        res.status(200).send('Aluno removido com sucesso');
    })
}
