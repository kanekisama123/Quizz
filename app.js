const result = document.getElementById("result");
const spanScores = document.getElementById("scores");
let mydata = [];
let cont = 0;
let prop = [];
let al = [];
score = 0 ;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateAnswerHTML = (answer, isCorrect) => {
  return `
    <div class="anser" id="${answer.split(" ")
    .join("")
    .replace(/[^a-zA-Z ]/g, "")}" onclick="correctAnswer('${answer}', '${isCorrect}')">
      <span>${answer}</span>
    </div>
  `;
};

const generateQuestionHTML = (question, answers) => {
  const answerHTML = answers.map((answer) => generateAnswerHTML(answer.value, answer.type)).join('');
  return `
    <div class="data">
      <div class="dataquestions">
        <span>${question}</span>
      </div>
      ${answerHTML}
    </div>
  `;
};

const question = async () => {
  const response = await fetch("https://the-trivia-api.com/api/questions?limit=50");
  const data = await response.json();
  mydata = data;
  prop = mydata[cont];
  console.log(prop, 'fff')
  al = shuffleArray([{value: prop.correctAnswer, type: true}, {value: prop.incorrectAnswers[0], type: false},
    {value: prop.incorrectAnswers[1], type: false}, {value: prop.incorrectAnswers[2], type: false}]);
  console.log(al)
  result.innerHTML = generateQuestionHTML(prop.question, al);
};

const correctAnswer = (answer, type) => {
  if (JSON.parse(type)) {
    const addCSS = (css) =>
      (document.head.appendChild(document.createElement("style")).innerHTML =
        css);
    addCSS(
      `#${answer
        .split(" ")
        .join("")
        .replace(/[^a-zA-Z &"' ]/g, "")}{ background:green; }`
    );
    score += 1; 

  }else {
    const addCSS = (css) =>
      (document.head.appendChild(document.createElement("style")).innerHTML =
        css);
    addCSS(
      `#${answer
        .split(" ")
        .join("")
        .replace(/[^a-zA-Z &"'_0123456789 ]/g, "")}{ background:red; }`
    );
  };
  spanScores.textContent = score; 
  setTimeout(() => {
    next();
  }, 500);
 
};

const next = () => {
  cont = cont + 1 ;
  prop = mydata[cont]
  al = shuffleArray([{value: prop.correctAnswer, type: true}, {value: prop.incorrectAnswers[0], type: false},
    {value: prop.incorrectAnswers[1], type: false}, {value: prop.incorrectAnswers[2], type: false}]);
  result.innerHTML = generateQuestionHTML(prop.question, al);
};

question();
