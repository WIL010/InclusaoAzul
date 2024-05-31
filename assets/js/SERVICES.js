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

module.exports.buscarUsuarios = () => {
    return new Promise((resolve, reject) => {
        // Consulta SQL para selecionar todos os usuários
        const query = 'SELECT * FROM usuarios';

        // Execute a consulta SQL
        db.query(query, (error, results) => {
            if (error) {
                // Se ocorrer um erro, rejeite a promessa com o erro
                reject(error);
            } else {
                // Se a consulta for bem-sucedida, resolva a promessa com os resultados
                resolve(results);
            }
        });
    });
};