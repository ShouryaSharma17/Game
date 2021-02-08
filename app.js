// HTML Elements
const statusdiv= document.querySelector('.status');
const resetdiv= document.querySelector('.reset');
const gridcelldiv= document.querySelectorAll('.game-cell');


// Game variables
let gameislive=true; 
let xisnext=true;

//Game constants
const xSymbol = '×';
const oSymbol = '○';

//functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin= (letter) => {
	gameislive = false;
	if (letter === 'x') {
		statusdiv.innerHTML= `${letterToSymbol(letter)} has won!`;
	} else {
		statusdiv.innerHTML =  `<span>${letterToSymbol(letter)} has won!</span>`;
	}
};


const checkGameStatus = () => {
	const topleft = gridcelldiv[0].classList[1];
	const topmiddle = gridcelldiv[1].classList[1];
	const topright = gridcelldiv[2].classList[1];
	const middleleft = gridcelldiv[3].classList[1];
	const middlemiddle = gridcelldiv[4].classList[1];
	const middleright = gridcelldiv[5].classList[1];
	const bottomleft = gridcelldiv[6].classList[1];
	const bottommiddle = gridcelldiv[7].classList[1];
	const bottomright = gridcelldiv[8].classList[1];


//check winner
if (topleft && topleft === topright && topleft === topmiddle) {
	handleWin(topleft);
	gridcelldiv[0].classList.add('won');
    gridcelldiv[1].classList.add('won');
    gridcelldiv[2].classList.add('won');
  }	else if(middleleft && middleleft === middleright && middleleft === middlemiddle){
    handleWin(middleleft);
    gridcelldiv[3].classList.add('won');
    gridcelldiv[4].classList.add('won');
    gridcelldiv[5].classList.add('won');
  }	else if (bottomleft && bottomleft === bottomright && bottomleft === bottommiddle){
	handleWin(bottomleft);
	gridcelldiv[6].classList.add('won');
    gridcelldiv[7].classList.add('won');
    gridcelldiv[8].classList.add('won');
  } else if (topleft && topleft === bottomleft && topleft === middleleft){
	handleWin(topleft);
	gridcelldiv[0].classList.add('won');
    gridcelldiv[3].classList.add('won');
    gridcelldiv[6].classList.add('won');
  } else if (topmiddle && topmiddle === middlemiddle && topmiddle === bottommiddle){
	handleWin(topmiddle);
	gridcelldiv[1].classList.add('won');
    gridcelldiv[4].classList.add('won');
    gridcelldiv[7].classList.add('won');
  } else if (topright && topright === bottomright && topright === middleright){
	handleWin(topright);
	gridcelldiv[2].classList.add('won');
    gridcelldiv[5].classList.add('won');
    gridcelldiv[8].classList.add('won');
  } else if (topleft && topleft === middlemiddle && topleft === bottomright){
	handleWin(topleft);
	gridcelldiv[0].classList.add('won');
    gridcelldiv[4].classList.add('won');
    gridcelldiv[8].classList.add('won');
  } else if (topright && topright === middlemiddle && topright === bottomleft){
	handleWin(topright);
	gridcelldiv[0].classList.add('won');
    gridcelldiv[4].classList.add('won');
    gridcelldiv[8].classList.add('won');
  } else if (topright && topleft && topmiddle && middleleft && middleright && middlemiddle && bottomleft && bottommiddle && bottomright){
	gameislive = false;
	statusdiv.innerHTML = 'Game is tied';
  } else {
  	xisnext = !xisnext;
  	if (xisnext){
  		statusdiv.innerHTML = `${xSymbol} is next`;
  	} else {
  		statusdiv.innerHTML = `<span>${oSymbol} is next</span>`;
  	}
  }
};

//Event handlers
const handlereset = () => {
	xisnext = true;
	statusdiv.innerHTML = `${xSymbol} is next`;
	for (const div of gridcelldiv){
		div.classList.remove('x');
    	div.classList.remove('o');
    	div.classList.remove('won');

	}
	gameislive = true;
};

const handleCellClick = (e) => {
	const classList = e.target.classList;
	if(!gameislive  || classList[1] === 'x' || classList[1] === 'o'){
		return;
	}

	if (xisnext) {
		classList.add('x');
		checkGameStatus();
	} else {
		classList.add('o');
		checkGameStatus();
	}
};

//Event listeners
resetdiv.addEventListener('click',handlereset);

for (const div of gridcelldiv){
	div.addEventListener('click',handleCellClick)
}