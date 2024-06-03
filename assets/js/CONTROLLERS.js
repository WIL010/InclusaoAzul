const db = require('./DB.js')
const SERVICES = require('./SERVICES.js');

module.exports.cadastrarUsuario = async (req, res) => {
    let json = { error: '', result: {} };
    let { nome, email, senha } = req.body;

    if (nome && email && senha) {
        try {
            let usuarioCodigo = await SERVICES.inserirUsuario(nome, email, senha);
            json.result = {
                codigo: usuarioCodigo,
                nome,
                email,
                senha
            };
            res.json(json);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error); // Adicionando log para o erro específico
            json.error = 'Erro ao cadastrar usuário: ' + error.message; // Incluindo mensagem de erro específica
            res.status(500).json(json); // Retornar status 500 para indicar um erro interno do servidor
        }
    } else {
        json.error = 'Campos não enviados';
        res.status(400).json(json); // Retornar status 400 para indicar uma solicitação inválida do cliente
    }
};

// Exemplo de uso da função buscarUsuarios
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