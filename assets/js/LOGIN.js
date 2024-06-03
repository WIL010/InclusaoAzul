const { buscarUsuarios } = require("./SERVICES");

// Função para mostrar/esconder a senha
function togglePasswordVisibility() {
    let inputSenha = document.querySelector('#senha');
    inputSenha.type = inputSenha.type === 'password' ? 'text' : 'password';
}

// Adiciona evento de clique ao ícone de olho para mostrar/esconder a senha
document.querySelector('#eyeIcon').addEventListener('click', togglePasswordVisibility);

// Função para processar o login
async function entrar(event) {
    event.preventDefault();
    let email = document.querySelector('#email').value.trim();
    let senha = document.querySelector('#senha').value.trim();
    let msgError = document.querySelector('#msgError');

    if (!email || !senha) {
        msgError.style.display = 'block';
        msgError.innerHTML = 'Por favor, forneça um email e uma senha';
        return;
    }

    try {
        // Verifica se o usuário está cadastrado no sistema
        const usuarioCadastrado = await verificarUsuarioCadastrado(email, senha);
        
        if (usuarioCadastrado) {
            // Redireciona para a página HOME.html após o login bem-sucedido
            window.location.href = '../html/HOME.html';

            // Gera um token aleatório
            let mathRandom = Math.random().toString(16).substr(2);
            let token = mathRandom + mathRandom;

            // Armazena o token e o usuário logado no localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userLogado', JSON.stringify(email));
        } else {
            // Exibe uma mensagem de erro se o usuário não estiver cadastrado
            msgError.style.display = 'block';
            msgError.innerHTML = 'Email ou senha incorretos';
        }
    } catch (error) {
        // Exibe uma mensagem de erro genérica se ocorrer um erro ao verificar o usuário
        console.error('Erro ao verificar usuário:', error);
        msgError.style.display = 'block';
        msgError.innerHTML = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.';
    }
}

// Função para verificar se o usuário está cadastrado no sistema
async function verificarUsuarioCadastrado(email, senha) {
    try {
        // Busca todos os usuários do sistema
        const usuarios = await fetch('http://localhost:3000/api/usuarios').then(response => response.json());

        // Verifica se há um usuário com o email e senha fornecidos
        const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

        // Retorna verdadeiro se o usuário foi encontrado, falso caso contrário
        return !!usuarioEncontrado;
    } catch (error) {
        // Em caso de erro, lança uma exceção
        throw new Error('Erro ao buscar usuários:', error);
    }
}

// Adiciona evento de envio ao formulário de login
document.querySelector('#formLogin').addEventListener('submit', entrar);
