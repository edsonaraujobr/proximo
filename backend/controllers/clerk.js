import db from "../db.js";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
const saltRounds = 10;

export const getClerk = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM clerk WHERE email = ?";

    db.query(query, [email], (err, data) =>{
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }

        if (data.length > 0) {
            bcrypt.compare(password, data[0].password, (err, result) => {
                if(result) {
                    const clerk = data[0];
                    
                    const responseClerk = {
                      id: clerk.id,
                      name: clerk.full_name,
                      photo: `http://localhost:3030/uploads/${clerk.photo}`,
                    };

                    return res.status(200).json({ message: 'Usuário autenticado com sucesso', responseClerk });
                } else {
                    return res.status(404).json({ error: 'Usuário não encontrado' });
                }
            })
            
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
};

export const registerClerk = (req,res) => {
    const { nameClerk, emailClerk, passwordClerk, shiftClerk, idAdministrator } = req.body;
    const photoClerk = req.file ? req.file.filename : null;

    console.log("aqui")
    const query = "SELECT * FROM clerk WHERE email = ?";

    db.query(query, [emailClerk], (err,data) => {
        if(err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao buscar atendente' });
        }

        if(data.length == 0) {
            bcrypt.hash(passwordClerk, saltRounds, (err,hash) => {
                let queryInsert = "INSERT INTO clerk (full_name, email, password, id_administrator" ;
                let queryParams = [ nameClerk, emailClerk, hash, idAdministrator ];

                if(shiftClerk && shiftClerk.trim() !== '') {
                    queryInsert += ", shift";
                    queryParams.push(shiftClerk);
                }
                if(photoClerk) {
                    queryInsert += ", photo";
                    queryParams.push(photoClerk);
                }

                queryInsert += ") VALUES (?,?,?,?";

                if(shiftClerk && shiftClerk.trim() !== '') {
                    queryInsert += ",?";
                }
                if(photoClerk) {
                    queryInsert += ",?";
                }

                queryInsert += ")";

                db.query(queryInsert, queryParams, (err, data) => {
                    if(err) {
                        console.error('Erro ao inserir atendente no banco de dados:', err);
                        return res.status(500).json({ error: 'Erro ao inserir atendente no banco de dados' });
                    }
                    const imageUrl = photoClerk ? `/uploads/${photoClerk}` : null;
                    return res.status(200).json({ message: 'Atendente cadastrado com sucesso' });
                })
            })


        } else {
            console.error('Atendente já cadastrado!', err);
            return res.status(500).json({ error: 'Já existe esse atendente cadastrado' });
        }
    });
}

export const getAllClerks = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const query = "SELECT id, full_name, email, shift FROM clerk ORDER BY full_name ASC LIMIT ?,? ";
    const totalRowsQuery = "SELECT COUNT(*) AS total_rows FROM clerk";

    db.query(totalRowsQuery, (err, totalRowsData) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar total de atendentes" });
        }
    
        const totalRows = totalRowsData[0].total_rows;

        db.query(query, [startIndex, limit], (err, data) => {
            if(err) {
                return res.status(500).json({error: "Erro ao buscar atendentes"});
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

export const updateClerk = (req, res) => {
    const { id, nameClerk, emailClerk, shiftClerk} = req.body;
    
    if (!id || !nameClerk || !emailClerk ) {
        return res.status(400).send('Dados insuficientes');
    }
    const query = `UPDATE clerk SET full_name = ?, email = ?, shift = ? WHERE id = ?`;
    const values = [nameClerk, emailClerk, shiftClerk || null, id];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar atendente');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Atendente não encontrado');
        }

        res.send('Atendente atualizado com sucesso');
    });

}

export const removeClerk = (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('Dados insuficientes');
    }

    const query = `DELETE FROM clerk WHERE id = ?`;
    
    db.query(query, id, (err, result) => {
        if(err) {
            return res.status(500).send('Erro ao remover atendente');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Atendente não encontrado');
        }

        res.status(200).send('Atendente removido com sucesso');
    })
}
let recoveryCodes = {};

export const sendRecoveryCode = async (req, res) => {
    const { email } = req.body;

    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
    recoveryCodes[email] = recoveryCode;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'proximoru@gmail.com',
            pass: 'golo dvuw vifa pmwi'
        }
    });

    const mailOptions = {
        from: 'proximoru@gmail.com',
        to: email,
        subject: 'Código de Recuperação de Senha',
        text: `Seu código de recuperação é: ${recoveryCode}`
    };

    const query = "SELECT * FROM clerk WHERE email = ?";

    db.query(query, [email], async (err, data) =>{
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao localizar usuário' });
        }

        if (data.length > 0) {
            try {
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: 'Código de recuperação enviado' });
                console.log('Email enviado com sucesso')
            } catch (emailErr) {
                console.error('Erro ao enviar email:', emailErr);
                res.status(500).json({ error: 'Erro ao enviar email' });
            }
        } else {
            console.log('Usuário não encontrado')
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
};

export const verifyRecoveryCode = (req, res) => {
    const { email, code } = req.body;

    if (recoveryCodes[email] && recoveryCodes[email] === code) {
        delete recoveryCodes[email];
        res.status(200).json({ message: 'Código verificado com sucesso' });
    } else {
        res.status(400).json({ error: 'Código de recuperação inválido' });
    }
};

export const updatePassword = (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err,hash) => {
        const query = `UPDATE clerk SET password='${hash}' WHERE email='${email}'`;
        db.query(query, [password, email], (err, data) => {
            if (err) {
              console.error('Erro ao atualizar a senha no banco de dados:', err);
              return res.status(500).json({ error: 'Erro ao atualizar a senha' });
            }
        
            if (data.affectedRows > 0) {
              return res.status(200).json({ message: 'Senha atualizada com sucesso' });
            } else {
              return res.status(404).json({ error: 'Usuário não encontrado' });
            }
          });
    })
  };


  export const updatePasswordId = (req, res) => {
    const { id, password, current } = req.body;

    const queryGetPassword = "SELECT password FROM clerk WHERE id = ?";

    db.query(queryGetPassword, [id], (err, data) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao localizar usuário' });
        }
        
        if (data.length > 0) {
            const storedPassword = data[0].password;

            bcrypt.compare(current, storedPassword, (err, isMatch) => {
                if (err) {
                    console.error('Erro ao comparar senhas:', err);
                    return res.status(500).json({ error: 'Erro ao verificar senha' });
                }

                if (isMatch) {
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        if (err) {
                            console.error('Erro ao hashear a nova senha:', err);
                            return res.status(500).json({ error: 'Erro ao processar nova senha' });
                        }

                        const queryUpdatePassword = "UPDATE clerk SET password = ? WHERE id = ?";

                        db.query(queryUpdatePassword, [hash, id], (err, result) => {
                            if (err) {
                                console.error('Erro ao atualizar a senha no banco de dados:', err);
                                
                                return res.status(500).json({ error: 'Erro ao atualizar a senha' });
                            }

                            if (result.affectedRows > 0) {
                                return res.status(200).json({ message: 'Senha atualizada com sucesso' });
                            } else {
                                return res.status(404).json({ error: 'Usuário não encontrado' });
                            }
                        });
                    });
                } else {
                    return res.status(400).json({ error: 'Senha atual incorreta' });
                }
            });
        } else {
            
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
};
