
const maze = [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1, "P", 1, "G", 1],
    [1,1,1,1,1]

];
let keyUp = "";
let playerPos = {row: 3, col:1}
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") { movePlayer( -1, 0)}
    if (event.key === "ArrowDown") {  movePlayer( 1, 0)}
    if (event.key === "ArrowLeft") {  movePlayer( 0, -1)}
    if (event.key === "ArrowRight") {  movePlayer( 0, 1)}
});

function movePlayer(rowOfSet, colOfSet){
  let newRow = playerPos.row + rowOfSet;
  let newCol = playerPos.col + colOfSet;

  if(maze[newRow][newCol] !== 1){
      maze[playerPos.row][playerPos.col] = 0;
      playerPos.row = newRow;
      playerPos.col = newCol;
      maze[newRow][newCol] = "P";
      drawBoard();
      if(newRow === 3 && newCol === 3){
          setTimeout( () => {
              alert("you won");
              removeEventListener("keydown", (event) => {
                  event.preventDefault();
              })
          }, 1000);
      }
  } else {
      alert("You've hit a wall!");
  }
}

//objects
let currentPosition= {row: 3, col : 1};


function drawBoard(){

    const gameBoard = document.getElementById("gameBoard");
    let x = maze[1][1];
    gameBoard.innerHTML = "";

    //alert (x);
    let counter =0;
    // for(let x =0; x<maze.length(); x++){
    //     for(let col = 0; col < maze[x].length; col++){
    //         counter+=1;
    //     }
    // }

    maze.forEach((row, rIndex) => {
        row.forEach((cell, cIndex) => {
            //console.log(cell);
            let div = document.createElement("div");
            div.classList.add("cell");
            if(cell == 1){
                div.classList.add("wall");
            } else if(cell === 'P'){
                div.classList.add("player");
                div.textContent = "🤖";
            } else if (cell === "G"){
                div.classList.add("goal");
                // div.textContent = "🥅";
                div.textContent = String.fromCodePoint(0x1F945);
            }
            gameBoard.appendChild(div);
        })
    })



}