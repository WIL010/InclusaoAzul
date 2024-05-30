const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const textoFinalElement = document.querySelector(".texto-final");
const btnRestart = document.querySelector(".finish button");

// As perguntas e respostas estão armazenadas diretamente no código
const questions = [
  {
  question: "A criança gosta de se balançar, de pular no seu joelho, etc?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Tem interesse por outras crianças?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Gosta de subir em coisas, como escadas ou móveis?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Gosta de brincar de esconder e mostrar o rosto ou esconde-esconde?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Já brincou de faz-de-conta, como, por exemplo, fazer de conta que está falando no telefone ou que está cuidando da boneca, ou qualquer outra brincadeira de faz-de-conta?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Já imitou sons que você fez (ex.: \"carro\", \"cachorro\", etc.)?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Já usou o dedo indicador para apontar, para pedir alguma coisa?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Já usou o dedo indicador para apontar, para indicar interesse em algo?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Consegue brincar de forma correta com brinquedos pequenos (ex: carros ou blocos) sem apenas colocar na boca, remexer no brinquedo ou deixar o brinquedo cair?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Alguma vez trouxe objetos para você (pais) para mostrá-los?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Olha para você nos olhos por mais de um segundo ou dois?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Já pareceu muito sensível ao barulho (ex.: tapando os ouvidos)?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Sorri como resposta às suas expressões faciais ou ao seu sorriso?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Imita você (ex você faz expressões/caretas e ela o imita)?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Responde/olha quando você a chama pelo nome?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Se você apontar para um brinquedo do outro lado da sala, a criança acompanha com o olhar?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Já sabe andar?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Olha para coisas que você está olhando?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Responde quando você fala com ela (ex.: \"Vem aqui\", \"Dá tchau\", etc.)?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Brinca de jogar a bola para você e vice-versa?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Parece entender o que você diz, mesmo que não seja uma palavra específica?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Fala algumas palavras (ex.: mamãe, papai, vovó, etc.)?",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
{
  question: "Combina palavras para formar frases (ex.: \"mamãe me dá\", \"quero água\")",
  answers: [
    { option: "Sim", correct: true },
    { option: "Não", correct: false },
  ],
},
];

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
   exibirTextoFinal(); // Chamar a função para exibir o texto
}

function exibirTextoFinal() {
   const textoFinalElement = document.querySelector(".texto-final");
   content.style.display = "none";
   contentFinish.style.display = "flex";

   if (questionsCorrect <= 2) {
    textoFinalElement.textContent = "Baixo risco:\nÉ improvável que a criança tenha TEA. Se ela tiver menos de 2 anos, repita o teste.";
   } else if (questionsCorrect >= 3 && questionsCorrect <= 8) {
    textoFinalElement.textContent = "Moderado risco:\nColete a história da criança e os sintomas para melhor avaliação.";
   } else {
    textoFinalElement.textContent = "Alto risco:\nConsulte um especialista para confirmar o diagnóstico e iniciar o tratamento.";
   }
}


function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
    `;
    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
