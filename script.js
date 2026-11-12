
// ======================================
// LITTLE THINGS ABOUT YOU
// Complete JavaScript
// ======================================


// 1. Questions database

const questions = [

    {
        icon: "🌍",
        category: "YOUR FAVOURITES",
        question: "What is your favourite place?",
        options: ["Mountains 🏔️", "Beach 🌊", "Cafe ☕", "My Home 🏡"]
    },

    {
        icon: "🍕",
        category: "FOOD & HAPPINESS",
        question: "What is your favourite food?",
        options: ["Pizza 🍕", "Pasta 🍝", "Biryani 🍛", "Ice Cream 🍦"]
    },

    {
        icon: "🎨",
        category: "YOUR PERSONALITY",
        question: "Which colour do you love the most?",
        options: ["Pink 🌸", "Black 🖤", "White 🤍", "Blue 💙"]
    },

    {
        icon: "🎵",
        category: "MUSIC & MOOD",
        question: "What do you enjoy listening to?",
        options: ["Romantic Songs ❤️", "Sad Songs 🥺", "Party Songs 🎉", "Classical Music 🎶"]
    },

    {
        icon: "✨",
        category: "LITTLE JOYS",
        question: "What makes you happiest?",
        options: ["Travelling ✈️", "Family ❤️", "Friends 🫶", "Shopping 🛍️"]
    },

    {
        icon: "🌙",
        category: "YOUR LIFESTYLE",
        question: "Are you a morning or night person?",
        options: ["Morning Person ☀️", "Night Owl 🌙", "Both 😄", "Depends on Mood"]
    },

    {
        icon: "💭",
        category: "DREAMS & WISHES",
        question: "What is your dream destination?",
        options: ["Paris 🗼", "Switzerland 🏔️", "Dubai 🌆", "Japan 🌸"]
    },

    {
        icon: "💌",
        category: "YOUR FEELINGS",
        question: "What matters most in a relationship?",
        options: ["Trust 🤝", "Loyalty ❤️", "Understanding 🫂", "Respect 🌷"]
    },

    {
        icon: "📱",
        category: "FUN QUESTIONS",
        question: "What do you prefer?",
        options: ["Texting 💬", "Calling 📞", "Video Call 🎥", "Meeting 😊"]
    },

    {
        icon: "🌸",
        category: "ONE LAST QUESTION",
        question: "Describe yourself in one word!",
        options: ["Cute 🥰", "Funny 😂", "Creative ✨", "Adventurous 🌍"]
    }

];


// 2. HTML elements

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const personName = document.getElementById("personName");
const startBtn = document.getElementById("startBtn");

const questionNumber = document.getElementById("questionNumber");
const questionIcon = document.getElementById("questionIcon");
const questionText = document.getElementById("questionText");
const category = document.getElementById("category");

const optionsContainer = document.getElementById("options");
const customAnswer = document.getElementById("customAnswer");
const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");

const resultName = document.getElementById("resultName");
const answerSummary = document.getElementById("answerSummary");

const restartBtn = document.getElementById("restartBtn");

const heartsContainer = document.getElementById("hearts");


// 3. Game variables

let currentQuestion = 0;
let selectedAnswer = "";
let userAnswers = [];
let userName = "Beautiful";


// 4. Check HTML elements

const requiredElements = [
    welcomeScreen,
    quizScreen,
    resultScreen,
    personName,
    startBtn,
    questionNumber,
    questionIcon,
    questionText,
    category,
    optionsContainer,
    customAnswer,
    nextBtn,
    progress,
    resultName,
    answerSummary,
    restartBtn
];

if (requiredElements.some(element => !element)) {
    console.error(
        "Some HTML elements are missing. Check your index.html IDs."
    );
}


// 5. Screen switching

function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(function(item) {
        item.classList.remove("active");
    });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// 6. Start game

startBtn.addEventListener("click", function() {

    const name = personName.value.trim();

    if (!name) {
        alert("Please enter your name first! ♡");
        personName.focus();
        return;
    }

    userName = name;

    currentQuestion = 0;
    selectedAnswer = "";
    userAnswers = [];

    showScreen(quizScreen);

    loadQuestion();

});


// 7. Load question

function loadQuestion() {

    const q = questions[currentQuestion];

    selectedAnswer = "";
    customAnswer.value = "";

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0") +
        " / " +
        String(questions.length).padStart(2, "0");

    questionIcon.textContent = q.icon;
    category.textContent = q.category;
    questionText.textContent = q.question;

    progress.style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    optionsContainer.innerHTML = "";

    q.options.forEach(function(option) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "option-btn";
        button.textContent = option;

        button.setAttribute("aria-pressed", "false");

        button.addEventListener("click", function() {

            const allButtons =
                optionsContainer.querySelectorAll(".option-btn");

            allButtons.forEach(function(btn) {

                btn.classList.remove("selected");
                btn.setAttribute("aria-pressed", "false");

            });

            button.classList.add("selected");
            button.setAttribute("aria-pressed", "true");

            selectedAnswer = option;

            // Clear custom answer when option is selected
            customAnswer.value = "";

        });

        optionsContainer.appendChild(button);

    });

    if (currentQuestion === questions.length - 1) {

        nextBtn.textContent = "See My Surprise ♥";

    } else {

        nextBtn.textContent = "Next Question →";

    }

}


// 8. Next question

nextBtn.addEventListener("click", function() {

    const typedAnswer = customAnswer.value.trim();

    const finalAnswer = typedAnswer || selectedAnswer;

    if (!finalAnswer) {

        alert("Please select or write an answer! ♡");

        return;

    }

    userAnswers[currentQuestion] = {

        question: questions[currentQuestion].question,
        answer: finalAnswer

    };

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        showResult();

    }

});


// 9. Show final result

function showResult() {

    showScreen(resultScreen);

    resultName.textContent = userName + "!";

    answerSummary.innerHTML = "";

    userAnswers.forEach(function(item, index) {

        const div = document.createElement("div");

        div.className = "answer-item";

        const title = document.createElement("strong");

        title.textContent =
            (index + 1) + ". " + item.question;

        const answer = document.createElement("span");

        answer.textContent = item.answer;

        div.appendChild(title);
        div.appendChild(answer);

        answerSummary.appendChild(div);

    });

}


// 10. Restart game

restartBtn.addEventListener("click", function() {

    currentQuestion = 0;

    selectedAnswer = "";

    userAnswers = [];

    userName = "Beautiful";

    personName.value = "";

    progress.style.width = "0%";

    showScreen(welcomeScreen);

    personName.focus();

});


// 11. Floating hearts animation

function createHeart() {

    if (!heartsContainer) {
        return;
    }

    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = "♥";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (15 + Math.random() * 20) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(function() {

        heart.remove();

    }, 13000);

}


// Start hearts only if container exists

if (heartsContainer) {

    setInterval(createHeart, 900);

}


// 12. Console success message

console.log(
    "Little Things About You is ready! ♡"
);
