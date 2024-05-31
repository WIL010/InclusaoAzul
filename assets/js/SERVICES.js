const db = require('./DB.js')

module.exports.inserirUsuario = (nome, usuario, email, senha) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (nome, usuario, email, senha) VALUES (?, ?, ?, ?)',
            [nome, usuario, email, senha],
            (error, results) => {
                if (error) { reject(error); return; }
                resolve(results.insertId);
            }
        );
    });
};