const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game 
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    //update UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }

    else {
        currentPlayer = "X"; 
    }

    //UI Updata
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //swap turn
        swapTurn();

        //game is over or not
        checkGameOver();
    }
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //delclear winner
    if(answer != "") {
        gameInfo.innerText = `winnner is - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //if game is Tie!
    let counter = 0;

    gameGrid.forEach((box) => {
        if(box != "") {
            counter++;
        }
    })

    if(counter === 9)  {
        gameInfo.innerText = `Game is Tie!`;
        newGameBtn.classList.add("active");
    }

}


boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);