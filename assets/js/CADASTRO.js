document.addEventListener('DOMContentLoaded', () => {
    let nome = document.querySelector('#nome');
    let labelNome = document.querySelector('#labelNome');
    let validNome = false;

    let usuario = document.querySelector('#usuario');
    let labelUsuario = document.querySelector('#labelUsuario');
    let validUsuario = false;

    let email = document.querySelector('#email');
    let labelEmail = document.querySelector('#labelEmail');
    let validEmail = false;

    let senha = document.querySelector('#senha');
    let labelSenha = document.querySelector('#labelSenha');
    let validSenha = false;

    let confirmSenha = document.querySelector('#confirmSenha');
    let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
    let validConfirmSenha = false;

    let msgError = document.querySelector('#msgError');
    let msgSuccess = document.querySelector('#msgSuccess');

    let btn = document.querySelector('#verSenha');
    let btnConfirm = document.querySelector('#verConfirmSenha');

    nome.addEventListener('keyup', () => {
        validNome = nome.value.length >= 3;
        labelNome.style.color = validNome ? 'green' : 'red';
        labelNome.textContent = validNome ? 'Nome' : 'Nome *Insira no mínimo 3 caracteres';
        nome.style.borderColor = validNome ? 'green' : 'red';
    });

    usuario.addEventListener('keyup', () => {
        validUsuario = usuario.value.length >= 5;
        labelUsuario.style.color = validUsuario ? 'green' : 'red';
        labelUsuario.textContent = validUsuario ? 'Usuário' : 'Usuário *Insira no mínimo 5 caracteres';
        usuario.style.borderColor = validUsuario ? 'green' : 'red';
    });

    email.addEventListener('keyup', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validEmail = emailPattern.test(email.value);
        labelEmail.style.color = validEmail ? 'green' : 'red';
        labelEmail.textContent = validEmail ? 'Email' : 'Email *Insira um email válido';
        email.style.borderColor = validEmail ? 'green' : 'red';
    });

    senha.addEventListener('keyup', () => {
        validSenha = senha.value.length >= 6;
        labelSenha.style.color = validSenha ? 'green' : 'red';
        labelSenha.textContent = validSenha ? 'Senha' : 'Senha *Insira no mínimo 6 caracteres';
        senha.style.borderColor = validSenha ? 'green' : 'red';
    });

    confirmSenha.addEventListener('keyup', () => {
        validConfirmSenha = senha.value === confirmSenha.value;
        labelConfirmSenha.style.color = validConfirmSenha ? 'green' : 'red';
        labelConfirmSenha.textContent = validConfirmSenha ? 'Confirmar Senha' : 'Confirmar Senha *As senhas não conferem';
        confirmSenha.style.borderColor = validConfirmSenha ? 'green' : 'red';
    });

    document.querySelector('#formCadastro').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(`validNome: ${validNome}, validUsuario: ${validUsuario}, validEmail: ${validEmail}, validSenha: ${validSenha}, validConfirmSenha: ${validConfirmSenha}`);
        if (validNome && validUsuario && validEmail && validSenha && validConfirmSenha) {
            let userData = {
                nome: nome.value,
                usuario: usuario.value,
                email: email.value,
                senha: senha.value
            };

            fetch('http://127.0.0.1:5500/api/inserir', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then(response => {
                console.log(response); // Adicionando log para verificar a resposta da API
                return response.json();
            }).then(data => {
                console.log(data); // Adicionando log para verificar os dados recebidos
                if (data.error) {
                    msgError.style.display = 'block';
                    msgError.innerHTML = `<strong>${data.error}</strong>`;
                    msgSuccess.style.display = 'none';
                } else {
                    msgSuccess.style.display = 'block';
                    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
                    msgError.style.display = 'none';

                    setTimeout(() => {
                        window.location.href = '../html/LOGIN.html';
                    }, 3000);
                }
            }).catch(error => {
                console.error('Erro ao fazer a requisição:', error); // Adicionando log para erros na requisição
            });
        } else {
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
            msgSuccess.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        let inputSenha = document.querySelector('#senha');
        inputSenha.type = inputSenha.type === 'password' ? 'text' : 'password';
    });

    btnConfirm.addEventListener('click', () => {
        let inputConfirmSenha = document.querySelector('#confirmSenha');
        inputConfirmSenha.type = inputConfirmSenha.type === 'password' ? 'text' : 'password';
    });
});
