// Função para mostrar/esconder a senha
function togglePasswordVisibility() {
    const inputSenha = document.querySelector('#senha');
    inputSenha.type = inputSenha.type === 'password' ? 'text' : 'password';
}

// Adiciona evento de clique ao ícone de olho para mostrar/esconder a senha
document.querySelector('#eyeIcon').addEventListener('click', togglePasswordVisibility);

// Função para processar o login
async function entrar(event) {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const senha = document.querySelector('#senha').value.trim();
    const msgError = document.querySelector('#msgError');

    if (!email || !senha) {
        exibirMensagemErro('Por favor, forneça um email e uma senha');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar usuários');

        const usuarios = await response.json();
        const usuarioCadastrado = usuarios.find(user => user.email === email && user.senha === senha);

        if (usuarioCadastrado) {
            redirecionarParaHome(email);
        } else {
            exibirMensagemErro('Email ou senha incorretos');
        }
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        exibirMensagemErro('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
    }
}

// Função para exibir mensagem de erro
function exibirMensagemErro(mensagem) {
    const msgError = document.querySelector('#msgError');
    msgError.style.display = 'block';
    msgError.textContent = mensagem;
}

// Função para redirecionar para a página HOME.html após login bem-sucedido
function redirecionarParaHome(email) {
    const token = gerarTokenSeguro();
    localStorage.setItem('token', token);
    localStorage.setItem('userLogado', JSON.stringify(email));
    window.location.href = '../html/HOME.html';
}

// Função para gerar um token seguro
function gerarTokenSeguro() {
    return crypto.getRandomValues(new Uint8Array(16)).toString();
}

// Adiciona evento de envio ao formulário de login
document.querySelector('#formLogin').addEventListener('submit', entrar);
