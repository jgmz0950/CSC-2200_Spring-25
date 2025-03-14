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

    //console.table(gridIndex);

    checkWin();
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
   //iterate
    gridIndex.forEach((cell, index) => {
        //calc row and column
        const row = Math.floor(index / 4);
        const col = index % 4;

        if(row === 0){
            let colSum = 0;
            for(let i = 0; i < 4; i++) {
                colSum += gridIndex[i * 4 + col];
            }
            if (colSum >= 5) {
                alert(`Column ${col + 1} wins with ${colSum} total clicks!`);

            }
        }

        // Sum the row values
        if (col === 0) {  // We start summing when we reach the first column of each row
            let rowSum = 0;
            for (let i = 0; i < 4; i++) {
                rowSum += gridIndex[row * 4 + i];
            }
            if (rowSum >= 5) {
                alert(`Row ${row + 1} wins with ${rowSum} total clicks!`);

            }
        }
    })
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