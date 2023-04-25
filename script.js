const playerMarker = {
    oMark: "O",
    xMark: "X"
}

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", () => {
    Game.startGame();
});

const restartBtn = document.querySelector("#restart-btn");
restartBtn.addEventListener("click", () => {
    Game.restartGame();
});

const Gameboard = ( () => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    let marker = "O";

    const display = () => {
        let board = "";
        gameboard.forEach((square, index) => {
            board += `<div class="square" id="square-${index}">${square}</div>`;
        })

        document.querySelector(".gameboard").innerHTML = board;
        
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener("click", () => {
                Game.markSquare(event);
            });
        })
    }

    const updateGameboard = (squareIndex) => {
        if (gameboard[squareIndex] == "") {
            marker = marker == playerMarker.xMark ? playerMarker.oMark : playerMarker.xMark;
            gameboard[squareIndex] = marker;
            display();
        }
    }

    const clearGameboard = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];
        marker = "";
    }

    const checkWinner = (p1Name,p2Name) => {
        const winCombos = [
            [0,1,2],
            [0,4,8],
            [0,3,6],
            [3,4,5],
            [6,7,8],
            [2,4,6],
            [1,4,7],
            [2,5,8],
        ];
        for(let i = 0; i < winCombos.length; i++) {
            const[a,b,c] = winCombos[i];
            if (gameboard[a] && 
                gameboard[a] === gameboard[b] && 
                gameboard[a] === gameboard[c]){
                    if(gameboard[a] === "X"){
                        ResultDisplay.displayResult((`${p1Name} has Won!`));
                    }
                    else{
                        ResultDisplay.displayResult((`${p2Name} has Won!`));
                    }
                    return true;
            }
        }
        return false;
    }

    const checkTie = () => {
        if (gameboard.every(cell => cell !== "")){
            return true;
        }
        return false;
    }
    
    return{
        display, updateGameboard, clearGameboard, checkWinner, checkTie
    }
})();

const Game = ( () => {
    let gameOver;
    let playerName1;
    let playerName2;

    const startGame = () => {
        playerName1 = document.querySelector('#player-name1').value
        playerName2 = document.querySelector('#player-name2').value
        if(playerName1 === "" || playerName2 === ""){
            alert("Please enter a name");
            return
        }
        gameOver = false;
        Gameboard.display();
    }

    const markSquare = (event) => {
        if(gameOver){
            return;
        }
        let squareId = event.target.id.split('-')[1];
        Gameboard.updateGameboard(squareId);
        if(Gameboard.checkWinner(playerName1,playerName2)){
            gameOver = true;
            
        }
        else if(Gameboard.checkTie()){
            gameOver = true;
            ResultDisplay.displayResult("Its a tie!");
        }
    }

    const restartGame = () => {
        Gameboard.clearGameboard();
        ResultDisplay.clearDisplay();
        startGame();
    }

    return {
        startGame, markSquare, restartGame
    }
})();

const ResultDisplay = (() => {
    const displayResult = (message) => {
        document.querySelector('.result-container').innerHTML = message;
    }
    
    const clearDisplay = () => {
        document.querySelector('.result-container').innerHTML = "";
    }

    return{
        displayResult, clearDisplay
    }
})();
