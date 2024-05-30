const DB = require('./DB')

module.exports = {
    inserir: (nome, usuario, email, senha)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO usuarios (nome, usuario, email, senha) VALUES (?, ?, ?)',
                [nome, usuario, email, senha],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },
};