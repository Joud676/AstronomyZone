// Joud Jalal Batarfi 2210353
const xhr = new XMLHttpRequest();
const key = "YLEFkgxyjrYiQziAhkkVuzGg5r93JkQXvS41DOwD";


async function fetchAPOD(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Failed to fetch");
        return await response.json();
    } catch (error) {
        displayError(error.message);
    }
}

let apodImages = [];

async function startGame() {

    const startInput = document.getElementById("start-date").value;
    const endInput = document.getElementById("end-date").value;

    if (!startInput || !endInput) {
        displayError("Kindly choose the picture's start and end date");
        return;
    }

    const startDate = new Date(startInput);
    const endDate = new Date(endInput);

    if (endDate < startDate) {
        displayError("End date must be after start date");
        return;
    }

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays < 4) {
        displayError("Please select at least 4 days");
        return;
    }

    apodImages = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split("T")[0];
        const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${formattedDate}`;
        const data = await fetchAPOD(endpoint);
        if (data) apodImages.push(data);
        apodImages.push(data);
        currentDate.setDate(currentDate.getDate() + 1);
    }


    apodImages = shuffle(apodImages);
    memoryGameStart(apodImages);
}

function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function memoryGameStart(images) {
    const gameBoard = document.getElementById("game-board");
    const errorDiv = document.getElementById("fetchedData");
    errorDiv.innerHTML = "";
    gameBoard.innerHTML = "";
    winContainer.innerHTML = "";


    images.forEach((imageData, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.padding = "15px";
        card.dataset.index = index;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
🚀
                </div>
                <div class="card-back">
                <img src="${imageData.url}" alt="${imageData.title}" />
                </div>
            </div>
        `;

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
<<<<<<< HEAD
    const newButton = document.getElementById("new");
    newButton.style.display = "inline"
=======
     const newButton = document.getElementById("new");
        newButton.style.display = "inline"
>>>>>>> 189364e5fd0dfc9677db4dcc8a21ce2ad067d2a7
}


function flipCard() {
    if (lockBoard) return;
    const clickedCard = this;

    if (clickedCard === firstCard) return;

    clickedCard.classList.add("flipped");

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    lockBoard = true;

    const firstIndex = firstCard.dataset.index;
    const secondIndex = secondCard.dataset.index;

    const firstImage = apodImages[firstIndex];
    const secondImage = apodImages[secondIndex];

    if (firstImage.url === secondImage.url) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetBoard();
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
}


function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkWin() {
    const allMatched = document.querySelectorAll(".card.matched").length === apodImages.length;
    if (allMatched) {
        const winContainer = document.getElementById("win-message");
        winContainer.innerHTML = "";
        const winMessage = document.createElement("p");
        winMessage.classList.add("winMessage");
        winMessage.textContent = "You win! 🎉";
        winMessage.style.background = "rgba(58, 4, 87, 0.575);";
        winMessage.style.boxShadow = "0 0 20px rgba(58, 17, 85, 0.51)";
        winContainer.appendChild(winMessage);
    }
}

function reset() {
    const newButton = document.getElementById("new");
    newButton.style.display = "none";

    const gameBoard = document.getElementById("game-board");
    if (gameBoard) gameBoard.innerHTML = "";

    const winMessage = document.getElementById("win-message");
    if (winMessage) winMessage.innerHTML = "";

    const fetchedData = document.getElementById("fetchedData");
    if (fetchedData) fetchedData.innerHTML = "";
}


function displayError(errorMessage) {
    const fetchedDataElement = document.getElementById("fetchedData");
    fetchedDataElement.innerHTML = "";

    const errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent = errorMessage;

    fetchedDataElement.appendChild(errorElement);
    fetchedDataElement.style.visibility = "visible";
}
