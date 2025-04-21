// Game Configuration
const BOARD_SIZE = 8;
const MAX_ATTEMPTS = 30;
const SHIPS = [
    { name: "Battleship", size: 4 },
    { name: "Cruiser", size: 3 },
    { name: "Destroyer", size: 2 }
];

// Game State Variables
let gameBoard = [];
let attemptsLeft = MAX_ATTEMPTS;
let gameOver = false;
let totalShipParts = 0;
let hitCount = 0;

// DOM Elements
const gameBoardElement = document.getElementById('game-board');
const attemptsLeftElement = document.getElementById('attempts-left');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

// Initialize the game when the page loads
window.onload = initializeGame;

// Reset button event listener
resetButton.addEventListener('click', resetGame);

/**
 * Initialize the game
 * This function is called when the page loads and when the reset button is clicked
 */
function initializeGame() {
    // Reset game state
    gameBoard = createEmptyBoard();


    // Place ships randomly on the board
    placeShipsRandomly();

    // Render the game board
    renderBoard();

    // Update the attempts display
    updateAttemptsDisplay();

    // Display initial message
    displayMessage("Find all ships to win! Click on the grid to fire.", "info");
}

/**
 * Create an empty game board
 * This function creates a 2D array representing the game board
 * Each cell in the array is an object with properties for tracking the game state
 */
function createEmptyBoard() {
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        const newRow = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            newRow.push({
                hasShip: false,
                isHit: false,
                isMiss: false
            });
        }
        board.push(newRow);
    }
    return board;
}

/**
 * Place ships randomly on the board
 * This function places the ships randomly on the board
 * Ships are placed horizontally (left to right) only
 */
function placeShipsRandomly() {
    // This is provided for you - the algorithm for random ship placement
    for (let i = 0; i < SHIPS.length; i++) {
        let placed = false;

        while (!placed) {
            // Get random starting position
            // For horizontal placement only
            const row = Math.floor(Math.random() * BOARD_SIZE);
            const col = Math.floor(Math.random() * (BOARD_SIZE - SHIPS[i].size + 1));

            // Check if position is valid (no overlapping ships)
            let valid = true;
            for (let j = 0; j < SHIPS[i].size; j++) {
                if (gameBoard[row][col + j].hasShip) {
                    valid = false;
                    break;
                }
            }

            // Place ship if position is valid
            if (valid) {
                for (let j = 0; j < SHIPS[i].size; j++) {
                    gameBoard[row][col + j].hasShip = true;
                }
                totalShipParts += SHIPS[i].size;
                placed = true;
            }
        }
    }
}

/**
 * Render the game board
 * This function renders the game board in the HTML
 * TODO: Implement this function
 */
function renderBoard() {

    // Use these row labels:
    const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    document.getElementById('game-board').innerHTML = '';

    for (let row = 0; row < BOARD_SIZE; row++) {
        const boardRow = document.createElement('div');
        boardRow.className = 'board-row';

        // Add row label (A, B, C, etc.)
        const rowLabel = document.createElement('div');
        rowLabel.className = 'row-label';
        rowLabel.textContent = rowLabels[row];
        boardRow.appendChild(rowLabel);

        // Create cells for this row
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Add appropriate classes based on cell state
            if (gameBoard[row][col].isHit) {
                cell.classList.add('hit');
            } else if (gameBoard[row][col].isMiss) {
                cell.classList.add('miss');
            } else {
                // Only add click listener if cell hasn't been clicked yet
                cell.addEventListener('click', handleCellClick);
            }

            boardRow.appendChild(cell);
        }

        gameBoardElement.appendChild(boardRow);

    }
}

/**
 * Handle cell click
 * This function is called when a cell is clicked
 * @param {Event} event The click event
 * TODO: Implement this function (COMPLETED)
 */
function handleCellClick(event) {
    // Your code here:
    // 1. Check if game is over (if so, return early)
    if(gameOver) return;
    // 2. Get the row and column from the clicked cell (use event.target.dataset)
    //console.log(`Row: ${event.target.dataset.row} : Col: ${event.target.dataset.col}`);
    // 3. Check if the cell has a ship (hit) or not (miss)
    //check array
    //console.log(gameBoard[event.target.dataset.row]);
    const row = Number(event.target.dataset.row);
    const col = Number(event.target.dataset.col);
    const cell = gameBoard[row][col];

    // 4. Update the game state
    if(cell.hasShip) {
        //add to hitCount
        hitCount++;

        event.target.classList.add('hit');
        //update isHit
        cell.isHit = true;

        displayMessage("Hit!", "success");
    } else {
        event.target.classList.add('miss');
        displayMessage("You Missed!", "error");
    }
    event.target.removeEventListener('click', handleCellClick);
    // 5. Decrease attempts left
    attemptsLeft--;
    // 6. Update the UI (update attempts, render board, show message)
    updateAttemptsDisplay();
    // 7. Check for game end conditions
    checkGameEnd();
}

/**
 * Update attempts display
 * This function updates the attempts display in the HTML
 * TODO: Implement this function (COMPLETED)
 */
function updateAttemptsDisplay() {
    // Your code here:
    // Update the attempts left display
    attemptsLeftElement.innerHTML = attemptsLeft;

}

/**
 * Display message
 * This function displays a message in the message element
 * @param {string} text The message text
 * @param {string} type The message type (info, success, error)
 * TODO: Implement this function(Completed)
 */
function displayMessage(text, type) {
    // Your code here:
    // Update the message element with the given text and type
    let message = document.getElementById("message");
    message.classList.remove('success', 'error', 'info');
    message.innerHTML = text;
    message.classList.add(type);
}

/**
 * Check if game is over
 * This function checks if the game is over (win or lose)
 * TODO: Implement this function
 */
function checkGameEnd() {
    // Your code here:
    // 1. Check if all ships are hit (win condition)
    if(hitCount === totalShipParts) {
        setTimeout(() => {
            alert("Game Over! you got them all");
            gameOver = true;
        }, 0);
    }
    // 2. Check if no attempts left (lose condition)
    if(attemptsLeft === 0) {
        setTimeout(() => {
            gameOver = true;
            displayMessage("Nice Try Buddy!", 'hit');

        }, 0);
    }
}

function resetGame(){
    window.location.reload();
}