const SERVICES = require('./SERVICES');

module.exports = {
    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let nome = req.body.name;
        let usuario = req.body.usuario
        let email = req.body.email;
        let senha = req.body.senha;

        if (nome && email && senha){
            let usuarioCodigo = await SERVICES.inserir(nome, usuario, email, senha);
            json.result = {
                codigo: usuarioCodigo,
                nome,
                usuario,
                email,
                senha
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

}