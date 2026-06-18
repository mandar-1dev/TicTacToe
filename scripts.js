let boxes = [...document.querySelectorAll(".box")];
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // O starts

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Handle box click
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnO) {
            box.innerText = "O";
            box.style.color = "green";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "black";
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

// Enable all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Display winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check winner
const checkWinner = () => {

    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos2Val !== "" &&
            pos3Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val
        ) {
            showWinner(pos1Val);
            return;
        }
    }

    // Check draw
    const allFilled = boxes.every((box) => box.innerText !== "");

    if (allFilled) {
        msg.innerText = "Match Drawn";
        msgContainer.classList.remove("hide");
    }
};

// Reset game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);