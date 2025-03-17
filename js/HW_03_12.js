const gridContainer = document.getElementById('gridContainer');
const numCells = 16;
const gridIndex = new Array(numCells).fill(0); //create array, initialize all to 0


function initializeGrid(){
    //clear previous grid
    gridContainer.innerHTML = '';

    for(let x = 0; x < numCells; x++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerHTML = gridIndex[x];//initialize each cell with the value in array
        cell.setAttribute("data-index", x);

        //add event listener to each cell
        cell.addEventListener('click', handleCellClick);

        gridContainer.appendChild(cell);

    }
}

function handleCellClick(event){
    const cell = event.target; //get clicked cell
    const currentIndex = parseInt(cell.getAttribute('data-index')); //get index of clicked cell
    let count = gridIndex[currentIndex]; //get current count from array

    //increment count
    count++;
    gridIndex[currentIndex] = count;
    //update display on cell
    cell.innerHTML = count;

    //call update color function
    updateCellColor(cell, count)


    //let DOM update before running checkwin()
setTimeout(()=>{
    checkWin();
}, 0);

}

function updateCellColor(cell, count){
    //remove previous color classes
    cell.classList.remove('green', 'orange', 'red');

    //apply colors based on count
    if(count === 1 || count === 2){
        cell.classList.add('green');
    } else if( count === 3 || count === 4){
        cell.classList.add('orange');
    } else if( count >= 5){
        cell.classList.add('red');
    }
}

function checkWin() {
    //var for winning row
    let winRow =false;
   //iterate
    gridIndex.forEach((cell, index) => {
        //calc row and column
        const row = Math.floor(index / 4);
        const col = index % 4;

        if(!winRow && row === 0){
            let colSum = calculateSum('col', col)
            if (colSum >= 5) {
                alert(`Column ${col + 1} wins with ${colSum} total clicks!`);
                document.getElementById("reset-button").style.display = 'block';
                highLightWinningLine('col', col);
                winRow = true;
            }
        }

        // Sum the row values
        if (!winRow && col === 0) {
            let rowSum = calculateSum('row', row)
            if (rowSum >= 5) {
                alert(`Row ${row + 1} wins with ${rowSum} total clicks!`);
                document.getElementById("reset-button").style.display = 'block';
                highLightWinningLine('row', row);
                winRow = true;

            }
        }
    })
}

function resetGame(){
    location.reload();
}

function highLightWinningLine(type, index){
        if (type === 'row'){
            for(let x = 0; x < 4; x++){
                document.querySelector(`[data-index="${index * 4 + x}"]`).classList.add('highlight');            }
        } else if(type === 'col'){
            for(let x = 0; x < 4; x++){
                document.querySelector(`[data-index="${index + x * 4}"]`).classList.add('highlight');
            }
        }
        //TODO: ternary operator instead?

}

//calc row and col
function calculateSum(type, index) {
    let sum = 0;
    if (type === 'row') {
        for (let i = 0; i < 4; i++) {
            sum += gridIndex[index * 4 + i];
        }
    } else if (type === 'col') {
        for (let i = 0; i < 4; i++) {
            sum += gridIndex[i * 4 + index];
        }
    }
    return sum;
}

initializeGrid();

// for (let i = 0; i < numCells; i++) {
//     // let counter = 0; no bueno, resets counter to 0 after each click
//     // instead store counter as attribute
//
//     let cell = document.createElement('div');//create new named cell
//     cell.classList.add('cell'); //add style to cell div
//     cell.innerText = 0;
//     //store counter in attribute
//     cell.setAttribute('data-counter', 0);
//
//     gridContainer.appendChild(cell);//add cell inside grid container
//     cell.setAttribute('data-index', i); //each cell gets unique number 0-16
//     cell.addEventListener('click', () => {
//         let count = parseInt(cell.getAttribute('data-counter')) + 1;
//         cell.setAttribute('data-counter', count);
//         cell.innerText = count;
//
//         //remove previous classes
//         cell.classList.remove('green', 'orange', 'red');
//
//         if(count === 1 || count === 2){
//             cell.classList.add('green');
//         } else if (count === 3 || count === 4){
//             cell.classList.add('orange');
//         } else if(count >= 5){
//             cell.classList.add('red');
//         } else {
//             //
//         }
//     })
//
// }