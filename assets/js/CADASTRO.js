document.addEventListener('DOMContentLoaded', () => {
    let nome = document.querySelector('#nome');
    let labelNome = document.querySelector('#labelNome');
    let validNome = false;

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
        console.log(`validNome: ${validNome}, validEmail: ${validEmail}, validSenha: ${validSenha}, validConfirmSenha: ${validConfirmSenha}`);
        if (validNome && validEmail && validSenha && validConfirmSenha) {
            let userData = {
                nome: nome.value,
                email: email.value,
                senha: senha.value
            };
            fetch('http://localhost:3000/api/usuarios', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then(response => {
                console.log(response); // Adicionando log para verificar a resposta da API
                return response.json();
            }).then(userData => {
                console.log(userData); // Adicionando log para verificar os dados recebidos
                if (userData.error) {
                    msgError.style.display = 'block';
                    msgError.innerHTML = `<strong>${userData.error}</strong>`;
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
                console.log('Detalhes do erro:', error.message); // Mostrar mensagem de erro
                console.log('Stack trace:', error.stack); // Mostrar stack trace do erro
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
