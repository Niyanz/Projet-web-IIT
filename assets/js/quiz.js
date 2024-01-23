let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "Quel langage est principalement utilisé pour créer la structure d'une page web ?",
        options: ["Java", "HTML", "CSS", "JavaScript"],
        correct: "HTML",
    },
    {
        id: "1",
        question: " Quel attribut est utilisé pour lier une feuille de style externe à une page HTML ?",
        options: ["link", "style", "css", "script"],
        correct: "link",
    },
    {
        id: "2",
        question: "Quelle est la fonction principale de JavaScript dans le développement web ?",
        options: ["Définir le style d'une page", "Créer la structure d'une page", "Ajouter des fonctionnalités interactives à une page", "Styliser une page web"],
        correct: "Ajouter des fonctionnalités interactives à une page",
    },
    {
        id: "3",
        question: "Quel est le rôle de la propriété 'display' en CSS ?",
        options: ["Contrôler l'affichage des éléments", "Définir la couleur du texte", "Animer les éléments", "Ajouter des bordures aux éléments"],
        correct: "Contrôler l'affichage des éléments",
    },
    {
        id: "4",
        question: "Quel langage est principalement utilisé pour la conception du côté client dans le développement web?",
        options: ["Java", "Python", "HTML", "Ruby"],
        correct: "HTML",
    },
    {
        id: "5",
        question: "Quelle est la signification de l'acronyme 'URL' en développement web ?",
        options: ["Universal Resource Locator", " Uniform Resource Locator", "Universal Resource Link", "Uniform Resource Link"],
        correct: "<ol>",
    }, {
        id: "6",
        question: "Qu'est-ce que CSS signifie en développement web ?",
        options: ["Computer Style Sheets", " Creative Style Sheets", "Cascading Style Sheets"],
        correct: "Cascading Style Sheets",
    }
  
];
//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener("click", (displayNext = () => {
    // increment questionCount
    questionCount += 1;

    // if last question
    if (questionCount == quizArray.length) {
        // hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");

        // user score
        userScore.innerHTML =
            "<span style='color: red;'>Your score is " + scoreCount + " out of " + questionCount + "</span>";
    } else {
        // display questionCount
        countOfQuestion.innerHTML =
            questionCount + 1 + " of " + quizArray.length + " Question";

        // display quiz
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
}));

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};
//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}
//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};