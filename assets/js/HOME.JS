// Verifica se o usuário está logado
function verificarLogin() {
    const token = localStorage.getItem("token");
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));
    if (!token || !userLogado) {
        alert("Você precisa estar logado para acessar essa página");
        window.location.href = "LOGIN.html";
    }
    return userLogado;
}

// Função para exibir o nome do usuário logado
function exibirNomeUsuario() {
    const userLogado = verificarLogin();
    const logado = document.querySelector("#logado");
    logado.textContent = `Olá, ${userLogado.nome}`;
}

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "./assets/html/LOGIN.html";
}

// Função para exibir o pop-up do quiz
function exibirPopupQuiz() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
}

// Adiciona event listeners aos elementos relevantes
function adicionarEventListeners() {
    // Event listener para o botão do quiz
    document.getElementById('quiz-button').addEventListener('click', (event) => {
        event.preventDefault();
        exibirPopupQuiz();
    });

    // Event listener para fechar o pop-up clicando fora dele
    window.addEventListener('click', (e) => {
        const popup = document.getElementById('popup');
        if (e.target == popup) {
            fecharPopupQuiz();
        }
    });
}

// Função principal para iniciar o código da HOME
function iniciarHome() {
    exibirNomeUsuario();
    adicionarEventListeners();
}

// Chamada da função principal quando a página for carregada
window.onload = iniciarHome;
