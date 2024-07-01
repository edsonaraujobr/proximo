import db from "../db.js";

export const getStudents = (req, res) => {
    const { registration } = req.body;

    const query = "SELECT * FROM student WHERE registration = ?";

    db.query(query, [registration], (err, data) =>{
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

    db.query(query, [registration], (err,data) => {
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

            db.query(queryInsert, queryParams, (err, data) => {
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
