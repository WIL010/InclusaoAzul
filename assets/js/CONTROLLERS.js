const SERVICES = require('./SERVICES.js');

module.exports.cadastrarUsuario = async (req, res) => {
    let json = { error: '', result: {} };
    let { nome, usuario, email, senha } = req.body;

    if (nome && usuario && email && senha) {
        try {
            let usuarioCodigo = await SERVICES.inserirUsuario(nome, usuario, email, senha);
            json.result = {
                codigo: usuarioCodigo,
                nome,
                usuario,
                email,
                senha
            };
        } catch (error) {
            json.error = 'Erro ao cadastrar usuário';
        }
    } else {
        json.error = 'Campos não enviados';
    }
    res.json(json);
};

const { buscarUsuarios } = require('./SERVICES.js');

// Exemplo de uso da função buscarUsuarios
buscarUsuarios()
    .then(usuarios => {
        // Manipule os resultados dos usuários aqui
        console.log('Usuários encontrados:', usuarios);
    })
    .catch(error => {
        // Lidar com erros caso a consulta falhe
        console.error('Erro ao buscar usuários:', error);
    });