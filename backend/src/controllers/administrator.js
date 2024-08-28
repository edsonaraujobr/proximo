import database from "../database/connection.db.js";
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET

export const login = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM administrator WHERE email = ? AND password = ?";

    database.query(query, [email, password], (err, data) =>{
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }

        if (data.length > 0) {
            const adm = data[0];

            const token = jwt.sign(
                {
                    name: adm.full_name,
                    email: adm.email
                }, 
                SECRET,
                {
                    expiresIn: '1m' 
                }
            )

            const responseAdministrator = {
                id: adm.id,
                name: adm.full_name,
                token: token
            };

            return res.status(200).json({ message: 'Usuário autenticado com sucesso', user: responseAdministrator });
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
};

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

    const query = "SELECT * FROM administrator WHERE email = ?";

    database.query(query, [email], async (err, data) =>{
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
    const query = "UPDATE administrator SET password=? WHERE email=?";
  
    database.query(query, [password, email], (err, data) => {
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

export const updatePasswordId = (req, res) => {
    const { id, password, current } = req.body;

    const queryGetPassword = "SELECT password FROM administrator WHERE id = ?";

    database.query(queryGetPassword, [id], (err, data) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao localizar usuário' });
        }
        
        if (data.length > 0) {
            
            const storedPassword = data[0].password;

            if(storedPassword==current){
                
                const queryUpdatePassword = "UPDATE administrator SET password = ? WHERE id = ?";

                database.query(queryUpdatePassword, [password, id], (err, result) => {
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
            }else {
                return res.status(400).json({ error: 'Senha atual incorreta' });
            }
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
};