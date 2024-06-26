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
              name: student.name,
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
            let queryInsert = "INSERT INTO student (registration, type_assistance, full_name, course, notice_number, date_started_assistance, photo,id_administrator) VALUES (?,?,?,?,?,?,?,?)" 

            db.query(queryInsert,[registration, typeAssistance, name, course, noticeNumber, dateStartedAssistance, photo, idAdministrator], (err, data) => {
                if(err) {
                    console.log("deu erro")
                    console.error('Erro ao inserir aluno no banco de dados:', err);
                    return res.status(500).json({ error: 'Erro ao inserir aluno no banco de dados' });
                } 
                return res.status(200).json({ message: 'Aluno cadastrado com sucesso'});
            })

        } else {
            console.error('Usuario já cadastrado!', err);
            return res.status(500).json({ error: 'Já existe esse usuário cadastrado' });
        }
    });
}
