/* Função para fechar o pop-up */
window.closePopup = function() {
    document.getElementById('popup').style.display = 'none';
  }
  
  /* Mostrar o pop-up quando a página carregar */
  window.onload = function() {
    document.getElementById('popup').style.display = 'flex';
  }