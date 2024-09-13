// Initial References
const countValue = document.getElementById("count");
const colorPart = document.querySelectorAll(".color-part");
const container = document.querySelector(".container");
const startButton = document.querySelector("#start");
const result = document.querySelector("#result");
const wrapper = document.querySelector(".wrapper");

// Mapping Colors By Creating Colors Object
const colors = {
  color1: {
    current: "#068e06",
    new: "#11e711",
  },
  color2: {
    current: "#950303",
    new: "#fd2a2a",
  },
  color3: {
    current: "#01018a",
    new: "#2062fc",
  },
  color4: {
    current: "#919102",
    new: "#fafa18",
  },
};

let randomColors = [];
let pathGeneratorBool = false;
let count,
  clickCount = 0;
const maxRounds = 10; // Set the limit to 10 rounds

// Function to start game
startButton.addEventListener("click", () => {
  count = 0;
  clickCount = 0;
  randomColors = [];
  pathGeneratorBool = false;
  wrapper.classList.remove("hide");
  container.classList.add("hide");
  pathGenerate();
});

// Function to decide the sequence
const pathGenerate = () => {
  randomColors.push(generateRandomValue(colors));
  count = randomColors.length;
  if (count > maxRounds) {
    winGame(); // Player wins after reaching 10 rounds
  } else {
    pathGeneratorBool = true;
    pathDecide(count);
  }
};

// Function to get a random value from object
const generateRandomValue = (obj) => {
  let arr = Object.keys(obj);
  return arr[Math.floor(Math.random() * arr.length)];
};

// Function to play the sequence
const pathDecide = async (count) => {
  countValue.innerText = count;
  for (let i of randomColors) {
    let currentColor = document.querySelector(`.${i}`);
    await delay(500);
    flashColor(currentColor, colors[i]["new"], colors[i]["current"]);
    await delay(600);
  }
  pathGeneratorBool = false;
};

// Function to add flashing animation
const flashColor = (element, flashColor, originalColor) => {
  element.style.backgroundColor = flashColor;
  setTimeout(() => {
    element.style.backgroundColor = originalColor;
  }, 600);
};

// Delay for blink effect
async function delay(time) {
  return await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// When user clicks on the colors
colorPart.forEach((element) => {
  element.addEventListener("click", async (e) => {
    // If path is still being generated, do nothing
    if (pathGeneratorBool) {
      return false;
    }
    const clickedColor = e.target.classList[1]; // Get the class that identifies the color (e.g., "color1")
    
    if (clickedColor === randomColors[clickCount]) {
      // Flash color on click
      flashColor(e.target, colors[clickedColor]["new"], colors[clickedColor]["current"]);
      clickCount++;

      // If user clicked the correct sequence, move to next round
      if (clickCount === count) {
        clickCount = 0;
        pathGenerate();
      }
    } else {
      lose(); // Player clicked the wrong color
    }
  });
});

// Function when player executes wrong sequence
const lose = () => {
  result.innerHTML = `<span> Your Score: </span> ${count - 1}`; // Score is (count - 1) because they lose before completing the current level
  result.classList.remove("hide");
  container.classList.remove("hide");
  wrapper.classList.add("hide");
  startButton.innerText = "Play Again";
  startButton.classList.remove("hide");
};

// Function for winning the game
const winGame = () => {
  result.innerHTML = `<span>Congratulations!</span> You Win!`;
  result.classList.remove("hide");
  container.classList.remove("hide");
  wrapper.classList.add("hide");
  startButton.innerText = "Play Again";
  startButton.classList.remove("hide");
};
