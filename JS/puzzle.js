let flag = false;
const xhr = new XMLHttpRequest();
const key = "YLEFkgxyjrYiQziAhkkVuzGg5r93JkQXvS41DOwD";

function getData() {
    let date = document.getElementById("image-date").value;

    if (date !== "" || flag) {
        let endpoint = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;
        fetch(endpoint);
    } else {
        displayError("Kindly choose the picture date or press on Today's Image");
    }
    flag = false;
}

function fetch(endpoint) {
    xhr.open("GET", endpoint, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            displayData(response);
        } else {
            displayError("Failed to Fetch The Picture Of The Day. The date you selected might be different from NASA's time zone.");
        }
    };
    xhr.onerror = function () {
        displayError("An error occurred while fetching the picture");
    };
    xhr.send();
}

function todaysDate() {
    let endpoint = `https://api.nasa.gov/planetary/apod?api_key=${key}`;
    flag = true;
    fetch(endpoint);
}

function displayData(data) {
    const puzzleElement = document.getElementById("fetchedData");
    puzzleElement.innerHTML = "";

    // Create container for image and button
    const imageDisplay = document.createElement("div");
    imageDisplay.id = "image-display";
    puzzleElement.appendChild(imageDisplay);

    // Create Picture <div> and append it to the image display
    const imgBackgroundElement = document.createElement("div");
    imgBackgroundElement.id = "POD";
    imageDisplay.appendChild(imgBackgroundElement);

    const url = data.url;
    const title = data.title;
    appendPicture(imgBackgroundElement, url, title, puzzleElement);

    // Create Start Puzzle button
    const startButton = document.createElement("button");
    startButton.id = "start-puzzle";
    startButton.className = "button puzzle-button";
    startButton.textContent = "Start Puzzle";
    startButton.onclick = () => startPuzzle(url);
    imageDisplay.appendChild(startButton);

    // Create a div for Picture's Info
    const infoElement = document.createElement("div");
    infoElement.classList.add("infoContainer");
    puzzleElement.appendChild(infoElement);

    appendTitle(title, infoElement);

    const date = data.date;
    appendDate(infoElement, date);

    const explanation = data.explanation;
    appendExplanation(infoElement, explanation);

    const copyright = data.copyright;
    appendCopyright(infoElement, copyright);


    const iframeContainer = document.createElement("div");
    iframeContainer.id = "puzzle-container";
    puzzleElement.appendChild(iframeContainer);

    puzzleElement.style.visibility = "visible";
}

function startPuzzle(imageUrl) {
    const encodedUrl = encodeURIComponent(imageUrl);
    const iframeContainer = document.getElementById("puzzle-container");
    iframeContainer.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "600px";
    iframe.style.maxHeight = "90vh";
    iframe.style.borderStyle = "solid";
    iframe.style.borderWidth = "2px";
    iframe.style.borderColor = "#888";
    iframe.allowFullScreen = true;
    iframe.src = `https://www.jigsawexplorer.com/online-jigsaw-puzzle-player.html?frm=1&url=${encodedUrl}`;
    iframe.title = "Jigsaw Puzzle";

    iframeContainer.appendChild(iframe);

    iframeContainer.style.display = "block";

    iframeContainer.scrollIntoView({ behavior: 'smooth' });
}

function appendPicture(imgBackgroundElement, url, title, puzzleElement) {
    const pictureElement = document.createElement("img");
    pictureElement.id = "image";
    pictureElement.src = url;
    pictureElement.alt = title;
    imgBackgroundElement.appendChild(pictureElement);
    puzzleElement.style.visibility = "visible";
}

function appendTitle(title, infoElement) {
    const titleElement = document.createElement("p");
    titleElement.classList.add("ImgInfo");
    titleElement.textContent = `Title: ${title}`;
    infoElement.appendChild(titleElement);
}

function appendDate(infoElement, date) {
    const dateElement = document.createElement("p");
    dateElement.classList.add("ImgInfo");
    dateElement.textContent = `Date: ${date}`;
    infoElement.appendChild(dateElement);
}

function appendCopyright(infoElement, copyright) {
    const copyrightElement = document.createElement("p");
    copyrightElement.classList.add("ImgInfo");
    copyrightElement.textContent = `Copyright: ${copyright}`;
    infoElement.appendChild(copyrightElement);
}

function appendExplanation(infoElement, explanation) {
    const explanationElement = document.createElement("p");
    explanationElement.classList.add("ImgInfo");
    explanationElement.textContent = `Explanation: ${explanation}`;
    infoElement.appendChild(explanationElement);
}

function displayError(errorMessage) {
    const puzzleElement = document.getElementById("fetchedData");
    puzzleElement.innerHTML = "";

    const errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent = errorMessage;

    puzzleElement.appendChild(errorElement);
    puzzleElement.style.visibility = "visible";
}
