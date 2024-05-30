
const db = require('./DB');  
const server = require('./SERVER');

app.use(bodyParser.json());

app.post('/inserir', async (req, res) => {
    let json = { error: '', result: {} };

    let { nome, usuario, email, senha } = req.body;

    if (nome && usuario && email && senha) {
        try {
            let usuarioCodigo = await inserirUsuario(nome, usuario, email, senha);
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
});

function inserirUsuario(nome, usuario, email, senha) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (nome, usuario, email, senha) VALUES (?, ?, ?, ?)',
            [nome, usuario, email, senha],
            (error, results) => {
                if (error) { reject(error); return; }
                resolve(results.insertId);
            }
        );
    });
}


