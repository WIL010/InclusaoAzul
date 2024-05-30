if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "LOGIN.html";
  }
  
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  
  const logado = document.querySelector("#logado");
  logado.innerHTML = `Olá ${userLogado.nome}`;
  
  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "./assets/html/LOGIN.html";
  }

  document.getElementById('quiz-button').addEventListener('click', function(event) {
    event.preventDefault(); // Impede que o link navegue para outra página
    document.getElementById('popup').style.display = 'flex';
});

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Selecionar o botão do quiz e o pop-up
const quizButton = document.getElementById('quiz-button');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');

// Mostrar o pop-up quando o botão do quiz for clicado
quizButton.addEventListener('click', () => {
    popup.style.display = 'flex';
});

// Fechar o pop-up quando o botão de fechar for clicado
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Fechar o pop-up quando clicar fora do conteúdo do pop-up
window.addEventListener('click', (e) => {
    if (e.target == popup) {
        popup.style.display = 'none';
    }
});