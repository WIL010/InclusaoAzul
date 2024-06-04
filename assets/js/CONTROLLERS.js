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
module.exports.buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await SERVICES.buscarUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};
