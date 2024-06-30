import db from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;


export const getClerks = (req, res) => {
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
                    console.log(clerk.id)
                    
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

let recoveryCodes = {};

import nodemailer from 'nodemailer';

// Função para enviar o código de recuperação
export const sendRecoveryCode = async (req, res) => {
    const { email } = req.body;

    // Geração do código de recuperação
    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
    recoveryCodes[email] = recoveryCode;

    // Enviar email com o código de recuperação
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
    const query = "UPDATE clerk SET password=? WHERE email=?";
  
    db.query(query, [password, email], (err, data) => {
      if (err) {
        console.log('Erro ao atualizar a senha no banco de dados:');
        console.error('Erro ao atualizar a senha no banco de dados:', err);
        return res.status(500).json({ error: 'Erro ao atualizar a senha' });
      }
  
      if (data.affectedRows > 0) {
        console.log('Senha atualizada com sucesso');
        return res.status(200).json({ message: 'Senha atualizada com sucesso' });
      } else {
        console.log('usuário não encontrado');
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
    });
  };